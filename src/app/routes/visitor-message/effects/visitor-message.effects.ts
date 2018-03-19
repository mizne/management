import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromVisitorMessage from '../actions/visitor-message.action'
import { VisitorMessageService } from '../services/visitor-message.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getVisitorMessagesPageParams } from '../reducers'

@Injectable()
export class VisitorMessageEffects {
    @Effect()
    fetchVisitorMessages$ = this.actions$
        .ofType(fromVisitorMessage.FETCH_VISITOR_MESSAGES)
        .map(
            (action: fromVisitorMessage.FetchVisitorMessagesAction) =>
                action.payload
        )
        .switchMap(params => {
            return this.visitorMessageService
                .fetchVisitorMessages(params)
                .map(
                    visitorMessages =>
                        new fromVisitorMessage.FetchVisitorMessagesSuccessAction(
                            visitorMessages
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromVisitorMessage.FetchVisitorMessagesFailureAction()
                    )
                )
        })

    @Effect()
    fetchvisitorMessagesCount$ = this.actions$
        .ofType(fromVisitorMessage.FETCH_VISITOR_MESSAGES_COUNT)
        .switchMap(() => {
            return this.visitorMessageService
                .fetchVisitorMessagesCount()
                .map(
                    count =>
                        new fromVisitorMessage.FetchVisitorMessagesCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromVisitorMessage.FetchVisitorMessagesCountFailureAction()
                    )
                )
        })

    @Effect()
    singleDeleteVisitorMessage$ = this.actions$
        .ofType(fromVisitorMessage.SINGLE_DELETE_VISITOR_MESSAGE)
        .map(
            (action: fromVisitorMessage.SingleDeleteVisitorMessageAction) =>
                action.id
        )
        .withLatestFrom(this.store.select(getVisitorMessagesPageParams))
        .switchMap(([id, params]) => {
            return this.visitorMessageService
                .singleDelete(id)
                .concatMap(() => [
                    new fromVisitorMessage.SingleDeleteVisitorMessageSuccessAction(),
                    new fromVisitorMessage.FetchVisitorMessagesAction({
                        condition: {},
                        options: params
                    }),
                    new fromVisitorMessage.FetchVisitorMessagesCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromVisitorMessage.SingleDeleteVisitorMessageFailureAction()
                    )
                )
        })
    @Effect({ dispatch: false })
    singleDeleteVisitorMessageSuccess$ = this.actions$
        .ofType(fromVisitorMessage.SINGLE_DELETE_VISITOR_MESSAGE_SUCCESS)
        .do(() => {
            this.notify.success('删除买家消息', `恭喜您, 删除买家消息成功！`)
        })
    @Effect({ dispatch: false })
    singleDeleteVisitorMessageFailure$ = this.actions$
        .ofType(fromVisitorMessage.SINGLE_DELETE_VISITOR_MESSAGE_FAILURE)
        .do(() => {
            this.notify.error('删除买家消息', `啊哦, 删除买家消息失败！`)
        })

    @Effect()
    batchDeleteVisitorMessages$ = this.actions$
        .ofType(fromVisitorMessage.BATCH_DELETE_VISITOR_MESSAGES)
        .map(
            (action: fromVisitorMessage.BatchDeleteVisitorMessagesAction) =>
                action.ids
        )
        .withLatestFrom(this.store.select(getVisitorMessagesPageParams))
        .switchMap(([ids, params]) => {
            return this.visitorMessageService
                .batchDelete(ids)
                .concatMap(() => [
                    new fromVisitorMessage.BatchDeleteVisitorMessagesSuccessAction(),
                    new fromVisitorMessage.FetchVisitorMessagesAction({
                        condition: {},
                        options: params
                    }),
                    new fromVisitorMessage.FetchVisitorMessagesCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromVisitorMessage.BatchDeleteVisitorMessagesFailureAction()
                    )
                )
        })
    @Effect({ dispatch: false })
    batchDeleteVisitorMessagesSuccess$ = this.actions$
        .ofType(fromVisitorMessage.BATCH_DELETE_VISITOR_MESSAGES_SUCCESS)
        .do(() => {
            this.notify.success(
                '批量删除买家消息',
                `恭喜您, 批量删除买家消息成功！`
            )
        })
    @Effect({ dispatch: false })
    batchDeleteVisitorMessagesFailure$ = this.actions$
        .ofType(fromVisitorMessage.BATCH_DELETE_VISITOR_MESSAGES_FAILURE)
        .do(() => {
            this.notify.error(
                '批量删除买家消息',
                `啊哦, 批量删除买家消息失败！`
            )
        })

    @Effect()
    createVisitorMessage$ = this.actions$
        .ofType(fromVisitorMessage.CREATE_VISITOR_MESSAGE)
        .map(
            (action: fromVisitorMessage.CreateVisitorMessageAction) =>
                action.params
        )
        .switchMap(params => {
            return this.visitorMessageService
                .create(params)
                .concatMap(() => [
                    new fromVisitorMessage.CreateVisitorMessageSuccessAction(),
                    new fromVisitorMessage.FetchVisitorMessagesAction(),
                    new fromVisitorMessage.FetchVisitorMessagesCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromVisitorMessage.CreateVisitorMessageFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    createVisitorMessageSuccess$ = this.actions$
        .ofType(fromVisitorMessage.CREATE_VISITOR_MESSAGE_SUCCESS)
        .do(() => {
            this.notify.success(`新增买家消息`, `恭喜您，新增买家消息成功！`)
        })

    @Effect({ dispatch: false })
    createVisitorMessageFailure$ = this.actions$
        .ofType(fromVisitorMessage.CREATE_VISITOR_MESSAGE_FAILURE)
        .do(() => {
            this.notify.error(`新增买家消息`, `啊哦，新增买家消息失败！`)
        })

    constructor(
        private actions$: Actions,
        private visitorMessageService: VisitorMessageService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
