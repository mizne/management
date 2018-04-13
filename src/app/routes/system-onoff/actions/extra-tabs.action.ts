import { Action } from '@ngrx/store'

import {
    SystemOnOffApply,
    ApplyInfo,
    Approver
} from '@core/models/system-onoff.model'
import { ResourceInfo } from '@core/models/resource-info.model'

export const SWITCH_APPLY_TYPE = '[System OnOff Extra Tabs] Switch Apply Type'

export const FETCH_APPLY_INFO = '[System OnOff Extra Tabs] Fetch Apply Info'
export const FETCH_APPLY_INFO_SUCCESS =
    '[System OnOff Extra Tabs] Fetch Apply Info Success'
export const FETCH_APPLY_INFO_FAILURE =
    '[System OnOff Extra Tabs] Fetch Apply Info Failure'

export const FETCH_APPROVERS = '[System OnOff Extra Tabs] Fetch Approver'
export const FETCH_APPROVERS_SUCCESS =
    '[System OnOff Extra Tabs] Fetch Approver Success'
export const FETCH_APPROVERS_FAILURE =
    '[System OnOff Extra Tabs] Fetch Approver Failure'

export const ADD_APPLY_RESOURCES =
    '[System OnOff Extra Tabs] Add Apply Resources'
export const CREATE_APPLY_RESOURCE =
    '[System OnOff Extra Tabs] Create Apply Resource'
export const EDIT_TEMP_APPLY_RESOURCE =
    '[System OnOff Extra Tabs] Edit Temp Apply Resource'
export const DELETE_APPLY_RESOURCE =
    '[System OnOff Extra Tabs] Delete Apply Resource'

export const CANCEL_EDIT_SYSTEM_ONOFF_APPLY =
    '[System OnOff Extra Tabs] Cancel Edit System OnOff Apply'

export const ENSURE_EDIT_SYSTEM_ONOFF_APPLY =
    '[System OnOff Extra Tabs] Ensure Edit System OnOff Apply'
export const ENSURE_EDIT_SYSTEM_ONOFF_APPLY_SUCCESS =
    '[System OnOff Extra Tabs] Ensure Edit System OnOff Apply Success'
export const ENSURE_EDIT_SYSTEM_ONOFF_APPLY_FAILURE =
    '[System OnOff Extra Tabs] Ensure Edit System OnOff Apply Failure'

export const CLOSE_EXTRA_TAB = '[System OnOff Extra Tabs] Close Extra Tab'
export const RESET_NEED_MANUAL_SET_TAB_INDEX =
    '[System OnOff Extra Tabs] Reset Need Manual Set Tab Index'

export const MAX_TABS_WARNING = '[System OnOff Extra Tabs] Max Tabs Warning'
export class SwitchApplyTypeAction implements Action {
    readonly type = SWITCH_APPLY_TYPE
    constructor(
        public payload: {
            applyType: string
            tabIndex: number
        }
    ) {}
}

export class FetchApplyInfoAction implements Action {
    readonly type = FETCH_APPLY_INFO
    constructor(
        public payload: {
            applyType: string
            tabIndex: number
        }
    ) {}
}
export class FetchApplyInfoSuccessAction implements Action {
    readonly type = FETCH_APPLY_INFO_SUCCESS
    constructor(
        public payload: {
            applyInfo: ApplyInfo
            tabIndex: number
        }
    ) {}
}
export class FetchApplyInfoFailureAction implements Action {
    readonly type = FETCH_APPLY_INFO_FAILURE
    constructor(public tabIndex: number) {}
}

export class FetchApproversAction implements Action {
    readonly type = FETCH_APPROVERS
    constructor(
        public payload: {
            applyType: string
            tabIndex: number
        }
    ) {}
}
export class FetchApproversSuccessAction implements Action {
    readonly type = FETCH_APPROVERS_SUCCESS
    constructor(
        public payload: {
            approvers: Approver[]
            tabIndex: number
        }
    ) {}
}
export class FetchApproversFailureAction implements Action {
    readonly type = FETCH_APPROVERS_FAILURE
    constructor(public tabIndex: number) {}
}

export class AddApplyResourcesAction implements Action {
    readonly type = ADD_APPLY_RESOURCES
    constructor(
        public payload: {
            applyResources: ResourceInfo[]
            tabIndex: number
        }
    ) {}
}
export class CreateApplyResourceAction implements Action {
    readonly type = CREATE_APPLY_RESOURCE
    constructor(
        public payload: {
            applyResource: ResourceInfo
            tabIndex: number
        }
    ) {}
}
export class EditTempApplyResourceAction implements Action {
    readonly type = EDIT_TEMP_APPLY_RESOURCE
    constructor(
        public payload: {
            resource: ResourceInfo
            tabIndex: number
        }
    ) {}
}
export class DeleteApplyResourceAction implements Action {
    readonly type = DELETE_APPLY_RESOURCE
    constructor(public payload: { tabIndex: number; resourceIndex: number }) {}
}

export class CancelEditSystemOnOffApplyAction implements Action {
    readonly type = CANCEL_EDIT_SYSTEM_ONOFF_APPLY
    constructor(public tabIndex: number) {}
}
export class EnsureEditSystemOnOffApplyAction implements Action {
    readonly type = ENSURE_EDIT_SYSTEM_ONOFF_APPLY
    constructor(public tabIndex: number) {}
}
export class EnsureEditSystemOnOffApplySuccessAction implements Action {
    readonly type = ENSURE_EDIT_SYSTEM_ONOFF_APPLY_SUCCESS
    constructor(public tabIndex: number) {}
}
export class EnsureEditSystemOnOffApplyFailureAction implements Action {
    readonly type = ENSURE_EDIT_SYSTEM_ONOFF_APPLY_FAILURE
    constructor(public tabIndex: number) {}
}

export class CloseExtraTabAction implements Action {
    readonly type = CLOSE_EXTRA_TAB
    constructor(public id: string) {}
}

export class ResetNeedManualSetTabIndexAction implements Action {
    readonly type = RESET_NEED_MANUAL_SET_TAB_INDEX
}

export class MaxTabsWarningAction implements Action {
    readonly type = MAX_TABS_WARNING
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
    | CancelEditSystemOnOffApplyAction
    | CancelEditSystemOnOffApplyAction
    | EnsureEditSystemOnOffApplyAction
    | EnsureEditSystemOnOffApplySuccessAction
    | EnsureEditSystemOnOffApplyFailureAction
    | CloseExtraTabAction
    | ResetNeedManualSetTabIndexAction
    | MaxTabsWarningAction
