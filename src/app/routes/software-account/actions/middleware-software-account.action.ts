import { Action } from '@ngrx/store'

import { MiddlewareSoftwareAccount } from '@core/models/software-account.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS =
    '[Middleware Software Account] Fetch Middleware Software Account'
export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_SUCCESS =
    '[Middleware Software Account] Fetch Middleware Software Account Success'
export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_FAILURE =
    '[Middleware Software Account] Fetch Middleware Software Account Failure'

export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_COUNT =
    '[Middleware Software Account] Fetch Middleware Software Account Count'
export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_COUNT_SUCCESS =
    '[Middleware Software Account] Fetch Middleware Software Account Count Success'
export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_COUNT_FAILURE =
    '[Middleware Software Account] Fetch Middleware Software Account Count Failure'

export const CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT =
    '[Middleware Software Account] Create Middleware Software Account'
export const CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT_SUCCESS =
    '[Middleware Software Account] Create Middleware Software Account Success'
export const CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT_FAILURE =
    '[Middleware Software Account] Create Middleware Software Account Failure'

export const EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT =
    '[Middleware Software Account] Edit Middleware Software Account'
export const EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT_SUCCESS =
    '[Middleware Software Account] Edit Middleware Software Account Success'
export const EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT_FAILURE =
    '[Middleware Software Account] Edit Middleware Software Account Failure'

export const ENSURE_PAGE_PARAMS =
    '[Middleware Software Account] Ensure Page Params'

export class FetchMiddlewareSoftwareAccountsAction implements Action {
    readonly type = FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchMiddlewareSoftwareAccountsSuccessAction implements Action {
    readonly type = FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_SUCCESS
    constructor(
        public middlewareSoftwareAccounts: MiddlewareSoftwareAccount[]
    ) {}
}
export class FetchMiddlewareSoftwareAccountsFailureAction implements Action {
    readonly type = FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_FAILURE
}

export class FetchMiddlewareSoftwareAccountsCountAction implements Action {
    readonly type = FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_COUNT
    constructor(public searchText: string = '') {}
}
export class FetchMiddlewareSoftwareAccountsCountSuccessAction
    implements Action {
    readonly type = FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchMiddlewareSoftwareAccountsCountFailureAction
    implements Action {
    readonly type = FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_COUNT_FAILURE
}

export class CreateMiddlewareSoftwareAccountAction implements Action {
    readonly type = CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT
    constructor(public account: MiddlewareSoftwareAccount) {}
}
export class CreateMiddlewareSoftwareAccountSuccessAction implements Action {
    readonly type = CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT_SUCCESS
}
export class CreateMiddlewareSoftwareAccountFailureAction implements Action {
    readonly type = CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT_FAILURE
}

export class EditMiddlewareSoftwareAccountAction implements Action {
    readonly type = EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT
    constructor(public account: MiddlewareSoftwareAccount) {}
}
export class EditMiddlewareSoftwareAccountSuccessAction implements Action {
    readonly type = EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT_SUCCESS
}
export class EditMiddlewareSoftwareAccountFailureAction implements Action {
    readonly type = EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchMiddlewareSoftwareAccountsAction
    | FetchMiddlewareSoftwareAccountsSuccessAction
    | FetchMiddlewareSoftwareAccountsFailureAction
    | FetchMiddlewareSoftwareAccountsCountAction
    | FetchMiddlewareSoftwareAccountsCountSuccessAction
    | FetchMiddlewareSoftwareAccountsCountFailureAction
    | CreateMiddlewareSoftwareAccountAction
    | CreateMiddlewareSoftwareAccountSuccessAction
    | CreateMiddlewareSoftwareAccountFailureAction
    | EditMiddlewareSoftwareAccountAction
    | EditMiddlewareSoftwareAccountSuccessAction
    | EditMiddlewareSoftwareAccountFailureAction
    | EnsurePageParamsAction
