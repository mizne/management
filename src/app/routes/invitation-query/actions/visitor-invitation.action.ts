import { Action } from '@ngrx/store'

import {
  VisitorInvitation,
  VisitorInvitationStatus,
  FetchVisitorInvitationsParams,
  FetchVisitorInvitationsCountParams,
  defaultFetchVisitorInvitationsParams,
  defaultFetchVisitorInvitationsCountParams,
} from '@core/models/visitor-invitation.model'
import {
  PaginationParams,
} from '@core/models/pagination.model'

export const FETCH_VISITOR_INVITATIONS = '[Invitation Query] Fetch Visitor Invitations'
export const FETCH_VISITOR_INVITATIONS_SUCCESS =
  '[Invitation Query] Fetch Visitor Invitations Success'
export const FETCH_VISITOR_INVITATIONS_FAILURE =
  '[Invitation Query] Fetch Visitor Invitations Failure'

export const RESET_FETCH_VISITOR_INVITATIONS =
  '[Invitation Query] Reset Fetch Visitor Invitations'
export const RESET_FETCH_VISITOR_INVITATIONS_SUCCESS =
  '[Invitation Query] Reset Fetch Visitor Invitations Success'
export const RESET_FETCH_VISITOR_INVITATIONS_FAILURE =
  '[Invitation Query] Reset Fetch Visitor Invitations Failure'

export const FETCH_VISITOR_INVITATIONS_COUNT =
  '[Invitation Query] Fetch Visitor Invitations Count'
export const FETCH_VISITOR_INVITATIONS_COUNT_SUCCESS =
  '[Invitation Query] Fetch Visitor Invitations Count Success'
export const FETCH_VISITOR_INVITATIONS_COUNT_FAILURE =
  '[Invitation Query] Fetch Visitor Invitations Count Failure'

export const RESET_FETCH_VISITOR_INVITATIONS_COUNT =
  '[Invitation Query] Reset Fetch Visitor Invitations Count'
export const RESET_FETCH_VISITOR_INVITATIONS_COUNT_SUCCESS =
  '[Invitation Query] Reset Fetch Visitor Invitations Count Success'
export const RESET_FETCH_VISITOR_INVITATIONS_COUNT_FAILURE =
  '[Invitation Query] Reset Fetch Visitor Invitations Count Failure'

export const SINGLE_DELETE_VISITOR_INVITATION =
  '[Invitation Query] Single Delete Visitor Invitation'
export const SINGLE_DELETE_VISITOR_INVITATION_SUCCESS =
  '[Invitation Query] Single Delete Visitor Invitation Success'
export const SINGLE_DELETE_VISITOR_INVITATION_FAILURE =
  '[Invitation Query] Single Delete Visitor Invitation Failure'

export const BATCH_DELETE_VISITOR_INVITATIONS =
  '[Invitation Query] Batch Delete Visitor Invitations'
export const BATCH_DELETE_VISITOR_INVITATIONS_SUCCESS =
  '[Invitation Query] Batch Delete Visitor Invitations Success'
export const BATCH_DELETE_VISITOR_INVITATIONS_FAILURE =
  '[Invitation Query] Batch Delete Visitor Invitations Failure'

export const ENSURE_VISITOR_PAGE_PARAMS = '[Invitation Query] Ensure Visitor Page Params'


export class FetchVisitorInvitationsAction implements Action {
  readonly type = FETCH_VISITOR_INVITATIONS
  constructor(
    public payload: FetchVisitorInvitationsParams = defaultFetchVisitorInvitationsParams
  ) {}
}
export class FetchVisitorInvitationsSuccessAction implements Action {
  readonly type = FETCH_VISITOR_INVITATIONS_SUCCESS
  constructor(public invitations: VisitorInvitation[]) {}
}
export class FetchVisitorInvitationsFailureAction implements Action {
  readonly type = FETCH_VISITOR_INVITATIONS_FAILURE
}

