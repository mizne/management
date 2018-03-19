import { Action } from '@ngrx/store'

import { LoginParams, TenantInfo } from '../models/login.model'
import { Exhibition } from '@core/models/exhibition.model'

export const USER_LOGIN = '[Login] User Login'
export const USER_LOGIN_SUCCESS = '[Login] User Login Success'
export const USER_LOGIN_FAILURE = '[Login] User Login Failure'

export class UserLoginAction implements Action {
    readonly type = USER_LOGIN
    constructor(public params: LoginParams) {}
}
export class UserLoginSuccessAction implements Action {
    readonly type = USER_LOGIN_SUCCESS
    constructor(public info: TenantInfo) {}
}
export class UserLoginFailureAction implements Action {
    readonly type = USER_LOGIN_FAILURE
}

export type Actions =
    | UserLoginAction
    | UserLoginSuccessAction
    | UserLoginFailureAction
