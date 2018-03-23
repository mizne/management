import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromExtraTabs from '../actions/extra-tabs.action'
import * as fromSavedApply from '../actions/saved-apply.action'
import { VersionReleaseService } from '../services/version-release.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getExtraTabs } from '../reducers'
import { TabOptions, MAX_TABS_COUNT } from '@core/models/version-release.model'

@Injectable()
export class ExtraTabsEffects {
    @Effect()
    preMaxTabsWarning$ = this.actions$
        .ofType(
            fromSavedApply.TO_DETAIL_SAVED_APPLY,
            fromSavedApply.TO_EDIT_SAVED_APPLY
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
    fetchApplyInfoForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.FETCH_APPLY_INFO)
        .map((action: fromExtraTabs.FetchApplyInfoAction) => action.payload)
        .switchMap(payload => {
            return this.versionReleaseApplyService
                .fetchApplyInfo()
                .map(
                    applyInfo =>
                        new fromExtraTabs.FetchApplyInfoSuccessAction({
                            applyInfo,
                            tabIndex: payload.tabIndex
                        })
                )
                .catch(e =>
                    Observable.of(
                        new fromExtraTabs.FetchApplyInfoFailureAction(
                            payload.tabIndex
                        )
                    )
                )
        })

    @Effect({ dispatch: false })
    fetchApplyInfoFailureForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.FETCH_APPLY_INFO_FAILURE)
        .do(() => {
            this.notify.error(`获取申请信息`, '啊哦，获取申请信息失败！')
        })

    @Effect()
    fetchApproversForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.FETCH_APPROVERS)
        .map((action: fromExtraTabs.FetchApproversAction) => action.payload)
        .switchMap(payload => {
            return this.versionReleaseApplyService
                .fetchApprovers()
                .map(
                    approvers =>
                        new fromExtraTabs.FetchApproversSuccessAction({
                            approvers,
                            tabIndex: payload.tabIndex
                        })
                )
                .catch(e =>
                    Observable.of(
                        new fromExtraTabs.FetchApproversFailureAction(
                            payload.tabIndex
                        )
                    )
                )
        })

    @Effect({ dispatch: false })
    fetchApproversFailureForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.FETCH_APPROVERS_FAILURE)
        .do(() => {
            this.notify.error(`获取审批人信息`, '啊哦，获取审批人信息失败！')
        })

    @Effect()
    ensureRequirementApplyForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_VERSION_RELEASE_APPLY)
        .map(
            (action: fromExtraTabs.EnsureEditVersionReleaseApplyAction) =>
                action.tabIndex
        )
        .withLatestFrom(this.store.select(getExtraTabs))
        .switchMap(([tabIndex, tabs]) => {
            return this.versionReleaseApplyService
                .editSavedApply(TabOptions.generateApply(tabs[tabIndex]))
                .concatMap(() => [
                    new fromExtraTabs.EnsureEditVersionReleaseApplySuccessAction(
                        tabIndex
                    ),
                    new fromSavedApply.FetchSavedAppliesAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromExtraTabs.EnsureEditVersionReleaseApplyFailureAction(
                            tabIndex
                        )
                    )
                )
        })

    @Effect({ dispatch: false })
    ensureEditRequirementApplySuccess$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_VERSION_RELEASE_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(`编辑版本发布申请`, '恭喜您，编辑版本发布申请成功！')
        })

    @Effect({ dispatch: false })
    ensureEditRequirementApplyFailure$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_VERSION_RELEASE_APPLY_FAILURE)
        .do(() => {
            this.notify.error(`编辑版本发布申请`, '啊哦，编辑版本发布申请失败！')
        })

    constructor(
        private actions$: Actions,
        private versionReleaseApplyService: VersionReleaseService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
