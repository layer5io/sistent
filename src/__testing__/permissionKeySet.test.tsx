import { Key } from '@meshery/schemas/permissions';
import { fireEvent, render, renderHook, screen, within } from '@testing-library/react';
import { NavigationNavbar, type NavigationItem } from '../custom/NavigationNavbar';
import {
  PermissionProvider,
  useHasPermission,
  type PermissionKeySpec
} from '../custom/PermissionProvider';
import { PermissionShield } from '../custom/permissions';
import { SistentThemeProvider } from '../theme';

// `permissionKey` accepts a bare `Key` (the original form) or a key set with an
// explicit combinator. These tests pin three things: the bare-`Key` path is
// byte-for-byte what it was, a set resolves through `.some`/`.every`, and an
// empty or malformed set denies rather than silently granting.

const key = (id: string, fn: string): Key =>
  ({
    id,
    function: fn,
    category: 'Identity',
    subcategory: 'Access Management',
    description: `Allows ${fn}.`
  }) as Key;

const VIEW_ALL_ORGS = key('view-all-orgs', 'View All Organizations');
const VIEW_ORG = key('view-org', 'View Org');

/** A host evaluator that grants exactly the listed key ids. */
const granting = (...ids: string[]) => jest.fn((k: Key) => ids.includes(k.id as string));

const renderPermissionHook = (
  spec: PermissionKeySpec | undefined,
  userHasPermission = granting()
) =>
  renderHook(() => useHasPermission(spec), {
    wrapper: ({ children }) => (
      <PermissionProvider userHasPermission={userHasPermission}>{children}</PermissionProvider>
    )
  });

describe('useHasPermission — single key (regression)', () => {
  it('passes the bare key straight to the host evaluator and returns its verdict', () => {
    const userHasPermission = granting('view-org');

    expect(renderPermissionHook(VIEW_ORG, userHasPermission).result.current).toBe(true);
    expect(userHasPermission).toHaveBeenCalledTimes(1);
    expect(userHasPermission).toHaveBeenCalledWith(VIEW_ORG);
  });

  it('denies a single key the user does not hold', () => {
    expect(renderPermissionHook(VIEW_ALL_ORGS, granting('view-org')).result.current).toBe(false);
  });

  it('permits when no key is supplied', () => {
    const userHasPermission = granting();
    expect(renderPermissionHook(undefined, userHasPermission).result.current).toBe(true);
    expect(userHasPermission).not.toHaveBeenCalled();
  });

  it('permits when no PermissionProvider is mounted, for a key and for a set alike', () => {
    expect(renderHook(() => useHasPermission(VIEW_ORG)).result.current).toBe(true);
    expect(renderHook(() => useHasPermission({ anyOf: [VIEW_ORG] })).result.current).toBe(true);
  });
});

describe('useHasPermission — anyOf', () => {
  it('permits when the user holds any one of the keys', () => {
    const spec = { anyOf: [VIEW_ALL_ORGS, VIEW_ORG] };
    expect(renderPermissionHook(spec, granting('view-all-orgs')).result.current).toBe(true);
    expect(renderPermissionHook(spec, granting('view-org')).result.current).toBe(true);
  });

  it('denies when the user holds none of the keys', () => {
    expect(
      renderPermissionHook({ anyOf: [VIEW_ALL_ORGS, VIEW_ORG] }, granting()).result.current
    ).toBe(false);
  });
});

describe('useHasPermission — allOf', () => {
  it('permits only when the user holds every key', () => {
    expect(
      renderPermissionHook(
        { allOf: [VIEW_ALL_ORGS, VIEW_ORG] },
        granting('view-all-orgs', 'view-org')
      ).result.current
    ).toBe(true);
  });

  it('denies when even one key is missing', () => {
    expect(
      renderPermissionHook({ allOf: [VIEW_ALL_ORGS, VIEW_ORG] }, granting('view-org')).result
        .current
    ).toBe(false);
  });
});

describe('useHasPermission — empty and malformed sets deny', () => {
  // A set is an explicit statement that the affordance IS gated, so a set that
  // cannot be evaluated must never fall through to "permitted". `{ allOf: [] }`
  // is the dangerous one: `[].every(...)` is vacuously true.
  it.each([
    ['empty anyOf', { anyOf: [] }],
    ['empty allOf', { allOf: [] }],
    ['non-array anyOf', { anyOf: VIEW_ORG as unknown as Key[] }],
    ['nullish member', { allOf: [VIEW_ORG, undefined as unknown as Key] }],
    ['both combinators at once', { anyOf: [VIEW_ORG], allOf: [VIEW_ORG] }]
  ])('denies a %s', (_label, spec) => {
    expect(
      renderPermissionHook(spec as PermissionKeySpec, granting('view-org', 'view-all-orgs')).result
        .current
    ).toBe(false);
  });
});

const renderShield = (permissionKey: PermissionKeySpec, granted: string[] = []) =>
  render(
    <SistentThemeProvider>
      <PermissionProvider userHasPermission={granting(...granted)}>
        <PermissionShield permissionKey={permissionKey}>
          <button>Organizations</button>
        </PermissionShield>
      </PermissionProvider>
    </SistentThemeProvider>
  );

