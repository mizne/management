import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'

import * as UseEnvironmentActions from '../actions/use-environment.action'
import { UseEnvironmentService } from '@core/services/use-environment.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

@Injectable()
export class UseEnvironmentEffects {
    @Effect()
    fetchUseEnvironments$ = this.actions$.pipe(
        ofType(UseEnvironmentActions.FETCH_USE_ENVIRONMENTS),
        switchMap(() =>
            this.useEnvironmentService
                .fetchUseEnvironments()
                .pipe(
                    map(
                        types =>
                            new UseEnvironmentActions.FetchUseEnvironmentsSuccessAction(
                                types
                            )
                    ),
                    catchError(() =>
                        of(
                            new UseEnvironmentActions.FetchUseEnvironmentsFailureAction()
                        )
                    )
                )
        )
    )

    @Effect()
    createUseEnvironment$ = this.actions$.pipe(
        ofType(UseEnvironmentActions.CREATE_USE_ENVIRONMENT),
        map(
            (action: UseEnvironmentActions.CreateUseEnvironmentAction) =>
                action.payload
        ),
        switchMap(params => {
            return this.useEnvironmentService
                .createUseEnvironment(params)
                .pipe(
                    concatMap(() => [
                        new UseEnvironmentActions.CreateUseEnvironmentSuccessAction(),
                        new UseEnvironmentActions.FetchUseEnvironmentsAction()
                    ]),
                    catchError(() =>
                        of(
                            new UseEnvironmentActions.CreateUseEnvironmentFailureAction()
                        )
                    )
                )
        })
    )

    @Effect({ dispatch: false })
    createUseEnvironmentSuccess$ = this.actions$.pipe(
        ofType(UseEnvironmentActions.CREATE_USE_ENVIRONMENT_SUCCESS),
        tap(() => {
            this.notify.success(`新增使用环境`, `恭喜您，新增使用环境成功！`)
        })
    )

    @Effect({ dispatch: false })
    createUseEnvironmentFailure$ = this.actions$.pipe(
        ofType(UseEnvironmentActions.CREATE_USE_ENVIRONMENT_FAILURE),
        tap(() => {
            this.notify.error(`新增使用环境`, `啊哦，新增使用环境失败`)
        })
    )

    @Effect()
    deleteUseEnvironment$ = this.actions$.pipe(
        ofType(UseEnvironmentActions.DELETE_USE_ENVIRONMENT),
        map(
            (action: UseEnvironmentActions.DeleteUseEnvironmentAction) =>
                action.id
        ),
        switchMap(id => {
            return this.useEnvironmentService
                .deleteUseEnvironment(id)
                .pipe(
                    concatMap(() => [
                        new UseEnvironmentActions.DeleteUseEnvironmentSuccessAction(),
                        new UseEnvironmentActions.FetchUseEnvironmentsAction()
                    ]),
                    catchError(() =>
                        of(
                            new UseEnvironmentActions.DeleteUseEnvironmentFailureAction()
                        )
                    )
                )
        })
    )

    @Effect({ dispatch: false })
    deleteUseEnvironmentSuccess$ = this.actions$.pipe(
        ofType(UseEnvironmentActions.DELETE_USE_ENVIRONMENT_SUCCESS),
        tap(() => {
            this.notify.success(`删除使用环境`, `恭喜您，删除使用环境成功！`)
        })
    )

    @Effect({ dispatch: false })
    deleteUseEnvironmentFailure$ = this.actions$.pipe(
        ofType(UseEnvironmentActions.DELETE_USE_ENVIRONMENT_FAILURE),
        tap(() => {
            this.notify.error(`删除使用环境`, `啊哦，删除使用环境失败`)
        })
    )

    constructor(
        private actions$: Actions,
        private useEnvironmentService: UseEnvironmentService,
        private notify: NzNotificationService
    ) {}
}
