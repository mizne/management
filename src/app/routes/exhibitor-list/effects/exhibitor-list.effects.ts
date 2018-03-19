import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromExhibitorList from '../actions/exhibitor-list.action'
import { ExhibitorListService } from '../services/exhibitor-list.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getExhibitorPageParams } from '../reducers'

@Injectable()
export class ExhibitorListEffects {
    @Effect()
    fetchExhibitors$ = this.actions$
        .ofType(fromExhibitorList.FETCH_EXHIBITORS)
        .map((action: fromExhibitorList.FetchExhibitorsAction) => action.params)
        .switchMap(params => {
            return this.exhibitorListService
                .fetchExhibitors(params)
                .map(
                    terminals =>
                        new fromExhibitorList.FetchExhibitorsSuccessAction(
                            terminals
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromExhibitorList.FetchExhibitorsFailureAction()
                    )
                )
        })

    @Effect()
    fetchExhibitorsCount$ = this.actions$
        .ofType(fromExhibitorList.FETCH_EXHIBITORS_COUNT)
        .switchMap(() => {
            return this.exhibitorListService
                .fetchExhibitorsCount()
                .map(
                    count =>
                        new fromExhibitorList.FetchExhibitorsCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromExhibitorList.FetchExhibitorsCountFailureAction()
                    )
                )
        })

    @Effect()
    singleDeleteExhibitor$ = this.actions$
        .ofType(fromExhibitorList.SINGLE_DELETE_EXHIBITOR)
        .map(
            (action: fromExhibitorList.SingleDeleteExhibitorAction) => action.id
        )
        .withLatestFrom(this.store.select(getExhibitorPageParams))
        .switchMap(([id, params]) => {
            return this.exhibitorListService
                .singleDelete(id)
                .concatMap(() => [
                    new fromExhibitorList.SingleDeleteExhibitorSuccessAction(),
                    new fromExhibitorList.FetchExhibitorsAction({
                        condition: {},
                        options: params
                    }),
                    new fromExhibitorList.FetchExhibitorsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromExhibitorList.SingleDeleteExhibitorFailureAction()
                    )
                )
        })
    @Effect({ dispatch: false })
    singleDeleteExhibitorSuccess$ = this.actions$
        .ofType(fromExhibitorList.SINGLE_DELETE_EXHIBITOR_SUCCESS)
        .do(() => {
            this.notify.success('删除展商', `恭喜您, 删除展商成功！`)
        })
    @Effect({ dispatch: false })
    singleDeleteExhibitorFailure$ = this.actions$
        .ofType(fromExhibitorList.SINGLE_DELETE_EXHIBITOR_FAILURE)
        .do(() => {
            this.notify.error('删除展商', `啊哦, 删除展商失败！`)
        })

    @Effect()
    batchDeleteExhibitors$ = this.actions$
        .ofType(fromExhibitorList.BATCH_DELETE_EXHIBITORS)
        .map(
            (action: fromExhibitorList.BatchDeleteExhibitorsAction) =>
                action.ids
        )
        .withLatestFrom(this.store.select(getExhibitorPageParams))
        .switchMap(([ids, params]) => {
            return this.exhibitorListService
                .batchDelete(ids)
                .concatMap(() => [
                    new fromExhibitorList.BatchDeleteExhibitorsSuccessAction(),
                    new fromExhibitorList.FetchExhibitorsAction({
                        condition: {},
                        options: params
                    }),
                    new fromExhibitorList.FetchExhibitorsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromExhibitorList.BatchDeleteExhibitorsFailureAction()
                    )
                )
        })
    @Effect({ dispatch: false })
    batchDeleteExhibitorSuccess$ = this.actions$
        .ofType(fromExhibitorList.BATCH_DELETE_EXHIBITORS_SUCCESS)
        .do(() => {
            this.notify.success('批量删除展商', `恭喜您, 批量删除展商成功！`)
        })
    @Effect({ dispatch: false })
    batchDeleteExhibitorFailure$ = this.actions$
        .ofType(fromExhibitorList.BATCH_DELETE_EXHIBITORS_FAILURE)
        .do(() => {
            this.notify.error('批量删除展商', `啊哦, 批量删除展商失败！`)
        })

    constructor(
        private actions$: Actions,
        private exhibitorListService: ExhibitorListService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
