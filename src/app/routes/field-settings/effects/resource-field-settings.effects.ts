import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { fromResourceFieldSettings } from '../actions'
import { ResourceFieldSettingsService } from '../services'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'
import { map, switchMap, catchError, concatMap, tap } from 'rxjs/operators'

@Injectable()
export class ResourceFieldSettingsEffects {
    @Effect()
    fetchResourceFieldSettings$ = this.actions$
        .ofType(fromResourceFieldSettings.FETCH_RESOURCE_FIELD_SETTINGS)
        .pipe(
            map(
                (
                    action: fromResourceFieldSettings.FetchResourceFieldSettingsAction
                ) => action.payload
            ),
            switchMap(params =>
                this.resourceFieldSettingsService
                    .fetchFieldSettings(params)
                    .pipe(
                        map(
                            loggers =>
                                new fromResourceFieldSettings.FetchResourceFieldSettingsSuccessAction(
                                    loggers
                                )
                        ),
                        catchError(() =>
                            of(
                                new fromResourceFieldSettings.FetchResourceFieldSettingsFailureAction()
                            )
                        )
                    )
            )
        )

    @Effect()
    fetchResourceFieldSettingsCount$ = this.actions$
        .ofType(fromResourceFieldSettings.FETCH_RESOURCE_FIELD_SETTINGS_COUNT)
        .pipe(
            map(
                (
                    action: fromResourceFieldSettings.FetchResourceFieldSettingsCountAction
                ) => action.searchText
            ),
            switchMap(searchText =>
                this.resourceFieldSettingsService
                    .fetchFieldSettingsCount(searchText)
                    .pipe(
                        map(
                            count =>
                                new fromResourceFieldSettings.FetchResourceFieldSettingsCountSuccessAction(
                                    count
                                )
                        ),
                        catchError(() =>
                            of(
                                new fromResourceFieldSettings.FetchResourceFieldSettingsCountFailureAction()
                            )
                        )
                    )
            )
        )

    constructor(
        private actions$: Actions,
        private resourceFieldSettingsService: ResourceFieldSettingsService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
