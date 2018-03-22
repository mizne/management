import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromExtraTabs from '../actions/extra-tabs.action'
import * as fromSavedApply from '../actions/saved-apply.action'
import { UnifiedApplyService } from '../services/unified-apply.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getExtraTabs } from '../reducers'
import { TabOptions, MAX_TABS_COUNT } from '@core/models/unified-apply.model'

@Injectable()
export class ExtraTabsEffects {
    @Effect()
    preMaxTabsWarning$ = this.actions$
        .ofType(
            fromSavedApply.TO_DETAIL_SUBPACKAGE_APPLY,
            fromSavedApply.TO_DETAIL_UNIFIED_APPLY,
            fromSavedApply.TO_EDIT_SUBPACKAGE_APPLY,
            fromSavedApply.TO_EDIT_UNIFIED_APPLY
        )
        .withLatestFrom(this.store.select(getExtraTabs))
        .filter(([_, tabs]) => tabs.length >= MAX_TABS_COUNT)
        .map(() => new fromExtraTabs.MaxTabsWarningAction())

    @Effect({ dispatch: false })
    maxTabsWarning$ = this.actions$
        .ofType(fromExtraTabs.MAX_TABS_WARNING)
        .do(() => {
            this.notify.warning(
                `过多的标签页`,
                `标签页最多额外打开 ${MAX_TABS_COUNT} 个`
            )
        })

    @Effect()
    ensureEditUnifiedApplyForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_APPLY)
        .map((action: fromExtraTabs.EnsureEditApplyAction) => action.tabIndex)
        .withLatestFrom(this.store.select(getExtraTabs))
        .filter(([tabIndex, tabs]) => TabOptions.isUnifiedApply(tabs, tabIndex))
        .switchMap(([tabIndex, tabs]) => {
            return this.resourceApplyService
                .editSavedUnifiedApply(
                    TabOptions.generateUnifiedApply(tabs[tabIndex])
                )
                .concatMap(() => [
                    new fromExtraTabs.EnsureEditUnifiedApplySuccessAction(
                        tabIndex
                    ),
                    new fromSavedApply.FetchSavedUnifiedAppliesAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromExtraTabs.EnsureEditUnifiedApplyFailureAction(
                            tabIndex
                        )
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureEditUnifiedApplySuccess$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_UNIFIED_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(
                `编辑统一申请信息`,
                '恭喜您，编辑统一申请信息成功！'
            )
        })

    @Effect({ dispatch: false })
    ensureEditUnifiedApplyFailure$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_UNIFIED_APPLY_FAILURE)
        .do(() => {
            this.notify.error(
                `编辑统一申请信息`,
                '啊哦，编辑统一申请信息失败！'
            )
        })

    @Effect()
    ensureEditSubPackageApplyForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_APPLY)
        .map((action: fromExtraTabs.EnsureEditApplyAction) => action.tabIndex)
        .withLatestFrom(this.store.select(getExtraTabs))
        .filter(([tabIndex, tabs]) =>
            TabOptions.isSubPackageApply(tabs, tabIndex)
        )
        .switchMap(([tabIndex, tabs]) => {
            return this.resourceApplyService
                .editSavedSubPackageApply(
                    TabOptions.generateSubPackageApply(tabs[tabIndex])
                )
                .concatMap(() => [
                    new fromExtraTabs.EnsureEdiSubPackageApplySuccessAction(
                        tabIndex
                    ),
                    new fromSavedApply.FetchSavedSubPackageAppliesAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromExtraTabs.EnsureEditSubPackageApplyFailureAction(
                            tabIndex
                        )
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureEditSubPackageApplySuccess$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_SUBPACKAGE_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(
                `编辑分包申请信息`,
                '恭喜您，编辑分包申请信息成功！'
            )
        })

    @Effect({ dispatch: false })
    ensureEditSubPackageApplyFailure$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_SUBPACKAGE_APPLY_FAILURE)
        .do(() => {
            this.notify.error(
                `编辑分包申请信息`,
                '啊哦，编辑分包申请信息失败！'
            )
        })

    constructor(
        private actions$: Actions,
        private resourceApplyService: UnifiedApplyService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
