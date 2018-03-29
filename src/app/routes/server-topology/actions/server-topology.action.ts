import { Action } from '@ngrx/store'

import { ClusterServerAccount } from '@core/models/server-account.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_CLUSTER_SERVER_ACCOUNTS =
    '[Cluster Server Account] Fetch Cluster Server Account'
export const FETCH_CLUSTER_SERVER_ACCOUNTS_SUCCESS =
    '[Cluster Server Account] Fetch Cluster Server Account Success'
export const FETCH_CLUSTER_SERVER_ACCOUNTS_FAILURE =
    '[Cluster Server Account] Fetch Cluster Server Account Failure'

export const FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT =
    '[Cluster Server Account] Fetch Cluster Server Account Count'
export const FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT_SUCCESS =
    '[Cluster Server Account] Fetch Cluster Server Account Count Success'
export const FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT_FAILURE =
    '[Cluster Server Account] Fetch Cluster Server Account Count Failure'

export const CREATE_CLUSTER_SERVER_ACCOUNT =
    '[Cluster Server Account] Create Cluster Server Account'
export const CREATE_CLUSTER_SERVER_ACCOUNT_SUCCESS =
    '[Cluster Server Account] Create Cluster Server Account Success'
export const CREATE_CLUSTER_SERVER_ACCOUNT_FAILURE =
    '[Cluster Server Account] Create Cluster Server Account Failure'

export const EDIT_CLUSTER_SERVER_ACCOUNT =
    '[Cluster Server Account] Edit Cluster Server Account'
export const EDIT_CLUSTER_SERVER_ACCOUNT_SUCCESS =
    '[Cluster Server Account] Edit Cluster Server Account Success'
export const EDIT_CLUSTER_SERVER_ACCOUNT_FAILURE =
    '[Cluster Server Account] Edit Cluster Server Account Failure'

export const ENSURE_PAGE_PARAMS = '[Cluster Server Account] Ensure Page Params'

export class FetchClusterServerAccountsAction implements Action {
    readonly type = FETCH_CLUSTER_SERVER_ACCOUNTS
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchClusterServerAccountsSuccessAction implements Action {
    readonly type = FETCH_CLUSTER_SERVER_ACCOUNTS_SUCCESS
    constructor(public clusterServerAccounts: ClusterServerAccount[]) {}
}
export class FetchClusterServerAccountsFailureAction implements Action {
    readonly type = FETCH_CLUSTER_SERVER_ACCOUNTS_FAILURE
}

export class FetchClusterServerAccountsCountAction implements Action {
    readonly type = FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT
    constructor(public searchText = '') {}
}
export class FetchClusterServerAccountsCountSuccessAction implements Action {
    readonly type = FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchClusterServerAccountsCountFailureAction implements Action {
    readonly type = FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT_FAILURE
}

export class CreateClusterServerAccountAction implements Action {
    readonly type = CREATE_CLUSTER_SERVER_ACCOUNT
    constructor(public account: ClusterServerAccount) {}
}
export class CreateClusterServerAccountSuccessAction implements Action {
    readonly type = CREATE_CLUSTER_SERVER_ACCOUNT_SUCCESS
}
export class CreateClusterServerAccountFailureAction implements Action {
    readonly type = CREATE_CLUSTER_SERVER_ACCOUNT_FAILURE
}

export class EditClusterServerAccountAction implements Action {
    readonly type = EDIT_CLUSTER_SERVER_ACCOUNT
    constructor(public account: ClusterServerAccount) {}
}
export class EditClusterServerAccountSuccessAction implements Action {
    readonly type = EDIT_CLUSTER_SERVER_ACCOUNT_SUCCESS
}
export class EditClusterServerAccountFailureAction implements Action {
    readonly type = EDIT_CLUSTER_SERVER_ACCOUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchClusterServerAccountsAction
    | FetchClusterServerAccountsSuccessAction
    | FetchClusterServerAccountsFailureAction
    | FetchClusterServerAccountsCountAction
    | FetchClusterServerAccountsCountSuccessAction
    | FetchClusterServerAccountsCountFailureAction
    | CreateClusterServerAccountAction
    | CreateClusterServerAccountSuccessAction
    | CreateClusterServerAccountFailureAction
    | EditClusterServerAccountAction
    | EditClusterServerAccountSuccessAction
    | EditClusterServerAccountFailureAction
    | EnsurePageParamsAction
