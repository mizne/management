import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromCalendarSettings from './calendar-settings.reducer'
import * as fromApprovalSettings from './approval-settings.reducer'
import * as fromKeySettings from './key-settings.reducer'
import * as fromTemplateSettings from './template-settings.reducer'
import * as fromRoot from '../../../reducers'

export interface InvitationSettingsState {
    calendarSettings: fromCalendarSettings.State
    approvalSettings: fromApprovalSettings.State
    keySettings: fromKeySettings.State
    templateSettings: fromTemplateSettings.State
}

export interface State extends fromRoot.State {
    fromInvitationSettings: InvitationSettingsState
}
export const reducers = {
    calendarSettings: fromCalendarSettings.reducer,
    approvalSettings: fromApprovalSettings.reducer,
    keySettings: fromKeySettings.reducer,
    templateSettings: fromTemplateSettings.reducer
}

export const getInvitationSettingsModuleState = createFeatureSelector<
    InvitationSettingsState
>('fromInvitationSettings')

export const getCalendarSettingsState = createSelector(
    getInvitationSettingsModuleState,
    (state: InvitationSettingsState) => state.calendarSettings
)
export const getCalendarSettingsLoading = createSelector(
    getCalendarSettingsState,
    fromCalendarSettings.getLoading
)
export const getCalendarSettings = createSelector(
    getCalendarSettingsState,
    fromCalendarSettings.getCalendarSettings
)

export const getApprovalSettingsState = createSelector(
    getInvitationSettingsModuleState,
    (state: InvitationSettingsState) => state.approvalSettings
)
export const getApprovalSettingsLoading = createSelector(
    getApprovalSettingsState,
    fromApprovalSettings.getLoading
)
export const getApprovalSettings = createSelector(
    getApprovalSettingsState,
    fromApprovalSettings.getApprovalSettings
)

export const getKeySettingsState = createSelector(
    getInvitationSettingsModuleState,
    (state: InvitationSettingsState) => state.keySettings
)
export const getKeySettingsLoading = createSelector(
    getKeySettingsState,
    fromKeySettings.getLoading
)
export const getKeySettings = createSelector(
    getKeySettingsState,
    fromKeySettings.getKeySettings
)

export const getTemplateSettingsState = createSelector(
    getInvitationSettingsModuleState,
    (state: InvitationSettingsState) => state.templateSettings
)
export const getTemplateSettingsLoading = createSelector(
    getTemplateSettingsState,
    fromTemplateSettings.getLoading
)
export const getVTETemplateSettings = createSelector(
    getTemplateSettingsState,
    fromTemplateSettings.getVTETemplateSettings
)
export const getETVTemplateSettings = createSelector(
    getTemplateSettingsState,
    fromTemplateSettings.getETVTemplateSettings
)
export const getETETemplateSettings = createSelector(
    getTemplateSettingsState,
    fromTemplateSettings.getETETemplateSettings
)
