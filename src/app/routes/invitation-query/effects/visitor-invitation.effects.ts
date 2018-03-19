import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromVisitorInvitation from '../actions/visitor-invitation.action'
import { InvitationQueryService } from '../services/invitation-query.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getVisitorInvitationsPageParams } from '../reducers'

@Injectable()
export class VisitorInvitationEffects {
    @Effect()
    fetchVisitorInvitations$ = this.actions$
        .ofType(fromVisitorInvitation.FETCH_VISITOR_INVITATIONS)
        .map(
            (action: fromVisitorInvitation.FetchVisitorInvitationsAction) =>
                action.payload
        )
        .switchMap(params => {
            return this.invitationQueryService
                .fetchVisitorInvitations(params)
                .map(
                    invitations =>
                        new fromVisitorInvitation.FetchVisitorInvitationsSuccessAction(
                            invitations
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromVisitorInvitation.FetchVisitorInvitationsFailureAction()
                    )
                )
        })

    @Effect()
    resetFetchVisitorInvitations$ = this.actions$
        .ofType(fromVisitorInvitation.RESET_FETCH_VISITOR_INVITATIONS)
        .map(
            (
                action: fromVisitorInvitation.ResetFetchVisitorInvitationsAction
            ) => action.payload
        )
        .switchMap(params => {
            return this.invitationQueryService
                .fetchVisitorInvitations(params)
                .map(
                    invitations =>
                        new fromVisitorInvitation.ResetFetchVisitorInvitationsSuccessAction(
                            invitations
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromVisitorInvitation.ResetFetchVisitorInvitationsFailureAction()
                    )
                )
        })

    @Effect()
    fetchVisitorInvitationsCount$ = this.actions$
        .ofType(fromVisitorInvitation.FETCH_VISITOR_INVITATIONS_COUNT)
        .map(
            (
                action: fromVisitorInvitation.FetchVisitorInvitationsCountAction
            ) => action.payload
        )
        .switchMap(params => {
            return this.invitationQueryService
                .fetchVisitorInvitationsCount(params)
                .map(
                    count =>
                        new fromVisitorInvitation.FetchVisitorInvitationsCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromVisitorInvitation.FetchVisitorInvitationsCountFailureAction()
                    )
                )
        })

    @Effect()
    resetFetchVisitorInvitationsCount$ = this.actions$
        .ofType(fromVisitorInvitation.RESET_FETCH_VISITOR_INVITATIONS_COUNT)
        .map(
            (
                action: fromVisitorInvitation.ResetFetchVisitorInvitationsCountAction
            ) => action.payload
        )
        .switchMap(params => {
            return this.invitationQueryService
                .fetchVisitorInvitationsCount(params)
                .map(
                    count =>
                        new fromVisitorInvitation.ResetFetchVisitorInvitationsCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromVisitorInvitation.ResetFetchVisitorInvitationsCountFailureAction()
                    )
                )
        })

    // TODO 删除完再查询 需要根据搜索框的条件去查询
    @Effect()
    singleDeleteVisitorInvitation$ = this.actions$
        .ofType(fromVisitorInvitation.SINGLE_DELETE_VISITOR_INVITATION)
        .map(
            (
                action: fromVisitorInvitation.SingleDeleteVisitorInvitationAction
            ) => action.id
        )
        .withLatestFrom(this.store.select(getVisitorInvitationsPageParams))
        .switchMap(([id, params]) => {
            return this.invitationQueryService
                .singleDeleteVisitor(id)
                .concatMap(() => [
                    new fromVisitorInvitation.SingleDeleteVisitorInvitationSuccessAction(),
                    new fromVisitorInvitation.FetchVisitorInvitationsAction(
                        params
                    ),
                    new fromVisitorInvitation.FetchVisitorInvitationsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromVisitorInvitation.SingleDeleteVisitorInvitationFailureAction()
                    )
                )
        })
    @Effect({ dispatch: false })
    singleDeleteVisitorInvitationSuccess$ = this.actions$
        .ofType(fromVisitorInvitation.SINGLE_DELETE_VISITOR_INVITATION_SUCCESS)
        .do(() => {
            this.notify.success('删除约请记录', `恭喜您, 删除约请记录成功！`)
        })
    @Effect({ dispatch: false })
    singleDeleteVisitorInvitationFailure$ = this.actions$
        .ofType(fromVisitorInvitation.SINGLE_DELETE_VISITOR_INVITATION_FAILURE)
        .do(() => {
            this.notify.error('删除约请记录', `啊哦, 删除约请记录失败！`)
        })

    // TODO 删除完再查询 需要根据搜索框的条件去查询
    @Effect()
    batchDeleteVisitorInvitations$ = this.actions$
        .ofType(fromVisitorInvitation.BATCH_DELETE_VISITOR_INVITATIONS)
        .map(
            (
                action: fromVisitorInvitation.BatchDeleteVisitorInvitationsAction
            ) => action.ids
        )
        .withLatestFrom(this.store.select(getVisitorInvitationsPageParams))
        .switchMap(([ids, params]) => {
            return this.invitationQueryService
                .batchDeleteVisitor(ids)
                .concatMap(() => [
                    new fromVisitorInvitation.BatchDeleteVisitorInvitationsSuccessAction(),
                    new fromVisitorInvitation.FetchVisitorInvitationsAction(
                        params
                    ),
                    new fromVisitorInvitation.FetchVisitorInvitationsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromVisitorInvitation.BatchDeleteVisitorInvitationsFailureAction()
                    )
                )
        })
    @Effect({ dispatch: false })
    batchDeleteVisitorInvitationsSuccess$ = this.actions$
        .ofType(fromVisitorInvitation.BATCH_DELETE_VISITOR_INVITATIONS_SUCCESS)
        .do(() => {
            this.notify.success(
                '批量删除约请记录',
                `恭喜您, 批量删除约请记录成功！`
            )
        })
    @Effect({ dispatch: false })
    batchDeleteVisitorInvitationsFailure$ = this.actions$
        .ofType(fromVisitorInvitation.BATCH_DELETE_VISITOR_INVITATIONS_FAILURE)
        .do(() => {
            this.notify.error(
                '批量删除约请记录',
                `啊哦, 批量删除约请记录失败！`
            )
        })

    constructor(
        private actions$: Actions,
        private invitationQueryService: InvitationQueryService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
