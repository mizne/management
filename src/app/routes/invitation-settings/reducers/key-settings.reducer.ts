import * as fromKeySettings from '../actions/key-settings.action'
import { KeySettings } from '../models/key-settings.model'

export interface State {
    loading: boolean
    keySettings: KeySettings
}

const initialState: State = {
    loading: false,
    keySettings: null
}

export function reducer(
    state: State = initialState,
    action: fromKeySettings.Actions
): State {
    switch (action.type) {
        case fromKeySettings.FETCH_KEY_SETTINGS:
        case fromKeySettings.CREATE_KEY:
        case fromKeySettings.DELETE_KEY:
            return {
                ...state,
                loading: true
            }
        case fromKeySettings.FETCH_KEY_SETTINGS_SUCCESS:
            return {
                ...state,
                keySettings: action.keySettings,
                loading: false
            }
        case fromKeySettings.FETCH_KEY_SETTINGS_FAILURE:
        case fromKeySettings.CREATE_KEY_FAILURE:
        case fromKeySettings.CREATE_KEY_SUCCESS:
        case fromKeySettings.DELETE_KEY_FAILURE:
        case fromKeySettings.DELETE_KEY_SUCCESS:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getKeySettings = (state: State) => state.keySettings
