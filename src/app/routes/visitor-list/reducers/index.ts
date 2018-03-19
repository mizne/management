import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromVisitorList from './visitor-list.reducer'
import * as fromVisitorDetail from './visitor-detail.reducer'
import * as fromRoot from '../../../reducers'

export interface VisitorListState {
    visitorList: fromVisitorList.State
    visitorDetail: fromVisitorDetail.State
}

export interface State extends fromRoot.State {
    fromVisitorList: VisitorListState
}
export const reducers = {
    visitorList: fromVisitorList.reducer,
    visitorDetail: fromVisitorDetail.reducer
}

export const getVisitorListModuleState = createFeatureSelector<
    VisitorListState
>('fromVisitorList')

export const getVisitorListState = createSelector(
    getVisitorListModuleState,
    (state: VisitorListState) => state.visitorList
)
export const getVisitorListLoading = createSelector(
    getVisitorListState,
    fromVisitorList.getLoading
)
export const getVisitors = createSelector(
    getVisitorListState,
    fromVisitorList.getVisitors
)
export const getVisitorsCount = createSelector(
    getVisitorListState,
    fromVisitorList.getVisitorsCount
)
export const getVisitorPageParams = createSelector(
    getVisitorListState,
    fromVisitorList.getVisitorPageParams
)

export const getVisitorDetailState = createSelector(
    getVisitorListModuleState,
    (state: VisitorListState) => state.visitorDetail
)
export const getVisitorDetailLoading = createSelector(
    getVisitorDetailState,
    fromVisitorDetail.getLoading
)
export const getVisitorDetail = createSelector(
    getVisitorDetailState,
    fromVisitorDetail.getVisitor
)
