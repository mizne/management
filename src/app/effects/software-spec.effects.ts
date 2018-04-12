import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'

import * as SoftwareSpecActions from '../actions/software-spec.action'
import { SoftwareSpecService } from '@core/services/software-spec.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

@Injectable()
export class SoftwareSpecEffects {
    @Effect()
    fetchSoftwareSpecs$ = this.actions$.pipe(
        ofType(SoftwareSpecActions.FETCH_SOFTWARE_SPECS),
        switchMap(() =>
            this.softwareSpecService
                .fetchSoftwareSpecs()
                .pipe(
                    map(
                        types =>
                            new SoftwareSpecActions.FetchSoftwareSpecsSuccessAction(
                                types
                            )
                    ),
                    catchError(() =>
                        of(
                            new SoftwareSpecActions.FetchSoftwareSpecsFailureAction()
                        )
                    )
                )
        )
    )

    @Effect()
    createSoftwareSpec$ = this.actions$.pipe(
        ofType(SoftwareSpecActions.CREATE_SOFTWARE_SPEC),
        map(
            (action: SoftwareSpecActions.CreateSoftwareSpecAction) =>
                action.payload
        ),
        switchMap(params => {
            return this.softwareSpecService
                .createSoftwareSpec(params)
                .pipe(
                    concatMap(() => [
                        new SoftwareSpecActions.CreateSoftwareSpecSuccessAction(),
                        new SoftwareSpecActions.FetchSoftwareSpecsAction()
                    ]),
                    catchError(() =>
                        of(
                            new SoftwareSpecActions.CreateSoftwareSpecFailureAction()
                        )
                    )
                )
        })
    )

    @Effect({ dispatch: false })
    createSoftwareSpecSuccess$ = this.actions$.pipe(
        ofType(SoftwareSpecActions.CREATE_SOFTWARE_SPEC_SUCCESS),
        tap(() => {
            this.notify.success(`新增软件规格`, `恭喜您，新增软件规格成功！`)
        })
    )

    @Effect({ dispatch: false })
    createSoftwareSpecFailure$ = this.actions$.pipe(
        ofType(SoftwareSpecActions.CREATE_SOFTWARE_SPEC_FAILURE),
        tap(() => {
            this.notify.error(`新增软件规格`, `啊哦，新增软件规格失败`)
        })
    )

    @Effect()
    deleteSoftwareSpec$ = this.actions$.pipe(
        ofType(SoftwareSpecActions.DELETE_SOFTWARE_SPEC),
        map(
            (action: SoftwareSpecActions.DeleteSoftwareSpecAction) => action.id
        ),
        switchMap(id => {
            return this.softwareSpecService
                .deleteSoftwareSpec(id)
                .pipe(
                    concatMap(() => [
                        new SoftwareSpecActions.DeleteSoftwareSpecSuccessAction(),
                        new SoftwareSpecActions.FetchSoftwareSpecsAction()
                    ]),
                    catchError(() =>
                        of(
                            new SoftwareSpecActions.DeleteSoftwareSpecFailureAction()
                        )
                    )
                )
        })
    )

    @Effect({ dispatch: false })
    deleteSoftwareSpecSuccess$ = this.actions$.pipe(
        ofType(SoftwareSpecActions.DELETE_SOFTWARE_SPEC_SUCCESS),
        tap(() => {
            this.notify.success(`删除软件规格`, `恭喜您，删除软件规格成功！`)
        })
    )

    @Effect({ dispatch: false })
    deleteSoftwareSpecFailure$ = this.actions$.pipe(
        ofType(SoftwareSpecActions.DELETE_SOFTWARE_SPEC_FAILURE),
        tap(() => {
            this.notify.error(`删除软件规格`, `啊哦，删除软件规格失败`)
        })
    )

    constructor(
        private actions$: Actions,
        private softwareSpecService: SoftwareSpecService,
        private notify: NzNotificationService
    ) {}
}
