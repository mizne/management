import { Action } from '@ngrx/store'

import { TemplateSettings } from '../models/template-settings.model'

export const FETCH_VTE_TEMPLATE_SETTINGS =
    '[Template Settings] Fetch VTE Template Settings'
export const FETCH_VTE_TEMPLATE_SETTINGS_SUCCESS =
    '[Template Settings] Fetch VTE Template Settings Success'
export const FETCH_VTE_TEMPLATE_SETTINGS_FAILURE =
    '[Template Settings] Fetch VTE Template Settings Failure'

export const UPDATE_VTE_TEMPLATE_SETTINGS =
    '[Template Settings] Update VTE Template Settings'
export const UPDATE_VTE_TEMPLATE_SETTINGS_SUCCESS =
    '[Template Settings] Update VTE Template Settings Success'
export const UPDATE_VTE_TEMPLATE_SETTINGS_FAILURE =
    '[Template Settings] Update VTE Template Settings Failure'

export const FETCH_ETV_TEMPLATE_SETTINGS =
    '[Template Settings] Fetch ETV Template Settings'
export const FETCH_ETV_TEMPLATE_SETTINGS_SUCCESS =
    '[Template Settings] Fetch ETV Template Settings Success'
export const FETCH_ETV_TEMPLATE_SETTINGS_FAILURE =
    '[Template Settings] Fetch ETV Template Settings Failure'

export const UPDATE_ETV_TEMPLATE_SETTINGS =
    '[Template Settings] Update ETV Template Settings'
export const UPDATE_ETV_TEMPLATE_SETTINGS_SUCCESS =
    '[Template Settings] Update ETV Template Settings Success'
export const UPDATE_ETV_TEMPLATE_SETTINGS_FAILURE =
    '[Template Settings] Update ETV Template Settings Failure'

export const FETCH_ETE_TEMPLATE_SETTINGS =
    '[Template Settings] Fetch ETE Template Settings'
export const FETCH_ETE_TEMPLATE_SETTINGS_SUCCESS =
    '[Template Settings] Fetch ETE Template Settings Success'
export const FETCH_ETE_TEMPLATE_SETTINGS_FAILURE =
    '[Template Settings] Fetch ETE Template Settings Failure'

export const UPDATE_ETE_TEMPLATE_SETTINGS =
    '[Template Settings] Update ETE Template Settings'
export const UPDATE_ETE_TEMPLATE_SETTINGS_SUCCESS =
    '[Template Settings] Update ETE Template Settings Success'
export const UPDATE_ETE_TEMPLATE_SETTINGS_FAILURE =
    '[Template Settings] Update ETE Template Settings Failure'

export class FetchVTETemplateSettingsAction implements Action {
    readonly type = FETCH_VTE_TEMPLATE_SETTINGS
}
export class FetchVTETemplateSettingsSuccessAction implements Action {
    readonly type = FETCH_VTE_TEMPLATE_SETTINGS_SUCCESS
    constructor(public templateSettings: TemplateSettings) {}
}
export class FetchVTETemplateSettingsFailureAction implements Action {
    readonly type = FETCH_VTE_TEMPLATE_SETTINGS_FAILURE
}

export class UpdateVTETemplateSettingsAction implements Action {
    readonly type = UPDATE_VTE_TEMPLATE_SETTINGS
    constructor(public template: string) {}
}
export class UpdateVTETemplateSettingsSuccessAction implements Action {
    readonly type = UPDATE_VTE_TEMPLATE_SETTINGS_SUCCESS
}
export class UpdateVTETemplateSettingsFailureAction implements Action {
    readonly type = UPDATE_VTE_TEMPLATE_SETTINGS_FAILURE
}

export class FetchETVTemplateSettingsAction implements Action {
    readonly type = FETCH_ETV_TEMPLATE_SETTINGS
}
export class FetchETVTemplateSettingsSuccessAction implements Action {
    readonly type = FETCH_ETV_TEMPLATE_SETTINGS_SUCCESS
    constructor(public templateSettings: TemplateSettings) {}
}
export class FetchETVTemplateSettingsFailureAction implements Action {
    readonly type = FETCH_ETV_TEMPLATE_SETTINGS_FAILURE
}

export class UpdateETVTemplateSettingsAction implements Action {
    readonly type = UPDATE_ETV_TEMPLATE_SETTINGS
    constructor(public template: string) {}
}
export class UpdateETVTemplateSettingsSuccessAction implements Action {
    readonly type = UPDATE_ETV_TEMPLATE_SETTINGS_SUCCESS
}
export class UpdateETVTemplateSettingsFailureAction implements Action {
    readonly type = UPDATE_ETV_TEMPLATE_SETTINGS_FAILURE
}

export class FetchETETemplateSettingsAction implements Action {
    readonly type = FETCH_ETE_TEMPLATE_SETTINGS
}
export class FetchETETemplateSettingsSuccessAction implements Action {
    readonly type = FETCH_ETE_TEMPLATE_SETTINGS_SUCCESS
    constructor(public templateSettings: TemplateSettings) {}
}
export class FetchETETemplateSettingsFailureAction implements Action {
    readonly type = FETCH_ETE_TEMPLATE_SETTINGS_FAILURE
}

export class UpdateETETemplateSettingsAction implements Action {
    readonly type = UPDATE_ETE_TEMPLATE_SETTINGS
    constructor(public template: string) {}
}
export class UpdateETETemplateSettingsSuccessAction implements Action {
    readonly type = UPDATE_ETE_TEMPLATE_SETTINGS_SUCCESS
}
export class UpdateETETemplateSettingsFailureAction implements Action {
    readonly type = UPDATE_ETE_TEMPLATE_SETTINGS_FAILURE
}

export type Actions =
    | FetchVTETemplateSettingsAction
    | FetchVTETemplateSettingsSuccessAction
    | FetchVTETemplateSettingsFailureAction
    | UpdateVTETemplateSettingsAction
    | UpdateVTETemplateSettingsSuccessAction
    | UpdateVTETemplateSettingsFailureAction
    | FetchETVTemplateSettingsAction
    | FetchETVTemplateSettingsSuccessAction
    | FetchETVTemplateSettingsFailureAction
    | UpdateETVTemplateSettingsAction
    | UpdateETVTemplateSettingsSuccessAction
    | UpdateETVTemplateSettingsFailureAction
    | FetchETETemplateSettingsAction
    | FetchETETemplateSettingsSuccessAction
    | FetchETETemplateSettingsFailureAction
    | UpdateETETemplateSettingsAction
    | UpdateETETemplateSettingsSuccessAction
    | UpdateETETemplateSettingsFailureAction
