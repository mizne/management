import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromSavedApply from '../actions/saved-apply.action'
import { SystemOnOffService } from '../services/system-onoff.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'

@Injectable()
export class SavedApplyEffects {
    @Effect()
    fetchSavedApplies$ = this.actions$
        .ofType(fromSavedApply.FETCH_SAVED_APPLIES)
        .switchMap(() => {
            return this.systemOnOffApplyService
                .fetchSavedSystemOnOffApplies()
                .map(
                    applies =>
                        new fromSavedApply.FetchSavedAppliesSuccessAction(
                            applies
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromSavedApply.FetchSavedAppliesFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    fetchSavedAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.FETCH_SAVED_APPLIES_SUCCESS)
        .do(() => {
            this.notify.success(
                `获取已保存申请`,
                `恭喜您，获取已保存申请成功！`
            )
        })

    @Effect({ dispatch: false })
    fetchSavedAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.FETCH_SAVED_APPLIES_FAILURE)
        .do(() => {
            this.notify.error(`获取已保存申请`, `啊哦，获取已保存申请失败！`)
        })

    @Effect()
    submitSavedApplies$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_SAVED_APPLY)
        .map((action: fromSavedApply.SubmitSavedApplyAction) => action.apply)
        .switchMap(apply => {
            return this.systemOnOffApplyService
                .submitSavedApply(apply)
                .concatMap(() => [
                    new fromSavedApply.SubmitSavedApplySuccessAction(),
                    new fromSavedApply.FetchSavedAppliesAction()
                ])
                .catch(err =>
                    Observable.of(
                        new fromSavedApply.SubmitSavedApplyFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    submitSavedAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_SAVED_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(`提交申请`, `恭喜您，提交申请成功！`)
        })

    @Effect({ dispatch: false })
    submitSavedAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_SAVED_APPLY_FAILURE)
        .do(() => {
            this.notify.error(`提交申请`, `啊哦，提交申请失败！`)
        })

    @Effect()
    deleteSavedApplies$ = this.actions$
        .ofType(fromSavedApply.DELETE_SAVED_APPLY)
        .map((action: fromSavedApply.DeleteSavedApplyAction) => action.apply)
        .switchMap(apply => {
            return this.systemOnOffApplyService
                .deleteSavedApply(apply)
                .concatMap(() => [
                    new fromSavedApply.DeleteSavedApplySuccessAction(),
                    new fromSavedApply.FetchSavedAppliesAction()
                ])
                .catch(err =>
                    Observable.of(
                        new fromSavedApply.DeleteSavedApplyFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    deleteSavedAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.DELETE_SAVED_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(`删除申请`, `恭喜您，删除申请成功！`)
        })

    @Effect({ dispatch: false })
    deleteSavedAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.DELETE_SAVED_APPLY_FAILURE)
        .do(() => {
            this.notify.error(`删除申请`, `啊哦，删除申请失败！`)
        })

    constructor(
        private actions$: Actions,
        private systemOnOffApplyService: SystemOnOffService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
