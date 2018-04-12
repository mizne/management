import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'

import * as SoftwareTypeActions from '../actions/software-type.action'
import { SoftwareTypeService } from '@core/services/software-type.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

@Injectable()
export class SoftwareTypeEffects {
    @Effect()
    fetchSoftwareTypes$ = this.actions$.pipe(
        ofType(SoftwareTypeActions.FETCH_SOFTWARE_TYPES),
        switchMap(() =>
            this.softwareTypeService
                .fetchSoftwareTypes()
                .pipe(
                    map(
                        types =>
                            new SoftwareTypeActions.FetchSoftwareTypesSuccessAction(
                                types
                            )
                    ),
                    catchError(() =>
                        of(
                            new SoftwareTypeActions.FetchSoftwareTypesFailureAction()
                        )
                    )
                )
        )
    )

    @Effect()
    createSoftwareType$ = this.actions$.pipe(
        ofType(SoftwareTypeActions.CREATE_SOFTWARE_TYPE),
        map(
            (action: SoftwareTypeActions.CreateSoftwareTypeAction) =>
                action.payload
        ),
        switchMap(params => {
            return this.softwareTypeService
                .createSoftwareType(params)
                .pipe(
                    concatMap(() => [
                        new SoftwareTypeActions.CreateSoftwareTypeSuccessAction(),
                        new SoftwareTypeActions.FetchSoftwareTypesAction()
                    ]),
                    catchError(() =>
                        of(
                            new SoftwareTypeActions.CreateSoftwareTypeFailureAction()
                        )
                    )
                )
        })
    )

    @Effect({ dispatch: false })
    createSoftwareTypeSuccess$ = this.actions$.pipe(
        ofType(SoftwareTypeActions.CREATE_SOFTWARE_TYPE_SUCCESS),
        tap(() => {
            this.notify.success(`新增软件类型`, `恭喜您，新增软件类型成功！`)
        })
    )

    @Effect({ dispatch: false })
    createSoftwareTypeFailure$ = this.actions$.pipe(
        ofType(SoftwareTypeActions.CREATE_SOFTWARE_TYPE_FAILURE),
        tap(() => {
            this.notify.error(`新增软件类型`, `啊哦，新增软件类型失败`)
        })
    )

    @Effect()
    deleteSoftwareType$ = this.actions$.pipe(
        ofType(SoftwareTypeActions.DELETE_SOFTWARE_TYPE),
        map(
            (action: SoftwareTypeActions.DeleteSoftwareTypeAction) => action.id
        ),
        switchMap(id => {
            return this.softwareTypeService
                .deleteSoftwareType(id)
                .pipe(
                    concatMap(() => [
                        new SoftwareTypeActions.DeleteSoftwareTypeSuccessAction(),
                        new SoftwareTypeActions.FetchSoftwareTypesAction()
                    ]),
                    catchError(() =>
                        of(
                            new SoftwareTypeActions.DeleteSoftwareTypeFailureAction()
                        )
                    )
                )
        })
    )

    @Effect({ dispatch: false })
    deleteSoftwareTypeSuccess$ = this.actions$.pipe(
        ofType(SoftwareTypeActions.DELETE_SOFTWARE_TYPE_SUCCESS),
        tap(() => {
            this.notify.success(`删除软件类型`, `恭喜您，删除软件类型成功！`)
        })
    )

    @Effect({ dispatch: false })
    deleteSoftwareTypeFailure$ = this.actions$.pipe(
        ofType(SoftwareTypeActions.DELETE_SOFTWARE_TYPE_FAILURE),
        tap(() => {
            this.notify.error(`删除软件类型`, `啊哦，删除软件类型失败`)
        })
    )

    constructor(
        private actions$: Actions,
        private softwareTypeService: SoftwareTypeService,
        private notify: NzNotificationService
    ) {}
}
