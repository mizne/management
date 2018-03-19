import { Action } from '@ngrx/store'

import { PlatformMessage } from '@core/models/message.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_PLATFORM_MESSAGES =
    '[Platform Message] Fetch Platform Messages'
export const FETCH_PLATFORM_MESSAGES_SUCCESS =
    '[Platform Message] Fetch Platform Messages Success'
export const FETCH_PLATFORM_MESSAGES_FAILURE =
    '[Platform Message] Fetch Platform Messages Failure'

export const FETCH_PLATFORM_MESSAGES_COUNT =
    '[Platform Message] Fetch Platform Messages Count'
export const FETCH_PLATFORM_MESSAGES_COUNT_SUCCESS =
    '[Platform Message] Fetch Platform Messages Count Success'
export const FETCH_PLATFORM_MESSAGES_COUNT_FAILURE =
    '[Platform Message] Fetch Platform Messages Count Failure'

export const SINGLE_DELETE_PLATFORM_MESSAGE =
    '[Platform Message] Single Delete Platform Message'
export const SINGLE_DELETE_PLATFORM_MESSAGE_SUCCESS =
    '[Platform Message] Single Delete Platform Message Success'
export const SINGLE_DELETE_PLATFORM_MESSAGE_FAILURE =
    '[Platform Message] Single Delete Platform Message Failure'

export const BATCH_DELETE_PLATFORM_MESSAGES =
    '[Platform Message] Batch Delete Platform Messages'
export const BATCH_DELETE_PLATFORM_MESSAGES_SUCCESS =
    '[Platform Message] Batch Delete Platform Messages Success'
export const BATCH_DELETE_PLATFORM_MESSAGES_FAILURE =
    '[Platform Message] Batch Delete Platform Messages Failure'

export const ENSURE_PAGE_PARAMS = '[Platform Message] Ensure Page Params'

export class FetchPlatformMessagesAction implements Action {
    readonly type = FETCH_PLATFORM_MESSAGES
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchPlatformMessagesSuccessAction implements Action {
    readonly type = FETCH_PLATFORM_MESSAGES_SUCCESS
    constructor(public platformMessages: PlatformMessage[]) {}
}
export class FetchPlatformMessagesFailureAction implements Action {
    readonly type = FETCH_PLATFORM_MESSAGES_FAILURE
}

export class FetchPlatformMessagesCountAction implements Action {
    readonly type = FETCH_PLATFORM_MESSAGES_COUNT
}
export class FetchPlatformMessagesCountSuccessAction implements Action {
    readonly type = FETCH_PLATFORM_MESSAGES_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchPlatformMessagesCountFailureAction implements Action {
    readonly type = FETCH_PLATFORM_MESSAGES_COUNT_FAILURE
}

export class SingleDeletePlatformMessageAction implements Action {
    readonly type = SINGLE_DELETE_PLATFORM_MESSAGE
    constructor(public id: string) {}
}
export class SingleDeletePlatformMessageSuccessAction implements Action {
    readonly type = SINGLE_DELETE_PLATFORM_MESSAGE_SUCCESS
}
export class SingleDeletePlatformMessageFailureAction implements Action {
    readonly type = SINGLE_DELETE_PLATFORM_MESSAGE_FAILURE
}

export class BatchDeletePlatformMessagesAction implements Action {
    readonly type = BATCH_DELETE_PLATFORM_MESSAGES
    constructor(public ids: string[]) {}
}
export class BatchDeletePlatformMessagesSuccessAction implements Action {
    readonly type = BATCH_DELETE_PLATFORM_MESSAGES_SUCCESS
}
export class BatchDeletePlatformMessagesFailureAction implements Action {
    readonly type = BATCH_DELETE_PLATFORM_MESSAGES_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchPlatformMessagesAction
    | FetchPlatformMessagesSuccessAction
    | FetchPlatformMessagesFailureAction
    | FetchPlatformMessagesCountAction
    | FetchPlatformMessagesCountSuccessAction
    | FetchPlatformMessagesCountFailureAction
    | SingleDeletePlatformMessageAction
    | SingleDeletePlatformMessageSuccessAction
    | SingleDeletePlatformMessageFailureAction
    | BatchDeletePlatformMessagesAction
    | BatchDeletePlatformMessagesSuccessAction
    | BatchDeletePlatformMessagesFailureAction
    | EnsurePageParamsAction
