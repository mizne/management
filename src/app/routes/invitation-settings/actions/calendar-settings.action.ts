import { Action } from '@ngrx/store'

import { CalendarSettings } from '../models/calendar-settings.model'

export const FETCH_CALENDAR_SETTINGS =
  '[Calendar Settings] Fetch Calendar Settings'
export const FETCH_CALENDAR_SETTINGS_SUCCESS =
  '[Calendar Settings] Fetch Calendar Settings Success'
export const FETCH_CALENDAR_SETTINGS_FAILURE =
  '[Calendar Settings] Fetch Calendar Settings Failure'

export const UPDATE_CALENDAR_SETTINGS =
  '[Calendar Settings] Update Calendar Settings'
export const UPDATE_CALENDAR_SETTINGS_SUCCESS =
  '[Calendar Settings] Update Calendar Settings Success'
export const UPDATE_CALENDAR_SETTINGS_FAILURE =
  '[Calendar Settings] Update Calendar Settings Failure'

export class FetchCalendarSettingsAction implements Action {
  readonly type = FETCH_CALENDAR_SETTINGS
}
export class FetchCalendarSettingsSuccessAction implements Action {
  readonly type = FETCH_CALENDAR_SETTINGS_SUCCESS
  constructor(public calendarSettings: CalendarSettings) {}
}
export class FetchCalendarSettingsFailureAction implements Action {
  readonly type = FETCH_CALENDAR_SETTINGS_FAILURE
}

export class UpdateCalendarSettingsAction implements Action {
  readonly type = UPDATE_CALENDAR_SETTINGS
  constructor(public payload: CalendarSettings) {}
}
export class UpdateCalendarSettingsSuccessAction implements Action {
  readonly type = UPDATE_CALENDAR_SETTINGS_SUCCESS
}
export class UpdateCalendarSettingsFailureAction implements Action {
  readonly type = UPDATE_CALENDAR_SETTINGS_FAILURE
}

export type Actions =
  | FetchCalendarSettingsAction
  | FetchCalendarSettingsSuccessAction
  | FetchCalendarSettingsFailureAction
  | UpdateCalendarSettingsAction
  | UpdateCalendarSettingsSuccessAction
  | UpdateCalendarSettingsFailureAction
