import { Action } from '@ngrx/store'

import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'
import { UnifiedApply, SubPackageApply } from '@core/models/unified-apply.model'

export const FETCH_UNIFIED_APPLIES =
    '[Unified Saved Apply] Fetch Unified Applies'
export const FETCH_UNIFIED_APPLIES_SUCCESS =
    '[Unified Saved Apply] Fetch Unified Applies Success'
export const FETCH_UNIFIED_APPLIES_FAILURE =
    '[Unified Saved Apply] Fetch Unified Applies Failure'

export const TO_EDIT_UNIFIED_APPLY =
    '[Unified Saved Apply] To Edit Unified Apply'

export const TO_DETAIL_UNIFIED_APPLY =
    '[Unified Saved Apply] To Detail Unified Apply'

export const SUBMIT_UNIFIED_APPLY = '[Unified Saved Apply] Submit Unified Apply'
export const SUBMIT_UNIFIED_APPLY_SUCCESS =
    '[Unified Saved Apply] Submit Unified Apply Success'
export const SUBMIT_UNIFIED_APPLY_FAILURE =
    '[Unified Saved Apply] Submit Unified Apply Failure'

export const DELETE_UNIFIED_APPLY = '[Unified Saved Apply] Delete Unified Apply'
export const DELETE_UNIFIED_APPLY_SUCCESS =
    '[Unified Saved Apply] Delete Unified Apply Success'
export const DELETE_UNIFIED_APPLY_FAILURE =
    '[Unified Saved Apply] Delete Unified Apply Failure'

export const FETCH_SUBPACKAGE_APPLIES =
    '[Unified Saved Apply] Fetch SubPackage Applies'
export const FETCH_SUBPACKAGE_APPLIES_SUCCESS =
    '[Unified Saved Apply] Fetch SubPackage Applies Success'
export const FETCH_SUBPACKAGE_APPLIES_FAILURE =
    '[Unified Saved Apply] Fetch SubPackage Applies Failure'

export const TO_EDIT_SUBPACKAGE_APPLY =
    '[Unified Saved Apply] To Edit SubPackage Apply'

export const TO_DETAIL_SUBPACKAGE_APPLY =
    '[Unified Saved Apply] To Detail SubPackage Apply'

export const SUBMIT_SUBPACKAGE_APPLY =
    '[Unified Saved Apply] Submit SubPackage Apply'
export const SUBMIT_SUBPACKAGE_APPLY_SUCCESS =
    '[Unified Saved Apply] Submit SubPackage Apply Success'
export const SUBMIT_SUBPACKAGE_APPLY_FAILURE =
    '[Unified Saved Apply] Submit SubPackage Apply Failure'

export const DELETE_SUBPACKAGE_APPLY =
    '[Unified Saved Apply] Delete SubPackage Apply'
export const DELETE_SUBPACKAGE_APPLY_SUCCESS =
    '[Unified Saved Apply] Delete SubPackage Apply Success'
export const DELETE_SUBPACKAGE_APPLY_FAILURE =
    '[Unified Saved Apply] Delete SubPackage Apply Failure'

export class FetchSavedUnifiedAppliesAction implements Action {
    readonly type = FETCH_UNIFIED_APPLIES
}
export class FetchSavedUnifiedAppliesSuccessAction implements Action {
    readonly type = FETCH_UNIFIED_APPLIES_SUCCESS
    constructor(public unifiedApplies: UnifiedApply[]) {}
}
export class FetchSavedUnifiedAppliesFailureAction implements Action {
    readonly type = FETCH_UNIFIED_APPLIES_FAILURE
}

export class ToEditSavedUnifiedApplyAction implements Action {
    readonly type = TO_EDIT_UNIFIED_APPLY
    constructor(public apply: UnifiedApply) {}
}
export class ToDetailSavedUnifiedApplyAction implements Action {
    readonly type = TO_DETAIL_UNIFIED_APPLY
    constructor(public apply: UnifiedApply) {}
}

