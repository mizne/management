import { Action } from '@ngrx/store'

import {
    VersionReleaseApply,
    ApplyInfo,
    Approver
} from '@core/models/version-release.model'
import { ResourceInfo } from '@core/models/resource-info.model'


export const FETCH_APPLY_INFO = '[Version Release Extra Tabs] Fetch Apply Info'
export const FETCH_APPLY_INFO_SUCCESS =
    '[Version Release Extra Tabs] Fetch Apply Info Success'
export const FETCH_APPLY_INFO_FAILURE =
    '[Version Release Extra Tabs] Fetch Apply Info Failure'

export const FETCH_APPROVERS = '[Version Release Extra Tabs] Fetch Approver'
export const FETCH_APPROVERS_SUCCESS =
    '[Version Release Extra Tabs] Fetch Approver Success'
export const FETCH_APPROVERS_FAILURE =
    '[Version Release Extra Tabs] Fetch Approver Failure'

export const ADD_APPLY_RESOURCES =
    '[Version Release Extra Tabs] Add Apply Resources'
export const CREATE_APPLY_RESOURCE =
    '[Version Release Extra Tabs] Create Apply Resource'
export const EDIT_TEMP_APPLY_RESOURCE =
    '[Version Release Extra Tabs] Edit Temp Apply Resource'
export const DELETE_APPLY_RESOURCE =
    '[Version Release Extra Tabs] Delete Apply Resource'

export const CANCEL_EDIT_VERSION_RELEASE_APPLY =
    '[Version Release Extra Tabs] Cancel Edit Version Release Apply'

export const ENSURE_EDIT_VERSION_RELEASE_APPLY =
    '[Version Release Extra Tabs] Ensure Edit Version Release Apply'
export const ENSURE_EDIT_VERSION_RELEASE_APPLY_SUCCESS =
    '[Version Release Extra Tabs] Ensure Edit Version Release Apply Success'
export const ENSURE_EDIT_VERSION_RELEASE_APPLY_FAILURE =
    '[Version Release Extra Tabs] Ensure Edit Version Release Apply Failure'

export const CLOSE_EXTRA_TAB = '[Version Release Extra Tabs] Close Extra Tab'
export const RESET_NEED_MANUAL_SET_TAB_INDEX =
    '[Version Release Extra Tabs] Reset Need Manual Set Tab Index'

export const MAX_TABS_WARNING = '[Version Release Extra Tabs] Max Tabs Warning'

export class FetchApplyInfoAction implements Action {
    readonly type = FETCH_APPLY_INFO
    constructor(
        public payload: {
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

export class CancelEditVersionReleaseApplyAction implements Action {
    readonly type = CANCEL_EDIT_VERSION_RELEASE_APPLY
    constructor(public tabIndex: number) {}
}
export class EnsureEditVersionReleaseApplyAction implements Action {
    readonly type = ENSURE_EDIT_VERSION_RELEASE_APPLY
    constructor(public tabIndex: number) {}
}
export class EnsureEditVersionReleaseApplySuccessAction implements Action {
    readonly type = ENSURE_EDIT_VERSION_RELEASE_APPLY_SUCCESS
    constructor(public tabIndex: number) {}
}
export class EnsureEditVersionReleaseApplyFailureAction implements Action {
    readonly type = ENSURE_EDIT_VERSION_RELEASE_APPLY_FAILURE
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
    | CancelEditVersionReleaseApplyAction
    | CancelEditVersionReleaseApplyAction
    | EnsureEditVersionReleaseApplyAction
    | EnsureEditVersionReleaseApplySuccessAction
    | EnsureEditVersionReleaseApplyFailureAction
    | CloseExtraTabAction
    | ResetNeedManualSetTabIndexAction
    | MaxTabsWarningAction
