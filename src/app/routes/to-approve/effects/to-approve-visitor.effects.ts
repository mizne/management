import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import { State, getVisitorPageParams } from '../reducers'

import * as fromToApproveVisitor from '../actions/to-approve-visitor.action'
import { ToApproveVisitorService } from '../services/to-approve-visitor.service'
import { NzNotificationService } from 'ng-zorro-antd'

import * as fromHeader from '../../../layout/default/actions/header.action'

@Injectable()
export class ToApproveVisitorEffects {
    @Effect()
    fetchVisitorApprovals$ = this.actions$
        .ofType(fromToApproveVisitor.FETCH_VISITOR_APPROVALS)
        .map(
        (action: fromToApproveVisitor.FetchVisitorApprovalsAction) =>
            action.params
        )
        .switchMap(params => {
            return this.toApproveVisitorService
                .fetchVisitorApprovals(params)
                .map(
                visitorApprovals =>
                    new fromToApproveVisitor.FetchVisitorApprovalsSuccessAction(
                        visitorApprovals
                    )
                )
                .catch(err =>
                    Observable.of(
                        new fromToApproveVisitor.FetchVisitorApprovalsFailureAction()
                    )
                )
        })

    // @Effect()
    // fetchVisitorApprovalsCount$ = this.actions$
    //     .ofType(fromToApproveVisitor.FETCH_VISITOR_APPROVALS_COUNT)
    //     .switchMap(() => {
    //         return this.toApproveVisitorService
    //             .fetchVisitorApprovalsCount()
    //             .map(
    //                 count =>
    //                     new fromToApproveVisitor.FetchVisitorApprovalsCountSuccessAction(
    //                         count
    //                     )
    //             )
    //             .catch(e =>
    //                 Observable.of(
    //                     new fromToApproveVisitor.FetchVisitorApprovalsCountFailureAction()
    //                 )
    //             )
    //     })

