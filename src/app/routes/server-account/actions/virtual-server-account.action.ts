import { Action } from '@ngrx/store'

import { VirtualServerAccount } from '@core/models/server-account.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_VIRTUAL_SERVER_ACCOUNTS =
    '[Server Account] Fetch Virtual Server Account'
export const FETCH_VIRTUAL_SERVER_ACCOUNTS_SUCCESS =
    '[Server Account] Fetch Virtual Server Account Success'
export const FETCH_VIRTUAL_SERVER_ACCOUNTS_FAILURE =
    '[Server Account] Fetch Virtual Server Account Failure'

export const FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT =
    '[Server Account] Fetch Virtual Server Account Count'
export const FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT_SUCCESS =
    '[Server Account] Fetch Virtual Server Account Count Success'
export const FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT_FAILURE =
    '[Server Account] Fetch Virtual Server Account Count Failure'

export const ENSURE_PAGE_PARAMS = '[Server Account] Ensure Page Params'

export class FetchVirtualServerAccountsAction implements Action {
    readonly type = FETCH_VIRTUAL_SERVER_ACCOUNTS
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchVirtualServerAccountsSuccessAction implements Action {
    readonly type = FETCH_VIRTUAL_SERVER_ACCOUNTS_SUCCESS
    constructor(public virtualServerAccounts: VirtualServerAccount[]) {}
}
export class FetchVirtualServerAccountsFailureAction implements Action {
    readonly type = FETCH_VIRTUAL_SERVER_ACCOUNTS_FAILURE
}

export class FetchVirtualServerAccountsCountAction implements Action {
    readonly type = FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT
}
export class FetchVirtualServerAccountsCountSuccessAction implements Action {
    readonly type = FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchVirtualServerAccountsCountFailureAction implements Action {
    readonly type = FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchVirtualServerAccountsAction
    | FetchVirtualServerAccountsSuccessAction
    | FetchVirtualServerAccountsFailureAction
    | FetchVirtualServerAccountsCountAction
    | FetchVirtualServerAccountsCountSuccessAction
    | FetchVirtualServerAccountsCountFailureAction
    | EnsurePageParamsAction
