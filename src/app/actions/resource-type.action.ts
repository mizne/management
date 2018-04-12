import { Action } from '@ngrx/store'

import { ResourceType } from '@core/models/resource-info.model'

export const FETCH_RESOURCE_TYPES = '[App] Fetch Resource Types'
export const FETCH_RESOURCE_TYPES_SUCCESS = '[App] Fetch Resource Types Success'
export const FETCH_RESOURCE_TYPES_FAILURE = '[App] Fetch Resource Types Failure'

export const CREATE_RESOURCE_TYPE = '[App] Create Resource Type'
export const CREATE_RESOURCE_TYPE_SUCCESS = '[App] Create Resource Type Success'
export const CREATE_RESOURCE_TYPE_FAILURE = '[App] Create Resource Type Failure'

export const DELETE_RESOURCE_TYPE = '[App] Delete Resource Type'
export const DELETE_RESOURCE_TYPE_SUCCESS = '[App] Delete Resource Type Success'
export const DELETE_RESOURCE_TYPE_FAILURE = '[App] Delete Resource Type Failure'

export class FetchResourceTypesAction implements Action {
    readonly type = FETCH_RESOURCE_TYPES
}
export class FetchResourceTypesSuccessAction implements Action {
    readonly type = FETCH_RESOURCE_TYPES_SUCCESS
    constructor(public resourceTypes: ResourceType[]) {}
}
export class FetchResourceTypesFailureAction implements Action {
    readonly type = FETCH_RESOURCE_TYPES_FAILURE
}

export class CreateResourceTypeAction implements Action {
    readonly type = CREATE_RESOURCE_TYPE
    constructor(public payload: ResourceType) {}
}
export class CreateResourceTypeSuccessAction implements Action {
    readonly type = CREATE_RESOURCE_TYPE_SUCCESS
}
export class CreateResourceTypeFailureAction implements Action {
    readonly type = CREATE_RESOURCE_TYPE_FAILURE
}

export class DeleteResourceTypeAction implements Action {
    readonly type = DELETE_RESOURCE_TYPE
    constructor(public id: string) {}
}
export class DeleteResourceTypeSuccessAction implements Action {
    readonly type = DELETE_RESOURCE_TYPE_SUCCESS
}
export class DeleteResourceTypeFailureAction implements Action {
    readonly type = DELETE_RESOURCE_TYPE_FAILURE
}

export type Actions =
    | FetchResourceTypesAction
    | FetchResourceTypesSuccessAction
    | FetchResourceTypesFailureAction
    | CreateResourceTypeAction
    | CreateResourceTypeSuccessAction
    | CreateResourceTypeFailureAction
    | DeleteResourceTypeAction
    | DeleteResourceTypeSuccessAction
    | DeleteResourceTypeFailureAction