export class ResetFetchVisitorInvitationsAction implements Action {
  readonly type = RESET_FETCH_VISITOR_INVITATIONS
  constructor(
    public payload: FetchVisitorInvitationsParams = defaultFetchVisitorInvitationsParams
  ) {}
}
export class ResetFetchVisitorInvitationsSuccessAction implements Action {
  readonly type = RESET_FETCH_VISITOR_INVITATIONS_SUCCESS
  constructor(public invitations: VisitorInvitation[]) {}
}
export class ResetFetchVisitorInvitationsFailureAction implements Action {
  readonly type = RESET_FETCH_VISITOR_INVITATIONS_FAILURE
}

export class FetchVisitorInvitationsCountAction implements Action {
  readonly type = FETCH_VISITOR_INVITATIONS_COUNT
  constructor(public payload: FetchVisitorInvitationsCountParams = defaultFetchVisitorInvitationsCountParams) {}
}
export class FetchVisitorInvitationsCountSuccessAction implements Action {
  readonly type = FETCH_VISITOR_INVITATIONS_COUNT_SUCCESS
  constructor(public count: number) {}
}
export class FetchVisitorInvitationsCountFailureAction implements Action {
  readonly type = FETCH_VISITOR_INVITATIONS_COUNT_FAILURE
}

export class ResetFetchVisitorInvitationsCountAction implements Action {
  readonly type = RESET_FETCH_VISITOR_INVITATIONS_COUNT
  constructor(public payload: FetchVisitorInvitationsCountParams = defaultFetchVisitorInvitationsCountParams) {}
}
export class ResetFetchVisitorInvitationsCountSuccessAction implements Action {
  readonly type = RESET_FETCH_VISITOR_INVITATIONS_COUNT_SUCCESS
  constructor(public count: number) {}
}
export class ResetFetchVisitorInvitationsCountFailureAction implements Action {
  readonly type = RESET_FETCH_VISITOR_INVITATIONS_COUNT_FAILURE
}

export class SingleDeleteVisitorInvitationAction implements Action {
  readonly type = SINGLE_DELETE_VISITOR_INVITATION
  constructor(public id: string) {}
}
export class SingleDeleteVisitorInvitationSuccessAction implements Action {
  readonly type = SINGLE_DELETE_VISITOR_INVITATION_SUCCESS
}
export class SingleDeleteVisitorInvitationFailureAction implements Action {
  readonly type = SINGLE_DELETE_VISITOR_INVITATION_FAILURE
}

export class BatchDeleteVisitorInvitationsAction implements Action {
  readonly type = BATCH_DELETE_VISITOR_INVITATIONS
  constructor(public ids: string[]) {}
}
export class BatchDeleteVisitorInvitationsSuccessAction implements Action {
  readonly type = BATCH_DELETE_VISITOR_INVITATIONS_SUCCESS
}
export class BatchDeleteVisitorInvitationsFailureAction implements Action {
  readonly type = BATCH_DELETE_VISITOR_INVITATIONS_FAILURE
}

export class EnsureVisitorPageParamsAction implements Action {
  readonly type = ENSURE_VISITOR_PAGE_PARAMS
  constructor(public params: PaginationParams) {}
}


export type Actions =
  | FetchVisitorInvitationsAction
  | FetchVisitorInvitationsSuccessAction
  | FetchVisitorInvitationsFailureAction
  | ResetFetchVisitorInvitationsAction
  | ResetFetchVisitorInvitationsSuccessAction
  | ResetFetchVisitorInvitationsFailureAction
  | FetchVisitorInvitationsCountAction
  | FetchVisitorInvitationsCountSuccessAction
  | FetchVisitorInvitationsCountFailureAction
  | ResetFetchVisitorInvitationsCountAction
  | ResetFetchVisitorInvitationsCountFailureAction
  | ResetFetchVisitorInvitationsCountSuccessAction
  | SingleDeleteVisitorInvitationAction
  | SingleDeleteVisitorInvitationSuccessAction
  | SingleDeleteVisitorInvitationFailureAction
  | BatchDeleteVisitorInvitationsAction
  | BatchDeleteVisitorInvitationsSuccessAction
  | BatchDeleteVisitorInvitationsFailureAction
  | EnsureVisitorPageParamsAction

