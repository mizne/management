import { Action } from '@ngrx/store'

import { VirtualServerAccount } from '@core/models/server-account.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_VIRTUAL_SERVER_ACCOUNTS =
    '[Virtual Server Account] Fetch Virtual Server Account'
export const FETCH_VIRTUAL_SERVER_ACCOUNTS_SUCCESS =
    '[Virtual Server Account] Fetch Virtual Server Account Success'
export const FETCH_VIRTUAL_SERVER_ACCOUNTS_FAILURE =
    '[Virtual Server Account] Fetch Virtual Server Account Failure'

export const FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT =
    '[Virtual Server Account] Fetch Virtual Server Account Count'
export const FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT_SUCCESS =
    '[Virtual Server Account] Fetch Virtual Server Account Count Success'
export const FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT_FAILURE =
    '[Virtual Server Account] Fetch Virtual Server Account Count Failure'

export const CREATE_VIRTUAL_SERVER_ACCOUNT =
    '[Virtual Server Account] Create Virtual Server Account'
export const CREATE_VIRTUAL_SERVER_ACCOUNT_SUCCESS =
    '[Virtual Server Account] Create Virtual Server Account Success'
export const CREATE_VIRTUAL_SERVER_ACCOUNT_FAILURE =
    '[Virtual Server Account] Create Virtual Server Account Failure'

export const EDIT_VIRTUAL_SERVER_ACCOUNT =
    '[Virtual Server Account] Edit Virtual Server Account'
export const EDIT_VIRTUAL_SERVER_ACCOUNT_SUCCESS =
    '[Virtual Server Account] Edit Virtual Server Account Success'
export const EDIT_VIRTUAL_SERVER_ACCOUNT_FAILURE =
    '[Virtual Server Account] Edit Virtual Server Account Failure'

export const ENSURE_PAGE_PARAMS = '[Virtual Server Account] Ensure Page Params'

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
    constructor(public searchText = '') {}
}
export class FetchVirtualServerAccountsCountSuccessAction implements Action {
    readonly type = FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchVirtualServerAccountsCountFailureAction implements Action {
    readonly type = FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT_FAILURE
}

export class CreateVirtualServerAccountAction implements Action {
    readonly type = CREATE_VIRTUAL_SERVER_ACCOUNT
    constructor(public account: VirtualServerAccount) {}
}
export class CreateVirtualServerAccountSuccessAction implements Action {
    readonly type = CREATE_VIRTUAL_SERVER_ACCOUNT_SUCCESS
}
export class CreateVirtualServerAccountFailureAction implements Action {
    readonly type = CREATE_VIRTUAL_SERVER_ACCOUNT_FAILURE
}

export class EditVirtualServerAccountAction implements Action {
    readonly type = EDIT_VIRTUAL_SERVER_ACCOUNT
    constructor(public account: VirtualServerAccount) {}
}
export class EditVirtualServerAccountSuccessAction implements Action {
    readonly type = EDIT_VIRTUAL_SERVER_ACCOUNT_SUCCESS
}
export class EditVirtualServerAccountFailureAction implements Action {
    readonly type = EDIT_VIRTUAL_SERVER_ACCOUNT_FAILURE
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
