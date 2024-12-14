import { configureStore } from '@reduxjs/toolkit';
import anonymousPerfResultsReducer from './slices/anonymousPerfResultsSlice';
import anonymousUsageStatsReducer from './slices/anonymousUsageStatsSlice';
import cReducer from './slices/cSlice';
import capabilitiesRegistryReducer from './slices/capabilitiesRegistrySlice';
import catalogVisibilityReducer from './slices/catalogVisibilitySlice';
import connectionMetadataStateReducer from './slices/connectionMetadataStateSlice';
import controllerStateReducer from './slices/controllerStateSlice';
import eventsReducer from './slices/eventsSlice';
import extensionTypeReducer from './slices/extensionTypeSlice';
import genReducer from './slices/genSlice';
import grafanaAPIKeyReducer from './slices/grafanaAPIKeySlice';
import grafanaBoardSearchReducer from './slices/grafanaBoardSearchSlice';
import grafanaBoardsReducer from './slices/grafanaBoardsSlice';
import grafanaReducer from './slices/grafanaSlice';
import grafanaURLReducer from './slices/grafanaURLSlice';
import isBetaReducer from './slices/isBetaSlice';
import isDrawerCollapsedReducer from './slices/isDrawerCollapsedSlice';
import k8sConfigReducer from './slices/k8sConfigSlice';
import keysReducer from './slices/keysSlice';
import loadTestPrefReducer from './slices/loadTestPrefSlice';
import loadTestReducer from './slices/loadTestSlice';
import meshAdaptersReducer from './slices/meshAdaptersSlice';
import meshAdapterstsReducer from './slices/meshAdapterstsSlice';
import meshNameReducer from './slices/meshNameSlice';
import meshSyncStateReducer from './slices/meshSyncStateSlice';
import notificationCenterReducer from './slices/notificationCenterSlice';
import openEventIdReducer from './slices/openEventIdSlice';
import operatorStateReducer from './slices/operatorStateSlice';
import organizationReducer from './slices/organizationSlice';
import pageReducer from './slices/pageSlice';
import pathReducer from './slices/pathSlice';
import prometheusReducer from './slices/prometheusSlice';
import prometheusURLReducer from './slices/prometheusURLSlice';
import qpsReducer from './slices/qpsSlice';
import resultReducer from './slices/resultSlice';
import resultsReducer from './slices/resultsSlice';
import results_selectionReducer from './slices/results_selectionSlice';
import selectedAdapterReducer from './slices/selectedAdapterSlice';
import selectedBoardsConfigsReducer from './slices/selectedBoardsConfigsSlice';
import selectedK8sContextsReducer from './slices/selectedK8sContextsSlice';
import selectedPrometheusBoardsConfigsReducer from './slices/selectedPrometheusBoardsConfigsSlice';
import showFullNotificationCenterReducer from './slices/showFullNotificationCenterSlice';
import showProgressReducer from './slices/showProgressSlice';
import startKeyReducer from './slices/startKeySlice';
import staticPrometheusBoardConfigReducer from './slices/staticPrometheusBoardConfigSlice';
import tReducer from './slices/tSlice';
import telemetryURLsReducer from './slices/telemetryURLsSlice';
import testNameReducer from './slices/testNameSlice';
import titleReducer from './slices/titleSlice';
import tsReducer from './slices/tsSlice';
import urlReducer from './slices/urlSlice';
import userReducer from './slices/userSlice';
import workspaceReducer from './slices/workspaceSlice';

export const mesheryReduxStore = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    k8sConfig: k8sConfigReducer,
    selectedK8sContexts: selectedK8sContextsReducer,
    loadTest: loadTestReducer,
    loadTestPref: loadTestPrefReducer,
    meshAdapters: meshAdaptersReducer,
    meshAdaptersts: meshAdapterstsReducer,
    results: resultsReducer,
    results_selection: results_selectionReducer,
    grafana: grafanaReducer,
    prometheus: prometheusReducer,
    staticPrometheusBoardConfig: staticPrometheusBoardConfigReducer,
    anonymousUsageStats: anonymousUsageStatsReducer,
    anonymousPerfResults: anonymousPerfResultsReducer,
    showProgress: showProgressReducer,
    isDrawerCollapsed: isDrawerCollapsedReducer,
    selectedAdapter: selectedAdapterReducer,
    events: eventsReducer,
    notificationCenter: notificationCenterReducer,
    catalogVisibility: catalogVisibilityReducer,
    extensionType: extensionTypeReducer,
    capabilitiesRegistry: capabilitiesRegistryReducer,
    telemetryURLs: telemetryURLsReducer,
    operatorState: operatorStateReducer,
    controllerState: controllerStateReducer,
    meshSyncState: meshSyncStateReducer,
    connectionMetadataState: connectionMetadataStateReducer,
    organization: organizationReducer,
    workspace: workspaceReducer,
    keys: keysReducer,
    path: pathReducer,
    title: titleReducer,
    isBeta: isBetaReducer,
    testName: testNameReducer,
    meshName: meshNameReducer,
    url: urlReducer,
    qps: qpsReducer,
    c: cReducer,
    t: tReducer,
    result: resultReducer,
    gen: genReducer,
    ts: tsReducer,
    startKey: startKeyReducer,
    grafanaURL: grafanaURLReducer,
    grafanaAPIKey: grafanaAPIKeyReducer,
    grafanaBoardSearch: grafanaBoardSearchReducer,
    grafanaBoards: grafanaBoardsReducer,
    selectedBoardsConfigs: selectedBoardsConfigsReducer,
    prometheusURL: prometheusURLReducer,
    selectedPrometheusBoardsConfigs: selectedPrometheusBoardsConfigsReducer,
    openEventId: openEventIdReducer,
    showFullNotificationCenter: showFullNotificationCenterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

export type MesheryRootState = ReturnType<typeof mesheryReduxStore.getState>;
export type MesheryReduxAppDispatch = typeof mesheryReduxStore.dispatch;
