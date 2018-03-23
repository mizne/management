import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromResourceEntry from './resource-entry.reducer'
import * as fromResourceAssign from './resource-assign.reducer'
import * as fromRoot from '../../../reducers'

export interface DistributionTreasuryState {
    resourceEntry: fromResourceEntry.State
    resourceAssign: fromResourceAssign.State
}

export interface State extends fromRoot.State {
    fromDistributionTreasury: DistributionTreasuryState
}
export const reducers = {
    resourceEntry: fromResourceEntry.reducer,
    resourceAssign: fromResourceAssign.reducer
}

export const getDistributionTreasuryModuleState = createFeatureSelector<
    DistributionTreasuryState
>('fromDistributionTreasury')

export const getResourceEntryState = createSelector(
    getDistributionTreasuryModuleState,
    (state: DistributionTreasuryState) => state.resourceEntry
)
export const getResourceInfoLoading = createSelector(
    getResourceEntryState,
    fromResourceEntry.getLoading
)
export const getResourceInfoes = createSelector(
    getResourceEntryState,
    fromResourceEntry.getResourceInfoes
)
export const getResourceInfoesCount = createSelector(
    getResourceEntryState,
    fromResourceEntry.getResourceInfoesCount
)
export const getResourceInfoPageParams = createSelector(
    getResourceEntryState,
    fromResourceEntry.getPageParams
)

export const getResourceAssignState = createSelector(
    getDistributionTreasuryModuleState,
    (state: DistributionTreasuryState) => state.resourceAssign
)
export const getResourceUseInfoLoading = createSelector(
    getResourceAssignState,
    fromResourceAssign.getLoading
)
export const getResourceUseInfoes = createSelector(
    getResourceAssignState,
    fromResourceAssign.getResourceUseInfoes
)
export const getResourceUseInfoesCount = createSelector(
    getResourceAssignState,
    fromResourceAssign.getResourceUseInfoesCount
)
export const getResourceUseInfoPageParams = createSelector(
    getResourceAssignState,
    fromResourceAssign.getPageParams
)
