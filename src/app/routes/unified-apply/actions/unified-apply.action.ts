import { Action } from '@ngrx/store'

import {
    ApplyInfo,
    ApplyResource,
    Approver
} from '@core/models/unified-apply.model'

export const FETCH_APPLY_INFO = '[Unified Apply] Fetch Apply Info'
export const FETCH_APPLY_INFO_SUCCESS =
    '[Unified Apply] Fetch Apply Info Success'
export const FETCH_APPLY_INFO_FAILURE =
    '[Unified Apply] Fetch Apply Info Failure'

export const FETCH_APPROVERS = '[Unified Apply] Fetch Approver'
export const FETCH_APPROVERS_SUCCESS = '[Unified Apply] Fetch Approver Success'
export const FETCH_APPROVERS_FAILURE = '[Unified Apply] Fetch Approver Failure'

export const ADD_APPLY_RESOURCES = '[Unified Apply] Add Apply Resources'
export const CREATE_APPLY_RESOURCE = '[Unified Apply] Create Apply Resource'
export const EDIT_TEMP_APPLY_RESOURCE =
    '[Unified Apply] Edit Temp Apply Resource'
export const DELETE_APPLY_RESOURCE = '[Unified Apply] Delete Apply Resource'

export const SAVE_UNIFIED_APPLY = '[Unified Apply] Save Unified Apply'
export const SAVE_UNIFIED_APPLY_SUCCESS =
    '[Unified Apply] Save Unified Apply Success'
export const SAVE_UNIFIED_APPLY_FAILURE =
    '[Unified Apply] Save Unified Apply Failure'

export const SUBMIT_UNIFIED_APPLY = '[Unified Apply] Submit Unified Apply'
export const SUBMIT_UNIFIED_APPLY_SUCCESS =
    '[Unified Apply] Submit Unified Apply Success'
export const SUBMIT_UNIFIED_APPLY_FAILURE =
    '[Unified Apply] Submit Unified Apply Failure'

export const RESET_UNIFIED_APPLY = '[Unified Apply] Reset Unified Apply'

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

export class SaveUnifiedApplyAction implements Action {
    readonly type = SAVE_UNIFIED_APPLY
}
export class SaveUnifiedApplySuccessAction implements Action {
    readonly type = SAVE_UNIFIED_APPLY_SUCCESS
}
export class SaveUnifiedApplyFailureAction implements Action {
    readonly type = SAVE_UNIFIED_APPLY_FAILURE
}

export class SubmitUnifiedApplyAction implements Action {
    readonly type = SUBMIT_UNIFIED_APPLY
}
export class SubmitUnifiedApplySuccessAction implements Action {
    readonly type = SUBMIT_UNIFIED_APPLY_SUCCESS
}
export class SubmitUnifiedApplyFailureAction implements Action {
    readonly type = SUBMIT_UNIFIED_APPLY_FAILURE
}

export class ResetUnifiedApplyAction implements Action {
    readonly type = RESET_UNIFIED_APPLY
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
    | SaveUnifiedApplyAction
    | SaveUnifiedApplySuccessAction
    | SaveUnifiedApplyFailureAction
    | SubmitUnifiedApplyAction
    | SubmitUnifiedApplySuccessAction
    | SubmitUnifiedApplyFailureAction
    | ResetUnifiedApplyAction
