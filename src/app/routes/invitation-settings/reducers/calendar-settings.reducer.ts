import * as fromCalendarSettings from '../actions/calendar-settings.action'
import { CalendarSettings } from '../models/calendar-settings.model'

export interface State {
  loading: boolean
  calendarSettings: CalendarSettings
}

const initialState: State = {
  loading: false,
  calendarSettings: null
}

export function reducer(
  state: State = initialState,
  action: fromCalendarSettings.Actions
): State {
  switch (action.type) {
    case fromCalendarSettings.FETCH_CALENDAR_SETTINGS:
    case fromCalendarSettings.UPDATE_CALENDAR_SETTINGS:
      return {
        ...state,
        loading: true
      }
    case fromCalendarSettings.FETCH_CALENDAR_SETTINGS_SUCCESS:
      return {
        ...state,
        calendarSettings: action.calendarSettings,
        loading: false
      }
    case fromCalendarSettings.FETCH_CALENDAR_SETTINGS_FAILURE:
    case fromCalendarSettings.UPDATE_CALENDAR_SETTINGS_SUCCESS:
    case fromCalendarSettings.UPDATE_CALENDAR_SETTINGS_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getCalendarSettings = (state: State) => state.calendarSettings
