import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromUnifiedApply from './unified-apply.reducer'
import * as fromSubPackageApply from './subpackage-apply.reducer'
import * as fromSavedApply from './saved-apply.reducer'
import * as fromExtraTabs from './extra-tabs.reducer'
import * as fromToAppApplyResource from './to-add-apply-resource.reducer'

import * as fromRoot from '../../../reducers'

export interface UnifiedApplyState {
    unifiedApply: fromUnifiedApply.State
    subPackageApply: fromSubPackageApply.State
    savedApply: fromSavedApply.State
    extraTabs: fromExtraTabs.State
    toAddApplyResource: fromToAppApplyResource.State
}

export interface State extends fromRoot.State {
    fromUnifiedApply: UnifiedApplyState
}
export const reducers = {
    unifiedApply: fromUnifiedApply.reducer,
    subPackageApply: fromSubPackageApply.reducer,
    savedApply: fromSavedApply.reducer,
    extraTabs: fromExtraTabs.reducer,
    toAddApplyResource: fromToAppApplyResource.reducer
}

export const getUnifiedApplyModuleState = createFeatureSelector<
    UnifiedApplyState
>('fromUnifiedApply')

export const getUnifiedApplyState = createSelector(
    getUnifiedApplyModuleState,
    (state: UnifiedApplyState) => state.unifiedApply
)
export const getUnifiedSaveOrSubmitLoading = createSelector(
    getUnifiedApplyState,
    fromUnifiedApply.getSaveOrSubmitLoading
)
export const getUnifiedSaveOrSubmitText = createSelector(
    getUnifiedApplyState,
    fromUnifiedApply.getSaveOrSubmitText
)
export const getFetchApplyInfoLoading = createSelector(
    getUnifiedApplyState,
    fromUnifiedApply.getFetchApplyInfoLoading
)
export const getApplyInfo = createSelector(
    getUnifiedApplyState,
    fromUnifiedApply.getApplyInfo
)
export const getFetchApproversLoading = createSelector(
    getUnifiedApplyState,
    fromUnifiedApply.getFetchApproversLoading
)
export const getApprovers = createSelector(
    getUnifiedApplyState,
    fromUnifiedApply.getApprovers
)
export const getUnifiedAddedApplyResources = createSelector(
    getUnifiedApplyState,
    fromUnifiedApply.getAddedApplyResources
)


export const getSubPackageApplyState = createSelector(
    getUnifiedApplyModuleState,
    (state: UnifiedApplyState) => state.subPackageApply
)
export const getFetchSubPackageInfoLoading = createSelector(
    getSubPackageApplyState,
    fromSubPackageApply.getFetchSubPackageInfoLoading
)
export const getSubPackageInfo = createSelector(
    getSubPackageApplyState,
    fromSubPackageApply.getSubPackageInfo
)
export const getSubPackageAddedApplyResources = createSelector(
    getSubPackageApplyState,
    fromSubPackageApply.getAddedApplyResources
)
export const getSubPackageSaveOrSubmitLoading = createSelector(
    getSubPackageApplyState,
    fromSubPackageApply.getSaveOrSubmitLoading
)
export const getSubPackageSaveOrSubmitText = createSelector(
    getSubPackageApplyState,
    fromSubPackageApply.getSaveOrSubmitText
)


export const getSavedApplyState = createSelector(
    getUnifiedApplyModuleState,
    (state: UnifiedApplyState) => state.savedApply
)
export const getFetchSavedUnifiedAppliesLoading = createSelector(
    getSavedApplyState,
    fromSavedApply.getFetchUnifiedLoading
)
export const getSavedUnifiedApplies = createSelector(
    getSavedApplyState,
    fromSavedApply.getSavedUnifiedApplies
)
export const getFetchSavedSubPackageAppliesLoading = createSelector(
    getSavedApplyState,
    fromSavedApply.getFetchSubPackageLoading
)
export const getSavedSubPackageApplies = createSelector(
    getSavedApplyState,
    fromSavedApply.getSavedSubPackageApplies
)

export const getExtraTabsState = createSelector(
    getUnifiedApplyModuleState,
    (state: UnifiedApplyState) => state.extraTabs
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
    getUnifiedApplyModuleState,
    (state: UnifiedApplyState) => state.toAddApplyResource
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
