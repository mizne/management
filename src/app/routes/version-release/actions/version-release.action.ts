import { Action } from '@ngrx/store'

import {
    VersionReleaseApply,
    ApplyInfo,
    ApplyResource,
    Approver
} from '@core/models/version-release.model'

export const FETCH_APPLY_INFO = '[Version Release Apply] Fetch Apply Info'
export const FETCH_APPLY_INFO_SUCCESS =
    '[Version Release Apply] Fetch Apply Info Success'
export const FETCH_APPLY_INFO_FAILURE =
    '[Version Release Apply] Fetch Apply Info Failure'

export const FETCH_APPROVERS = '[Version Release Apply] Fetch Approver'
export const FETCH_APPROVERS_SUCCESS =
    '[Version Release Apply] Fetch Approver Success'
export const FETCH_APPROVERS_FAILURE =
    '[Version Release Apply] Fetch Approver Failure'

export const ADD_APPLY_RESOURCES =
    '[Version Release Apply] Add Apply Resources'
export const CREATE_APPLY_RESOURCE =
    '[Version Release Apply] Create Apply Resource'
export const EDIT_TEMP_APPLY_RESOURCE =
    '[Version Release Apply] Edit Temp Apply Resource'
export const DELETE_APPLY_RESOURCE =
    '[Version Release Apply] Delete Apply Resource'

export const SAVE_VERSION_RELEASE_APPLY =
    '[Version Release Apply] Save Version Release Apply'
export const SAVE_VERSION_RELEASE_APPLY_SUCCESS =
    '[Version Release Apply] Save Version Release Apply Success'
export const SAVE_VERSION_RELEASE_APPLY_FAILURE =
    '[Version Release Apply] Save Version Release Apply Failure'

export const SUBMIT_VERSION_RELEASE_APPLY =
    '[Version Release Apply] Submit Version Release Apply'
export const SUBMIT_VERSION_RELEASE_APPLY_SUCCESS =
    '[Version Release Apply] Submit Version Release Apply Success'
export const SUBMIT_VERSION_RELEASE_APPLY_FAILURE =
    '[Version Release Apply] Submit Version Release Apply Failure'

export const RESET_VERSION_RELEASE_APPLY =
    '[Version Release Apply] Reset Version Release Apply'


export class FetchApplyInfoAction implements Action {
    readonly type = FETCH_APPLY_INFO
}
export class FetchApplyInfoSuccessAction implements Action {
    readonly type = FETCH_APPLY_INFO_SUCCESS
    constructor(public applyInfo: ApplyInfo) {}
}
export class FetchApplyInfoFailureAction implements Action {
    readonly type = FETCH_APPLY_INFO_FAILURE
}

export class FetchApproversAction implements Action {
    readonly type = FETCH_APPROVERS
}
export class FetchApproversSuccessAction implements Action {
    readonly type = FETCH_APPROVERS_SUCCESS
    constructor(public approvers: Approver[]) {}
}
export class FetchApproversFailureAction implements Action {
    readonly type = FETCH_APPROVERS_FAILURE
}

export class AddApplyResourcesAction implements Action {
    readonly type = ADD_APPLY_RESOURCES
    constructor(public applyResources: ApplyResource[]) {}
}
export class CreateApplyResourceAction implements Action {
    readonly type = CREATE_APPLY_RESOURCE
    constructor(public applyResource: ApplyResource) {}
}
export class EditTempApplyResourceAction implements Action {
    readonly type = EDIT_TEMP_APPLY_RESOURCE
    constructor(public resource: ApplyResource) {}
}
export class DeleteApplyResourceAction implements Action {
    readonly type = DELETE_APPLY_RESOURCE
    constructor(public index: number) {}
}

export class SaveVersionReleaseApplyAction implements Action {
    readonly type = SAVE_VERSION_RELEASE_APPLY
}
export class SaveVersionReleaseApplySuccessAction implements Action {
    readonly type = SAVE_VERSION_RELEASE_APPLY_SUCCESS
}
export class SaveVersionReleaseApplyFailureAction implements Action {
    readonly type = SAVE_VERSION_RELEASE_APPLY_FAILURE
}

export class SubmitVersionReleaseApplyAction implements Action {
    readonly type = SUBMIT_VERSION_RELEASE_APPLY
}
export class SubmitVersionReleaseApplySuccessAction implements Action {
    readonly type = SUBMIT_VERSION_RELEASE_APPLY_SUCCESS
}
export class SumitVersionReleaseApplyFailureAction implements Action {
    readonly type = SUBMIT_VERSION_RELEASE_APPLY_FAILURE
}

export class ResetVersionReleaseApplyAction implements Action {
    readonly type = RESET_VERSION_RELEASE_APPLY
}

export type Actions =
    | FetchApplyInfoAction
    | FetchApplyInfoSuccessAction
    | FetchApplyInfoFailureAction
    | FetchApproversAction
    | FetchApproversSuccessAction
    | FetchApproversFailureAction
    | AddApplyResourcesAction
    | CreateApplyResourceAction
    | EditTempApplyResourceAction
    | DeleteApplyResourceAction
    | SaveVersionReleaseApplyAction
    | SaveVersionReleaseApplySuccessAction
    | SaveVersionReleaseApplyFailureAction
    | SubmitVersionReleaseApplyAction
    | SubmitVersionReleaseApplySuccessAction
    | SumitVersionReleaseApplyFailureAction
    | ResetVersionReleaseApplyAction
