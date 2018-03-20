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

export const FETCH_SAVED_APPLIES = '[Saved Apply] Fetch Saved Applies'
export const FETCH_SAVED_APPLIES_SUCCESS =
    '[Saved Apply] Fetch Saved Applies Success'
export const FETCH_SAVED_APPLIES_FAILURE =
    '[Saved Apply] Fetch Saved Applies Failure'

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

export type Actions =
    | FetchSavedAppliesAction
    | FetchSavedAppliesSuccessAction
    | FetchSavedAppliesFailureAction
