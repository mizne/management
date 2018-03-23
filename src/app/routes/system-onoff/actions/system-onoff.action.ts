import { Action } from '@ngrx/store'

import {
    SystemOnOffApply,
    ApplyInfo,
    ApplyResource,
    Approver
} from '@core/models/system-onoff.model'

export const SWITCH_APPLY_TYPE =
    '[System OnOff Apply] Switch Apply Type'

export const FETCH_APPLY_INFO = '[System OnOff Apply] Fetch Apply Info'
export const FETCH_APPLY_INFO_SUCCESS =
    '[System OnOff Apply] Fetch Apply Info Success'
export const FETCH_APPLY_INFO_FAILURE =
    '[System OnOff Apply] Fetch Apply Info Failure'

export const FETCH_APPROVERS = '[System OnOff Apply] Fetch Approver'
export const FETCH_APPROVERS_SUCCESS =
    '[System OnOff Apply] Fetch Approver Success'
export const FETCH_APPROVERS_FAILURE =
    '[System OnOff Apply] Fetch Approver Failure'

export const ADD_APPLY_RESOURCES =
    '[System OnOff Apply] Add Apply Resources'
export const CREATE_APPLY_RESOURCE =
    '[System OnOff Apply] Create Apply Resource'
export const EDIT_TEMP_APPLY_RESOURCE =
    '[System OnOff Apply] Edit Temp Apply Resource'
export const DELETE_APPLY_RESOURCE =
    '[System OnOff Apply] Delete Apply Resource'

export const SAVE_SYSTEM_ONOFF_APPLY =
    '[System OnOff Apply] Save System OnOff Apply'
export const SAVE_SYSTEM_ONOFF_APPLY_SUCCESS =
    '[System OnOff Apply] Save System OnOff Apply Success'
export const SAVE_SYSTEM_ONOFF_APPLY_FAILURE =
    '[System OnOff Apply] Save System OnOff Apply Failure'

export const SUBMIT_SYSTEM_ONOFF_APPLY =
    '[System OnOff Apply] Submit System OnOff Apply'
export const SUBMIT_SYSTEM_ONOFF_APPLY_SUCCESS =
    '[System OnOff Apply] Submit System OnOff Apply Success'
export const SUBMIT_SYSTEM_ONOFF_APPLY_FAILURE =
    '[System OnOff Apply] Submit System OnOff Apply Failure'

export const RESET_SYSTEM_ONOFF_APPLY =
    '[System OnOff Apply] Reset System OnOff Apply'

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

export class SaveSystemOnOffApplyAction implements Action {
    readonly type = SAVE_SYSTEM_ONOFF_APPLY
}
export class SaveSystemOnOffApplySuccessAction implements Action {
    readonly type = SAVE_SYSTEM_ONOFF_APPLY_SUCCESS
}
export class SaveSystemOnOffApplyFailureAction implements Action {
    readonly type = SAVE_SYSTEM_ONOFF_APPLY_FAILURE
}

export class SubmitSystemOnOffApplyAction implements Action {
    readonly type = SUBMIT_SYSTEM_ONOFF_APPLY
}
export class SubmitSystemOnOffApplySuccessAction implements Action {
    readonly type = SUBMIT_SYSTEM_ONOFF_APPLY_SUCCESS
}
export class SumitSystemOnOffApplyFailureAction implements Action {
    readonly type = SUBMIT_SYSTEM_ONOFF_APPLY_FAILURE
}

export class ResetSystemOnOffApplyAction implements Action {
    readonly type = RESET_SYSTEM_ONOFF_APPLY
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
    | SaveSystemOnOffApplyAction
    | SaveSystemOnOffApplySuccessAction
    | SaveSystemOnOffApplyFailureAction
    | SubmitSystemOnOffApplyAction
    | SubmitSystemOnOffApplySuccessAction
    | SumitSystemOnOffApplyFailureAction
    | ResetSystemOnOffApplyAction
