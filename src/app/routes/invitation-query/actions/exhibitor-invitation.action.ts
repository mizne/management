import { Action } from '@ngrx/store'
import { 
    ExhibitorInvitation,
    ExhibitorInvitationStatus,
    FetchExhibitorInvitationsParams,
    FetchExhibitorInvitationsCountParams,
    defaultFetchExhibitorInvitationsParams,
    defaultFetchExhibitorInvitationsCountParams,
 } from '@core/models/exhibitor-invitation.model'
import {
  PaginationParams,
} from '@core/models/pagination.model'

export const FETCH_EXHIBITOR_INVITATIONS = '[Invitation Query] Fetch Exhibitor Invitations'
export const FETCH_EXHIBITOR_INVITATIONS_SUCCESS =
  '[Invitation Query] Fetch Exhibitor Invitations Success'
export const FETCH_EXHIBITOR_INVITATIONS_FAILURE =
  '[Invitation Query] Fetch Exhibitor Invitations Failure'

export const RESET_FETCH_EXHIBITOR_INVITATIONS =
  '[Invitation Query] Reset Fetch Exhibitor Invitations'
export const RESET_FETCH_EXHIBITOR_INVITATIONS_SUCCESS =
  '[Invitation Query] Reset Fetch Exhibitor Invitations Success'
export const RESET_FETCH_EXHIBITOR_INVITATIONS_FAILURE =
  '[Invitation Query] Reset Fetch Exhibitor Invitations Failure'

export const FETCH_EXHIBITOR_INVITATIONS_COUNT =
  '[Invitation Query] Fetch Exhibitor Invitations Count'
export const FETCH_EXHIBITOR_INVITATIONS_COUNT_SUCCESS =
  '[Invitation Query] Fetch Exhibitor Invitations Count Success'
export const FETCH_EXHIBITOR_INVITATIONS_COUNT_FAILURE =
  '[Invitation Query] Fetch Exhibitor Invitations Count Failure'

export const RESET_FETCH_EXHIBITOR_INVITATIONS_COUNT =
  '[Invitation Query] Reset Fetch Exhibitor Invitations Count'
export const RESET_FETCH_EXHIBITOR_INVITATIONS_COUNT_SUCCESS =
  '[Invitation Query] Reset Fetch Exhibitor Invitations Count Success'
export const RESET_FETCH_EXHIBITOR_INVITATIONS_COUNT_FAILURE =
  '[Invitation Query] Reset Fetch Exhibitor Invitations Count Failure'

export const SINGLE_DELETE_EXHIBITOR_INVITATION =
  '[Invitation Query] Single Delete Exhibitor Invitation'
export const SINGLE_DELETE_EXHIBITOR_INVITATION_SUCCESS =
  '[Invitation Query] Single Delete Exhibitor Invitation Success'
export const SINGLE_DELETE_EXHIBITOR_INVITATION_FAILURE =
  '[Invitation Query] Single Delete Exhibitor Invitation Failure'

export const BATCH_DELETE_EXHIBITOR_INVITATIONS =
  '[Invitation Query] Batch Delete Exhibitor Invitations'
export const BATCH_DELETE_EXHIBITOR_INVITATIONS_SUCCESS =
  '[Invitation Query] Batch Delete Exhibitor Invitations Success'
export const BATCH_DELETE_EXHIBITOR_INVITATIONS_FAILURE =
  '[Invitation Query] Batch Delete Exhibitor Invitations Failure'

export const ENSURE_EXHIBITOR_PAGE_PARAMS = '[Invitation Query] Ensure Exhibitor Page Params'




