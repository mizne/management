import * as fromTemplateSettings from '../actions/template-settings.action'
import { TemplateSettings } from '../models/template-settings.model'

export interface State {
    loading: boolean
    vteTemplateSettings: TemplateSettings
    etvTemplateSettings: TemplateSettings
    eteTemplateSettings: TemplateSettings
}

const initialState: State = {
    loading: false,
    vteTemplateSettings: null,
    etvTemplateSettings: null,
    eteTemplateSettings: null
}

export function reducer(
    state: State = initialState,
    action: fromTemplateSettings.Actions
): State {
    switch (action.type) {
        case fromTemplateSettings.FETCH_VTE_TEMPLATE_SETTINGS:
        case fromTemplateSettings.UPDATE_VTE_TEMPLATE_SETTINGS:
        case fromTemplateSettings.FETCH_ETV_TEMPLATE_SETTINGS:
        case fromTemplateSettings.UPDATE_ETV_TEMPLATE_SETTINGS:
        case fromTemplateSettings.FETCH_ETE_TEMPLATE_SETTINGS:
        case fromTemplateSettings.UPDATE_ETE_TEMPLATE_SETTINGS:
            return {
                ...state,
                loading: true
            }
        case fromTemplateSettings.FETCH_VTE_TEMPLATE_SETTINGS_SUCCESS:
            return {
                ...state,
                vteTemplateSettings: action.templateSettings,
                loading: false
            }
        case fromTemplateSettings.FETCH_ETV_TEMPLATE_SETTINGS_SUCCESS:
            return {
                ...state,
                etvTemplateSettings: action.templateSettings,
                loading: false
            }
        case fromTemplateSettings.FETCH_ETE_TEMPLATE_SETTINGS_SUCCESS:
            return {
                ...state,
                eteTemplateSettings: action.templateSettings,
                loading: false
            }
        case fromTemplateSettings.FETCH_VTE_TEMPLATE_SETTINGS_FAILURE:
        case fromTemplateSettings.UPDATE_VTE_TEMPLATE_SETTINGS_FAILURE:
        case fromTemplateSettings.UPDATE_VTE_TEMPLATE_SETTINGS_SUCCESS:
        case fromTemplateSettings.FETCH_ETV_TEMPLATE_SETTINGS_FAILURE:
        case fromTemplateSettings.UPDATE_ETV_TEMPLATE_SETTINGS_FAILURE:
        case fromTemplateSettings.UPDATE_ETV_TEMPLATE_SETTINGS_SUCCESS:
        case fromTemplateSettings.FETCH_ETE_TEMPLATE_SETTINGS_FAILURE:
        case fromTemplateSettings.UPDATE_ETE_TEMPLATE_SETTINGS_FAILURE:
        case fromTemplateSettings.UPDATE_ETE_TEMPLATE_SETTINGS_SUCCESS:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getVTETemplateSettings = (state: State) =>
    state.vteTemplateSettings
export const getETVTemplateSettings = (state: State) =>
    state.etvTemplateSettings
export const getETETemplateSettings = (state: State) =>
    state.eteTemplateSettings
