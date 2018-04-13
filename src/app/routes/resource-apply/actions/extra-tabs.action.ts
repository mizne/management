import { Action } from '@ngrx/store'

import {
    RequirementApply,
    ApplyInfo,
    Approver
} from '@core/models/resource-apply.model'
import { ResourceInfo } from '@core/models/resource-info.model'

export const SWITCH_APPLY_TYPE = '[Resource Extra Tabs] Switch Apply Type'

export const FETCH_APPLY_INFO = '[Resource Extra Tabs] Fetch Apply Info'
export const FETCH_APPLY_INFO_SUCCESS =
    '[Resource Extra Tabs] Fetch Apply Info Success'
export const FETCH_APPLY_INFO_FAILURE =
    '[Resource Extra Tabs] Fetch Apply Info Failure'

export const FETCH_APPROVERS = '[Resource Extra Tabs] Fetch Approver'
export const FETCH_APPROVERS_SUCCESS =
    '[Resource Extra Tabs] Fetch Approver Success'
export const FETCH_APPROVERS_FAILURE =
    '[Resource Extra Tabs] Fetch Approver Failure'

export const ADD_APPLY_RESOURCES = '[Resource Extra Tabs] Add Apply Resources'
export const CREATE_APPLY_RESOURCE =
    '[Resource Extra Tabs] Create Apply Resource'
export const EDIT_TEMP_APPLY_RESOURCE =
    '[Resource Extra Tabs] Edit Temp Apply Resource'
export const DELETE_APPLY_RESOURCE =
    '[Resource Extra Tabs] Delete Apply Resource'

export const CANCEL_EDIT_REQUIREMENT_APPLY =
    '[Resource Extra Tabs] Cancel Edit Requirement Apply'

export const ENSURE_EDIT_REQUIREMENT_APPLY =
    '[Resource Extra Tabs] Ensure Edit Requirement Apply'
export const ENSURE_EDIT_REQUIREMENT_APPLY_SUCCESS =
    '[Resource Extra Tabs] Ensure Edit Requirement Apply Success'
export const ENSURE_EDIT_REQUIREMENT_APPLY_FAILURE =
    '[Resource Extra Tabs] Ensure Edit Requirement Apply Failure'

export const CLOSE_EXTRA_TAB = '[Resource Extra Tabs] Close Extra Tab'
export const RESET_NEED_MANUAL_SET_TAB_INDEX =
    '[Resource Extra Tabs] Reset Need Manual Set Tab Index'

export const MAX_TABS_WARNING = '[Resource Extra Tabs] Max Tabs Warning'
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

export class CancelEditRequirementApplyAction implements Action {
    readonly type = CANCEL_EDIT_REQUIREMENT_APPLY
    constructor(public tabIndex: number) {}
}
export class EnsureEditRequirementApplyAction implements Action {
    readonly type = ENSURE_EDIT_REQUIREMENT_APPLY
    constructor(public tabIndex: number) {}
}
export class EnsureEditRequirementApplySuccessAction implements Action {
    readonly type = ENSURE_EDIT_REQUIREMENT_APPLY_SUCCESS
    constructor(public tabIndex: number) {}
}
export class EnsureEditRequirementApplyFailureAction implements Action {
    readonly type = ENSURE_EDIT_REQUIREMENT_APPLY_FAILURE
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
    | CancelEditRequirementApplyAction
    | CancelEditRequirementApplyAction
    | EnsureEditRequirementApplyAction
    | EnsureEditRequirementApplySuccessAction
    | EnsureEditRequirementApplyFailureAction
    | CloseExtraTabAction
    | ResetNeedManualSetTabIndexAction
    | MaxTabsWarningAction
