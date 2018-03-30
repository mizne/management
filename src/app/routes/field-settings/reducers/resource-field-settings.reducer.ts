import * as fromResourceFieldSettings from '../actions/resource-field-settings.action'
import { FieldSettings } from '@core/models/field-settings.model'

export interface State {
    loading: boolean
    loggers: FieldSettings[]
    loggersCount: number
    pageIndex: number
    pageSize: number
}

const initialState: State = {
    loading: false,
    loggers: [],
    loggersCount: 0,
    pageIndex: 1,
    pageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromResourceFieldSettings.Actions
): State {
    switch (action.type) {
        case fromResourceFieldSettings.FETCH_RESOURCE_FIELD_SETTINGS:
            return {
                ...state,
                loading: true
            }
        case fromResourceFieldSettings.FETCH_RESOURCE_FIELD_SETTINGS_SUCCESS:
            return {
                ...state,
                loggers: action.loggers,
                loading: false
            }
        case fromResourceFieldSettings.FETCH_RESOURCE_FIELD_SETTINGS_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromResourceFieldSettings.FETCH_RESOURCE_FIELD_SETTINGS_COUNT_SUCCESS:
            return {
                ...state,
                loggersCount: action.count
            }

        case fromResourceFieldSettings.ENSURE_PAGE_PARAMS:
            return {
                ...state,
                pageIndex: action.params.pageIndex,
                pageSize: action.params.pageSize
            }
        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getLoggers = (state: State) => state.loggers
export const getLoggersCount = (state: State) => state.loggersCount
export const getPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
