import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromTerminalList from '../actions/terminal-list.action'
import { TerminalListService } from '../services/terminal-list.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getTerminalPageParams } from '../reducers'

@Injectable()
export class TerminalListEffects {
  @Effect()
  fetchTerminals$ = this.actions$
    .ofType(fromTerminalList.FETCH_TERMINALS)
    .map((action: fromTerminalList.FetchTerminalsAction) => action.payload)
    .switchMap(params => {
      return this.terminalListService
        .fetchTerminals(params)
        .map(
        terminals =>
          new fromTerminalList.FetchTerminalsSuccessAction(
            terminals
          )
        )
        .catch(err =>
          Observable.of(
            new fromTerminalList.FetchTerminalsFailureAction()
          )
        )
    })

  @Effect()
  fetchTerminalsCount = this.actions$
    .ofType(fromTerminalList.FETCH_TERMINALS_COUNT)
    .switchMap(() => {
      return this.terminalListService
        .fetchTerminalsCount()
        .map(
        count =>
          new fromTerminalList.FetchTerminalsCountSuccessAction(
            count
          )
        )
        .catch(e =>
          Observable.of(
            new fromTerminalList.FetchTerminalsCountFailureAction()
          )
        )
    })

  @Effect()
  createTerminal$ = this.actions$
    .ofType(fromTerminalList.CREATE_TERMINAL)
    .map((action: fromTerminalList.CreateTerminalAction) => action.params)
    .withLatestFrom(this.store.select(getTerminalPageParams))
    .switchMap(([terminalParams, pageParams]) => {
      return this.terminalListService
        .createTerminal(terminalParams)
        .concatMap(() => [
          new fromTerminalList.CreateTerminalSuccessAction(),
          new fromTerminalList.FetchTerminalsAction({
            condition: {},
            options: pageParams
          }),
          new fromTerminalList.FetchTerminalsCountAction()
        ])
        .catch(() =>
          Observable.of(
            new fromTerminalList.CreateTerminalFailureAction()
          )
        )
    })

  @Effect({ dispatch: false })
  createTerminalSuccess$ = this.actions$
    .ofType(fromTerminalList.CREATE_TERMINAL_SUCCESS)
    .do(() => {
      this.notify.success(`新增终端`, `恭喜您，新增终端成功！`)
    })

  @Effect({ dispatch: false })
  createTerminalFailure$ = this.actions$
    .ofType(fromTerminalList.CREATE_TERMINAL_FAILURE)
    .do(() => {
      this.notify.error(`新增终端`, `啊哦，新增终端失败！`)
    })

  @Effect()
  singleDeleteTerminal$ = this.actions$
    .ofType(fromTerminalList.SINGLE_DELETE_TERMINAL)
    .map((action: fromTerminalList.SingleDeleteTerminalAction) => action.id)
    .withLatestFrom(this.store.select(getTerminalPageParams))
    .switchMap(([id, params]) => {
      return this.terminalListService
        .singleDelete(id)
        .concatMap(() => [
          new fromTerminalList.SingleDeleteTerminalSuccessAction(),
          new fromTerminalList.FetchTerminalsAction({
            condition: {},
            options: params
          }),
          new fromTerminalList.FetchTerminalsCountAction()
        ])
        .catch(() =>
          Observable.of(
            new fromTerminalList.SingleDeleteTerminalFailureAction()
          )
        )
    })

  @Effect({ dispatch: false })
  singleDeleteTerminalSuccess$ = this.actions$
    .ofType(fromTerminalList.SINGLE_DELETE_TERMINAL_SUCCESS)
    .do(() => {
      this.notify.success('删除终端', `恭喜您, 删除终端成功！`)
    })
  @Effect({ dispatch: false })
  singleDeleteTerminalFailure$ = this.actions$
    .ofType(fromTerminalList.SINGLE_DELETE_TERMINAL_FAILURE)
    .do(() => {
      this.notify.error('删除终端', `啊哦, 删除终端失败！`)
    })

