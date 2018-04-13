import { Action } from '@ngrx/store'

import {
    VersionReleaseApply,
    ApplyInfo,
    Approver
} from '@core/models/version-release.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_SAVED_APPLIES = '[Version Release Saved Apply] Fetch Saved Applies'
export const FETCH_SAVED_APPLIES_SUCCESS =
    '[Version Release Saved Apply] Fetch Saved Applies Success'
export const FETCH_SAVED_APPLIES_FAILURE =
    '[Version Release Saved Apply] Fetch Saved Applies Failure'

export const TO_EDIT_SAVED_APPLY = '[Version Release Saved Apply] To Edit Saved Apply'

export const TO_DETAIL_SAVED_APPLY = '[Version Release Saved Apply] To Detail Saved Apply'

export const SUBMIT_SAVED_APPLY = '[Version Release Saved Apply] Submit Saved Apply'
export const SUBMIT_SAVED_APPLY_SUCCESS =
    '[Version Release Saved Apply] Submit Saved Apply Success'
export const SUBMIT_SAVED_APPLY_FAILURE =
    '[Version Release Saved Apply] Submit Saved Apply Failure'

export const DELETE_SAVED_APPLY = '[Version Release Saved Apply] Delete Saved Apply'
export const DELETE_SAVED_APPLY_SUCCESS =
    '[Version Release Saved Apply] Delete Saved Apply Success'
export const DELETE_SAVED_APPLY_FAILURE =
    '[Version Release Saved Apply] Delete Saved Apply Failure'

export class FetchSavedAppliesAction implements Action {
    readonly type = FETCH_SAVED_APPLIES
}
export class FetchSavedAppliesSuccessAction implements Action {
    readonly type = FETCH_SAVED_APPLIES_SUCCESS
    constructor(public requirementApplies: VersionReleaseApply[]) {}
}
export class FetchSavedAppliesFailureAction implements Action {
    readonly type = FETCH_SAVED_APPLIES_FAILURE
}

export class ToEditSavedApplyAction implements Action {
    readonly type = TO_EDIT_SAVED_APPLY
    constructor(public apply: VersionReleaseApply) {}
}
export class ToDetailSavedApplyAction implements Action {
    readonly type = TO_DETAIL_SAVED_APPLY
    constructor(public apply: VersionReleaseApply) {}
}

export class SubmitSavedApplyAction implements Action {
    readonly type = SUBMIT_SAVED_APPLY
    constructor(public apply: VersionReleaseApply) {}
}
export class SubmitSavedApplySuccessAction implements Action {
    readonly type = SUBMIT_SAVED_APPLY_SUCCESS
}
export class SubmitSavedApplyFailureAction implements Action {
    readonly type = SUBMIT_SAVED_APPLY_FAILURE
}

export class DeleteSavedApplyAction implements Action {
    readonly type = DELETE_SAVED_APPLY
    constructor(public apply: VersionReleaseApply) {}
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
