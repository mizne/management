import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { fromSystemLoggerList } from '../actions'
import { SystemLoggerService } from '../services'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getSystemLoggerListPageParams } from '../reducers'
import { map, switchMap, catchError, concatMap, tap } from 'rxjs/operators'

@Injectable()
export class SystemLoggerListEffects {
    @Effect()
    fetchSystemLoggers$ = this.actions$
        .ofType(fromSystemLoggerList.FETCH_SYSTEM_LOGGERS)
        .pipe(
            map(
                (action: fromSystemLoggerList.FetchSystemLoggersAction) =>
                    action.payload
            ),
            switchMap(params =>
                this.systemLoggerService.fetchSystemLoggers(params).pipe(
                    map(
                        loggers =>
                            new fromSystemLoggerList.FetchSystemLoggersSuccessAction(
                                loggers
                            )
                    ),
                    catchError(() =>
                        of(new fromSystemLoggerList.FetchSystemLoggersFailureAction())
                    )
                )
            ),
            
        )

    @Effect()
    fetchSystemLoggersCount$ = this.actions$
        .ofType(fromSystemLoggerList.FETCH_SYSTEM_LOGGERS_COUNT)
        .pipe(
            map(
                (action: fromSystemLoggerList.FetchSystemLoggersCountAction) =>
                    action.searchText
            ),
            switchMap(searchText =>
                this.systemLoggerService.fetchSystemLoggersCount(searchText)
                .pipe(
                    map(
                        count =>
                            new fromSystemLoggerList.FetchSystemLoggersCountSuccessAction(
                                count
                            )
                    ),
                    catchError(() =>
                        of(
                            new fromSystemLoggerList.FetchSystemLoggersCountFailureAction()
                        )
                    )
                )
            ),
            
        )

    constructor(
        private actions$: Actions,
        private systemLoggerService: SystemLoggerService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
