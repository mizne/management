import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromResourceFieldSettings from './resource-field-settings.reducer'
import * as fromRoot from '../../../reducers'

export interface FieldSettingsState {
    resourceFieldSettings: fromResourceFieldSettings.State
}

export interface State extends fromRoot.State {
    fromFieldSettings: FieldSettingsState
}
export const reducers = {
    resourceFieldSettings: fromResourceFieldSettings.reducer
}

export const getFieldSettingsModuleState = createFeatureSelector<
    FieldSettingsState
>('fromFieldSettings')

export const getResourceFieldSettingsState = createSelector(
    getFieldSettingsModuleState,
    (state: FieldSettingsState) => state.resourceFieldSettings
)
export const getResourceFieldSettingsLoading = createSelector(
    getResourceFieldSettingsState,
    fromResourceFieldSettings.getLoading
)
export const getResourceFieldSettings = createSelector(
    getResourceFieldSettingsState,
    fromResourceFieldSettings.getLoggers
)
export const getResourceFieldSettingsCount = createSelector(
    getResourceFieldSettingsState,
    fromResourceFieldSettings.getLoggersCount
)
