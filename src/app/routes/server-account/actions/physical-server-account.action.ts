import { Action } from '@ngrx/store'

import { PhysicalServerAccount } from '@core/models/server-account.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_PHYSICAL_SERVER_ACCOUNTS =
    '[Server Account] Fetch Physical Server Account'
export const FETCH_PHYSICAL_SERVER_ACCOUNTS_SUCCESS =
    '[Server Account] Fetch Physical Server Account Success'
export const FETCH_PHYSICAL_SERVER_ACCOUNTS_FAILURE =
    '[Server Account] Fetch Physical Server Account Failure'

export const FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT =
    '[Server Account] Fetch Physical Server Account Count'
export const FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT_SUCCESS =
    '[Server Account] Fetch Physical Server Account Count Success'
export const FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT_FAILURE =
    '[Server Account] Fetch Physical Server Account Count Failure'

export const ENSURE_PAGE_PARAMS = '[Server Account] Ensure Page Params'

export class FetchPhysicalServerAccountsAction implements Action {
    readonly type = FETCH_PHYSICAL_SERVER_ACCOUNTS
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchPhysicalServerAccountsSuccessAction implements Action {
    readonly type = FETCH_PHYSICAL_SERVER_ACCOUNTS_SUCCESS
    constructor(public physicalServerAccounts: PhysicalServerAccount[]) {}
}
export class FetchPhysicalServerAccountsFailureAction implements Action {
    readonly type = FETCH_PHYSICAL_SERVER_ACCOUNTS_FAILURE
}

export class FetchPhysicalServerAccountsCountAction implements Action {
    readonly type = FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT
}
export class FetchPhysicalServerAccountsCountSuccessAction implements Action {
    readonly type = FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchPhysicalServerAccountsCountFailureAction implements Action {
    readonly type = FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchPhysicalServerAccountsAction
    | FetchPhysicalServerAccountsSuccessAction
    | FetchPhysicalServerAccountsFailureAction
    | FetchPhysicalServerAccountsCountAction
    | FetchPhysicalServerAccountsCountSuccessAction
    | FetchPhysicalServerAccountsCountFailureAction
    | EnsurePageParamsAction
