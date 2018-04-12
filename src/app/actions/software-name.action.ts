import { Action } from '@ngrx/store'

import { SoftwareName } from '@core/models/resource-info.model'

export const FETCH_SOFTWARE_NAMES = '[App] Fetch Software Names'
export const FETCH_SOFTWARE_NAMES_SUCCESS = '[App] Fetch Software Names Success'
export const FETCH_SOFTWARE_NAMES_FAILURE = '[App] Fetch Software Names Failure'

export const CREATE_SOFTWARE_NAME = '[App] Create Software Name'
export const CREATE_SOFTWARE_NAME_SUCCESS = '[App] Create Software Name Success'
export const CREATE_SOFTWARE_NAME_FAILURE = '[App] Create Software Name Failure'

export const DELETE_SOFTWARE_NAME = '[App] Delete Software Name'
export const DELETE_SOFTWARE_NAME_SUCCESS = '[App] Delete Software Name Success'
export const DELETE_SOFTWARE_NAME_FAILURE = '[App] Delete Software Name Failure'

export class FetchSoftwareNamesAction implements Action {
    readonly type = FETCH_SOFTWARE_NAMES
}
export class FetchSoftwareNamesSuccessAction implements Action {
    readonly type = FETCH_SOFTWARE_NAMES_SUCCESS
    constructor(public softwareNames: SoftwareName[]) {}
}
export class FetchSoftwareNamesFailureAction implements Action {
    readonly type = FETCH_SOFTWARE_NAMES_FAILURE
}

export class CreateSoftwareNameAction implements Action {
    readonly type = CREATE_SOFTWARE_NAME
    constructor(public payload: SoftwareName) {}
}
export class CreateSoftwareNameSuccessAction implements Action {
    readonly type = CREATE_SOFTWARE_NAME_SUCCESS
}
export class CreateSoftwareNameFailureAction implements Action {
    readonly type = CREATE_SOFTWARE_NAME_FAILURE
}

export class DeleteSoftwareNameAction implements Action {
    readonly type = DELETE_SOFTWARE_NAME
    constructor(public id: string) {}
}
export class DeleteSoftwareNameSuccessAction implements Action {
    readonly type = DELETE_SOFTWARE_NAME_SUCCESS
}
export class DeleteSoftwareNameFailureAction implements Action {
    readonly type = DELETE_SOFTWARE_NAME_FAILURE
}

export type Actions =
    | FetchSoftwareNamesAction
    | FetchSoftwareNamesSuccessAction
    | FetchSoftwareNamesFailureAction
    | CreateSoftwareNameAction
    | CreateSoftwareNameSuccessAction
    | CreateSoftwareNameFailureAction
    | DeleteSoftwareNameAction
    | DeleteSoftwareNameSuccessAction
    | DeleteSoftwareNameFailureAction
