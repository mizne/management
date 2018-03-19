import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromTemplateSettings from '../actions/template-settings.action'
import { TemplateSettingsService } from '../services/template-settings.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import {
    State,
    getVTETemplateSettings,
    getETVTemplateSettings,
    getETETemplateSettings
} from '../reducers'
import { TemplateType } from '../models/template-settings.model'

@Injectable()
export class TemplateSettingsEffects {
    @Effect()
    fetchVTETemplateSettings$ = this.actions$
        .ofType(fromTemplateSettings.FETCH_VTE_TEMPLATE_SETTINGS)
        .switchMap(() => {
            return this.templateSettingsService
                .fetchTemplateSettings(TemplateType.VISITOR_TO_EXHIBITOR)
                .map(
                    templateSettings =>
                        new fromTemplateSettings.FetchVTETemplateSettingsSuccessAction(
                            templateSettings
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromTemplateSettings.FetchVTETemplateSettingsFailureAction()
                    )
                )
        })

    @Effect()
    updateVTETemplateSettings$ = this.actions$
        .ofType(fromTemplateSettings.UPDATE_VTE_TEMPLATE_SETTINGS)
        .map(
            (action: fromTemplateSettings.UpdateVTETemplateSettingsAction) =>
                action.template
        )
        .withLatestFrom(this.store.select(getVTETemplateSettings))
        .switchMap(([template, templateSettings]) => {
            return this.templateSettingsService
                .updateTemplateSettings({
                    template,
                    name: TemplateType.VISITOR_TO_EXHIBITOR,
                    id: templateSettings.id
                })
                .concatMap(() => [
                    new fromTemplateSettings.UpdateVTETemplateSettingsSuccessAction(),
                    new fromTemplateSettings.FetchVTETemplateSettingsAction()
                ])
                .catch(err =>
                    Observable.of(
                        new fromTemplateSettings.UpdateVTETemplateSettingsFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    updateVTETemplateSettingsSuccess$ = this.actions$
        .ofType(fromTemplateSettings.UPDATE_VTE_TEMPLATE_SETTINGS_SUCCESS)
        .do(() => {
            this.notify.success(
                '买家约请展商模版',
                `恭喜您, 编辑买家约请展商模版成功！`
            )
        })
    @Effect({ dispatch: false })
    updateVTETemplateSettingsFailure$ = this.actions$
        .ofType(fromTemplateSettings.UPDATE_VTE_TEMPLATE_SETTINGS_FAILURE)
        .do(() => {
            this.notify.error(
                '买家约请展商模版',
                `啊哦, 编辑买家约请展商模版失败！`
            )
        })

    @Effect()
    fetchETVTemplateSettings$ = this.actions$
        .ofType(fromTemplateSettings.FETCH_ETV_TEMPLATE_SETTINGS)
        .switchMap(() => {
            return this.templateSettingsService
                .fetchTemplateSettings(TemplateType.EXHIBITOR_TO_VISITOR)
                .map(
                    templateSettings =>
                        new fromTemplateSettings.FetchETVTemplateSettingsSuccessAction(
                            templateSettings
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromTemplateSettings.FetchETVTemplateSettingsFailureAction()
                    )
                )
        })

    @Effect()
    updateETVTemplateSettings$ = this.actions$
        .ofType(fromTemplateSettings.UPDATE_ETV_TEMPLATE_SETTINGS)
        .map(
            (action: fromTemplateSettings.UpdateETVTemplateSettingsAction) =>
                action.template
        )
        .withLatestFrom(this.store.select(getETVTemplateSettings))
        .switchMap(([template, templateSettings]) => {
            return this.templateSettingsService
                .updateTemplateSettings({
                    template,
                    name: TemplateType.EXHIBITOR_TO_VISITOR,
                    id: templateSettings.id
                })
                .concatMap(() => [
                    new fromTemplateSettings.UpdateETVTemplateSettingsSuccessAction(),
                    new fromTemplateSettings.FetchETVTemplateSettingsAction()
                ])
                .catch(err =>
                    Observable.of(
                        new fromTemplateSettings.UpdateETVTemplateSettingsFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    updateETVTemplateSettingsSuccess$ = this.actions$
        .ofType(fromTemplateSettings.UPDATE_ETV_TEMPLATE_SETTINGS_SUCCESS)
        .do(() => {
            this.notify.success(
                '展商约请买家模版',
                `恭喜您, 编辑展商约请买家模版成功！`
            )
        })
    @Effect({ dispatch: false })
    updateETVTemplateSettingsFailure$ = this.actions$
        .ofType(fromTemplateSettings.UPDATE_ETV_TEMPLATE_SETTINGS_FAILURE)
        .do(() => {
            this.notify.error(
                '展商约请买家模版',
                `啊哦, 编辑展商约请买家模版失败！`
            )
        })

    @Effect()
    fetchETETemplateSettings$ = this.actions$
        .ofType(fromTemplateSettings.FETCH_ETE_TEMPLATE_SETTINGS)
        .switchMap(() => {
            return this.templateSettingsService
                .fetchTemplateSettings(TemplateType.EXHIBITOR_TO_EXHIBITOR)
                .map(
                    templateSettings =>
                        new fromTemplateSettings.FetchETETemplateSettingsSuccessAction(
                            templateSettings
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromTemplateSettings.FetchETETemplateSettingsFailureAction()
                    )
                )
        })

    @Effect()
    updateETETemplateSettings$ = this.actions$
        .ofType(fromTemplateSettings.UPDATE_ETE_TEMPLATE_SETTINGS)
        .map(
            (action: fromTemplateSettings.UpdateETETemplateSettingsAction) =>
                action.template
        )
        .withLatestFrom(this.store.select(getETETemplateSettings))
        .switchMap(([template, templateSettings]) => {
            return this.templateSettingsService
                .updateTemplateSettings({
                    template,
                    name: TemplateType.EXHIBITOR_TO_EXHIBITOR,
                    id: templateSettings.id
                })
                .concatMap(() => [
                    new fromTemplateSettings.UpdateETETemplateSettingsSuccessAction(),
                    new fromTemplateSettings.FetchETETemplateSettingsAction()
                ])
                .catch(err =>
                    Observable.of(
                        new fromTemplateSettings.UpdateETETemplateSettingsFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    updateETETemplateSettingsSuccess$ = this.actions$
        .ofType(fromTemplateSettings.UPDATE_ETE_TEMPLATE_SETTINGS_SUCCESS)
        .do(() => {
            this.notify.success(
                '展商约请展商模版',
                `恭喜您, 编辑展商约请展商模版成功！`
            )
        })
    @Effect({ dispatch: false })
    updateETETemplateSettingsFailure$ = this.actions$
        .ofType(fromTemplateSettings.UPDATE_ETE_TEMPLATE_SETTINGS_FAILURE)
        .do(() => {
            this.notify.error(
                '展商约请展商模版',
                `啊哦, 编辑展商约请展商模版失败！`
            )
        })

    constructor(
        private actions$: Actions,
        private templateSettingsService: TemplateSettingsService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
