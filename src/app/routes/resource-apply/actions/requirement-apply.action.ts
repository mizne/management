import { Action } from '@ngrx/store'

import {
    RequirementApply,
    ApplyInfo,
    ApplyResource,
    Approver
} from '@core/models/resource-apply.model'

export const SWITCH_APPLY_TYPE =
    '[Resource Requirement Apply] Switch Apply Type'

export const FETCH_APPLY_INFO = '[Resource Requirement Apply] Fetch Apply Info'
export const FETCH_APPLY_INFO_SUCCESS =
    '[Resource Requirement Apply] Fetch Apply Info Success'
export const FETCH_APPLY_INFO_FAILURE =
    '[Resource Requirement Apply] Fetch Apply Info Failure'

export const FETCH_APPROVERS = '[Resource Requirement Apply] Fetch Approver'
export const FETCH_APPROVERS_SUCCESS =
    '[Resource Requirement Apply] Fetch Approver Success'
export const FETCH_APPROVERS_FAILURE =
    '[Resource Requirement Apply] Fetch Approver Failure'

export const ADD_APPLY_RESOURCES =
    '[Resource Requirement Apply] Add Apply Resources'
export const CREATE_APPLY_RESOURCE =
    '[Resource Requirement Apply] Create Apply Resource'
export const EDIT_TEMP_APPLY_RESOURCE =
    '[Resource Requirement Apply] Edit Temp Apply Resource'
export const DELETE_APPLY_RESOURCE =
    '[Resource Requirement Apply] Delete Apply Resource'

export const SAVE_REQUIREMENT_APPLY =
    '[Resource Requirement Apply] Save Requirement Apply'
export const SAVE_REQUIREMENT_APPLY_SUCCESS =
    '[Resource Requirement Apply] Save Requirement Apply Success'
export const SAVE_REQUIREMENT_APPLY_FAILURE =
    '[Resource Requirement Apply] Save Requirement Apply Failure'

export const SUBMIT_REQUIREMENT_APPLY =
    '[Resource Requirement Apply] Submit Requirement Apply'
export const SUBMIT_REQUIREMENT_APPLY_SUCCESS =
    '[Resource Requirement Apply] Submit Requirement Apply Success'
export const SUBMIT_REQUIREMENT_APPLY_FAILURE =
    '[Resource Requirement Apply] Submit Requirement Apply Failure'

export const RESET_REQUIREMENT_APPLY =
    '[Resource Requirement Apply] Reset Requirement Apply'

export class SwitchApplyTypeAction implements Action {
    readonly type = SWITCH_APPLY_TYPE
    constructor(public applyType: string) {}
}

export class FetchApplyInfoAction implements Action {
    readonly type = FETCH_APPLY_INFO
    constructor(public applyType: string) {}
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
    constructor(public applyType: string) {}
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

export class SaveRequirementApplyAction implements Action {
    readonly type = SAVE_REQUIREMENT_APPLY
}
export class SaveRequirementApplySuccessAction implements Action {
    readonly type = SAVE_REQUIREMENT_APPLY_SUCCESS
}
export class SaveRequirementApplyFailureAction implements Action {
    readonly type = SAVE_REQUIREMENT_APPLY_FAILURE
}

export class SubmitRequirementApplyAction implements Action {
    readonly type = SUBMIT_REQUIREMENT_APPLY
}
export class SubmitRequirementApplySuccessAction implements Action {
    readonly type = SUBMIT_REQUIREMENT_APPLY_SUCCESS
}
export class SumitRequirementApplyFailureAction implements Action {
    readonly type = SUBMIT_REQUIREMENT_APPLY_FAILURE
}

export class ResetRequirementApplyAction implements Action {
    readonly type = RESET_REQUIREMENT_APPLY
}

export type Actions =
    | SwitchApplyTypeAction
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
    | SaveRequirementApplyAction
    | SaveRequirementApplySuccessAction
    | SaveRequirementApplyFailureAction
    | SubmitRequirementApplyAction
    | SubmitRequirementApplySuccessAction
    | SumitRequirementApplyFailureAction
    | ResetRequirementApplyAction
