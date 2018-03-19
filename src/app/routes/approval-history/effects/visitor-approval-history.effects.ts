import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromVisitorApprovalHistory from '../actions/visitor-approval-history.action'
import { ApprovalHistoryService } from '../services/approval-history.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import {
    State,
    getVisitorPageParams,
    getExhibitorPageParams
} from '../reducers'

@Injectable()
export class VisitorApprovalHistoryEffects {
    @Effect()
    fetchVisitorApprovalHistory$ = this.actions$
        .ofType(fromVisitorApprovalHistory.FETCH_VISITOR_APPROVAL_HISTORY)
        .map(
            (
                action: fromVisitorApprovalHistory.FetchVisitorApprovalHistoryAction
            ) => action.payload
        )
        .switchMap(params => {
            return this.approvalHistoryService
                .fetchVisitorApprovalHistory(params)
                .map(
                    visitorApprovalHistory =>
                        new fromVisitorApprovalHistory.FetchVisitorApprovalHistorySuccessAction(
                            visitorApprovalHistory
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromVisitorApprovalHistory.FetchVisitorApprovalHistoryFailureAction()
                    )
                )
        })

    @Effect()
    fetchVisitorApprovalHistoryCount$ = this.actions$
        .ofType(fromVisitorApprovalHistory.FETCH_VISITOR_APPROVAL_HISTORY_COUNT)
        .switchMap(() => {
            return this.approvalHistoryService
                .fetchVisitorApprovalHistoryCount()
                .map(
                    count =>
                        new fromVisitorApprovalHistory.FetchVisitorApprovalHistoryCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromVisitorApprovalHistory.FetchVisitorApprovalHistoryCountFailureAction()
                    )
                )
        })

    @Effect()
    singleDeleteVisitorApprovalHistory$ = this.actions$
        .ofType(
            fromVisitorApprovalHistory.SINGLE_DELETE_VISITOR_APPROVAL_HISTORY
        )
        .map(
            (
                action: fromVisitorApprovalHistory.SingleDeleteVisitorApprovalHistoryAction
            ) => action.id
        )
        .withLatestFrom(this.store.select(getVisitorPageParams))
        .switchMap(([id, params]) => {
            return this.approvalHistoryService
                .singleDeleteVisitorApprovalHistory(id)
                .concatMap(() => [
                    new fromVisitorApprovalHistory.SingleDeleteVisitorApprovalHistorySuccessAction(),
                    new fromVisitorApprovalHistory.FetchVisitorApprovalHistoryAction(
                        params
                    ),
                    new fromVisitorApprovalHistory.FetchVisitorApprovalHistoryCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromVisitorApprovalHistory.SingleDeleteVisitorApprovalHistoryFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    singleDeleteApprovalHistorySuccess$ = this.actions$
        .ofType(
            fromVisitorApprovalHistory.SINGLE_DELETE_VISITOR_APPROVAL_HISTORY_SUCCESS
        )
        .do(() => {
            this.notify.success('删除审批记录', `恭喜您, 删除审批记录成功！`)
        })
    @Effect({ dispatch: false })
    singleDeleteApprovalHistoryFailure$ = this.actions$
        .ofType(
            fromVisitorApprovalHistory.SINGLE_DELETE_VISITOR_APPROVAL_HISTORY_FAILURE
        )
        .do(() => {
            this.notify.error('删除审批记录', `啊哦, 删除审批记录失败！`)
        })

    @Effect()
    batchDeleteVisitorApprovalHistory$ = this.actions$
        .ofType(
            fromVisitorApprovalHistory.BATCH_DELETE_VISITOR_APPROVAL_HISTORY
        )
        .map(
            (
                action: fromVisitorApprovalHistory.BatchDeleteVisitorApprovalHistoryAction
            ) => action.ids
        )
        .withLatestFrom(this.store.select(getVisitorPageParams))
        .switchMap(([ids, params]) => {
            return this.approvalHistoryService
                .batchDeleteVisitorApprovalHistory(ids)
                .concatMap(() => [
                    new fromVisitorApprovalHistory.BatchDeleteVisitorApprovalHistorySuccessAction(),
                    new fromVisitorApprovalHistory.FetchVisitorApprovalHistoryAction(
                        params
                    ),
                    new fromVisitorApprovalHistory.FetchVisitorApprovalHistoryCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromVisitorApprovalHistory.BatchDeleteVisitorApprovalHistoryFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    batchDeleteApprovalHistorySuccess$ = this.actions$
        .ofType(
            fromVisitorApprovalHistory.BATCH_DELETE_VISITOR_APPROVAL_HISTORY_SUCCESS
        )
        .do(() => {
            this.notify.success(
                '批量删除审批记录',
                `恭喜您, 批量删除审批记录成功！`
            )
        })
    @Effect({ dispatch: false })
    batchDeleteApprovalHistoryFailure$ = this.actions$
        .ofType(
            fromVisitorApprovalHistory.BATCH_DELETE_VISITOR_APPROVAL_HISTORY_FAILURE
        )
        .do(() => {
            this.notify.error(
                '批量删除审批记录',
                `啊哦, 批量删除审批记录失败！`
            )
        })

    constructor(
        private actions$: Actions,
        private approvalHistoryService: ApprovalHistoryService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
