import { Action } from '@ngrx/store'

import { VisitorMessage } from '@core/models/message.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'
import { Visitor } from '@core/models/visitor.model'

export const FETCH_VISITOR_MESSAGES = '[Visitor Message] Fetch Visitor Messages'
export const FETCH_VISITOR_MESSAGES_SUCCESS =
    '[Visitor Message] Fetch Visitor Messages Success'
export const FETCH_VISITOR_MESSAGES_FAILURE =
    '[Visitor Message] Fetch Visitor Messages Failure'

export const FETCH_VISITOR_MESSAGES_COUNT =
    '[Visitor Message] Fetch Visitor Messages Count'
export const FETCH_VISITOR_MESSAGES_COUNT_SUCCESS =
    '[Visitor Message] Fetch Visitor Messages Count Success'
export const FETCH_VISITOR_MESSAGES_COUNT_FAILURE =
    '[Visitor Message] Fetch Visitor Messages Count Failure'

export const CREATE_VISITOR_MESSAGE = '[Visitor Message] Create Visitor Message'
export const CREATE_VISITOR_MESSAGE_SUCCESS =
    '[Visitor Message] Create Visitor Message Success'
export const CREATE_VISITOR_MESSAGE_FAILURE =
    '[Visitor Message] Create Visitor Message Failure'

export const SINGLE_DELETE_VISITOR_MESSAGE =
    '[Visitor Message] Single Delete Visitor Message'
export const SINGLE_DELETE_VISITOR_MESSAGE_SUCCESS =
    '[Visitor Message] Single Delete Visitor Message Success'
export const SINGLE_DELETE_VISITOR_MESSAGE_FAILURE =
    '[Visitor Message] Single Delete Visitor Message Failure'

export const BATCH_DELETE_VISITOR_MESSAGES =
    '[Visitor Message] Batch Delete Visitor Messages'
export const BATCH_DELETE_VISITOR_MESSAGES_SUCCESS =
    '[Visitor Message] Batch Delete Visitor Messages Success'
export const BATCH_DELETE_VISITOR_MESSAGES_FAILURE =
    '[Visitor Message] Batch Delete Visitor Messages Failure'

export const ENSURE_PAGE_PARAMS = '[Visitor Message] Ensure Page Params'

export class FetchVisitorMessagesAction implements Action {
    readonly type = FETCH_VISITOR_MESSAGES
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchVisitorMessagesSuccessAction implements Action {
    readonly type = FETCH_VISITOR_MESSAGES_SUCCESS
    constructor(public visitorMessages: VisitorMessage[]) {}
}
export class FetchVisitorMessagesFailureAction implements Action {
    readonly type = FETCH_VISITOR_MESSAGES_FAILURE
}

export class FetchVisitorMessagesCountAction implements Action {
    readonly type = FETCH_VISITOR_MESSAGES_COUNT
}
export class FetchVisitorMessagesCountSuccessAction implements Action {
    readonly type = FETCH_VISITOR_MESSAGES_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchVisitorMessagesCountFailureAction implements Action {
    readonly type = FETCH_VISITOR_MESSAGES_COUNT_FAILURE
}

export class CreateVisitorMessageAction implements Action {
    readonly type = CREATE_VISITOR_MESSAGE
    constructor(public params: VisitorMessage) {}
}
export class CreateVisitorMessageSuccessAction implements Action {
    readonly type = CREATE_VISITOR_MESSAGE_SUCCESS
}
export class CreateVisitorMessageFailureAction implements Action {
    readonly type = CREATE_VISITOR_MESSAGE_FAILURE
}

export class SingleDeleteVisitorMessageAction implements Action {
    readonly type = SINGLE_DELETE_VISITOR_MESSAGE
    constructor(public id: string) {}
}
export class SingleDeleteVisitorMessageSuccessAction implements Action {
    readonly type = SINGLE_DELETE_VISITOR_MESSAGE_SUCCESS
}
export class SingleDeleteVisitorMessageFailureAction implements Action {
    readonly type = SINGLE_DELETE_VISITOR_MESSAGE_FAILURE
}

export class BatchDeleteVisitorMessagesAction implements Action {
    readonly type = BATCH_DELETE_VISITOR_MESSAGES
    constructor(public ids: string[]) {}
}
export class BatchDeleteVisitorMessagesSuccessAction implements Action {
    readonly type = BATCH_DELETE_VISITOR_MESSAGES_SUCCESS
}
export class BatchDeleteVisitorMessagesFailureAction implements Action {
    readonly type = BATCH_DELETE_VISITOR_MESSAGES_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchVisitorMessagesAction
    | FetchVisitorMessagesSuccessAction
    | FetchVisitorMessagesFailureAction
    | FetchVisitorMessagesCountAction
    | FetchVisitorMessagesCountSuccessAction
    | FetchVisitorMessagesCountFailureAction
    | CreateVisitorMessageAction
    | CreateVisitorMessageSuccessAction
    | CreateVisitorMessageFailureAction
    | SingleDeleteVisitorMessageAction
    | SingleDeleteVisitorMessageSuccessAction
    | SingleDeleteVisitorMessageFailureAction
    | BatchDeleteVisitorMessagesAction
    | BatchDeleteVisitorMessagesSuccessAction
    | BatchDeleteVisitorMessagesFailureAction
    | EnsurePageParamsAction
