import { Action } from '@ngrx/store'

import { SystemLogger } from '@core/models/software-account.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_APPLICATION_SOFTWARE_ACCOUNTS =
    '[Application Software Account] Fetch Application Software Account'
export const FETCH_APPLICATION_SOFTWARE_ACCOUNTS_SUCCESS =
    '[Application Software Account] Fetch Application Software Account Success'
export const FETCH_APPLICATION_SOFTWARE_ACCOUNTS_FAILURE =
    '[Application Software Account] Fetch Application Software Account Failure'

export const FETCH_APPLICATION_SOFTWARE_ACCOUNTS_COUNT =
    '[Application Software Account] Fetch Application Software Account Count'
export const FETCH_APPLICATION_SOFTWARE_ACCOUNTS_COUNT_SUCCESS =
    '[Application Software Account] Fetch Application Software Account Count Success'
export const FETCH_APPLICATION_SOFTWARE_ACCOUNTS_COUNT_FAILURE =
    '[Application Software Account] Fetch Application Software Account Count Failure'

export const CREATE_APPLICATION_SOFTWARE_ACCOUNT =
    '[Application Software Account] Create Application Software Account'
export const CREATE_APPLICATION_SOFTWARE_ACCOUNT_SUCCESS =
    '[Application Software Account] Create Application Software Account Success'
export const CREATE_APPLICATION_SOFTWARE_ACCOUNT_FAILURE =
    '[Application Software Account] Create Application Software Account Failure'

export const EDIT_APPLICATION_SOFTWARE_ACCOUNT =
    '[Application Software Account] Edit Application Software Account'
export const EDIT_APPLICATION_SOFTWARE_ACCOUNT_SUCCESS =
    '[Application Software Account] Edit Application Software Account Success'
export const EDIT_APPLICATION_SOFTWARE_ACCOUNT_FAILURE =
    '[Application Software Account] Edit Application Software Account Failure'

export const ENSURE_PAGE_PARAMS =
    '[Application Software Account] Ensure Page Params'

export class FetchApplicationSoftwareAccountsAction implements Action {
    readonly type = FETCH_APPLICATION_SOFTWARE_ACCOUNTS
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchApplicationSoftwareAccountsSuccessAction implements Action {
    readonly type = FETCH_APPLICATION_SOFTWARE_ACCOUNTS_SUCCESS
    constructor(public applicationSoftwareAccounts: SystemLogger[]) {}
}
export class FetchApplicationSoftwareAccountsFailureAction implements Action {
    readonly type = FETCH_APPLICATION_SOFTWARE_ACCOUNTS_FAILURE
}

export class FetchApplicationSoftwareAccountsCountAction implements Action {
    readonly type = FETCH_APPLICATION_SOFTWARE_ACCOUNTS_COUNT
    constructor(public searchText: string = '') {}
}
export class FetchApplicationSoftwareAccountsCountSuccessAction
    implements Action {
    readonly type = FETCH_APPLICATION_SOFTWARE_ACCOUNTS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchApplicationSoftwareAccountsCountFailureAction
    implements Action {
    readonly type = FETCH_APPLICATION_SOFTWARE_ACCOUNTS_COUNT_FAILURE
}

export class CreateApplicationSoftwareAccountAction implements Action {
    readonly type = CREATE_APPLICATION_SOFTWARE_ACCOUNT
    constructor(public account: SystemLogger) {}
}
export class CreateApplicationSoftwareAccountSuccessAction implements Action {
    readonly type = CREATE_APPLICATION_SOFTWARE_ACCOUNT_SUCCESS
}
export class CreateApplicationSoftwareAccountFailureAction implements Action {
    readonly type = CREATE_APPLICATION_SOFTWARE_ACCOUNT_FAILURE
}

export class EditApplicationSoftwareAccountAction implements Action {
    readonly type = EDIT_APPLICATION_SOFTWARE_ACCOUNT
    constructor(public account: SystemLogger) {}
}
export class EditApplicationSoftwareAccountSuccessAction implements Action {
    readonly type = EDIT_APPLICATION_SOFTWARE_ACCOUNT_SUCCESS
}
export class EditApplicationSoftwareAccountFailureAction implements Action {
    readonly type = EDIT_APPLICATION_SOFTWARE_ACCOUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchApplicationSoftwareAccountsAction
    | FetchApplicationSoftwareAccountsSuccessAction
    | FetchApplicationSoftwareAccountsFailureAction
    | FetchApplicationSoftwareAccountsCountAction
    | FetchApplicationSoftwareAccountsCountSuccessAction
    | FetchApplicationSoftwareAccountsCountFailureAction
    | CreateApplicationSoftwareAccountAction
    | CreateApplicationSoftwareAccountSuccessAction
    | CreateApplicationSoftwareAccountFailureAction
    | EditApplicationSoftwareAccountAction
    | EditApplicationSoftwareAccountSuccessAction
    | EditApplicationSoftwareAccountFailureAction
    | EnsurePageParamsAction
