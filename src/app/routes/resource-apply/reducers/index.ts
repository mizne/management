import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromRequirementApply from './requirement-apply.reducer'
import * as fromSavedApply from './saved-apply.reducer'
import * as fromRoot from '../../../reducers'

export interface SoftwareAccountState {
    requirementApply: fromRequirementApply.State
    savedApply: fromSavedApply.State
}

export interface State extends fromRoot.State {
    fromResourceApply: SoftwareAccountState
}
export const reducers = {
    requirementApply: fromRequirementApply.reducer,
    savedApply: fromSavedApply.reducer
}

export const getResourceApplyModuleState = createFeatureSelector<
    SoftwareAccountState
>('fromResourceApply')

export const getRequirementApplyState = createSelector(
    getResourceApplyModuleState,
    (state: SoftwareAccountState) => state.requirementApply
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
    (state: SoftwareAccountState) => state.savedApply
)
export const getFetchSavedAppliesLoading = createSelector(
    getSavedApplyState,
    fromSavedApply.getLoading
)
export const getSavedApplies = createSelector(
    getSavedApplyState,
    fromSavedApply.getSavedApplies
)
