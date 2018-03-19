import { Action } from '@ngrx/store'

import { ClusterServerAccount } from '@core/models/server-account.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_CLUSTER_SERVER_ACCOUNTS =
    '[Server Account] Fetch Cluster Server Account'
export const FETCH_CLUSTER_SERVER_ACCOUNTS_SUCCESS =
    '[Server Account] Fetch Cluster Server Account Success'
export const FETCH_CLUSTER_SERVER_ACCOUNTS_FAILURE =
    '[Server Account] Fetch Cluster Server Account Failure'

export const FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT =
    '[Server Account] Fetch Cluster Server Account Count'
export const FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT_SUCCESS =
    '[Server Account] Fetch Cluster Server Account Count Success'
export const FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT_FAILURE =
    '[Server Account] Fetch Cluster Server Account Count Failure'

export const ENSURE_PAGE_PARAMS = '[Server Account] Ensure Page Params'

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
}
export class FetchClusterServerAccountsCountSuccessAction implements Action {
    readonly type = FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchClusterServerAccountsCountFailureAction implements Action {
    readonly type = FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT_FAILURE
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
    | EnsurePageParamsAction
