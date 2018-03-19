import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromExhibitorMessage from '../actions/exhibitor-message.action'
import { ExhibitorMessageService } from '../services/exhibitor-message.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getExhibitorMessagesPageParams } from '../reducers'

@Injectable()
export class ExhibitorMessageEffects {
    @Effect()
    fetchExhibitorMessages$ = this.actions$
        .ofType(fromExhibitorMessage.FETCH_EXHIBITOR_MESSAGES)
        .map(
            (action: fromExhibitorMessage.FetchExhibitorMessagesAction) =>
                action.payload
        )
        .switchMap(params => {
            return this.exhibitorMessageService
                .fetchExhibitorMessages(params)
                .map(
                    exhibitorMessages =>
                        new fromExhibitorMessage.FetchExhibitorMessagesSuccessAction(
                            exhibitorMessages
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromExhibitorMessage.FetchExhibitorMessagesFailureAction()
                    )
                )
        })

    @Effect()
    fetchExhibitorMessagesCount$ = this.actions$
        .ofType(fromExhibitorMessage.FETCH_EXHIBITOR_MESSAGES_COUNT)
        .switchMap(() => {
            return this.exhibitorMessageService
                .fetchExhibitorMessagesCount()
                .map(
                    count =>
                        new fromExhibitorMessage.FetchExhibitorMessagesCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromExhibitorMessage.FetchExhibitorMessagesCountFailureAction()
                    )
                )
        })

    @Effect()
    singleDeleteExhibitorMessage$ = this.actions$
        .ofType(fromExhibitorMessage.SINGLE_DELETE_EXHIBITOR_MESSAGE)
        .map(
            (action: fromExhibitorMessage.SingleDeleteExhibitorMessageAction) =>
                action.id
        )
        .withLatestFrom(this.store.select(getExhibitorMessagesPageParams))
        .switchMap(([id, params]) => {
            return this.exhibitorMessageService
                .singleDelete(id)
                .concatMap(() => [
                    new fromExhibitorMessage.SingleDeleteExhibitorMessageSuccessAction(),
                    new fromExhibitorMessage.FetchExhibitorMessagesAction({
                        condition: {},
                        options: params
                    }),
                    new fromExhibitorMessage.FetchExhibitorMessagesCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromExhibitorMessage.SingleDeleteExhibitorMessageFailureAction()
                    )
                )
        })
    @Effect({ dispatch: false })
    singleDeleteExhibitorMessageSuccess$ = this.actions$
        .ofType(fromExhibitorMessage.SINGLE_DELETE_EXHIBITOR_MESSAGE_SUCCESS)
        .do(() => {
            this.notify.success('删除展商消息', `恭喜您, 删除展商消息成功！`)
        })
    @Effect({ dispatch: false })
    singleDeleteExhibitorMessageFailure$ = this.actions$
        .ofType(fromExhibitorMessage.SINGLE_DELETE_EXHIBITOR_MESSAGE_FAILURE)
        .do(() => {
            this.notify.error('删除展商消息', `啊哦, 删除展商消息失败！`)
        })

    @Effect()
    batchDeleteExhibitorMessages$ = this.actions$
        .ofType(fromExhibitorMessage.BATCH_DELETE_EXHIBITOR_MESSAGES)
        .map(
            (action: fromExhibitorMessage.BatchDeleteExhibitorMessagesAction) =>
                action.ids
        )
        .withLatestFrom(this.store.select(getExhibitorMessagesPageParams))
        .switchMap(([ids, params]) => {
            return this.exhibitorMessageService
                .batchDelete(ids)
                .concatMap(() => [
                    new fromExhibitorMessage.BatchDeleteExhibitorMessagesSuccessAction(),
                    new fromExhibitorMessage.FetchExhibitorMessagesAction({
                        condition: {},
                        options: params
                    }),
                    new fromExhibitorMessage.FetchExhibitorMessagesCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromExhibitorMessage.BatchDeleteExhibitorMessagesFailureAction()
                    )
                )
        })
    @Effect({ dispatch: false })
    batchDeleteExhibitorMessagesSuccess$ = this.actions$
        .ofType(fromExhibitorMessage.BATCH_DELETE_EXHIBITOR_MESSAGES_SUCCESS)
        .do(() => {
            this.notify.success(
                '批量删除展商消息',
                `恭喜您, 批量删除展商消息成功！`
            )
        })
    @Effect({ dispatch: false })
    batchDeleteExhibitorMessagesFailure$ = this.actions$
        .ofType(fromExhibitorMessage.BATCH_DELETE_EXHIBITOR_MESSAGES_FAILURE)
        .do(() => {
            this.notify.error(
                '批量删除展商消息',
                `啊哦, 批量删除展商消息失败！`
            )
        })

    @Effect()
    createExhibitorMessage$ = this.actions$
        .ofType(fromExhibitorMessage.CREATE_EXHIBITOR_MESSAGE)
        .map(
            (action: fromExhibitorMessage.CreateExhibitorMessageAction) =>
                action.params
        )
        .switchMap(params => {
            return this.exhibitorMessageService
                .create(params)
                .concatMap(() => [
                    new fromExhibitorMessage.CreateExhibitorMessageSuccessAction(),
                    new fromExhibitorMessage.FetchExhibitorMessagesAction(),
                    new fromExhibitorMessage.FetchExhibitorMessagesCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromExhibitorMessage.CreateExhibitorMessageFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    createExhibitorMessageSuccess$ = this.actions$
        .ofType(fromExhibitorMessage.CREATE_EXHIBITOR_MESSAGE_SUCCESS)
        .do(() => {
            this.notify.success(`新增展商消息`, `恭喜您，新增展商消息成功！`)
        })

    @Effect({ dispatch: false })
    createExhibitorMessageFailure$ = this.actions$
        .ofType(fromExhibitorMessage.CREATE_EXHIBITOR_MESSAGE_FAILURE)
        .do(() => {
            this.notify.error(`新增展商消息`, `啊哦，新增展商消息失败！`)
        })

    @Effect()
    searchExhibitors$ = this.actions$
        .ofType(fromExhibitorMessage.SEARCH_EXHIBITORS)
        .map(
            (action: fromExhibitorMessage.SearchExhibitorsAction) =>
                action.searchText
        )
        .switchMap(query => {
            return this.exhibitorMessageService
                .searchExhibitors(query)
                .map(
                    exhibitors =>
                        new fromExhibitorMessage.SearchExhibitorsSuccessAction(
                            exhibitors
                        )
                )
                .catch(() =>
                    Observable.of(
                        new fromExhibitorMessage.SearchExhibitorsFailureAction()
                    )
                )
        })

    @Effect()
    initFetchExhibitors$ = this.actions$
        .ofType(fromExhibitorMessage.INIT_FETCH_EXHIBITORS)
        .switchMap(() => {
            return this.exhibitorMessageService
                .initFetchExhibitors()
                .map(
                    exhibitors =>
                        new fromExhibitorMessage.InitFetchExhibitorsSuccessAction(
                            exhibitors
                        )
                )
                .catch(() =>
                    Observable.of(
                        new fromExhibitorMessage.InitFetchExhibitorsFailureAction()
                    )
                )
        })

    constructor(
        private actions$: Actions,
        private exhibitorMessageService: ExhibitorMessageService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
