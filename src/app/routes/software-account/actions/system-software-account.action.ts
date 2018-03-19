import { Action } from '@ngrx/store'

import { SystemSoftwareAccount } from '@core/models/software-account.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_SYSTEM_SOFTWARE_ACCOUNTS =
    '[System Software Account] Fetch System Software Account'
export const FETCH_SYSTEM_SOFTWARE_ACCOUNTS_SUCCESS =
    '[System Software Account] Fetch System Software Account Success'
export const FETCH_SYSTEM_SOFTWARE_ACCOUNTS_FAILURE =
    '[System Software Account] Fetch System Software Account Failure'

export const FETCH_SYSTEM_SOFTWARE_ACCOUNTS_COUNT =
    '[System Software Account] Fetch System Software Account Count'
export const FETCH_SYSTEM_SOFTWARE_ACCOUNTS_COUNT_SUCCESS =
    '[System Software Account] Fetch System Software Account Count Success'
export const FETCH_SYSTEM_SOFTWARE_ACCOUNTS_COUNT_FAILURE =
    '[System Software Account] Fetch System Software Account Count Failure'

export const CREATE_SYSTEM_SOFTWARE_ACCOUNT =
    '[System Software Account] Create System Software Account'
export const CREATE_SYSTEM_SOFTWARE_ACCOUNT_SUCCESS =
    '[System Software Account] Create System Software Account Success'
export const CREATE_SYSTEM_SOFTWARE_ACCOUNT_FAILURE =
    '[System Software Account] Create System Software Account Failure'

export const EDIT_SYSTEM_SOFTWARE_ACCOUNT =
    '[System Software Account] Edit System Software Account'
export const EDIT_SYSTEM_SOFTWARE_ACCOUNT_SUCCESS =
    '[System Software Account] Edit System Software Account Success'
export const EDIT_SYSTEM_SOFTWARE_ACCOUNT_FAILURE =
    '[System Software Account] Edit System Software Account Failure'

export const ENSURE_PAGE_PARAMS = '[System Software Account] Ensure Page Params'

export class FetchSystemSoftwareAccountsAction implements Action {
    readonly type = FETCH_SYSTEM_SOFTWARE_ACCOUNTS
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchSystemSoftwareAccountsSuccessAction implements Action {
    readonly type = FETCH_SYSTEM_SOFTWARE_ACCOUNTS_SUCCESS
    constructor(public systemSoftwareAccounts: SystemSoftwareAccount[]) {}
}
export class FetchSystemSoftwareAccountsFailureAction implements Action {
    readonly type = FETCH_SYSTEM_SOFTWARE_ACCOUNTS_FAILURE
}

export class FetchSystemSoftwareAccountsCountAction implements Action {
    readonly type = FETCH_SYSTEM_SOFTWARE_ACCOUNTS_COUNT
    constructor(public searchText: string = '') {}
}
export class FetchSystemSoftwareAccountsCountSuccessAction implements Action {
    readonly type = FETCH_SYSTEM_SOFTWARE_ACCOUNTS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchSystemSoftwareAccountsCountFailureAction implements Action {
    readonly type = FETCH_SYSTEM_SOFTWARE_ACCOUNTS_COUNT_FAILURE
}

export class CreateSystemSoftwareAccountAction implements Action {
    readonly type = CREATE_SYSTEM_SOFTWARE_ACCOUNT
    constructor(public account: SystemSoftwareAccount) {}
}
export class CreateSystemSoftwareAccountSuccessAction implements Action {
    readonly type = CREATE_SYSTEM_SOFTWARE_ACCOUNT_SUCCESS
}
export class CreateSystemSoftwareAccountFailureAction implements Action {
    readonly type = CREATE_SYSTEM_SOFTWARE_ACCOUNT_FAILURE
}

export class EditSystemSoftwareAccountAction implements Action {
    readonly type = EDIT_SYSTEM_SOFTWARE_ACCOUNT
    constructor(public account: SystemSoftwareAccount) {}
}
export class EditSystemSoftwareAccountSuccessAction implements Action {
    readonly type = EDIT_SYSTEM_SOFTWARE_ACCOUNT_SUCCESS
}
export class EditSystemSoftwareAccountFailureAction implements Action {
    readonly type = EDIT_SYSTEM_SOFTWARE_ACCOUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchSystemSoftwareAccountsAction
    | FetchSystemSoftwareAccountsSuccessAction
    | FetchSystemSoftwareAccountsFailureAction
    | FetchSystemSoftwareAccountsCountAction
    | FetchSystemSoftwareAccountsCountSuccessAction
    | FetchSystemSoftwareAccountsCountFailureAction
    | CreateSystemSoftwareAccountAction
    | CreateSystemSoftwareAccountSuccessAction
    | CreateSystemSoftwareAccountFailureAction
    | EditSystemSoftwareAccountAction
    | EditSystemSoftwareAccountSuccessAction
    | EditSystemSoftwareAccountFailureAction
    | EnsurePageParamsAction
