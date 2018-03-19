import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromToApproveVisitor from '../reducers/to-approve-visitor.reducer'
import * as fromToApproveExhibitor from '../reducers/to-approve-exhibitor.reducer'
import * as fromVisitorApprovalDetail from '../reducers/visitor-approval-detail.reducer'
import * as fromExhibitorApprovalDetail from '../reducers/exhibitor-approval-detail.reducer'
import * as fromRoot from '../../../reducers/index'

export interface ToApproveState {
    toApproveVisitor: fromToApproveVisitor.State
    toApproveExhibitor: fromToApproveExhibitor.State
    visitorApprovalDetail: fromVisitorApprovalDetail.State
    exhibitorApprovalDetail: fromExhibitorApprovalDetail.State
}
export interface State extends fromRoot.State {
    fromToApprove: ToApproveState
}
export const reducers = {
    toApproveVisitor: fromToApproveVisitor.reducer,
    toApproveExhibitor: fromToApproveExhibitor.reducer,
    visitorApprovalDetail: fromVisitorApprovalDetail.reducer,
    exhibitorApprovalDetail: fromExhibitorApprovalDetail.reducer
}

export const getApproveModuleState = createFeatureSelector<ToApproveState>(
    'fromToApprove'
)

export const getToApproveVisitorState = createSelector(
    getApproveModuleState,
    (state: ToApproveState) => {
        return state.toApproveVisitor
    }
)
export const getVisitorLoading = createSelector(
    getToApproveVisitorState,
    fromToApproveVisitor.getVisitorLoading
)
export const getVisitorApprovals = createSelector(
    getToApproveVisitorState,
    fromToApproveVisitor.getVisitorsApprovals
)
export const getVisitorApprovalsCount = createSelector(
    getToApproveVisitorState,
    fromToApproveVisitor.getVisitorApprovalsCount
)
export const getVisitorPageParams = createSelector(
    getToApproveVisitorState,
    fromToApproveVisitor.getVisitorPageParams
)

export const getToApproveExhibitorState = createSelector(
    getApproveModuleState,
    (state: ToApproveState) => {
        return state.toApproveExhibitor
    }
)
export const getExhibitorLoading = createSelector(
    getToApproveExhibitorState,
    fromToApproveExhibitor.getExhibitorLoading
)
export const getExhibitorApprovals = createSelector(
    getToApproveExhibitorState,
    fromToApproveExhibitor.getExhibitorApprovals
)
export const getExhibitorApprovalsCount = createSelector(
    getToApproveExhibitorState,
    fromToApproveExhibitor.getExhibitorApprovalsCount
)
export const getExhibitorPageParams = createSelector(
    getToApproveExhibitorState,
    fromToApproveExhibitor.getExhibitorPageParams
)

export const getVisitorApprovalDetailState = createSelector(
    getApproveModuleState,
    (state: ToApproveState) => {
        return state.visitorApprovalDetail
    }
)
export const getVisitorDetailLoading = createSelector(
    getVisitorApprovalDetailState,
    fromVisitorApprovalDetail.getLoading
)
export const getVisitorApprovalDetail = createSelector(
    getVisitorApprovalDetailState,
    fromVisitorApprovalDetail.getApproval
)

export const getExhibitorApprovalDetailState = createSelector(
    getApproveModuleState,
    (state: ToApproveState) => {
        return state.exhibitorApprovalDetail
    }
)
export const getExhibitorDetailLoading = createSelector(
    getExhibitorApprovalDetailState,
    fromExhibitorApprovalDetail.getLoading
)
export const getExhibitorApprovalDetail = createSelector(
    getExhibitorApprovalDetailState,
    fromExhibitorApprovalDetail.getApproval
)
