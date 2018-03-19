import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromPlatformMessage from './platform-message.reducer'
import * as fromRoot from '../../../reducers'

export interface PlatformMessageState {
    platformMessage: fromPlatformMessage.State
}

export interface State extends fromRoot.State {
    fromPlatformMessage: PlatformMessageState
}
export const reducers = {
    platformMessage: fromPlatformMessage.reducer
}

export const getPlatformMessageModuleState = createFeatureSelector<
    PlatformMessageState
>('fromPlatformMessage')

export const getPlatformMessageState = createSelector(
    getPlatformMessageModuleState,
    (state: PlatformMessageState) => state.platformMessage
)
export const getLoading = createSelector(
    getPlatformMessageState,
    fromPlatformMessage.getLoading
)
export const getPlatformMessages = createSelector(
    getPlatformMessageState,
    fromPlatformMessage.getMessages
)
export const getPlatformMessagesCount = createSelector(
    getPlatformMessageState,
    fromPlatformMessage.getMssagesCount
)
export const getPlatformMessagesPageParams = createSelector(
    getPlatformMessageState,
    fromPlatformMessage.getPageParams
)
