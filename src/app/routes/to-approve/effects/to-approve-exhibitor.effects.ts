import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import { State, getExhibitorPageParams } from '../reducers'

import * as fromToApproveExhibitor from '../actions/to-approve-exhibitor.action'
import * as fromHeader from '../../../layout/default/actions/header.action'
import { ToApproveExhibitorService } from '../services/to-approve-exhibitor.service'
import { NzNotificationService } from 'ng-zorro-antd'

@Injectable()
export class ToApproveExhibitorEffects {
    @Effect()
    fetchExhibitorApprovals$ = this.actions$
        .ofType(fromToApproveExhibitor.FETCH_EXHIBITOR_APPROVALS)
        .map(
            (action: fromToApproveExhibitor.FetchExhibitorApprovalsAction) =>
                action.params
        )
        .switchMap(params => {
            return this.toApproveExhibitorService
                .fetchExhibitorApprovals(params)
                .map(
                    exhibitorApprovals =>
                        new fromToApproveExhibitor.FetchExhibitorSuccessAction(
                            exhibitorApprovals
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromToApproveExhibitor.FetchExhibitorFailureAction()
                    )
                )
        })

    // @Effect()
    // fetchExhibitorApprovalsCount$ = this.actions$
    //     .ofType(fromToApproveExhibitor.FETCH_EXHIBITOR_APPROVALS_COUNT)
    //     .switchMap(() => {
    //         return this.toApproveExhibitorService
    //             .fetchExhibitorApprovalsCount()
    //             .map(
    //                 count =>
    //                     new fromToApproveExhibitor.FetchExhibitorApprovalsCountSuccessAction(
    //                         count
    //                     )
    //             )
    //             .catch(e =>
    //                 Observable.of(
    //                     new fromToApproveExhibitor.FetchExhibitorApprovalsCountFailureAction()
    //                 )
    //             )
    //     })

