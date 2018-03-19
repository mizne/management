import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromExhibitorInvitation from '../actions/exhibitor-invitation.action'
import { InvitationQueryService } from '../services/invitation-query.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getExhibitorInvitationsPageParams } from '../reducers'

@Injectable()
export class ExhibitorInvitationEffects {
  @Effect()
  fetchExhibitorInvitations$ = this.actions$
    .ofType(fromExhibitorInvitation.FETCH_EXHIBITOR_INVITATIONS)
    .map((action: fromExhibitorInvitation.FetchExhibitorInvitationsAction) => action.payload)
    .switchMap(params => {
      return this.invitationQueryService
        .fetchExhibitorInvitations(params)
        .map(
          invitations =>
            new fromExhibitorInvitation.FetchExhibitorInvitationsSuccessAction(invitations)
        )
        .catch(err =>
          Observable.of(new fromExhibitorInvitation.FetchExhibitorInvitationsFailureAction())
        )
    })

  @Effect()
  resetFetchExhibitorInvitations$ = this.actions$
    .ofType(fromExhibitorInvitation.RESET_FETCH_EXHIBITOR_INVITATIONS)
    .map(
      (action: fromExhibitorInvitation.ResetFetchExhibitorInvitationsAction) =>
        action.payload
    )
    .switchMap(params => {
      return this.invitationQueryService
        .fetchExhibitorInvitations(params)
        .map(
          invitations =>
            new fromExhibitorInvitation.ResetFetchExhibitorInvitationsSuccessAction(
              invitations
            )
        )
        .catch(err =>
          Observable.of(
            new fromExhibitorInvitation.ResetFetchExhibitorInvitationsFailureAction()
          )
        )
    })

  @Effect()
  fetchExhibitorInvitationsCount$ = this.actions$
    .ofType(fromExhibitorInvitation.FETCH_EXHIBITOR_INVITATIONS_COUNT)
    .map(
      (action: fromExhibitorInvitation.FetchExhibitorInvitationsCountAction) =>
        action.payload
    )
    .switchMap(params => {
      return this.invitationQueryService
        .fetchExhibitorInvitationsCount(params)
        .map(
          count =>
            new fromExhibitorInvitation.FetchExhibitorInvitationsCountSuccessAction(count)
        )
        .catch(e =>
          Observable.of(
            new fromExhibitorInvitation.FetchExhibitorInvitationsCountFailureAction()
          )
        )
    })

  @Effect()
  resetFetchExhibitorInvitationsCount$ = this.actions$
    .ofType(fromExhibitorInvitation.RESET_FETCH_EXHIBITOR_INVITATIONS_COUNT)
    .map(
      (action: fromExhibitorInvitation.ResetFetchExhibitorInvitationsCountAction) =>
        action.payload
    )
    .switchMap(params => {
      return this.invitationQueryService
        .fetchExhibitorInvitationsCount(params)
        .map(
          count =>
            new fromExhibitorInvitation.ResetFetchExhibitorInvitationsCountSuccessAction(
              count
            )
        )
        .catch(e =>
          Observable.of(
            new fromExhibitorInvitation.ResetFetchExhibitorInvitationsCountFailureAction()
          )
        )
    })

    // TODO 删除完再查询 需要根据搜索框的条件去查询
  @Effect()
  singleDeleteExhibitorrInvitation$ = this.actions$
    .ofType(fromExhibitorInvitation.SINGLE_DELETE_EXHIBITOR_INVITATION)
    .map(
      (action: fromExhibitorInvitation.SingleDeleteExhibitorInvitationAction) => action.id
    )
    .withLatestFrom(this.store.select(getExhibitorInvitationsPageParams))
    .switchMap(([id, params]) => {
      return this.invitationQueryService
        .singleDeleteExhibitor(id)
        .concatMap(() => [
          new fromExhibitorInvitation.SingleDeleteExhibitorInvitationSuccessAction(),
          new fromExhibitorInvitation.FetchExhibitorInvitationsAction(params),
          new fromExhibitorInvitation.FetchExhibitorInvitationsCountAction()
        ])
        .catch(() =>
          Observable.of(
            new fromExhibitorInvitation.SingleDeleteExhibitorInvitationFailureAction()
          )
        )
    })
  @Effect({ dispatch: false })
  singleDeleteExhibitorInvitationSuccess$ = this.actions$
    .ofType(fromExhibitorInvitation.SINGLE_DELETE_EXHIBITOR_INVITATION_SUCCESS)
    .do(() => {
      this.notify.success('删除约请记录', `恭喜您, 删除约请记录成功！`)
    })
  @Effect({ dispatch: false })
  singleDeleteExhibitorInvitationFailure$ = this.actions$
    .ofType(fromExhibitorInvitation.SINGLE_DELETE_EXHIBITOR_INVITATION_FAILURE)
    .do(() => {
      this.notify.error('删除约请记录', `啊哦, 删除约请记录失败！`)
    })

    // TODO 删除完再查询 需要根据搜索框的条件去查询
  @Effect()
  batchDeleteExhibitorInvitations$ = this.actions$
    .ofType(fromExhibitorInvitation.BATCH_DELETE_EXHIBITOR_INVITATIONS)
    .map(
      (action: fromExhibitorInvitation.BatchDeleteExhibitorInvitationsAction) => action.ids
    )
    .withLatestFrom(this.store.select(getExhibitorInvitationsPageParams))
    .switchMap(([ids, params]) => {
      return this.invitationQueryService
        .batchDeleteExhibitor(ids)
        .concatMap(() => [
          new fromExhibitorInvitation.BatchDeleteExhibitorInvitationsSuccessAction(),
          new fromExhibitorInvitation.FetchExhibitorInvitationsAction(params),
          new fromExhibitorInvitation.FetchExhibitorInvitationsCountAction()
        ])
        .catch(() =>
          Observable.of(
            new fromExhibitorInvitation.BatchDeleteExhibitorInvitationsFailureAction()
          )
        )
    })
  @Effect({ dispatch: false })
  batchDeleteExhibitorInvitationsSuccess$ = this.actions$
    .ofType(fromExhibitorInvitation.BATCH_DELETE_EXHIBITOR_INVITATIONS_SUCCESS)
    .do(() => {
      this.notify.success('批量删除约请记录', `恭喜您, 批量删除约请记录成功！`)
    })
  @Effect({ dispatch: false })
  batchDeleteExhibitorInvitationsFailure$ = this.actions$
    .ofType(fromExhibitorInvitation.BATCH_DELETE_EXHIBITOR_INVITATIONS_FAILURE)
    .do(() => {
      this.notify.error('批量删除约请记录', `啊哦, 批量删除约请记录失败！`)
    })

  constructor(
    private actions$: Actions,
    private invitationQueryService: InvitationQueryService,
    private notify: NzNotificationService,
    private store: Store<State>
  ) {}
}
