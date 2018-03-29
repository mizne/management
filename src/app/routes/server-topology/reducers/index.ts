import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromPhysicalServerAccount from './server-topology.reducer'
import * as fromRoot from '../../../reducers'

export interface SoftwareAccountState {
    physicalServerAccount: fromPhysicalServerAccount.State
}

export interface State extends fromRoot.State {
    fromServerAccount: SoftwareAccountState
}
export const reducers = {
    physicalServerAccount: fromPhysicalServerAccount.reducer,
}

export const getServerAccountModuleState = createFeatureSelector<
    SoftwareAccountState
>('fromServerAccount')

export const getPhysicalServerAccountState = createSelector(
    getServerAccountModuleState,
    (state: SoftwareAccountState) => state.physicalServerAccount
)
export const getPhysicalLoading = createSelector(
    getPhysicalServerAccountState,
    fromPhysicalServerAccount.getLoading
)
export const getPhysicalServerAccounts = createSelector(
    getPhysicalServerAccountState,
    fromPhysicalServerAccount.getAccounts
)
export const getPhysicalServerAccountCount = createSelector(
    getPhysicalServerAccountState,
    fromPhysicalServerAccount.getAccountsCount
)
export const getPhysicalServerAccountsPageParams = createSelector(
    getPhysicalServerAccountState,
    fromPhysicalServerAccount.getPageParams
)

