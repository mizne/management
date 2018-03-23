import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromVersionRelease from './version-release.reducer'
import * as fromSavedApply from './saved-apply.reducer'
import * as fromExtraTabs from './extra-tabs.reducer'
import * as fromToAppApplyResource from './to-add-apply-resource.reducer'

import * as fromRoot from '../../../reducers'

export interface VersionReleaseState {
    versionReleaseApply: fromVersionRelease.State
    savedApply: fromSavedApply.State
    extraTabs: fromExtraTabs.State
    toAddApplyResource: fromToAppApplyResource.State
}

export interface State extends fromRoot.State {
    fromVersionRelease: VersionReleaseState
}
export const reducers = {
    versionReleaseApply: fromVersionRelease.reducer,
    savedApply: fromSavedApply.reducer,
    extraTabs: fromExtraTabs.reducer,
    toAddApplyResource: fromToAppApplyResource.reducer
}

export const getVersionReleaseModuleState = createFeatureSelector<
    VersionReleaseState
>('fromVersionRelease')

export const getSystemOnOffApplyState = createSelector(
    getVersionReleaseModuleState,
    (state: VersionReleaseState) => state.versionReleaseApply
)
export const getSaveOrSubmitLoading = createSelector(
    getSystemOnOffApplyState,
    fromVersionRelease.getSaveOrSubmitLoading
)
export const getSaveOrSubmitText = createSelector(
    getSystemOnOffApplyState,
    fromVersionRelease.getSaveOrSubmitText
)
export const getFetchApplyInfoLoading = createSelector(
    getSystemOnOffApplyState,
    fromVersionRelease.getFetchApplyInfoLoading
)
export const getApplyInfo = createSelector(
    getSystemOnOffApplyState,
    fromVersionRelease.getApplyInfo
)
export const getFetchApproversLoading = createSelector(
    getSystemOnOffApplyState,
    fromVersionRelease.getFetchApproversLoading
)
export const getApprovers = createSelector(
    getSystemOnOffApplyState,
    fromVersionRelease.getApprovers
)
export const getAddedApplyResources = createSelector(
    getSystemOnOffApplyState,
    fromVersionRelease.getAddedApplyResources
)

export const getSavedApplyState = createSelector(
    getVersionReleaseModuleState,
    (state: VersionReleaseState) => state.savedApply
)
export const getFetchSavedAppliesLoading = createSelector(
    getSavedApplyState,
    fromSavedApply.getLoading
)
export const getSavedApplies = createSelector(
    getSavedApplyState,
    fromSavedApply.getSavedApplies
)

export const getExtraTabsState = createSelector(
    getVersionReleaseModuleState,
    (state: VersionReleaseState) => state.extraTabs
)
export const getExtraTabs = createSelector(
    getExtraTabsState,
    fromExtraTabs.getTabs
)
export const getNeedManualSetTabIndex = createSelector(
    getExtraTabsState,
    fromExtraTabs.getNeedManualSetTabIndex
)
export const getTabIndexToNeedManualSet = createSelector(
    getExtraTabsState,
    fromExtraTabs.getTabIndexToNeedManualSet
)

export const getToAddApplyResourceState = createSelector(
    getVersionReleaseModuleState,
    (state: VersionReleaseState) => state.toAddApplyResource
)
export const getFetchAddableApplyResourceLoading = createSelector(
    getToAddApplyResourceState,
    fromToAppApplyResource.getFetchAddableApplyResourcesLoading
)
export const getAddableApplyResources = createSelector(
    getToAddApplyResourceState,
    fromToAppApplyResource.getAddableApplyResources
)
export const getAddableApplyResourcesCount = createSelector(
    getToAddApplyResourceState,
    fromToAppApplyResource.getAddableApplyResourcesCount
)
export const getAddableApplyResourcesPageParams = createSelector(
    getToAddApplyResourceState,
    fromToAppApplyResource.getAddableApplyResourcesPageParams
)
