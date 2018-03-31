import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store'

import * as fromPhysicalServerAccount from './physical-server-account.reducer'
import * as fromVirtualServerAccount from './virtual-server-account.reducer'
import * as fromClusterServerAccount from './cluster-server-account.reducer'
import * as fromRoot from '../../../reducers'

export interface SoftwareAccountState {
    physicalServerAccount: fromPhysicalServerAccount.State
    virtualServerAccount: fromVirtualServerAccount.State
    clusterServerAccount: fromClusterServerAccount.State
}

export interface State extends fromRoot.State {
    fromServerAccount: SoftwareAccountState
}
export const reducers: ActionReducerMap<SoftwareAccountState> = {
    physicalServerAccount: fromPhysicalServerAccount.reducer,
    virtualServerAccount: fromVirtualServerAccount.reducer,
    clusterServerAccount: fromClusterServerAccount.reducer
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

export const getVirtualServerAccountState = createSelector(
    getServerAccountModuleState,
    (state: SoftwareAccountState) => state.virtualServerAccount
)
export const getVirtualLoading = createSelector(
    getVirtualServerAccountState,
    fromVirtualServerAccount.getLoading
)
export const getVirtualServerAccounts = createSelector(
    getVirtualServerAccountState,
    fromVirtualServerAccount.getAccounts
)
export const getVirtualServerAccountCount = createSelector(
    getVirtualServerAccountState,
    fromVirtualServerAccount.getAccountsCount
)
export const getVirtualServerAccountsPageParams = createSelector(
    getVirtualServerAccountState,
    fromVirtualServerAccount.getPageParams
)

export const getClusterServerAccountState = createSelector(
    getServerAccountModuleState,
    (state: SoftwareAccountState) => state.clusterServerAccount
)
export const getClusterLoading = createSelector(
    getClusterServerAccountState,
    fromClusterServerAccount.getLoading
)
export const getClusterServerAccounts = createSelector(
    getClusterServerAccountState,
    fromClusterServerAccount.getAccounts
)
export const getClusterServerAccountCount = createSelector(
    getClusterServerAccountState,
    fromClusterServerAccount.getAccountsCount
)
export const getClusterServerAccountsPageParams = createSelector(
    getClusterServerAccountState,
    fromClusterServerAccount.getPageParams
)
