import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromVisitorList from '../actions/visitor-list.action'
import { VisitorListService } from '../services/visitor-list.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getVisitorPageParams } from '../reducers'

@Injectable()
export class VisitorListEffects {
  @Effect()
  fetchVisitors$ = this.actions$
    .ofType(fromVisitorList.FETCH_VISITORS)
    .map((action: fromVisitorList.FetchVisitorsAction) => action.params)
    .switchMap(params => {
      return this.visitorListService
        .fetchVisitors(params)
        .map(
        visitors =>
          new fromVisitorList.FetchVisitorsSuccessAction(visitors)
        )
        .catch(err =>
          Observable.of(
            new fromVisitorList.FetchVisitorsFailureAction()
          )
        )
    })

  @Effect()
  fetchVisitorsCount$ = this.actions$
    .ofType(fromVisitorList.FETCH_VISITORS_COUNT)
    .switchMap(() => {
      return this.visitorListService
        .fetchVisitorsCount()
        .map(
        count =>
          new fromVisitorList.FetchVisitorsCountSuccessAction(
            count
          )
        )
        .catch(e =>
          Observable.of(
            new fromVisitorList.FetchVisitorsCountFailureAction()
          )
        )
    })

  @Effect()
  singleDeleteVisitor$ = this.actions$
    .ofType(fromVisitorList.SINGLE_DELETE_VISITOR)
    .map((action: fromVisitorList.SingleDeleteVisitorAction) => action.id)
    .withLatestFrom(this.store.select(getVisitorPageParams))
    .switchMap(([id, params]) => {
      return this.visitorListService
        .singleDelete(id)
        .concatMap(() => [
          new fromVisitorList.SingleDeleteVisitorSuccessAction(),
          new fromVisitorList.FetchVisitorsAction({
            condition: {},
            options: params
          }),
          new fromVisitorList.FetchVisitorsCountAction()
        ])
        .catch(() =>
          Observable.of(
            new fromVisitorList.SingleDeleteVisitorFailureAction()
          )
        )
    })
  @Effect({ dispatch: false })
  singleDeleteVisitorSuccess$ = this.actions$
    .ofType(fromVisitorList.SINGLE_DELETE_VISITOR_SUCCESS)
    .do(() => {
      this.notify.success('删除买家', `恭喜您, 删除买家成功！`)
    })
  @Effect({ dispatch: false })
  singleDeleteVisitorFailure$ = this.actions$
    .ofType(fromVisitorList.SINGLE_DELETE_VISITOR_FAILURE)
    .do(() => {
      this.notify.error('删除买家', `啊哦, 删除买家失败！`)
    })

  @Effect()
  batchDeleteVisitors$ = this.actions$
    .ofType(fromVisitorList.BATCH_DELETE_VISITORS)
    .map((action: fromVisitorList.BatchDeleteVisitorsAction) => action.ids)
    .withLatestFrom(this.store.select(getVisitorPageParams))
    .switchMap(([ids, params]) => {
      return this.visitorListService
        .batchDelete(ids)
        .concatMap(() => [
          new fromVisitorList.BatchDeleteVisitorsSuccessAction(),
          new fromVisitorList.FetchVisitorsAction({
            condition: {},
            options: params
          }),
          new fromVisitorList.FetchVisitorsCountAction()
        ])
        .catch(() =>
          Observable.of(
            new fromVisitorList.BatchDeleteVisitorsFailureAction()
          )
        )
    })
  @Effect({ dispatch: false })
  batchDeleteVisitorsSuccess$ = this.actions$
    .ofType(fromVisitorList.BATCH_DELETE_VISITORS_SUCCESS)
    .do(() => {
      this.notify.success('批量删除买家', `恭喜您, 批量删除买家成功！`)
    })
  @Effect({ dispatch: false })
  batchDeleteExhibitorFailure$ = this.actions$
    .ofType(fromVisitorList.BATCH_DELETE_VISITORS_FAILURE)
    .do(() => {
      this.notify.error('批量删除买家', `啊哦, 批量删除买家失败！`)
    })

  constructor(
    private actions$: Actions,
    private visitorListService: VisitorListService,
    private notify: NzNotificationService,
    private store: Store<State>
  ) { }
}
