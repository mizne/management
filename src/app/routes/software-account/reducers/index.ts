import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromApplicationSoftwareAccount from './application-software-account.reducer'
import * as fromSystemSoftwareAccount from './system-software-account.reducer'
import * as fromMiddlewareSoftwareAccount from './middleware-software-account.reducer'
import * as fromRoot from '../../../reducers'

export interface SoftwareAccountState {
    applicationSoftwareAccount: fromApplicationSoftwareAccount.State
    systemSoftwareAccount: fromSystemSoftwareAccount.State
    middlewareSoftwareAccount: fromMiddlewareSoftwareAccount.State
}

export interface State extends fromRoot.State {
    fromSoftwareAccount: SoftwareAccountState
}
export const reducers = {
    applicationSoftwareAccount: fromApplicationSoftwareAccount.reducer,
    systemSoftwareAccount: fromSystemSoftwareAccount.reducer,
    middlewareSoftwareAccount: fromMiddlewareSoftwareAccount.reducer
}

export const getSoftwareAccountModuleState = createFeatureSelector<
    SoftwareAccountState
>('fromSoftwareAccount')

export const getApplicationSoftwareAccountState = createSelector(
    getSoftwareAccountModuleState,
    (state: SoftwareAccountState) => state.applicationSoftwareAccount
)
export const getApplicationLoading = createSelector(
    getApplicationSoftwareAccountState,
    fromApplicationSoftwareAccount.getLoading
)
export const getApplicationSoftwareAccounts = createSelector(
    getApplicationSoftwareAccountState,
    fromApplicationSoftwareAccount.getAccounts
)
export const getApplicationSoftwareAccountCount = createSelector(
    getApplicationSoftwareAccountState,
    fromApplicationSoftwareAccount.getAccountsCount
)
export const getApplicationSoftwareAccountsPageParams = createSelector(
    getApplicationSoftwareAccountState,
    fromApplicationSoftwareAccount.getPageParams
)

export const getSystemSoftwareAccountState = createSelector(
    getSoftwareAccountModuleState,
    (state: SoftwareAccountState) => state.systemSoftwareAccount
)
export const getSystemLoading = createSelector(
    getSystemSoftwareAccountState,
    fromSystemSoftwareAccount.getLoading
)
export const getSystemSoftwareAccounts = createSelector(
    getSystemSoftwareAccountState,
    fromSystemSoftwareAccount.getAccounts
)
export const getSystemSoftwareAccountCount = createSelector(
    getSystemSoftwareAccountState,
    fromSystemSoftwareAccount.getAccountsCount
)
export const getSystemSoftwareAccountsPageParams = createSelector(
    getSystemSoftwareAccountState,
    fromSystemSoftwareAccount.getPageParams
)

export const getMiddlewareSoftwareAccountState = createSelector(
    getSoftwareAccountModuleState,
    (state: SoftwareAccountState) => state.middlewareSoftwareAccount
)
export const getMiddlewareLoading = createSelector(
    getMiddlewareSoftwareAccountState,
    fromMiddlewareSoftwareAccount.getLoading
)
export const getMiddlewareSoftwareAccounts = createSelector(
    getMiddlewareSoftwareAccountState,
    fromMiddlewareSoftwareAccount.getAccounts
)
export const getMiddlewareSoftwareAccountCount = createSelector(
    getMiddlewareSoftwareAccountState,
    fromMiddlewareSoftwareAccount.getAccountsCount
)
export const getMiddlewareSoftwareAccountsPageParams = createSelector(
    getMiddlewareSoftwareAccountState,
    fromMiddlewareSoftwareAccount.getPageParams
)
