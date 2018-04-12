import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'

import * as SoftwareNameActions from '../actions/software-name.action'
import { SoftwareNameService } from '@core/services/software-name.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

@Injectable()
export class SoftwareNameEffects {
    @Effect()
    fetchSoftwareNames$ = this.actions$.pipe(
        ofType(SoftwareNameActions.FETCH_SOFTWARE_NAMES),
        switchMap(() =>
            this.softwareNameService
                .fetchSoftwareNames()
                .pipe(
                    map(
                        types =>
                            new SoftwareNameActions.FetchSoftwareNamesSuccessAction(
                                types
                            )
                    ),
                    catchError(() =>
                        of(
                            new SoftwareNameActions.FetchSoftwareNamesFailureAction()
                        )
                    )
                )
        )
    )

    @Effect()
    createSoftwareName$ = this.actions$.pipe(
        ofType(SoftwareNameActions.CREATE_SOFTWARE_NAME),
        map(
            (action: SoftwareNameActions.CreateSoftwareNameAction) =>
                action.payload
        ),
        switchMap(params => {
            return this.softwareNameService
                .createSoftwareName(params)
                .pipe(
                    concatMap(() => [
                        new SoftwareNameActions.CreateSoftwareNameSuccessAction(),
                        new SoftwareNameActions.FetchSoftwareNamesAction()
                    ]),
                    catchError(() =>
                        of(
                            new SoftwareNameActions.CreateSoftwareNameFailureAction()
                        )
                    )
                )
        })
    )

    @Effect({ dispatch: false })
    createSoftwareNameSuccess$ = this.actions$.pipe(
        ofType(SoftwareNameActions.CREATE_SOFTWARE_NAME_SUCCESS),
        tap(() => {
            this.notify.success(`新增软件名称`, `恭喜您，新增软件名称成功！`)
        })
    )

    @Effect({ dispatch: false })
    createSoftwareNameFailure$ = this.actions$.pipe(
        ofType(SoftwareNameActions.CREATE_SOFTWARE_NAME_FAILURE),
        tap(() => {
            this.notify.error(`新增软件名称`, `啊哦，新增软件名称失败`)
        })
    )

    @Effect()
    deleteSoftwareName$ = this.actions$.pipe(
        ofType(SoftwareNameActions.DELETE_SOFTWARE_NAME),
        map(
            (action: SoftwareNameActions.DeleteSoftwareNameAction) => action.id
        ),
        switchMap(id => {
            return this.softwareNameService
                .deleteSoftwareName(id)
                .pipe(
                    concatMap(() => [
                        new SoftwareNameActions.DeleteSoftwareNameSuccessAction(),
                        new SoftwareNameActions.FetchSoftwareNamesAction()
                    ]),
                    catchError(() =>
                        of(
                            new SoftwareNameActions.DeleteSoftwareNameFailureAction()
                        )
                    )
                )
        })
    )

    @Effect({ dispatch: false })
    deleteSoftwareNameSuccess$ = this.actions$.pipe(
        ofType(SoftwareNameActions.DELETE_SOFTWARE_NAME_SUCCESS),
        tap(() => {
            this.notify.success(`删除软件名称`, `恭喜您，删除软件名称成功！`)
        })
    )

    @Effect({ dispatch: false })
    deleteSoftwareNameFailure$ = this.actions$.pipe(
        ofType(SoftwareNameActions.DELETE_SOFTWARE_NAME_FAILURE),
        tap(() => {
            this.notify.error(`删除软件名称`, `啊哦，删除软件名称失败`)
        })
    )

    constructor(
        private actions$: Actions,
        private softwareNameService: SoftwareNameService,
        private notify: NzNotificationService
    ) {}
}
