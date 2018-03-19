import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromKeySettings from '../actions/key-settings.action'
import { KeySettingsService } from '../services/key-settings.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getKeySettings } from '../reducers'

@Injectable()
export class KeySettingsEffects {
    @Effect()
    fetchKeySettings$ = this.actions$
        .ofType(fromKeySettings.FETCH_KEY_SETTINGS)
        .switchMap(() => {
            return this.keySettingsService
                .fetchKeySettings()
                .map(
                    keySettings =>
                        new fromKeySettings.FetchKeySettingsSuccessAction(
                            keySettings
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromKeySettings.FetchKeySettingsFailureAction()
                    )
                )
        })

    @Effect()
    createKey$ = this.actions$
        .ofType(fromKeySettings.CREATE_KEY)
        .map((action: fromKeySettings.CreateKeyAction) => action.key)
        .withLatestFrom(this.store.select(getKeySettings))
        .switchMap(([key, keySettings]) => {
            return this.keySettingsService
                .createKey([...keySettings.keys, key], keySettings.id)
                .concatMap(() => [
                    new fromKeySettings.CreateKeySuccessAction(),
                    new fromKeySettings.FetchKeySettingsAction()
                ])
                .catch(err =>
                    Observable.of(new fromKeySettings.CreateKeyFailureAction())
                )
        })

    @Effect({ dispatch: false })
    createKeySuccess$ = this.actions$
        .ofType(fromKeySettings.CREATE_KEY_SUCCESS)
        .do(() => {
            this.notify.success('添加关键字', `恭喜您, 添加关键字成功！`)
        })
    @Effect({ dispatch: false })
    createKeyFailure$ = this.actions$
        .ofType(fromKeySettings.CREATE_KEY_FAILURE)
        .do(() => {
            this.notify.error('添加关键字', `啊哦, 添加关键字失败！`)
        })

    @Effect()
    deleteKey$ = this.actions$
        .ofType(fromKeySettings.DELETE_KEY)
        .map((action: fromKeySettings.DeleteKeyAction) => action.key)
        .withLatestFrom(this.store.select(getKeySettings))
        .switchMap(([key, keySettings]) => {
            return this.keySettingsService
                .deleteKey(
                    keySettings.keys.filter(e => e !== key),
                    keySettings.id
                )
                .concatMap(() => [
                    new fromKeySettings.DeleteKeySuccessAction(),
                    new fromKeySettings.FetchKeySettingsAction()
                ])
                .catch(err =>
                    Observable.of(new fromKeySettings.DeleteKeyFailureAction())
                )
        })

    @Effect({ dispatch: false })
    deleteKeySuccess$ = this.actions$
        .ofType(fromKeySettings.DELETE_KEY_SUCCESS)
        .do(() => {
            this.notify.success('删除关键字', `恭喜您, 删除关键字成功！`)
        })
    @Effect({ dispatch: false })
    deleteKeyFailure$ = this.actions$
        .ofType(fromKeySettings.DELETE_KEY_FAILURE)
        .do(() => {
            this.notify.error('删除关键字', `啊哦, 删除关键字失败！`)
        })

    constructor(
        private actions$: Actions,
        private keySettingsService: KeySettingsService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
