import { Action } from '@ngrx/store'

import { UseEnvironment } from '@core/models/resource-info.model'

export const FETCH_USE_ENVIRONMENTS = '[App] Fetch Use Environments'
export const FETCH_USE_ENVIRONMENTS_SUCCESS =
    '[App] Fetch Use Environments Success'
export const FETCH_USE_ENVIRONMENTS_FAILURE =
    '[App] Fetch Use Environments Failure'

export const CREATE_USE_ENVIRONMENT = '[App] Create Use Environment'
export const CREATE_USE_ENVIRONMENT_SUCCESS =
    '[App] Create Use Environment Success'
export const CREATE_USE_ENVIRONMENT_FAILURE =
    '[App] Create Use Environment Failure'

export const DELETE_USE_ENVIRONMENT = '[App] Delete Use Environment'
export const DELETE_USE_ENVIRONMENT_SUCCESS =
    '[App] Delete Use Environment Success'
export const DELETE_USE_ENVIRONMENT_FAILURE =
    '[App] Delete Use Environment Failure'

export class FetchUseEnvironmentsAction implements Action {
    readonly type = FETCH_USE_ENVIRONMENTS
}
export class FetchUseEnvironmentsSuccessAction implements Action {
    readonly type = FETCH_USE_ENVIRONMENTS_SUCCESS
    constructor(public useEnvironments: UseEnvironment[]) {}
}
export class FetchUseEnvironmentsFailureAction implements Action {
    readonly type = FETCH_USE_ENVIRONMENTS_FAILURE
}

export class CreateUseEnvironmentAction implements Action {
    readonly type = CREATE_USE_ENVIRONMENT
    constructor(public payload: UseEnvironment) {}
}
export class CreateUseEnvironmentSuccessAction implements Action {
    readonly type = CREATE_USE_ENVIRONMENT_SUCCESS
}
export class CreateUseEnvironmentFailureAction implements Action {
    readonly type = CREATE_USE_ENVIRONMENT_FAILURE
}

export class DeleteUseEnvironmentAction implements Action {
    readonly type = DELETE_USE_ENVIRONMENT
    constructor(public id: string) {}
}
export class DeleteUseEnvironmentSuccessAction implements Action {
    readonly type = DELETE_USE_ENVIRONMENT_SUCCESS
}
export class DeleteUseEnvironmentFailureAction implements Action {
    readonly type = DELETE_USE_ENVIRONMENT_FAILURE
}

export type Actions =
    | FetchUseEnvironmentsAction
    | FetchUseEnvironmentsSuccessAction
    | FetchUseEnvironmentsFailureAction
    | CreateUseEnvironmentAction
    | CreateUseEnvironmentSuccessAction
    | CreateUseEnvironmentFailureAction
    | DeleteUseEnvironmentAction
    | DeleteUseEnvironmentSuccessAction
    | DeleteUseEnvironmentFailureAction
