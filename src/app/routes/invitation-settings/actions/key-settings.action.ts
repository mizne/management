import { Action } from '@ngrx/store'

import { KeySettings } from '../models/key-settings.model'

export const FETCH_KEY_SETTINGS = '[Key Settings] Fetch Key Settings'
export const FETCH_KEY_SETTINGS_SUCCESS =
    '[Key Settings] Fetch Key Settings Success'
export const FETCH_KEY_SETTINGS_FAILURE =
    '[Key Settings] Fetch Key Settings Failure'

export const CREATE_KEY = '[Key Settings] Create Key'
export const CREATE_KEY_SUCCESS = '[Key Settings] Create Key Success'
export const CREATE_KEY_FAILURE = '[Key Settings] Create Key Failure'

export const DELETE_KEY = '[Key Settings] Delete Key'
export const DELETE_KEY_SUCCESS = '[Key Settings] Delete Key Success'
export const DELETE_KEY_FAILURE = '[Key Settings] Delete Key Failure'

export class FetchKeySettingsAction implements Action {
    readonly type = FETCH_KEY_SETTINGS
}
export class FetchKeySettingsSuccessAction implements Action {
    readonly type = FETCH_KEY_SETTINGS_SUCCESS
    constructor(public keySettings: KeySettings) {}
}
export class FetchKeySettingsFailureAction implements Action {
    readonly type = FETCH_KEY_SETTINGS_FAILURE
}

export class CreateKeyAction implements Action {
    readonly type = CREATE_KEY
    constructor(public key: string) {}
}
export class CreateKeySuccessAction implements Action {
    readonly type = CREATE_KEY_SUCCESS
}
export class CreateKeyFailureAction implements Action {
    readonly type = CREATE_KEY_FAILURE
}

export class DeleteKeyAction implements Action {
    readonly type = DELETE_KEY
    constructor(public key: string) {}
}
export class DeleteKeySuccessAction implements Action {
    readonly type = DELETE_KEY_SUCCESS
}
export class DeleteKeyFailureAction implements Action {
    readonly type = DELETE_KEY_FAILURE
}

export type Actions =
    | FetchKeySettingsAction
    | FetchKeySettingsSuccessAction
    | FetchKeySettingsFailureAction
    | CreateKeyAction
    | CreateKeySuccessAction
    | CreateKeyFailureAction
    | DeleteKeyAction
    | DeleteKeySuccessAction
    | DeleteKeyFailureAction
