import { Action } from '@ngrx/store'

import { SoftwareSpec } from '@core/models/resource-info.model'

export const FETCH_SOFTWARE_SPECS = '[App] Fetch Software Specs'
export const FETCH_SOFTWARE_SPECS_SUCCESS = '[App] Fetch Software Specs Success'
export const FETCH_SOFTWARE_SPECS_FAILURE = '[App] Fetch Software Specs Failure'

export const CREATE_SOFTWARE_SPEC = '[App] Create Software Spec'
export const CREATE_SOFTWARE_SPEC_SUCCESS = '[App] Create Software Spec Success'
export const CREATE_SOFTWARE_SPEC_FAILURE = '[App] Create Software Spec Failure'

export const DELETE_SOFTWARE_SPEC = '[App] Delete Software Spec'
export const DELETE_SOFTWARE_SPEC_SUCCESS = '[App] Delete Software Spec Success'
export const DELETE_SOFTWARE_SPEC_FAILURE = '[App] Delete Software Spec Failure'

export class FetchSoftwareSpecsAction implements Action {
    readonly type = FETCH_SOFTWARE_SPECS
}
export class FetchSoftwareSpecsSuccessAction implements Action {
    readonly type = FETCH_SOFTWARE_SPECS_SUCCESS
    constructor(public softwareSpecs: SoftwareSpec[]) {}
}
export class FetchSoftwareSpecsFailureAction implements Action {
    readonly type = FETCH_SOFTWARE_SPECS_FAILURE
}

export class CreateSoftwareSpecAction implements Action {
    readonly type = CREATE_SOFTWARE_SPEC
    constructor(public payload: SoftwareSpec) {}
}
export class CreateSoftwareSpecSuccessAction implements Action {
    readonly type = CREATE_SOFTWARE_SPEC_SUCCESS
}
export class CreateSoftwareSpecFailureAction implements Action {
    readonly type = CREATE_SOFTWARE_SPEC_FAILURE
}

export class DeleteSoftwareSpecAction implements Action {
    readonly type = DELETE_SOFTWARE_SPEC
    constructor(public id: string) {}
}
export class DeleteSoftwareSpecSuccessAction implements Action {
    readonly type = DELETE_SOFTWARE_SPEC_SUCCESS
}
export class DeleteSoftwareSpecFailureAction implements Action {
    readonly type = DELETE_SOFTWARE_SPEC_FAILURE
}

export type Actions =
    | FetchSoftwareSpecsAction
    | FetchSoftwareSpecsSuccessAction
    | FetchSoftwareSpecsFailureAction
    | CreateSoftwareSpecAction
    | CreateSoftwareSpecSuccessAction
    | CreateSoftwareSpecFailureAction
    | DeleteSoftwareSpecAction
    | DeleteSoftwareSpecSuccessAction
    | DeleteSoftwareSpecFailureAction
