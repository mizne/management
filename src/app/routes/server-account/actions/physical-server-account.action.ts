import { Action } from '@ngrx/store'

import { PhysicalServerAccount } from '@core/models/server-account.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_PHYSICAL_SERVER_ACCOUNTS =
    '[Physical Server Account] Fetch Physical Server Account'
export const FETCH_PHYSICAL_SERVER_ACCOUNTS_SUCCESS =
    '[Physical Server Account] Fetch Physical Server Account Success'
export const FETCH_PHYSICAL_SERVER_ACCOUNTS_FAILURE =
    '[Physical Server Account] Fetch Physical Server Account Failure'

export const FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT =
    '[Physical Server Account] Fetch Physical Server Account Count'
export const FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT_SUCCESS =
    '[Physical Server Account] Fetch Physical Server Account Count Success'
export const FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT_FAILURE =
    '[Physical Server Account] Fetch Physical Server Account Count Failure'

export const CREATE_PHYSICAL_SERVER_ACCOUNT =
    '[Physical Server Account] Create Physical Server Account'
export const CREATE_PHYSICAL_SERVER_ACCOUNT_SUCCESS =
    '[Physical Server Account] Create Physical Server Account Success'
export const CREATE_PHYSICAL_SERVER_ACCOUNT_FAILURE =
    '[Physical Server Account] Create Physical Server Account Failure'

export const EDIT_PHYSICAL_SERVER_ACCOUNT =
    '[Physical Server Account] Edit Physical Server Account'
export const EDIT_PHYSICAL_SERVER_ACCOUNT_SUCCESS =
    '[Physical Server Account] Edit Physical Server Account Success'
export const EDIT_PHYSICAL_SERVER_ACCOUNT_FAILURE =
    '[Physical Server Account] Edit Physical Server Account Failure'

export const ENSURE_PAGE_PARAMS = '[Physical Server Account] Ensure Page Params'

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
    constructor(public searchText = '') {}
}
export class FetchPhysicalServerAccountsCountSuccessAction implements Action {
    readonly type = FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchPhysicalServerAccountsCountFailureAction implements Action {
    readonly type = FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT_FAILURE
}

export class CreatePhysicalServerAccountAction implements Action {
    readonly type = CREATE_PHYSICAL_SERVER_ACCOUNT
    constructor(public account: PhysicalServerAccount) {}
}
export class CreatePhysicalServerAccountSuccessAction implements Action {
    readonly type = CREATE_PHYSICAL_SERVER_ACCOUNT_SUCCESS
}
export class CreatePhysicalServerAccountFailureAction implements Action {
    readonly type = CREATE_PHYSICAL_SERVER_ACCOUNT_FAILURE
}

export class EditPhysicalServerAccountAction implements Action {
    readonly type = EDIT_PHYSICAL_SERVER_ACCOUNT
    constructor(public account: PhysicalServerAccount) {}
}
export class EditPhysicalServerAccountSuccessAction implements Action {
    readonly type = EDIT_PHYSICAL_SERVER_ACCOUNT_SUCCESS
}
export class EditPhysicalServerAccountFailureAction implements Action {
    readonly type = EDIT_PHYSICAL_SERVER_ACCOUNT_FAILURE
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
