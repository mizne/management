import { Action } from '@ngrx/store'

import {
    RequirementApply,
    ApplyInfo,
    ApplyResource,
    Approver
} from '@core/models/resource-apply.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_SAVED_APPLIES = '[Resource Saved Apply] Fetch Saved Applies'
export const FETCH_SAVED_APPLIES_SUCCESS =
    '[Resource Saved Apply] Fetch Saved Applies Success'
export const FETCH_SAVED_APPLIES_FAILURE =
    '[Resource Saved Apply] Fetch Saved Applies Failure'

export const TO_EDIT_SAVED_APPLY = '[Resource Saved Apply] To Edit Saved Apply'

export const TO_DETAIL_SAVED_APPLY = '[Resource Saved Apply] To Detail Saved Apply'

export const SUBMIT_SAVED_APPLY = '[Resource Saved Apply] Submit Saved Apply'
export const SUBMIT_SAVED_APPLY_SUCCESS =
    '[Resource Saved Apply] Submit Saved Apply Success'
export const SUBMIT_SAVED_APPLY_FAILURE =
    '[Resource Saved Apply] Submit Saved Apply Failure'

export const DELETE_SAVED_APPLY = '[Resource Saved Apply] Delete Saved Apply'
export const DELETE_SAVED_APPLY_SUCCESS =
    '[Resource Saved Apply] Delete Saved Apply Success'
export const DELETE_SAVED_APPLY_FAILURE =
    '[Resource Saved Apply] Delete Saved Apply Failure'

export class FetchSavedAppliesAction implements Action {
    readonly type = FETCH_SAVED_APPLIES
}
export class FetchSavedAppliesSuccessAction implements Action {
    readonly type = FETCH_SAVED_APPLIES_SUCCESS
    constructor(public requirementApplies: RequirementApply[]) {}
}
export class FetchSavedAppliesFailureAction implements Action {
    readonly type = FETCH_SAVED_APPLIES_FAILURE
}

export class ToEditSavedApplyAction implements Action {
    readonly type = TO_EDIT_SAVED_APPLY
    constructor(public apply: RequirementApply) {}
}
export class ToDetailSavedApplyAction implements Action {
    readonly type = TO_DETAIL_SAVED_APPLY
    constructor(public apply: RequirementApply) {}
}

export class SubmitSavedApplyAction implements Action {
    readonly type = SUBMIT_SAVED_APPLY
    constructor(public apply: RequirementApply) {}
}
export class SubmitSavedApplySuccessAction implements Action {
    readonly type = SUBMIT_SAVED_APPLY_SUCCESS
}
export class SubmitSavedApplyFailureAction implements Action {
    readonly type = SUBMIT_SAVED_APPLY_FAILURE
}

export class DeleteSavedApplyAction implements Action {
    readonly type = DELETE_SAVED_APPLY
    constructor(public apply: RequirementApply) {}
}
export class DeleteSavedApplySuccessAction implements Action {
    readonly type = DELETE_SAVED_APPLY_SUCCESS
}
export class DeleteSavedApplyFailureAction implements Action {
    readonly type = DELETE_SAVED_APPLY_FAILURE
}

export type Actions =
    | FetchSavedAppliesAction
    | FetchSavedAppliesSuccessAction
    | FetchSavedAppliesFailureAction
    | ToEditSavedApplyAction
    | ToDetailSavedApplyAction
    | SubmitSavedApplyAction
    | SubmitSavedApplySuccessAction
    | SubmitSavedApplyFailureAction
    | DeleteSavedApplyAction
    | DeleteSavedApplySuccessAction
    | DeleteSavedApplyFailureAction
