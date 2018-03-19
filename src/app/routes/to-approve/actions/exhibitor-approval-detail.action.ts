import { Action } from '@ngrx/store'
import { ExhibitorInvitation } from '@core/models/exhibitor-invitation.model'

export const FETCH_EXHIBITOR_APPROVAL_DETAIL =
    '[Exhibitor Approval Detail] Fetch Exhibitor Approval Detail'
export const FETCH_EXHIBITOR_APPROVAL_DETAIL_SUCCESS =
    '[Exhibitor Approval Detail] Fetch Exhibitor Approval Detail Success'
export const FETCH_EXHIBITOR_APPROVAL_DETAIL_FAILURE =
    '[Exhibitor Approval Detail] Fetch Exhibitor Approval Detail Failure'

export class FetchExhibitorApprovalDetailAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVAL_DETAIL
    constructor(public id: string) {}
}
export class FetchExhibitorApprovalDetailSuccessAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVAL_DETAIL_SUCCESS
    constructor(public exhibitorApproval: ExhibitorInvitation) {}
}
export class FetchExhibitorApprovalDetailFailureAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVAL_DETAIL_FAILURE
}

export type Actions =
    | FetchExhibitorApprovalDetailAction
    | FetchExhibitorApprovalDetailSuccessAction
    | FetchExhibitorApprovalDetailFailureAction