    @Effect()
    ensureRejectVisitorApproval$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_REJECT_VISITOR_APPROVAL)
        .map(
        (action: fromToApproveVisitor.EnsureRejectVisitorApprovalAction) =>
            action.params
        )
        .withLatestFrom(this.store.select(getVisitorPageParams))
        .switchMap(([rejectParams, pageParams]) => {
            return this.toApproveVisitorService
                .ensureRejectVisitorApproval(rejectParams)
                .concatMap(() => [
                    new fromToApproveVisitor.EnsureRejectVisitorApprovalSuccessAction(),
                    new fromToApproveVisitor.FetchVisitorApprovalsAction(
                        pageParams
                    ),
                    // new fromToApproveVisitor.FetchVisitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveVisitor.EnsureRejectVisitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureRejectVisitorApprovalSuccess$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_REJECT_VISITOR_APPROVAL_SUCCESS)
        .do(() => {
            this.notify.success('买家约请审核', '拒绝买家约请成功！')
        })

    @Effect({ dispatch: false })
    ensureRejectVisitorApprovalFailure$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_REJECT_VISITOR_APPROVAL_FAILURE)
        .do(() => {
            this.notify.error('买家约请审核', '拒绝买家约请失败!')
        })

    @Effect()
    ensureAgreeVisitorApproval$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_AGREE_VISITOR_APPROVAL)
        .map(
        (action: fromToApproveVisitor.EnsureAgreeVisitorApprovalAction) =>
            action.id
        )
        .withLatestFrom(this.store.select(getVisitorPageParams))
        .switchMap(([id, params]) => {
            return this.toApproveVisitorService
                .ensureAgreeVisitorApproval(id)
                .concatMap(() => [
                    new fromToApproveVisitor.EnsureAgreeVisitorApprovalSuccessAction(),
                    new fromToApproveVisitor.FetchVisitorApprovalsAction(
                        params
                    ),
                    // new fromToApproveVisitor.FetchVisitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveVisitor.EnsureAgreeVisitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureAgreeVisitorApprovalSuccess$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_AGREE_VISITOR_APPROVAL_SUCCESS)
        .do(() => {
            this.notify.success('买家约请审核', '同意买家约请成功！')
        })

    @Effect({ dispatch: false })
    ensureAgreeVisitorApprovalFailure$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_AGREE_VISITOR_APPROVAL_FAILURE)
        .do(() => {
            this.notify.error('买家约请审核', '同意买家约请失败！')
        })

    @Effect()
    ensureBatchAgreeVisitorApproval$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_BATCH_AGREE_VISITOR_APPROVAL)
        .map(
        (
            action: fromToApproveVisitor.EnsureBatchAgreeVisitorApprovalAction
        ) => action.ids
        )
        .withLatestFrom(this.store.select(getVisitorPageParams))
        .switchMap(([ids, params]) => {
            return this.toApproveVisitorService
                .ensureBatchAgreeVisitorApproval(ids)
                .concatMap(() => [
                    new fromToApproveVisitor.EnsureBatchAgreeVisitorApprovalSuccessAction(),
                    new fromToApproveVisitor.FetchVisitorApprovalsAction(
                        params
                    ),
                    // new fromToApproveVisitor.FetchVisitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveVisitor.EnsureBatchAgreeVisitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureBatchAgreeVisitorApprovalSuccess$ = this.actions$
        .ofType(
        fromToApproveVisitor.ENSURE_BATCH_AGREE_VISITOR_APPROVAL_SUCCESS
        )
        .do(() => {
            this.notify.success('买家约请批量审核', '批量同意买家约请成功！')
        })

    @Effect({ dispatch: false })
    ensureBatchAgreeVisitorApprovalFailure$ = this.actions$
        .ofType(
        fromToApproveVisitor.ENSURE_BATCH_AGREE_VISITOR_APPROVAL_FAILURE
        )
        .do(() => {
            this.notify.error('买家约请批量审核', '批量同意买家约请失败！')
        })

    @Effect()
    ensureBatchRejectVisitorApproval$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_BATCH_REJECT_VISITOR_APPROVAL)
        .map(
        (
            action: fromToApproveVisitor.EnsureBatchRejectVisitorApprovalAction
        ) => action.params
        )
        .withLatestFrom(this.store.select(getVisitorPageParams))
        .switchMap(([rejectParams, pageParams]) => {
            return this.toApproveVisitorService
                .ensureBatchRejectVisitorApproval(rejectParams)
                .concatMap(() => [
                    new fromToApproveVisitor.EnsureBatchRejectVisitorApprovalSuccessAction(),
                    new fromToApproveVisitor.FetchVisitorApprovalsAction(
                        pageParams
                    ),
                    // new fromToApproveVisitor.FetchVisitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveVisitor.EnsureBatchRejectVisitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureBatchRejectVisitorApprovalSuccess$ = this.actions$
        .ofType(
        fromToApproveVisitor.ENSURE_BATCH_REJECT_VISITOR_APPROVAL_SUCCESS
        )
        .do(() => {
            this.notify.success('买家约请批量审核', '批量拒绝买家约请成功！')
        })

    @Effect({ dispatch: false })
    ensureBatchRejectVisitorApprovalFailure$ = this.actions$
        .ofType(
        fromToApproveVisitor.ENSURE_BATCH_REJECT_VISITOR_APPROVAL_FAILURE
        )
        .do(() => {
            this.notify.error('买家约请批量审核', '批量拒绝买家约请失败！')
        })

    @Effect()
    ensureAllAgreeVisitorApproval$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_ALL_AGREE_VISITOR_APPROVAL)
        .switchMap(() => {
            return this.toApproveVisitorService
                .ensureAllAgreeVisitorApproval()
                .concatMap(() => [
                    new fromToApproveVisitor.EnsureAllAgreeVisitorApprovalSuccessAction(),
                    new fromToApproveVisitor.FetchVisitorApprovalsAction(),
                    // new fromToApproveVisitor.FetchVisitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveVisitor.EnsureAllAgreeVisitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureAllAgreeVisitorApprovalSuccess$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_ALL_AGREE_VISITOR_APPROVAL_SUCCESS)
        .do(() => {
            this.notify.success('买家约请全部审核', '全部同意买家约请成功！')
        })

    @Effect({ dispatch: false })
    ensureAllAgreeVisitorApprovalFailure$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_ALL_AGREE_VISITOR_APPROVAL_FAILURE)
        .do(() => {
            this.notify.error('买家约请全部审核', '全部同意买家约请失败！')
        })

    @Effect()
    ensureAllRejectVisitorApproval$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_ALL_REJECT_VISITOR_APPROVAL)
        .switchMap(() => {
            return this.toApproveVisitorService
                .ensureAllRejectVisitorApproval()
                .concatMap(() => [
                    new fromToApproveVisitor.EnsureAllRejectVisitorApprovalSuccessAction(),
                    new fromToApproveVisitor.FetchVisitorApprovalsAction(),
                    // new fromToApproveVisitor.FetchVisitorApprovalsCountAction(),
                    new fromHeader.FetchVisitorApprovalsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromToApproveVisitor.EnsureAllRejectVisitorApprovalFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureAllRejectVisitorApprovalSuccess$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_ALL_REJECT_VISITOR_APPROVAL_SUCCESS)
        .do(() => {
            this.notify.success('买家约请全部审核', '全部拒绝买家约请成功！')
        })

    @Effect({ dispatch: false })
    ensureAllRejectVisitorApprovalFailure$ = this.actions$
        .ofType(fromToApproveVisitor.ENSURE_ALL_REJECT_VISITOR_APPROVAL_FAILURE)
        .do(() => {
            this.notify.error('买家约请全部审核', '全部拒绝买家约请失败！')
        })

    constructor(
        private actions$: Actions,
        private toApproveVisitorService: ToApproveVisitorService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) { }
}