/** The shield's tooltip is click-to-open; open it and return its text. */
const openTooltip = (container: HTMLElement): string => {
  fireEvent.click(container.querySelector('[data-testid="SecurityIcon"]')!.parentElement!);
  return screen.getByRole('tooltip').textContent ?? '';
};

describe('PermissionShield tooltip', () => {
  it('lists every unmet key for anyOf', () => {
    const { container } = renderShield({ anyOf: [VIEW_ALL_ORGS, VIEW_ORG] });
    const text = openTooltip(container);

    expect(text).toContain('Needs any of: View All Organizations, View Org');
    expect(text).toContain('Allows View All Organizations.');
    expect(text).toContain('Allows View Org.');
  });

  it('lists every unmet key for allOf, omitting the keys the user already holds', () => {
    const { container } = renderShield({ allOf: [VIEW_ALL_ORGS, VIEW_ORG] }, ['view-org']);
    const text = openTooltip(container);

    expect(text).toContain('Needs all of: View All Organizations');
    expect(text).not.toContain('View Org,');
    expect(text).not.toContain('Allows View Org.');
  });

  it('renders the original single-key wording for a bare Key (regression)', () => {
    const { container } = renderShield(VIEW_ORG);
    const text = openTooltip(container);

    expect(text).toContain('Missing requisite key');
    expect(text).toContain('View Org');
    expect(text).not.toContain('Needs any of');
    expect(text).not.toContain('Needs all of');
  });

  it('falls back to the single-key wording when a malformed set names no keys', () => {
    const { container } = renderShield({ anyOf: [] });
    expect(openTooltip(container)).toContain('Missing requisite key');
  });
});

const SECTION_KEYS = { anyOf: [VIEW_ALL_ORGS, VIEW_ORG] };

const renderNavbar = (items: NavigationItem[], granted: string[] = []) =>
  render(
    <SistentThemeProvider>
      <PermissionProvider userHasPermission={granting(...granted)}>
        <NavigationNavbar navigationItems={items} />
      </PermissionProvider>
    </SistentThemeProvider>
  );

/**
 * Click the section's expand chevron itself — the handler sits on the SVG, and
 * jsdom applies no `pointer-events`, so this is exactly the "disabled section
 * still toggles open" path the issue is about.
 */
const clickExpandToggle = (sectionId: string) => {
  const toggle = within(screen.getByTestId(`nav-toggle-${sectionId}`));
  fireEvent.click(toggle.getByTestId('ExpandMoreIcon'));
};

describe('NavigationNavbar — key sets on a section item', () => {
  const section = (onClick: () => void, onSubClick: () => void): NavigationItem[] => [
    {
      id: 'identity',
      title: 'Identity',
      permissionKey: SECTION_KEYS,
      onClick,
      subItems: [
        {
          id: 'organizations',
          title: 'Organizations',
          permissionKey: VIEW_ORG,
          onClick: onSubClick
        }
      ]
    }
  ];

  it('renders a shield on a section whose keys are all unmet', () => {
    const { container } = renderNavbar(section(jest.fn(), jest.fn()));

    expect(container.querySelector('[data-testid="SecurityIcon"]')).toBeTruthy();
    expect(openTooltip(container)).toContain('Needs any of: View All Organizations, View Org');
  });

  it('cannot be expanded or activated while every key is unmet', () => {
    const onClick = jest.fn();
    const onSubClick = jest.fn();
    renderNavbar(section(onClick, onSubClick));

    clickExpandToggle('identity');
    expect(screen.queryByTestId('nav-subitem-organizations')).toBeNull();

    fireEvent.click(screen.getByTestId('nav-item-identity'));
    expect(onClick).not.toHaveBeenCalled();
    expect(onSubClick).not.toHaveBeenCalled();
  });

  it('expands and activates once any one of the section keys is held', () => {
    const onClick = jest.fn();
    renderNavbar(section(onClick, jest.fn()), ['view-all-orgs']);

    clickExpandToggle('identity');
    expect(screen.getByTestId('nav-subitem-organizations')).toBeTruthy();

    fireEvent.click(screen.getByTestId('nav-item-identity'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('leaves an item with no permissionKey and no permission flag fully interactive', () => {
    const onClick = jest.fn();
    const onSubClick = jest.fn();
    renderNavbar([
      {
        id: 'plain',
        title: 'Plain',
        onClick,
        subItems: [{ id: 'child', title: 'Child', onClick: onSubClick }]
      }
    ]);

    clickExpandToggle('plain');
    fireEvent.click(screen.getByTestId('nav-subitem-child'));
    expect(onSubClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('nav-item-plain'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('keeps a legacy `permission: false` section inert as well', () => {
    const onClick = jest.fn();
    renderNavbar([
      {
        id: 'legacy',
        title: 'Legacy',
        permission: false,
        onClick,
        subItems: [{ id: 'child', title: 'Child', onClick: jest.fn() }]
      }
    ]);

    clickExpandToggle('legacy');
    expect(screen.queryByTestId('nav-subitem-child')).toBeNull();

    fireEvent.click(screen.getByTestId('nav-item-legacy'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
