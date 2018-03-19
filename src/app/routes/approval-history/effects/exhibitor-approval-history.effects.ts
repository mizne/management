import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromExhibitorApprovalHistory from '../actions/exhibitor-approval-history.action'
import { ApprovalHistoryService } from '../services/approval-history.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getExhibitorPageParams } from '../reducers'

@Injectable()
export class ExhibitorApprovalHistoryEffects {
    @Effect()
    fetchExhibitorApprovalHistory$ = this.actions$
        .ofType(fromExhibitorApprovalHistory.FETCH_EXHIBITOR_APPROVAL_HISTORY)
        .map(
            (
                action: fromExhibitorApprovalHistory.FetchExhibitorApprovalHistoryAction
            ) => action.payload
        )
        .switchMap(params => {
            return this.approvalHistoryService
                .fetchExhibitorApprovalHistory(params)
                .map(
                    exhibitorApprovalHistory =>
                        new fromExhibitorApprovalHistory.FetchExhibitorApprovalHistorySuccessAction(
                            exhibitorApprovalHistory
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromExhibitorApprovalHistory.FetchExhibitorApprovalHistoryFailureAction()
                    )
                )
        })

    @Effect()
    fetchExhibitorApprovalHistoryCount$ = this.actions$
        .ofType(
            fromExhibitorApprovalHistory.FETCH_EXHIBITOR_APPROVAL_HISTORY_COUNT
        )
        .switchMap(() => {
            return this.approvalHistoryService
                .fetchExhibitorApprovalHistoryCount()
                .map(
                    count =>
                        new fromExhibitorApprovalHistory.FetchExhibitorApprovalHistoryCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromExhibitorApprovalHistory.FetchExhibitorApprovalHistoryCountFailureAction()
                    )
                )
        })

    @Effect()
    singleDeleteExhibitorApprovalHistory$ = this.actions$
        .ofType(
            fromExhibitorApprovalHistory.SINGLE_DELETE_EXHIBITOR_APPROVAL_HISTORY
        )
        .map(
            (
                action: fromExhibitorApprovalHistory.SingleDeleteExhibitorApprovalHistoryAction
            ) => action.id
        )
        .withLatestFrom(this.store.select(getExhibitorPageParams))
        .switchMap(([id, params]) => {
            return this.approvalHistoryService
                .singleDeleteExhibitorApprovalHistory(id)
                .concatMap(() => [
                    new fromExhibitorApprovalHistory.SingleDeleteExhibitorApprovalHistorySuccessAction(),
                    new fromExhibitorApprovalHistory.FetchExhibitorApprovalHistoryAction(
                        params
                    ),
                    new fromExhibitorApprovalHistory.FetchExhibitorApprovalHistoryCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromExhibitorApprovalHistory.SingleDeleteExhibitorApprovalHistoryFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    singleDeleteApprovalHistorySuccess$ = this.actions$
        .ofType(
            fromExhibitorApprovalHistory.SINGLE_DELETE_EXHIBITOR_APPROVAL_HISTORY_SUCCESS
        )
        .do(() => {
            this.notify.success('删除审批记录', `恭喜您, 删除审批记录成功！`)
        })
    @Effect({ dispatch: false })
    singleDeleteApprovalHistoryFailure$ = this.actions$
        .ofType(
            fromExhibitorApprovalHistory.SINGLE_DELETE_EXHIBITOR_APPROVAL_HISTORY_FAILURE
        )
        .do(() => {
            this.notify.error('删除审批记录', `啊哦, 删除审批记录失败！`)
        })

    @Effect()
    batchDeleteExhibitorApprovalHistory$ = this.actions$
        .ofType(
            fromExhibitorApprovalHistory.BATCH_DELETE_EXHIBITOR_APPROVAL_HISTORY
        )
        .map(
            (
                action: fromExhibitorApprovalHistory.BatchDeleteExhibitorApprovalHistoryAction
            ) => action.ids
        )
        .withLatestFrom(this.store.select(getExhibitorPageParams))
        .switchMap(([ids, params]) => {
            return this.approvalHistoryService
                .batchDeleteExhibitorApprovalHistory(ids)
                .concatMap(() => [
                    new fromExhibitorApprovalHistory.BatchDeleteExhibitorApprovalHistorySuccessAction(),
                    new fromExhibitorApprovalHistory.FetchExhibitorApprovalHistoryAction(
                        params
                    ),
                    new fromExhibitorApprovalHistory.FetchExhibitorApprovalHistoryCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromExhibitorApprovalHistory.BatchDeleteExhibitorApprovalHistoryFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    batchDeleteApprovalHistorySuccess$ = this.actions$
        .ofType(
            fromExhibitorApprovalHistory.BATCH_DELETE_EXHIBITOR_APPROVAL_HISTORY_SUCCESS
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
            fromExhibitorApprovalHistory.BATCH_DELETE_EXHIBITOR_APPROVAL_HISTORY_FAILURE
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
