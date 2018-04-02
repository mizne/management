import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromSystemOnOff from './system-onoff.reducer'
import * as fromSavedApply from './saved-apply.reducer'
import * as fromExtraTabs from './extra-tabs.reducer'
import * as fromToAppApplyResource from './to-add-apply-resource.reducer'

import * as fromRoot from '../../../reducers'

export interface SystemOnOffState {
    systemOnOffApply: fromSystemOnOff.State
    savedApply: fromSavedApply.State
    extraTabs: fromExtraTabs.State
    toAddApplyResource: fromToAppApplyResource.State
}

export interface State extends fromRoot.State {
    fromSystemOnOff: SystemOnOffState
}
export const reducers = {
    systemOnOffApply: fromSystemOnOff.reducer,
    savedApply: fromSavedApply.reducer,
    extraTabs: fromExtraTabs.reducer,
    toAddApplyResource: fromToAppApplyResource.reducer
}

export const getSystemOnOffModuleState = createFeatureSelector<
    SystemOnOffState
>('fromSystemOnOff')

export const getSystemOnOffApplyState = createSelector(
    getSystemOnOffModuleState,
    (state: SystemOnOffState) => state.systemOnOffApply
)
export const getSaveOrSubmitLoading = createSelector(
    getSystemOnOffApplyState,
    fromSystemOnOff.getSaveOrSubmitLoading
)
export const getSaveOrSubmitText = createSelector(
    getSystemOnOffApplyState,
    fromSystemOnOff.getSaveOrSubmitText
)
export const getFetchApplyInfoLoading = createSelector(
    getSystemOnOffApplyState,
    fromSystemOnOff.getFetchApplyInfoLoading
)
export const getApplyInfo = createSelector(
    getSystemOnOffApplyState,
    fromSystemOnOff.getApplyInfo
)
export const getFetchApproversLoading = createSelector(
    getSystemOnOffApplyState,
    fromSystemOnOff.getFetchApproversLoading
)
export const getApprovers = createSelector(
    getSystemOnOffApplyState,
    fromSystemOnOff.getApprovers
)
export const getAddedApplyResources = createSelector(
    getSystemOnOffApplyState,
    fromSystemOnOff.getAddedApplyResources
)
export const getShowCreateApplyResourceBtn = createSelector(
    getSystemOnOffApplyState,
    fromSystemOnOff.getShowCreateApplyResourceBtn
)

export const getSavedApplyState = createSelector(
    getSystemOnOffModuleState,
    (state: SystemOnOffState) => state.savedApply
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
    getSystemOnOffModuleState,
    (state: SystemOnOffState) => state.extraTabs
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
    getSystemOnOffModuleState,
    (state: SystemOnOffState) => state.toAddApplyResource
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
