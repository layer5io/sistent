import {
  MESHERY_EXTENSION_CAPABILITIES,
  MESHERY_EXTENSION_CONTRACT_VERSION,
  MESHERY_EXTENSION_DEPRECATED_CAPABILITIES,
  MESHERY_EXTENSION_EVENT,
  MESHERY_EXTENSION_EVENT_TYPES,
  MESHERY_EXTENSION_HOOKS,
  describeInjectedCapabilityReport,
  isInjectedCapabilityReportSatisfied,
  isMesheryExtensionEvent,
  reportInjectedCapabilities
} from '../actors/mesheryExtensionContract';

/** A host bag that satisfies the contract exactly, built from the contract itself. */
const satisfyingInjectProps = () => ({
  ...Object.fromEntries(MESHERY_EXTENSION_CAPABILITIES.map(key => [key, () => null])),
  hooks: Object.fromEntries(MESHERY_EXTENSION_HOOKS.map(hook => [hook, () => null]))
});

describe('Meshery extension contract — event literals', () => {
  it('exposes a literal for every event type on the bus', () => {
    // The union -> map completeness guard is compile-time; this asserts the
    // runtime array stays in step with the map it is derived from.
    expect([...MESHERY_EXTENSION_EVENT_TYPES].sort()).toEqual(
      Object.values(MESHERY_EXTENSION_EVENT).sort()
    );
  });

  it('pins the wire literals that cross the host boundary', () => {
    // Hard-coded on purpose. These strings are the actual contract: a rename is
    // only safe alongside a contract-version bump and a deprecation entry, and
    // this test is what forces that conversation. Renaming
    // OPEN_DESIGN_IN_KANVAS -> OPEN_DESIGN_IN_EXTENSION silently broke opening a
    // design because nothing pinned them.
    expect(MESHERY_EXTENSION_EVENT).toEqual({
      K8sContextsUpdated: 'K8S_CONTEXTS_UPDATED',
      OpenViewScopedToDesign: 'OPEN_VIEW_SCOPED_TO_DESIGN',
      OpenDesignInExtension: 'OPEN_DESIGN_IN_EXTENSION',
      OpenViewInExtension: 'OPEN_VIEW_IN_EXTENSION',
      MergeDesign: 'MERGE_DESIGN',
      DispatchToMesheryStore: 'DISPATCH_TO_MESHERY_STORE',
      FeatureRequiresUserAccount: 'FeatureRequiresUserAccount',
      MissingPermission: 'MISSING_PERMISSION',
      MissingCapability: 'MISSING_CAPABILITY'
    });
  });

  it('recognises contract events and rejects unknown literals', () => {
    expect(
      isMesheryExtensionEvent({
        type: MESHERY_EXTENSION_EVENT.OpenDesignInExtension,
        data: { designId: 'd', designName: 'n' }
      })
    ).toBe(true);
    // The pre-fix literal. A subscriber that receives this is talking to a host
    // built against a different contract and must say so rather than no-op.
    expect(isMesheryExtensionEvent({ type: 'OPEN_DESIGN_IN_KANVAS', data: {} })).toBe(false);
  });

  it('rejects non-event values without throwing', () => {
    expect(isMesheryExtensionEvent(null)).toBe(false);
    expect(isMesheryExtensionEvent(undefined)).toBe(false);
    expect(isMesheryExtensionEvent('OPEN_DESIGN_IN_EXTENSION')).toBe(false);
    expect(isMesheryExtensionEvent({})).toBe(false);
  });
});

