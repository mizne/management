import { Action } from '@ngrx/store'

import { FieldSettings } from '@core/models/field-settings.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_RESOURCE_FIELD_SETTINGS =
    '[Resource Field Settings] Fetch Resource Field Settings'
export const FETCH_RESOURCE_FIELD_SETTINGS_SUCCESS =
    '[Resource Field Settings] Fetch Resource Field Settings Success'
export const FETCH_RESOURCE_FIELD_SETTINGS_FAILURE =
    '[Resource Field Settings] Fetch Resource Field Settings Failure'

export const FETCH_RESOURCE_FIELD_SETTINGS_COUNT =
    '[Resource Field Settings] Fetch Resource Field Settings Count'
export const FETCH_RESOURCE_FIELD_SETTINGS_COUNT_SUCCESS =
    '[Resource Field Settings] Fetch Resource Field Settings Count Success'
export const FETCH_RESOURCE_FIELD_SETTINGS_COUNT_FAILURE =
    '[Resource Field Settings] Fetch Resource Field Settings Count Failure'

export const ENSURE_PAGE_PARAMS = '[Resource Field Settings] Ensure Page Params'

export class FetchResourceFieldSettingsAction implements Action {
    readonly type = FETCH_RESOURCE_FIELD_SETTINGS
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchResourceFieldSettingsSuccessAction implements Action {
    readonly type = FETCH_RESOURCE_FIELD_SETTINGS_SUCCESS
    constructor(public loggers: FieldSettings[]) {}
}
export class FetchResourceFieldSettingsFailureAction implements Action {
    readonly type = FETCH_RESOURCE_FIELD_SETTINGS_FAILURE
}

export class FetchResourceFieldSettingsCountAction implements Action {
    readonly type = FETCH_RESOURCE_FIELD_SETTINGS_COUNT
    constructor(public searchText: string = '') {}
}
export class FetchResourceFieldSettingsCountSuccessAction implements Action {
    readonly type = FETCH_RESOURCE_FIELD_SETTINGS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchResourceFieldSettingsCountFailureAction implements Action {
    readonly type = FETCH_RESOURCE_FIELD_SETTINGS_COUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchResourceFieldSettingsAction
    | FetchResourceFieldSettingsSuccessAction
    | FetchResourceFieldSettingsFailureAction
    | FetchResourceFieldSettingsCountAction
    | FetchResourceFieldSettingsCountSuccessAction
    | FetchResourceFieldSettingsCountFailureAction
    | EnsurePageParamsAction
