import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromCalendarSettings from '../actions/calendar-settings.action'
import { CalendarSettingsService } from '../services/calendar-settings.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getCalendarSettings } from '../reducers'

@Injectable()
export class CalendarSettingsEffects {
    @Effect()
    fetchCalendarSettings$ = this.actions$
        .ofType(fromCalendarSettings.FETCH_CALENDAR_SETTINGS)
        .switchMap(() => {
            return this.calendarSettingsService
                .fetchCalendarSettings()
                .map(
                    calendarSettings =>
                        new fromCalendarSettings.FetchCalendarSettingsSuccessAction(
                            calendarSettings
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromCalendarSettings.FetchCalendarSettingsFailureAction()
                    )
                )
        })

    @Effect()
    updateCalendarSettings$ = this.actions$
        .ofType(fromCalendarSettings.UPDATE_CALENDAR_SETTINGS)
        .map(
            (action: fromCalendarSettings.UpdateCalendarSettingsAction) =>
                action.payload
        )
        .withLatestFrom(this.store.select(getCalendarSettings))
        .switchMap(([params, { id }]) => {
            return this.calendarSettingsService
                .updateCalendarSettings({
                    ...params,
                    id
                })
                .concatMap(() => [
                    new fromCalendarSettings.UpdateCalendarSettingsSuccessAction(),
                    new fromCalendarSettings.FetchCalendarSettingsAction()
                ])
                .catch(err =>
                    Observable.of(
                        new fromCalendarSettings.UpdateCalendarSettingsFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    updateCalendarSettingsSuccess$ = this.actions$
        .ofType(fromCalendarSettings.UPDATE_CALENDAR_SETTINGS_SUCCESS)
        .do(() => {
            this.notify.success('编辑日程设置', `恭喜您, 编辑日程设置成功！`)
        })
    @Effect({ dispatch: false })
    updateCalendarSettingsFailure$ = this.actions$
        .ofType(fromCalendarSettings.UPDATE_CALENDAR_SETTINGS_FAILURE)
        .do(() => {
            this.notify.error('编辑日程设置', `啊哦, 编辑日程设置失败！`)
        })

    constructor(
        private actions$: Actions,
        private calendarSettingsService: CalendarSettingsService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
