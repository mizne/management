import { Action } from '@ngrx/store'

import { ExhibitorMessage } from '@core/models/message.model'
import { Exhibitor } from '@core/models/exhibitor.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '../../../core/models/pagination.model'

export const FETCH_EXHIBITOR_MESSAGES =
    '[Exhibitor Message] Fetch Exhibitor Messages'
export const FETCH_EXHIBITOR_MESSAGES_SUCCESS =
    '[Exhibitor Message] Fetch Exhibitor Messages Success'
export const FETCH_EXHIBITOR_MESSAGES_FAILURE =
    '[Exhibitor Message] Fetch Exhibitor Messages Failure'

export const FETCH_EXHIBITOR_MESSAGES_COUNT =
    '[Exhibitor Message] Fetch Exhibitor Messages Count'
export const FETCH_EXHIBITOR_MESSAGES_COUNT_SUCCESS =
    '[Exhibitor Message] Fetch Exhibitor Messages Count Success'
export const FETCH_EXHIBITOR_MESSAGES_COUNT_FAILURE =
    '[Exhibitor Message] Fetch Exhibitor Messages Count Failure'

export const CREATE_EXHIBITOR_MESSAGE =
    '[Exhibitor Message] Create Exhibitor Message'
export const CREATE_EXHIBITOR_MESSAGE_SUCCESS =
    '[Exhibitor Message] Create Exhibitor Message Success'
export const CREATE_EXHIBITOR_MESSAGE_FAILURE =
    '[Exhibitor Message] Create Exhibitor Message Failure'

export const SINGLE_DELETE_EXHIBITOR_MESSAGE =
    '[Exhibitor Message] Single Delete Exhibitor Message'
export const SINGLE_DELETE_EXHIBITOR_MESSAGE_SUCCESS =
    '[Exhibitor Message] Single Delete Exhibitor Message Success'
export const SINGLE_DELETE_EXHIBITOR_MESSAGE_FAILURE =
    '[Exhibitor Message] Single Delete Exhibitor Message Failure'

export const BATCH_DELETE_EXHIBITOR_MESSAGES =
    '[Exhibitor Message] Batch Delete Exhibitor Messages'
export const BATCH_DELETE_EXHIBITOR_MESSAGES_SUCCESS =
    '[Exhibitor Message] Batch Delete Exhibitor Messages Success'
export const BATCH_DELETE_EXHIBITOR_MESSAGES_FAILURE =
    '[Exhibitor Message] Batch Delete Exhibitor Messages Failure'

export const ENSURE_PAGE_PARAMS = '[Exhibitor Message] Ensure Page Params'

export const SEARCH_EXHIBITORS = '[Exhibitor Message] Search Exhibitors'
export const SEARCH_EXHIBITORS_SUCCESS =
    '[Exhibitor Message] Search Exhibitors Success'
export const SEARCH_EXHIBITORS_FAILURE =
    '[Exhibitor Message] Search Exhibitors Failure'

export const INIT_FETCH_EXHIBITORS = '[Exhibitor Message] Init Fetch Exhibitors'
export const INIT_FETCH_EXHIBITORS_SUCCESS =
    '[Exhibitor Message] Init Fetch Exhibitors Success'
export const INIT_FETCH_EXHIBITORS_FALIURE =
    '[Exhibitor Message] Init Fetch Exhibitors Failure'

export class FetchExhibitorMessagesAction implements Action {
    readonly type = FETCH_EXHIBITOR_MESSAGES
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchExhibitorMessagesSuccessAction implements Action {
    readonly type = FETCH_EXHIBITOR_MESSAGES_SUCCESS
    constructor(public exhibitorMessages: ExhibitorMessage[]) {}
}
export class FetchExhibitorMessagesFailureAction implements Action {
    readonly type = FETCH_EXHIBITOR_MESSAGES_FAILURE
}

export class FetchExhibitorMessagesCountAction implements Action {
    readonly type = FETCH_EXHIBITOR_MESSAGES_COUNT
}
export class FetchExhibitorMessagesCountSuccessAction implements Action {
    readonly type = FETCH_EXHIBITOR_MESSAGES_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchExhibitorMessagesCountFailureAction implements Action {
    readonly type = FETCH_EXHIBITOR_MESSAGES_COUNT_FAILURE
}

export class CreateExhibitorMessageAction implements Action {
    readonly type = CREATE_EXHIBITOR_MESSAGE
    constructor(public params: ExhibitorMessage) {}
}
export class CreateExhibitorMessageSuccessAction implements Action {
    readonly type = CREATE_EXHIBITOR_MESSAGE_SUCCESS
}
export class CreateExhibitorMessageFailureAction implements Action {
    readonly type = CREATE_EXHIBITOR_MESSAGE_FAILURE
}

export class SingleDeleteExhibitorMessageAction implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR_MESSAGE
    constructor(public id: string) {}
}
export class SingleDeleteExhibitorMessageSuccessAction implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR_MESSAGE_SUCCESS
}
export class SingleDeleteExhibitorMessageFailureAction implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR_MESSAGE_FAILURE
}

export class BatchDeleteExhibitorMessagesAction implements Action {
    readonly type = BATCH_DELETE_EXHIBITOR_MESSAGES
    constructor(public ids: string[]) {}
}
export class BatchDeleteExhibitorMessagesSuccessAction implements Action {
    readonly type = BATCH_DELETE_EXHIBITOR_MESSAGES_SUCCESS
}
export class BatchDeleteExhibitorMessagesFailureAction implements Action {
    readonly type = BATCH_DELETE_EXHIBITOR_MESSAGES_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export class SearchExhibitorsAction implements Action {
    readonly type = SEARCH_EXHIBITORS
    constructor(public searchText: string) {}
}
export class SearchExhibitorsSuccessAction implements Action {
    readonly type = SEARCH_EXHIBITORS_SUCCESS
    constructor(public exhibitors: Exhibitor[]) {}
}
export class SearchExhibitorsFailureAction implements Action {
    readonly type = SEARCH_EXHIBITORS_FAILURE
}

export class InitFetchExhibitorsAction implements Action {
    readonly type = INIT_FETCH_EXHIBITORS
}
export class InitFetchExhibitorsSuccessAction implements Action {
    readonly type = INIT_FETCH_EXHIBITORS_SUCCESS
    constructor(public exhibitors: Exhibitor[]) {}
}
export class InitFetchExhibitorsFailureAction implements Action {
    readonly type = INIT_FETCH_EXHIBITORS_FALIURE
}

export type Actions =
    | FetchExhibitorMessagesAction
    | FetchExhibitorMessagesSuccessAction
    | FetchExhibitorMessagesFailureAction
    | FetchExhibitorMessagesCountAction
    | FetchExhibitorMessagesCountSuccessAction
    | FetchExhibitorMessagesCountFailureAction
    | CreateExhibitorMessageAction
    | CreateExhibitorMessageSuccessAction
    | CreateExhibitorMessageFailureAction
    | SingleDeleteExhibitorMessageAction
    | SingleDeleteExhibitorMessageSuccessAction
    | SingleDeleteExhibitorMessageFailureAction
    | BatchDeleteExhibitorMessagesAction
    | BatchDeleteExhibitorMessagesSuccessAction
    | BatchDeleteExhibitorMessagesFailureAction
    | EnsurePageParamsAction
    | SearchExhibitorsAction
    | SearchExhibitorsSuccessAction
    | SearchExhibitorsFailureAction
    | InitFetchExhibitorsAction
    | InitFetchExhibitorsSuccessAction
    | InitFetchExhibitorsFailureAction
