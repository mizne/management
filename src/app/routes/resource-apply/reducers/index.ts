import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromRequirementApply from './requirement-apply.reducer'
import * as fromSavedApply from './saved-apply.reducer'
import * as fromExtraTabs from './extra-tabs.reducer'

import * as fromRoot from '../../../reducers'

export interface ResourceApplyState {
    requirementApply: fromRequirementApply.State
    savedApply: fromSavedApply.State
    extraTabs: fromExtraTabs.State
}

export interface State extends fromRoot.State {
    fromResourceApply: ResourceApplyState
}
export const reducers = {
    requirementApply: fromRequirementApply.reducer,
    savedApply: fromSavedApply.reducer,
    extraTabs: fromExtraTabs.reducer
}

export const getResourceApplyModuleState = createFeatureSelector<
    ResourceApplyState
    >('fromResourceApply')

export const getRequirementApplyState = createSelector(
    getResourceApplyModuleState,
    (state: ResourceApplyState) => state.requirementApply
)
export const getSaveOrSubmitLoading = createSelector(
    getRequirementApplyState,
    fromRequirementApply.getSaveOrSubmitLoading
)
export const getSaveOrSubmitText = createSelector(
    getRequirementApplyState,
    fromRequirementApply.getSaveOrSubmitText
)
export const getFetchApplyInfoLoading = createSelector(
    getRequirementApplyState,
    fromRequirementApply.getFetchApplyInfoLoading
)
export const getApplyInfo = createSelector(
    getRequirementApplyState,
    fromRequirementApply.getApplyInfo
)
export const getFetchApproversLoading = createSelector(
    getRequirementApplyState,
    fromRequirementApply.getFetchApproversLoading
)
export const getApprovers = createSelector(
    getRequirementApplyState,
    fromRequirementApply.getApprovers
)
export const getAddedApplyResources = createSelector(
    getRequirementApplyState,
    fromRequirementApply.getAddedApplyResources
)
export const getFetchAddableApplyResourcesLoading = createSelector(
    getRequirementApplyState,
    fromRequirementApply.getFetchAddableApplyResourcesLoading
)
export const getAddableApplyResources = createSelector(
    getRequirementApplyState,
    fromRequirementApply.getAddableApplyResources
)

export const getSavedApplyState = createSelector(
    getResourceApplyModuleState,
    (state: ResourceApplyState) => state.savedApply
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
    getResourceApplyModuleState,
    (state: ResourceApplyState) => state.extraTabs
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
