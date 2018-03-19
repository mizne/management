import { Action } from '@ngrx/store'

import { RegisterParams } from '../models/register.model'

export const USER_REGISTER = '[Register] User Register'
export const USER_REGISTER_SUCCESS = '[Register] User Register Success'
export const USER_REGISTER_FAILURE = '[Register] User Register Failure'

export const FETCH_CAPTCHA = '[Register] Fetch Captcha'
export const FETCH_CAPTCHA_SUCCESS = '[Register] Fetch Captcha Success'
export const FETCH_CAPTCHA_FAILURE = '[Register] Fetch Captcha Failure'

export class UserRegisterAction implements Action {
    readonly type = USER_REGISTER
    constructor(public params: RegisterParams) {}
}
export class UserRegisterSuccessAction implements Action {
    readonly type = USER_REGISTER_SUCCESS
}
export class UserRegisterFailureAction implements Action {
    readonly type = USER_REGISTER_FAILURE
}

export class FetchCaptchaAction implements Action {
    readonly type = FETCH_CAPTCHA
    constructor(public phone: string) {}
}
export class FetchCaptchaSuccssAction implements Action {
    readonly type = FETCH_CAPTCHA_SUCCESS
}
export class FetchCaptchaFailureAction implements Action {
    readonly type = FETCH_CAPTCHA_FAILURE
}

export type Actions =
    | UserRegisterAction
    | UserRegisterSuccessAction
    | UserRegisterFailureAction
    | FetchCaptchaAction
    | FetchCaptchaSuccssAction
    | FetchCaptchaFailureAction
