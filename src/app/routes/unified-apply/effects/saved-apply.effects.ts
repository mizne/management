import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromSavedApply from '../actions/saved-apply.action'
import { UnifiedApplyService } from '../services/unified-apply.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'

@Injectable()
export class SavedApplyEffects {
    @Effect()
    fetchSavedUnifiedApplies$ = this.actions$
        .ofType(fromSavedApply.FETCH_UNIFIED_APPLIES)
        .switchMap(() => {
            return this.unifiedApplyService
                .fetchUnifiedApplies()
                .map(
                    applies =>
                        new fromSavedApply.FetchSavedUnifiedAppliesSuccessAction(
                            applies
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromSavedApply.FetchSavedUnifiedAppliesFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    fetchSavedUnifiedAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.FETCH_UNIFIED_APPLIES_SUCCESS)
        .do(() => {
            this.notify.success(
                `获取已保存统一申请`,
                `恭喜您，获取已保存统一申请成功！`
            )
        })

    @Effect({ dispatch: false })
    fetchSavedUnifiedAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.FETCH_UNIFIED_APPLIES_FAILURE)
        .do(() => {
            this.notify.error(
                `获取已保存统一申请`,
                `啊哦，获取已保存统一申请失败！`
            )
        })

    @Effect()
    fetchSavedSubPackageApplies$ = this.actions$
        .ofType(fromSavedApply.FETCH_SUBPACKAGE_APPLIES)
        .switchMap(() => {
            return this.unifiedApplyService
                .fetchSubPackageApplies()
                .map(
                    applies =>
                        new fromSavedApply.FetchSavedSubPackageAppliesSuccessAction(
                            applies
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromSavedApply.FetchSavedSubPackageAppliesFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    fetchSavedSubPackageAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.FETCH_SUBPACKAGE_APPLIES_SUCCESS)
        .do(() => {
            this.notify.success(
                `获取已保存分包申请`,
                `恭喜您，获取已保存分包申请成功！`
            )
        })

    @Effect({ dispatch: false })
    fetchSavedSubPackageAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.FETCH_SUBPACKAGE_APPLIES_FAILURE)
        .do(() => {
            this.notify.error(
                `获取已保存分包申请`,
                `啊哦，获取已保存分包申请失败！`
            )
        })

    @Effect()
    submitSavedUnifiedApplies$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_UNIFIED_APPLY)
        .map(
            (action: fromSavedApply.SubmitSavedUnifiedApplyAction) =>
                action.apply
        )
        .switchMap(apply => {
            return this.unifiedApplyService
                .submitSavedUnifiedApply(apply)
                .concatMap(() => [
                    new fromSavedApply.SubmitSavedUnifiedApplySuccessAction(),
                    new fromSavedApply.FetchSavedUnifiedAppliesAction()
                ])
                .catch(err =>
                    Observable.of(
                        new fromSavedApply.SubmitSavedUnifiedApplyFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    submitSavedUnifiedAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_UNIFIED_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(`提交统一申请`, `恭喜您，提交统一申请成功！`)
        })

    @Effect({ dispatch: false })
    submitSavedUnifiedAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_UNIFIED_APPLY_FAILURE)
        .do(() => {
            this.notify.error(`提交统一申请`, `啊哦，提交统一申请失败！`)
        })

    @Effect()
    submitSavedSubPackageApplies$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_SUBPACKAGE_APPLY)
        .map(
            (action: fromSavedApply.SubmitSavedSubPackageApplyAction) =>
                action.apply
        )
        .switchMap(apply => {
            return this.unifiedApplyService
                .submitSavedSubPackageApply(apply)
                .concatMap(() => [
                    new fromSavedApply.SubmitSavedSubPackageApplySuccessAction(),
                    new fromSavedApply.FetchSavedSubPackageAppliesAction()
                ])
                .catch(err =>
                    Observable.of(
                        new fromSavedApply.SubmitSavedSubPackageApplyFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    submitSavedSubPacaageAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_SUBPACKAGE_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(`提交分包申请`, `恭喜您，提交分包申请成功！`)
        })

    @Effect({ dispatch: false })
    submitSavedSubPackageAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.SUBMIT_SUBPACKAGE_APPLY_FAILURE)
        .do(() => {
            this.notify.error(`提交分包申请`, `啊哦，提交分包申请失败！`)
        })

    @Effect()
    deleteSavedUnifiedApplies$ = this.actions$
        .ofType(fromSavedApply.DELETE_UNIFIED_APPLY)
        .map(
            (action: fromSavedApply.DeleteSavedUnifiedApplyAction) =>
                action.apply
        )
        .switchMap(apply => {
            return this.unifiedApplyService
                .deleteSavedUnifiedApply(apply)
                .concatMap(() => [
                    new fromSavedApply.DeleteSavedUnifiedApplySuccessAction(),
                    new fromSavedApply.FetchSavedUnifiedAppliesAction()
                ])
                .catch(err =>
                    Observable.of(
                        new fromSavedApply.DeleteSavedUnifiedApplyFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    deleteSavedUnifiedAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.DELETE_UNIFIED_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(`删除统一申请`, `恭喜您，删除统一申请成功！`)
        })

    @Effect({ dispatch: false })
    deleteSavedUnifiedAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.DELETE_UNIFIED_APPLY_FAILURE)
        .do(() => {
            this.notify.error(`删除统一申请`, `啊哦，删除统一申请失败！`)
        })

    @Effect()
    deleteSavedSubPackageApplies$ = this.actions$
        .ofType(fromSavedApply.DELETE_SUBPACKAGE_APPLY)
        .map(
            (action: fromSavedApply.DeleteSavedSubPackageApplyAction) =>
                action.apply
        )
        .switchMap(apply => {
            return this.unifiedApplyService
                .deleteSavedSubPackageApply(apply)
                .concatMap(() => [
                    new fromSavedApply.DeleteSavedSubPackageApplySuccessAction(),
                    new fromSavedApply.FetchSavedSubPackageAppliesAction()
                ])
                .catch(err =>
                    Observable.of(
                        new fromSavedApply.DeleteSavedSubPackageApplyFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    deleteSavedSubPackageAppliesSuccess$ = this.actions$
        .ofType(fromSavedApply.DELETE_SUBPACKAGE_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(`删除分包申请`, `恭喜您，删除分包申请成功！`)
        })

    @Effect({ dispatch: false })
    deleteSavedSubPackageAppliesFailure$ = this.actions$
        .ofType(fromSavedApply.DELETE_SUBPACKAGE_APPLY_FAILURE)
        .do(() => {
            this.notify.error(`删除分包申请`, `啊哦，删除分包申请失败！`)
        })

    constructor(
        private actions$: Actions,
        private unifiedApplyService: UnifiedApplyService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