export class FetchExhibitorInvitationsAction implements Action {
    readonly type = FETCH_EXHIBITOR_INVITATIONS
    constructor(
      public payload: FetchExhibitorInvitationsParams = defaultFetchExhibitorInvitationsParams
    ) {}
  }
  export class FetchExhibitorInvitationsSuccessAction implements Action {
    readonly type = FETCH_EXHIBITOR_INVITATIONS_SUCCESS
    constructor(public invitations: ExhibitorInvitation[]) {}
  }
  export class FetchExhibitorInvitationsFailureAction implements Action {
    readonly type = FETCH_EXHIBITOR_INVITATIONS_FAILURE
  }
  
  export class ResetFetchExhibitorInvitationsAction implements Action {
    readonly type = RESET_FETCH_EXHIBITOR_INVITATIONS
    constructor(
      public payload: FetchExhibitorInvitationsParams = defaultFetchExhibitorInvitationsParams
    ) {}
  }
  export class ResetFetchExhibitorInvitationsSuccessAction implements Action {
    readonly type = RESET_FETCH_EXHIBITOR_INVITATIONS_SUCCESS
    constructor(public invitations: ExhibitorInvitation[]) {}
  }
  export class ResetFetchExhibitorInvitationsFailureAction implements Action {
    readonly type = RESET_FETCH_EXHIBITOR_INVITATIONS_FAILURE
  }
  
  export class FetchExhibitorInvitationsCountAction implements Action {
    readonly type = FETCH_EXHIBITOR_INVITATIONS_COUNT
    constructor(public payload: FetchExhibitorInvitationsCountParams = defaultFetchExhibitorInvitationsCountParams) {}
  }
  export class FetchExhibitorInvitationsCountSuccessAction implements Action {
    readonly type = FETCH_EXHIBITOR_INVITATIONS_COUNT_SUCCESS
    constructor(public count: number) {}
  }
  export class FetchExhibitorInvitationsCountFailureAction implements Action {
    readonly type = FETCH_EXHIBITOR_INVITATIONS_COUNT_FAILURE
  }
  
  export class ResetFetchExhibitorInvitationsCountAction implements Action {
    readonly type = RESET_FETCH_EXHIBITOR_INVITATIONS_COUNT
    constructor(public payload: FetchExhibitorInvitationsCountParams = defaultFetchExhibitorInvitationsCountParams) {}
  }
  export class ResetFetchExhibitorInvitationsCountSuccessAction implements Action {
    readonly type = RESET_FETCH_EXHIBITOR_INVITATIONS_COUNT_SUCCESS
    constructor(public count: number) {}
  }
  export class ResetFetchExhibitorInvitationsCountFailureAction implements Action {
    readonly type = RESET_FETCH_EXHIBITOR_INVITATIONS_COUNT_FAILURE
  }
  
  export class SingleDeleteExhibitorInvitationAction implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR_INVITATION
    constructor(public id: string) {}
  }
  export class SingleDeleteExhibitorInvitationSuccessAction implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR_INVITATION_SUCCESS
  }
  export class SingleDeleteExhibitorInvitationFailureAction implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR_INVITATION_FAILURE
  }
  
  export class BatchDeleteExhibitorInvitationsAction implements Action {
    readonly type = BATCH_DELETE_EXHIBITOR_INVITATIONS
    constructor(public ids: string[]) {}
  }
  export class BatchDeleteExhibitorInvitationsSuccessAction implements Action {
    readonly type = BATCH_DELETE_EXHIBITOR_INVITATIONS_SUCCESS
  }
  export class BatchDeleteExhibitorInvitationsFailureAction implements Action {
    readonly type = BATCH_DELETE_EXHIBITOR_INVITATIONS_FAILURE
  }
  
  export class EnsureExhibitorPageParamsAction implements Action {
    readonly type = ENSURE_EXHIBITOR_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
  }

export type Actions =
  | FetchExhibitorInvitationsAction
  | FetchExhibitorInvitationsSuccessAction
  | FetchExhibitorInvitationsFailureAction
  | ResetFetchExhibitorInvitationsAction
  | ResetFetchExhibitorInvitationsSuccessAction
  | ResetFetchExhibitorInvitationsFailureAction
  | FetchExhibitorInvitationsCountAction
  | FetchExhibitorInvitationsCountSuccessAction
  | FetchExhibitorInvitationsCountFailureAction
  | ResetFetchExhibitorInvitationsCountAction
  | ResetFetchExhibitorInvitationsCountFailureAction
  | ResetFetchExhibitorInvitationsCountSuccessAction
  | SingleDeleteExhibitorInvitationAction
  | SingleDeleteExhibitorInvitationSuccessAction
  | SingleDeleteExhibitorInvitationFailureAction
  | BatchDeleteExhibitorInvitationsAction
  | BatchDeleteExhibitorInvitationsSuccessAction
  | BatchDeleteExhibitorInvitationsFailureAction
  | EnsureExhibitorPageParamsAction
