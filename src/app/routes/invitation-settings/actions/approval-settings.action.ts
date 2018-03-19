import { Action } from '@ngrx/store'

import { ApprovalSettings } from '../models/approval-settings.model'

export const FETCH_APPROVAL_SETTINGS =
    '[Approval Settings] Fetch Approval Settings'
export const FETCH_APPROVAL_SETTINGS_SUCCESS =
    '[Approval Settings] Fetch Approval Settings Success'
export const FETCH_APPROVAL_SETTINGS_FAILURE =
    '[Approval Settings] Fetch Approval Settings Failure'

export const UPDATE_APPROVAL_SETTINGS =
    '[Approval Settings] Update Approval Settings'
export const UPDATE_APPROVAL_SETTINGS_SUCCESS =
    '[Approval Settings] Update Approval Settings Success'
export const UPDATE_APPROVAL_SETTINGS_FAILURE =
    '[Approval Settings] Update Approval Settings Failure'

export class FetchApprovalSettingsAction implements Action {
    readonly type = FETCH_APPROVAL_SETTINGS
}
export class FetchApprovalSettingsSuccessAction implements Action {
    readonly type = FETCH_APPROVAL_SETTINGS_SUCCESS
    constructor(public approvalSettings: ApprovalSettings) {}
}
export class FetchApprovalSettingsFailureAction implements Action {
    readonly type = FETCH_APPROVAL_SETTINGS_FAILURE
}

export class UpdateApprovalSettingsAction implements Action {
    readonly type = UPDATE_APPROVAL_SETTINGS
    constructor(public payload: ApprovalSettings) {}
}
export class UpdateApprovalSettingsSuccessAction implements Action {
    readonly type = UPDATE_APPROVAL_SETTINGS_SUCCESS
    constructor(public autoApprove: boolean) {}
}
export class UpdateApprovalSettingsFailureAction implements Action {
    readonly type = UPDATE_APPROVAL_SETTINGS_FAILURE
    constructor(public autoApprove: boolean) {}
}

export type Actions =
    | FetchApprovalSettingsAction
    | FetchApprovalSettingsSuccessAction
    | FetchApprovalSettingsFailureAction
    | UpdateApprovalSettingsAction
    | UpdateApprovalSettingsSuccessAction
    | UpdateApprovalSettingsFailureAction
