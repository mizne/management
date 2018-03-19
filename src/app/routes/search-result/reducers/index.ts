import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromVisitorResult from './visitor-result.reducer'
import * as fromExhibitorResult from './exhibitor-result.reducer'
import * as fromRoot from '../../../reducers'

export interface SearchResultState {
    visitorResult: fromVisitorResult.State
    exhibitorResult: fromExhibitorResult.State
}

export interface State extends fromRoot.State {
    fromSearchResult: SearchResultState
}
export const reducers = {
    visitorResult: fromVisitorResult.reducer,
    exhibitorResult: fromExhibitorResult.reducer
}

export const getSearchResultModuleState = createFeatureSelector<
    SearchResultState
>('fromSearchResult')

export const getVisitorResultState = createSelector(
    getSearchResultModuleState,
    (state: SearchResultState) => state.visitorResult
)
export const getVisitorResultLoading = createSelector(
    getVisitorResultState,
    fromVisitorResult.getLoading
)
export const getVisitors = createSelector(
    getVisitorResultState,
    fromVisitorResult.getVisitors
)
export const getVisitorsCount = createSelector(
    getVisitorResultState,
    fromVisitorResult.getVisitorsCount
)
export const getVisitorPageParams = createSelector(
    getVisitorResultState,
    fromVisitorResult.getVisitorPageParams
)

export const getExhibitorResultState = createSelector(
    getSearchResultModuleState,
    (state: SearchResultState) => state.exhibitorResult
)
export const getExhibitorResultLoading = createSelector(
    getExhibitorResultState,
    fromExhibitorResult.getLoading
)
export const getExhibitors = createSelector(
    getExhibitorResultState,
    fromExhibitorResult.getExhibitors
)
export const getExhibitorsCount = createSelector(
    getExhibitorResultState,
    fromExhibitorResult.getExhibitorsCount
)
export const getExhibitorPageParams = createSelector(
    getExhibitorResultState,
    fromExhibitorResult.getExhibitorPageParams
)
