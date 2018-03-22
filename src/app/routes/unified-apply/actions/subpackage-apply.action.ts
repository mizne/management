import { Action } from '@ngrx/store'
import {
    ApplyInfo,
    ApplyResource,
    Approver,
    SubPackageInfo
} from '@core/models/unified-apply.model'

export const FETCH_SUBPACKAGE_INFO = '[SubPackage Apply] Fetch SubPackage Info'
export const FETCH_SUBPACKAGE_INFO_SUCCESS =
    '[SubPackage Apply] Fetch SubPackage Info Success'
export const FETCH_SUBPACKAGE_INFO_FAILURE =
    '[SubPackage Apply] Fetch SubPackage Info Failure'

export const ADD_APPLY_RESOURCES = '[SubPackage Apply] Add Apply Resources'
export const DELETE_APPLY_RESOURCE = '[SubPackage Apply] Delete Apply Resource'

export const SAVE_SUBPACKAGE_APPLY = '[SubPackage Apply] Save SubPackage Apply'
export const SAVE_SUBPACKAGE_APPLY_SUCCESS =
    '[SubPackage Apply] Save SubPackage Apply Success'
export const SAVE_SUBPACKAGE_APPLY_FAILURE =
    '[SubPackage Apply] Save SubPackage Apply Failure'

export const SUBMIT_SUBPACKAGE_APPLY =
    '[SubPackage Apply] Submit SubPackage Apply'
export const SUBMIT_SUBPACKAGE_APPLY_SUCCESS =
    '[SubPackage Apply] Submit SubPackage Apply Success'
export const SUBMIT_SUBPACKAGE_APPLY_FAILURE =
    '[SubPackage Apply] Submit SubPackage Apply Failure'

export const RESET_SUBPACKAGE_APPLY =
    '[SubPackage Apply] Reset SubPackage Apply'

export class FetchSubPackageInfoAction implements Action {
    readonly type = FETCH_SUBPACKAGE_INFO
}
export class FetchSubPackageInfoSuccessAction implements Action {
    readonly type = FETCH_SUBPACKAGE_INFO_SUCCESS
    constructor(public subpackageInfo: SubPackageInfo) {}
}
export class FetchSubPackageInfoFailureAction implements Action {
    readonly type = FETCH_SUBPACKAGE_INFO_FAILURE
}

export class AddApplyResourcesAction implements Action {
    readonly type = ADD_APPLY_RESOURCES
    constructor(public applyResources: ApplyResource[]) {}
}
export class DeleteApplyResourceAction implements Action {
    readonly type = DELETE_APPLY_RESOURCE
    constructor(public index: number) {}
}

export class SaveSubPackageApplyAction implements Action {
    readonly type = SAVE_SUBPACKAGE_APPLY
}
export class SaveSubPackageApplySuccessAction implements Action {
    readonly type = SAVE_SUBPACKAGE_APPLY_SUCCESS
}
export class SaveSubPackageApplyFailureAction implements Action {
    readonly type = SAVE_SUBPACKAGE_APPLY_FAILURE
}

export class SubmitSubPackageApplyAction implements Action {
    readonly type = SUBMIT_SUBPACKAGE_APPLY
}
export class SubmitSubPackageApplySuccessAction implements Action {
    readonly type = SUBMIT_SUBPACKAGE_APPLY_SUCCESS
}
export class SubmitSubPackageApplyFailureAction implements Action {
    readonly type = SUBMIT_SUBPACKAGE_APPLY_FAILURE
}

export class ResetSubPackageApplyAction implements Action {
    readonly type = RESET_SUBPACKAGE_APPLY
}

export type Actions =
    | FetchSubPackageInfoAction
    | FetchSubPackageInfoSuccessAction
    | FetchSubPackageInfoFailureAction
    | AddApplyResourcesAction
    | DeleteApplyResourceAction
    | SaveSubPackageApplyAction
    | SaveSubPackageApplySuccessAction
    | SaveSubPackageApplyFailureAction
    | SubmitSubPackageApplyAction
    | SubmitSubPackageApplySuccessAction
    | SubmitSubPackageApplyFailureAction
    | ResetSubPackageApplyAction
