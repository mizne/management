import { Action } from '@ngrx/store'

import {
    UnifiedApply,
    ApplyInfo,
    Approver
} from '@core/models/unified-apply.model'
import { ResourceInfo } from '@core/models/resource-info.model'

import { SubPackageInfo } from '@core/models/unified-apply.model'

export const ADD_APPLY_RESOURCES = '[Unified Extra Tabs] Add Apply Resources'
export const CREATE_APPLY_RESOURCE =
    '[Unified Extra Tabs] Create Apply Resource'
export const EDIT_TEMP_APPLY_RESOURCE =
    '[Unified Extra Tabs] Edit Temp Apply Resource'
export const DELETE_APPLY_RESOURCE =
    '[Unified Extra Tabs] Delete Apply Resource'

export const CANCEL_EDIT_APPLY = '[Unified Extra Tabs] Cancel Edit Apply'

export const ENSURE_EDIT_APPLY = '[Unified Extra Tabs] Ensure Edit Apply'
export const ENSURE_EDIT_UNIFIED_APPLY_SUCCESS =
    '[Unified Extra Tabs] Ensure Edit Unified Apply Success'
export const ENSURE_EDIT_UNIFIED_APPLY_FAILURE =
    '[Unified Extra Tabs] Ensure Edit Unified Apply Failure'

export const ENSURE_EDIT_SUBPACKAGE_APPLY_SUCCESS =
    '[Unified Extra Tabs] Ensure Edit SubPackage Apply Success'
export const ENSURE_EDIT_SUBPACKAGE_APPLY_FAILURE =
    '[Unified Extra Tabs] Ensure Edit SubPackage Apply Failure'

export const CLOSE_EXTRA_TAB = '[Unified Extra Tabs] Close Extra Tab'
export const RESET_NEED_MANUAL_SET_TAB_INDEX =
    '[Unified Extra Tabs] Reset Need Manual Set Tab Index'

export const MAX_TABS_WARNING = '[Unified Extra Tabs] Max Tabs Warning'

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

export class CancelEditApplyAction implements Action {
    readonly type = CANCEL_EDIT_APPLY
    constructor(public tabIndex: number) {}
}
export class EnsureEditApplyAction implements Action {
    readonly type = ENSURE_EDIT_APPLY
    constructor(public tabIndex: number) {}
}
export class EnsureEditUnifiedApplySuccessAction implements Action {
    readonly type = ENSURE_EDIT_UNIFIED_APPLY_SUCCESS
    constructor(public tabIndex: number) {}
}
export class EnsureEditUnifiedApplyFailureAction implements Action {
    readonly type = ENSURE_EDIT_UNIFIED_APPLY_FAILURE
    constructor(public tabIndex: number) {}
}
export class EnsureEdiSubPackageApplySuccessAction implements Action {
    readonly type = ENSURE_EDIT_UNIFIED_APPLY_SUCCESS
    constructor(public tabIndex: number) {}
}
export class EnsureEditSubPackageApplyFailureAction implements Action {
    readonly type = ENSURE_EDIT_UNIFIED_APPLY_FAILURE
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
    | AddApplyResourcesAction
    | CreateApplyResourceAction
    | EditTempApplyResourceAction
    | DeleteApplyResourceAction
    | CancelEditApplyAction
    | CancelEditApplyAction
    | EnsureEditApplyAction
    | EnsureEditUnifiedApplySuccessAction
    | EnsureEditUnifiedApplyFailureAction
    | EnsureEdiSubPackageApplySuccessAction
    | EnsureEditSubPackageApplyFailureAction
    | CloseExtraTabAction
    | ResetNeedManualSetTabIndexAction
