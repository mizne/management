import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { fromSavedApply } from '../actions'
import { ResourceApplyService } from '../services'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'

@Injectable()
export class SavedApplyEffects {
    @Effect()
    fetchSavedApplies$ = this.actions$
        .ofType(fromSavedApply.FETCH_SAVED_APPLIES)
        .pipe(
            switchMap(() =>
                this.resourceApplyService
                    .fetchRequirementApplies()
                    .pipe(
                        map(
                            applies =>
                                new fromSavedApply.FetchSavedAppliesSuccessAction(
                                    applies
                                )
                        ),
                        catchError(() =>
                            of(
                                new fromSavedApply.FetchSavedAppliesFailureAction()
                            )
                        )
                    )
            )
        )

    @Effect({ dispatch: false })
    fetchSavedAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.FETCH_SAVED_APPLIES_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `获取已保存申请`,
                    `恭喜您，获取已保存申请成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    fetchSavedAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.FETCH_SAVED_APPLIES_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `获取已保存申请`,
                    `啊哦，获取已保存申请失败！`
                )
            })
        )

    @Effect()
    submitSavedApplies$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_SAVED_APPLY)
        .pipe(
            map(
                (action: fromSavedApply.SubmitSavedApplyAction) => action.apply
            ),
            switchMap(apply =>
                this.resourceApplyService
                    .submitRequirementApply(apply)
                    .pipe(
                        concatMap(() => [
                            new fromSavedApply.SubmitSavedApplySuccessAction(),
                            new fromSavedApply.FetchSavedAppliesAction()
                        ]),
                        catchError(() =>
                            of(
                                new fromSavedApply.SubmitSavedApplyFailureAction()
                            )
                        )
                    )
            )
        )

    @Effect({ dispatch: false })
    submitSavedAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_SAVED_APPLY_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(`提交申请`, `恭喜您，提交申请成功！`)
            })
        )

    @Effect({ dispatch: false })
    submitSavedAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_SAVED_APPLY_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`提交申请`, `啊哦，提交申请失败！`)
            })
        )

    @Effect()
    deleteSavedApplies$ = this.actions$
        .ofType(fromSavedApply.DELETE_SAVED_APPLY)
        .pipe(
            map(
                (action: fromSavedApply.DeleteSavedApplyAction) => action.apply
            ),
            switchMap(apply =>
                this.resourceApplyService
                    .deleteSavedApply(apply)
                    .pipe(
                        concatMap(() => [
                            new fromSavedApply.DeleteSavedApplySuccessAction(),
                            new fromSavedApply.FetchSavedAppliesAction()
                        ]),
                        catchError(() =>
                            of(
                                new fromSavedApply.DeleteSavedApplyFailureAction()
                            )
                        )
                    )
            )
        )

    @Effect({ dispatch: false })
    deleteSavedAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.DELETE_SAVED_APPLY_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(`删除申请`, `恭喜您，删除申请成功！`)
            })
        )

    @Effect({ dispatch: false })
    deleteSavedAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.DELETE_SAVED_APPLY_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`删除申请`, `啊哦，删除申请失败！`)
            })
        )

    constructor(
        private actions$: Actions,
        private resourceApplyService: ResourceApplyService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