  @Effect()
  batchDeleteTerminal$ = this.actions$
    .ofType(fromTerminalList.BATCH_DELETE_TERMINALS)
    .map(
    (action: fromTerminalList.BatchDeleteTerminalsAction) => action.ids
    )
    .withLatestFrom(this.store.select(getTerminalPageParams))
    .switchMap(([ids, params]) => {
      return this.terminalListService
        .batchDelete(ids)
        .concatMap(() => [
          new fromTerminalList.BatchDeleteTerminalsSuccessAction(),
          new fromTerminalList.FetchTerminalsAction({
            condition: {},
            options: params
          }),
          new fromTerminalList.FetchTerminalsCountAction()
        ])
        .catch(() =>
          Observable.of(
            new fromTerminalList.BatchDeleteTerminalsFailureAction()
          )
        )
    })
  @Effect({ dispatch: false })
  batchDeleteTerminalSuccess$ = this.actions$
    .ofType(fromTerminalList.BATCH_DELETE_TERMINALS_SUCCESS)
    .do(() => {
      this.notify.success('批量删除终端', `恭喜您, 批量删除终端成功！`)
    })
  @Effect({ dispatch: false })
  batchDeleteTerminalFailure$ = this.actions$
    .ofType(fromTerminalList.BATCH_DELETE_TERMINALS_FAILURE)
    .do(() => {
      this.notify.error('批量删除终端', `啊哦, 批量删除终端失败！`)
    })

  @Effect()
  assignTerminal$ = this.actions$
    .ofType(fromTerminalList.ASSIGN_TERMINAL)
    .map((action: fromTerminalList.AssignTerminalAction) => action.payload)
    .withLatestFrom(this.store.select(getTerminalPageParams))
    .switchMap(([{ id, exhibitorId }, params]) => {
      return this.terminalListService
        .assignTerminal(id, exhibitorId)
        .concatMap(() => [
          new fromTerminalList.AssignTerminalSuccessAction(),
          new fromTerminalList.FetchTerminalsAction({
            condition: {},
            options: params
          })
        ])
        .catch(() =>
          Observable.of(
            new fromTerminalList.AssignTerminalFailureAction()
          )
        )
    })
  @Effect({ dispatch: false })
  assignTerminalSuccess$ = this.actions$
    .ofType(fromTerminalList.ASSIGN_TERMINAL_SUCCESS)
    .do(() => {
      this.notify.success('分配终端', `恭喜您, 分配终端成功！`)
    })
  @Effect({ dispatch: false })
  assignTerminalFailure$ = this.actions$
    .ofType(fromTerminalList.ASSIGN_TERMINAL_FAILURE)
    .do(() => {
      this.notify.error('分配终端', `啊哦, 分配终端失败！`)
    })

  @Effect()
  searchExhibitors$ = this.actions$
    .ofType(fromTerminalList.SEARCH_EXHIBITORS)
    .map(
    (action: fromTerminalList.SearchExhibitorsAction) =>
      action.searchText
    )
    .switchMap(query => {
      return this.terminalListService
        .searchExhibitors(query)
        .map(
        exhibitors =>
          new fromTerminalList.SearchExhibitorsSuccessAction(
            exhibitors
          )
        )
        .catch(() =>
          Observable.of(
            new fromTerminalList.SearchExhibitorsFailureAction()
          )
        )
    })

  @Effect()
  initFetchExhibitors$ = this.actions$
    .ofType(fromTerminalList.INIT_FETCH_EXHIBITORS)
    .switchMap(() => {
      return this.terminalListService
        .initFetchExhibitors()
        .map(
        exhibitors =>
          new fromTerminalList.InitFetchExhibitorsSuccessAction(
            exhibitors
          )
        )
        .catch(() =>
          Observable.of(
            new fromTerminalList.InitFetchExhibitorsFailureAction()
          )
        )
    })

  constructor(
    private actions$: Actions,
    private terminalListService: TerminalListService,
    private notify: NzNotificationService,
    private store: Store<State>
  ) { }
}
