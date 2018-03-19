import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromPlatformMessage from '../actions/platform-message.action'
import { PlatformMessageService } from '../services/platform-message.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getPlatformMessagesPageParams } from '../reducers'

@Injectable()
export class PlatformMessageEffects {
    @Effect()
    fetchPlatformMessages$ = this.actions$
        .ofType(fromPlatformMessage.FETCH_PLATFORM_MESSAGES)
        .map(
            (action: fromPlatformMessage.FetchPlatformMessagesAction) =>
                action.payload
        )
        .switchMap(params => {
            return this.platformMessageService
                .fetchPlatformMessages(params)
                .map(
                    platformMessages =>
                        new fromPlatformMessage.FetchPlatformMessagesSuccessAction(
                            platformMessages
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromPlatformMessage.FetchPlatformMessagesFailureAction()
                    )
                )
        })

    @Effect()
    fetchPlatformMessagesCount$ = this.actions$
        .ofType(fromPlatformMessage.FETCH_PLATFORM_MESSAGES_COUNT)
        .switchMap(() => {
            return this.platformMessageService
                .fetchPlatformMessagesCount()
                .map(
                    count =>
                        new fromPlatformMessage.FetchPlatformMessagesCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromPlatformMessage.FetchPlatformMessagesCountFailureAction()
                    )
                )
        })

    @Effect()
    singleDeletePlatformMessage$ = this.actions$
        .ofType(fromPlatformMessage.SINGLE_DELETE_PLATFORM_MESSAGE)
        .map(
            (action: fromPlatformMessage.SingleDeletePlatformMessageAction) =>
                action.id
        )
        .withLatestFrom(this.store.select(getPlatformMessagesPageParams))
        .switchMap(([id, params]) => {
            return this.platformMessageService
                .singleDelete(id)
                .concatMap(() => [
                    new fromPlatformMessage.SingleDeletePlatformMessageSuccessAction(),
                    new fromPlatformMessage.FetchPlatformMessagesAction({
                        condition: {},
                        options: params
                    }),
                    new fromPlatformMessage.FetchPlatformMessagesCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromPlatformMessage.SingleDeletePlatformMessageFailureAction()
                    )
                )
        })
    @Effect({ dispatch: false })
    singleDeletePlatformMessageSuccess$ = this.actions$
        .ofType(fromPlatformMessage.SINGLE_DELETE_PLATFORM_MESSAGE_SUCCESS)
        .do(() => {
            this.notify.success('删除平台消息', `恭喜您, 删除平台消息成功！`)
        })
    @Effect({ dispatch: false })
    singleDeletePlatformMessageFailure$ = this.actions$
        .ofType(fromPlatformMessage.SINGLE_DELETE_PLATFORM_MESSAGE_FAILURE)
        .do(() => {
            this.notify.error('删除平台消息', `啊哦, 删除平台消息失败！`)
        })

    @Effect()
    batchDeletePlatformMessages$ = this.actions$
        .ofType(fromPlatformMessage.BATCH_DELETE_PLATFORM_MESSAGES)
        .map(
            (action: fromPlatformMessage.BatchDeletePlatformMessagesAction) =>
                action.ids
        )
        .withLatestFrom(this.store.select(getPlatformMessagesPageParams))
        .switchMap(([ids, params]) => {
            return this.platformMessageService
                .batchDelete(ids)
                .concatMap(() => [
                    new fromPlatformMessage.BatchDeletePlatformMessagesSuccessAction(),
                    new fromPlatformMessage.FetchPlatformMessagesAction({
                        condition: {},
                        options: params
                    }),
                    new fromPlatformMessage.FetchPlatformMessagesCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromPlatformMessage.BatchDeletePlatformMessagesFailureAction()
                    )
                )
        })
    @Effect({ dispatch: false })
    batchDeletePlatformMessagesSuccess$ = this.actions$
        .ofType(fromPlatformMessage.BATCH_DELETE_PLATFORM_MESSAGES_SUCCESS)
        .do(() => {
            this.notify.success(
                '批量删除平台消息',
                `恭喜您, 批量删除平台消息成功！`
            )
        })
    @Effect({ dispatch: false })
    batchDeletePlatformMessagesFailure$ = this.actions$
        .ofType(fromPlatformMessage.BATCH_DELETE_PLATFORM_MESSAGES_FAILURE)
        .do(() => {
            this.notify.error(
                '批量删除平台消息',
                `啊哦, 批量删除平台消息失败！`
            )
        })

    constructor(
        private actions$: Actions,
        private platformMessageService: PlatformMessageService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