describe('Meshery extension contract — injected capabilities', () => {
  it('reports a fully-satisfying host as satisfied', () => {
    const report = reportInjectedCapabilities(satisfyingInjectProps());

    expect(report.missing).toEqual([]);
    expect(report.missingHooks).toEqual([]);
    expect(isInjectedCapabilityReportSatisfied(report)).toBe(true);
    expect(describeInjectedCapabilityReport(report)).toBeNull();
  });

  it('names the capability a host stopped injecting', () => {
    // This is the capabilitiesRegistry -> providerCapabilities incident in
    // miniature: the host drops a key, every read yields undefined, and the
    // failure used to surface as an unrelated crash far from the cause.
    const injectProps = satisfyingInjectProps();
    delete (injectProps as Record<string, unknown>).providerCapabilities;

    const report = reportInjectedCapabilities(injectProps);

    expect(report.missing).toEqual(['providerCapabilities']);
    expect(isInjectedCapabilityReportSatisfied(report)).toBe(false);
    expect(describeInjectedCapabilityReport(report)).toContain('providerCapabilities');
  });

  it('names a missing nested hook', () => {
    const injectProps = { ...satisfyingInjectProps(), hooks: { CAN: () => true } };

    const report = reportInjectedCapabilities(injectProps);

    expect(report.missingHooks).toEqual(['useDynamicComponent', 'useFilterK8sContexts']);
    expect(describeInjectedCapabilityReport(report)).toContain('useFilterK8sContexts');
  });

  it('does not double-report hooks when the whole hooks bag is absent', () => {
    const injectProps = satisfyingInjectProps();
    delete (injectProps as Record<string, unknown>).hooks;

    const report = reportInjectedCapabilities(injectProps);

    expect(report.missing).toContain('hooks');
    expect(report.missingHooks).toEqual([]);
  });

  it('flags deprecated aliases alongside their replacement without failing the check', () => {
    const report = reportInjectedCapabilities({
      ...satisfyingInjectProps(),
      capabilitiesRegistry: {},
      CapabilitiesRegistryClass: class {}
    });

    expect(report.deprecated).toEqual([
      { provided: 'capabilitiesRegistry', replacement: 'providerCapabilities' },
      { provided: 'CapabilitiesRegistryClass', replacement: 'ProviderUiAccessControlClass' }
    ]);
    // Legacy bundles still depend on these, so their presence is informational.
    expect(isInjectedCapabilityReportSatisfied(report)).toBe(true);
  });

  it('does not report the host handshake field as an unknown key', () => {
    // The host advertises `contractVersion` on the same bag. Reporting the
    // host's own handshake field as unrecognized is noise, and noise is what
    // trains people to stop reading the report.
    const report = reportInjectedCapabilities({
      ...satisfyingInjectProps(),
      contractVersion: MESHERY_EXTENSION_CONTRACT_VERSION
    });

    expect(report.unrecognized).toEqual([]);
  });

  it('reports keys this build has never heard of as unrecognized', () => {
    const report = reportInjectedCapabilities({
      ...satisfyingInjectProps(),
      someCapabilityFromANewerHost: () => null
    });

    expect(report.unrecognized).toEqual(['someCapabilityFromANewerHost']);
    expect(isInjectedCapabilityReportSatisfied(report)).toBe(true);
  });

  it('treats a null or undefined bag as every capability missing', () => {
    for (const bag of [null, undefined]) {
      const report = reportInjectedCapabilities(bag);
      expect(report.missing).toEqual([...MESHERY_EXTENSION_CAPABILITIES]);
      expect(describeInjectedCapabilityReport(report)).toContain('contract');
    }
  });

  it('keeps every deprecated alias pointing at a real capability or an outright removal', () => {
    for (const replacement of Object.values(MESHERY_EXTENSION_DEPRECATED_CAPABILITIES)) {
      if (replacement === null) continue;
      expect(MESHERY_EXTENSION_CAPABILITIES).toContain(replacement);
    }
  });

  it('never lists a deprecated alias as a current capability', () => {
    for (const alias of Object.keys(MESHERY_EXTENSION_DEPRECATED_CAPABILITIES)) {
      expect(MESHERY_EXTENSION_CAPABILITIES).not.toContain(alias);
    }
  });
});

describe('Meshery extension contract — version', () => {
  it('is a positive integer hosts and extensions can compare', () => {
    expect(Number.isInteger(MESHERY_EXTENSION_CONTRACT_VERSION)).toBe(true);
    expect(MESHERY_EXTENSION_CONTRACT_VERSION).toBeGreaterThan(0);
  });
});