    @Effect()
    ensureRejectExhibitorApproval$ = this.actions$
        .ofType(fromToApproveExhibitor.ENSURE_REJECT_EXHIBITOR_APPROVAL)
        .map(
            (
                action: fromToApproveExhibitor.EnsureRejectExhibitorApprovalAction
            ) => action.params
        )
        .withLatestFrom(this.store.select(getExhibitorPageParams))
        .switchMap(([rejectParams, pageParams]) => {
            return this.toApproveExhibitorService
                .ensureRejectExhibitorApproval(rejectParams)
                .concatMap(() => [
                    new fromToApproveExhibitor.EnsureRejectExhibitorApprovalSuccessAction(),
                    new fromToApproveExhibitor.FetchExhibitorApprovalsAction(
                        pageParams
                    ),
                    // new fromToApproveExhibitor.FetchExhibitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveExhibitor.EnsureRejectExhibitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureRejectExhibitorApprovalSuccess$ = this.actions$
        .ofType(fromToApproveExhibitor.ENSURE_REJECT_EXHIBITOR_APPROVAL_SUCCESS)
        .do(() => {
            this.notify.success('展商约请审核', '拒绝展商约请成功！')
        })

    @Effect({ dispatch: false })
    ensureRejectExhibitorApprovalFailure$ = this.actions$
        .ofType(fromToApproveExhibitor.ENSURE_REJECT_EXHIBITOR_APPROVAL_FAILURE)
        .do(() => {
            this.notify.error('展商约请审核', '拒绝展商约请失败!')
        })

    @Effect()
    ensureAgreeExhibitorApproval$ = this.actions$
        .ofType(fromToApproveExhibitor.ENSURE_AGREE_EXHIBITOR_APPROVAL)
        .map(
            (
                action: fromToApproveExhibitor.EnsureAgreeExhibitorApprovalAction
            ) => action.id
        )
        .withLatestFrom(this.store.select(getExhibitorPageParams))
        .switchMap(([id, params]) => {
            return this.toApproveExhibitorService
                .ensureAgreeExhibitorApproval(id)
                .concatMap(() => [
                    new fromToApproveExhibitor.EnsureAgreeExhibitorApprovalSuccessAction(),
                    new fromToApproveExhibitor.FetchExhibitorApprovalsAction(
                        params
                    ),
                    // new fromToApproveExhibitor.FetchExhibitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveExhibitor.EnsureAgreeExhibitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureAgreeExhibitorApprovalSuccess$ = this.actions$
        .ofType(fromToApproveExhibitor.ENSURE_AGREE_EXHIBITOR_APPROVAL_SUCCESS)
        .do(() => {
            this.notify.success('展商约请审核', '同意展商约请成功！')
        })

    @Effect({ dispatch: false })
    ensureAgreeExhibitorApprovalFailure$ = this.actions$
        .ofType(fromToApproveExhibitor.ENSURE_AGREE_EXHIBITOR_APPROVAL_FAILURE)
        .do(() => {
            this.notify.error('展商约请审核', '同意展商约请失败！')
        })

    @Effect()
    ensureBatchAgreeExhibitorApproval$ = this.actions$
        .ofType(fromToApproveExhibitor.ENSURE_BATCH_AGREE_EXHIBITOR_APPROVAL)
        .map(
            (
                action: fromToApproveExhibitor.EnsureBatchAgreeExhibitorApprovalAction
            ) => action.ids
        )
        .withLatestFrom(this.store.select(getExhibitorPageParams))
        .switchMap(([ids, params]) => {
            return this.toApproveExhibitorService
                .ensureBatchAgreeExhibitorApproval(ids)
                .concatMap(() => [
                    new fromToApproveExhibitor.EnsureBatchAgreeExhibitorApprovalSuccessAction(),
                    new fromToApproveExhibitor.FetchExhibitorApprovalsAction(
                        params
                    ),
                    // new fromToApproveExhibitor.FetchExhibitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveExhibitor.EnsureBatchAgreeExhibitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureBatchAgreeExhibitorApprovalSuccess$ = this.actions$
        .ofType(
            fromToApproveExhibitor.ENSURE_BATCH_AGREE_EXHIBITOR_APPROVAL_SUCCESS
        )
        .do(() => {
            this.notify.success('展商约请批量审核', '批量同意展商约请成功！')
        })

    @Effect({ dispatch: false })
    ensureBatchAgreeExhibitorApprovalFailure$ = this.actions$
        .ofType(
            fromToApproveExhibitor.ENSURE_BATCH_AGREE_EXHIBITOR_APPROVAL_FAILURE
        )
        .do(() => {
            this.notify.error('展商约请批量审核', '批量同意展商约请失败！')
        })

    @Effect()
    ensureBatchRejectExhibitorApproval$ = this.actions$
        .ofType(fromToApproveExhibitor.ENSURE_BATCH_REJECT_EXHIBITOR_APPROVAL)
        .map(
            (
                action: fromToApproveExhibitor.EnsureBatchRejectExhibitorApprovalAction
            ) => action.params
        )
        .withLatestFrom(this.store.select(getExhibitorPageParams))
        .switchMap(([rejectParams, pageParams]) => {
            return this.toApproveExhibitorService
                .ensureBatchRejectExhibitorApproval(rejectParams)
                .concatMap(() => [
                    new fromToApproveExhibitor.EnsureBatchRejectExhibitorApprovalSuccessAction(),
                    new fromToApproveExhibitor.FetchExhibitorApprovalsAction(
                        pageParams
                    ),
                    // new fromToApproveExhibitor.FetchExhibitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveExhibitor.EnsureBatchRejectExhibitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureBatchRejectExhibitorApprovalSuccess$ = this.actions$
        .ofType(
            fromToApproveExhibitor.ENSURE_BATCH_REJECT_EXHIBITOR_APPROVAL_SUCCESS
        )
        .do(() => {
            this.notify.success('展商约请批量审核', '批量拒绝展商约请成功！')
        })

    @Effect({ dispatch: false })
    ensureBatchRejectExhibitorApprovalFailure$ = this.actions$
        .ofType(
            fromToApproveExhibitor.ENSURE_BATCH_REJECT_EXHIBITOR_APPROVAL_FAILURE
        )
        .do(() => {
            this.notify.error('展商约请批量审核', '批量拒绝展商约请失败！')
        })

    @Effect()
    ensureAllAgreeExhibitorApproval$ = this.actions$
        .ofType(fromToApproveExhibitor.ENSURE_ALL_AGREE_EXHIBITOR_APPROVAL)
        .switchMap(() => {
            return this.toApproveExhibitorService
                .ensureAllAgreeExhibitorApproval()
                .concatMap(() => [
                    new fromToApproveExhibitor.EnsureAllAgreeExhibitorApprovalSuccessAction(),
                    new fromToApproveExhibitor.FetchExhibitorApprovalsAction(),
                    // new fromToApproveExhibitor.FetchExhibitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveExhibitor.EnsureAllAgreeExhibitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureAllAgreeExhibitorApprovalSuccess$ = this.actions$
        .ofType(
            fromToApproveExhibitor.ENSURE_ALL_AGREE_EXHIBITOR_APPROVAL_SUCCESS
        )
        .do(() => {
            this.notify.success('展商约请全部审核', '全部同意展商约请成功！')
        })

    @Effect({ dispatch: false })
    ensureAllAgreeExhibitorApprovalFailure$ = this.actions$
        .ofType(
            fromToApproveExhibitor.ENSURE_ALL_AGREE_EXHIBITOR_APPROVAL_FAILURE
        )
        .do(() => {
            this.notify.error('展商约请全部审核', '全部同意展商约请失败！')
        })

    @Effect()
    ensureAllRejectExhibitorApproval$ = this.actions$
        .ofType(fromToApproveExhibitor.ENSURE_ALL_REJECT_EXHIBITOR_APPROVAL)
        .switchMap(() => {
            return this.toApproveExhibitorService
                .ensureAllRejectExhibitorApproval()
                .concatMap(() => [
                    new fromToApproveExhibitor.EnsureAllRejectExhibitorApprovalSuccessAction(),
                    new fromToApproveExhibitor.FetchExhibitorApprovalsAction(),
                    // new fromToApproveExhibitor.FetchExhibitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveExhibitor.EnsureAllRejectExhibitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureAllRejectExhibitorApprovalSuccess$ = this.actions$
        .ofType(
            fromToApproveExhibitor.ENSURE_ALL_REJECT_EXHIBITOR_APPROVAL_SUCCESS
        )
        .do(() => {
            this.notify.success('展商约请全部审核', '全部拒绝展商约请成功！')
        })

    @Effect({ dispatch: false })
    ensureAllRejectExhibitorApprovalFailure$ = this.actions$
        .ofType(
            fromToApproveExhibitor.ENSURE_ALL_REJECT_EXHIBITOR_APPROVAL_FAILURE
        )
        .do(() => {
            this.notify.error('展商约请全部审核', '全部拒绝展商约请失败！')
        })

    constructor(
        private actions$: Actions,
        private toApproveExhibitorService: ToApproveExhibitorService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
