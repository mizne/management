import { Action } from '@ngrx/store'

import { SoftwareType } from '@core/models/resource-info.model'

export const FETCH_SOFTWARE_TYPES = '[App] Fetch Software Types'
export const FETCH_SOFTWARE_TYPES_SUCCESS = '[App] Fetch Software Types Success'
export const FETCH_SOFTWARE_TYPES_FAILURE = '[App] Fetch Software Types Failure'

export const CREATE_SOFTWARE_TYPE = '[App] Create Software Type'
export const CREATE_SOFTWARE_TYPE_SUCCESS = '[App] Create Software Type Success'
export const CREATE_SOFTWARE_TYPE_FAILURE = '[App] Create Software Type Failure'

export const DELETE_SOFTWARE_TYPE = '[App] Delete Software Type'
export const DELETE_SOFTWARE_TYPE_SUCCESS = '[App] Delete Software Type Success'
export const DELETE_SOFTWARE_TYPE_FAILURE = '[App] Delete Software Type Failure'

export class FetchSoftwareTypesAction implements Action {
    readonly type = FETCH_SOFTWARE_TYPES
}
export class FetchSoftwareTypesSuccessAction implements Action {
    readonly type = FETCH_SOFTWARE_TYPES_SUCCESS
    constructor(public softwareTypes: SoftwareType[]) {}
}
export class FetchSoftwareTypesFailureAction implements Action {
    readonly type = FETCH_SOFTWARE_TYPES_FAILURE
}

export class CreateSoftwareTypeAction implements Action {
    readonly type = CREATE_SOFTWARE_TYPE
    constructor(public payload: SoftwareType) {}
}
export class CreateSoftwareTypeSuccessAction implements Action {
    readonly type = CREATE_SOFTWARE_TYPE_SUCCESS
}
export class CreateSoftwareTypeFailureAction implements Action {
    readonly type = CREATE_SOFTWARE_TYPE_FAILURE
}

export class DeleteSoftwareTypeAction implements Action {
    readonly type = DELETE_SOFTWARE_TYPE
    constructor(public id: string) {}
}
export class DeleteSoftwareTypeSuccessAction implements Action {
    readonly type = DELETE_SOFTWARE_TYPE_SUCCESS
}
export class DeleteSoftwareTypeFailureAction implements Action {
    readonly type = DELETE_SOFTWARE_TYPE_FAILURE
}

export type Actions =
    | FetchSoftwareTypesAction
    | FetchSoftwareTypesSuccessAction
    | FetchSoftwareTypesFailureAction
    | CreateSoftwareTypeAction
    | CreateSoftwareTypeSuccessAction
    | CreateSoftwareTypeFailureAction
    | DeleteSoftwareTypeAction
    | DeleteSoftwareTypeSuccessAction
    | DeleteSoftwareTypeFailureAction