export class SubmitSavedUnifiedApplyAction implements Action {
    readonly type = SUBMIT_UNIFIED_APPLY
    constructor(public apply: UnifiedApply) {}
}
export class SubmitSavedUnifiedApplySuccessAction implements Action {
    readonly type = SUBMIT_UNIFIED_APPLY_SUCCESS
}
export class SubmitSavedUnifiedApplyFailureAction implements Action {
    readonly type = SUBMIT_UNIFIED_APPLY_FAILURE
}

export class DeleteSavedUnifiedApplyAction implements Action {
    readonly type = DELETE_UNIFIED_APPLY
    constructor(public apply: UnifiedApply) {}
}
export class DeleteSavedUnifiedApplySuccessAction implements Action {
    readonly type = DELETE_UNIFIED_APPLY_SUCCESS
}
export class DeleteSavedUnifiedApplyFailureAction implements Action {
    readonly type = DELETE_UNIFIED_APPLY_FAILURE
}

export class FetchSavedSubPackageAppliesAction implements Action {
    readonly type = FETCH_SUBPACKAGE_APPLIES
}
export class FetchSavedSubPackageAppliesSuccessAction implements Action {
    readonly type = FETCH_SUBPACKAGE_APPLIES_SUCCESS
    constructor(public subPackageApplies: SubPackageApply[]) {}
}
export class FetchSavedSubPackageAppliesFailureAction implements Action {
    readonly type = FETCH_SUBPACKAGE_APPLIES_FAILURE
}

export class ToEditSavedSubPackageApplyAction implements Action {
    readonly type = TO_EDIT_SUBPACKAGE_APPLY
    constructor(public apply: SubPackageApply) {}
}
export class ToDetailSavedSubPackageApplyAction implements Action {
    readonly type = TO_DETAIL_SUBPACKAGE_APPLY
    constructor(public apply: SubPackageApply) {}
}

export class SubmitSavedSubPackageApplyAction implements Action {
    readonly type = SUBMIT_SUBPACKAGE_APPLY
    constructor(public apply: SubPackageApply) {}
}
export class SubmitSavedSubPackageApplySuccessAction implements Action {
    readonly type = SUBMIT_SUBPACKAGE_APPLY_SUCCESS
}
export class SubmitSavedSubPackageApplyFailureAction implements Action {
    readonly type = SUBMIT_SUBPACKAGE_APPLY_FAILURE
}

export class DeleteSavedSubPackageApplyAction implements Action {
    readonly type = DELETE_SUBPACKAGE_APPLY
    constructor(public apply: SubPackageApply) {}
}
export class DeleteSavedSubPackageApplySuccessAction implements Action {
    readonly type = DELETE_SUBPACKAGE_APPLY_SUCCESS
}
export class DeleteSavedSubPackageApplyFailureAction implements Action {
    readonly type = DELETE_SUBPACKAGE_APPLY_FAILURE
}

export type Actions =
    | FetchSavedUnifiedAppliesAction
    | FetchSavedUnifiedAppliesSuccessAction
    | FetchSavedUnifiedAppliesFailureAction
    | ToEditSavedUnifiedApplyAction
    | ToDetailSavedUnifiedApplyAction
    | SubmitSavedUnifiedApplyAction
    | SubmitSavedUnifiedApplySuccessAction
    | SubmitSavedUnifiedApplyFailureAction
    | DeleteSavedUnifiedApplyAction
    | DeleteSavedUnifiedApplySuccessAction
    | DeleteSavedUnifiedApplyFailureAction
    | FetchSavedSubPackageAppliesAction
    | FetchSavedSubPackageAppliesSuccessAction
    | FetchSavedSubPackageAppliesFailureAction
    | ToEditSavedSubPackageApplyAction
    | ToDetailSavedSubPackageApplyAction
    | SubmitSavedSubPackageApplyAction
    | SubmitSavedSubPackageApplySuccessAction
    | SubmitSavedSubPackageApplyFailureAction
    | DeleteSavedSubPackageApplyAction
    | DeleteSavedSubPackageApplySuccessAction
    | DeleteSavedSubPackageApplyFailureAction
