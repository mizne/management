import { Action } from '@ngrx/store'

import { MiddlewareSoftwareAccount } from '@core/models/software-account.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS =
    '[Software Account] Fetch Middleware Software Account'
export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_SUCCESS =
    '[Software Account] Fetch Middleware Software Account Success'
export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_FAILURE =
    '[Software Account] Fetch Middleware Software Account Failure'

export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_COUNT =
    '[Software Account] Fetch Middleware Software Account Count'
export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_COUNT_SUCCESS =
    '[Software Account] Fetch Middleware Software Account Count Success'
export const FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_COUNT_FAILURE =
    '[Software Account] Fetch Middleware Software Account Count Failure'

export const CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT =
    '[Software Account] Create Middleware Software Account'
export const CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT_SUCCESS =
    '[Software Account] Create Middleware Software Account Success'
export const CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT_FAILURE =
    '[Software Account] Create Middleware Software Account Failure'

export const EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT =
    '[Software Account] Edit Middleware Software Account'
export const EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT_SUCCESS =
    '[Software Account] Edit Middleware Software Account Success'
export const EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT_FAILURE =
    '[Software Account] Edit Middleware Software Account Failure'

export const ENSURE_PAGE_PARAMS = '[Software Account] Ensure Page Params'

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
