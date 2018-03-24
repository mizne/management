import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import * as fromExtraTabs from '../actions/extra-tabs.action'
import * as fromSavedApply from '../actions/saved-apply.action'
import { SystemOnOffService } from '../services/system-onoff.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getExtraTabs } from '../reducers'
import { TabOptions, MAX_TABS_COUNT } from '@core/models/system-onoff.model'
import { withLatestFrom, filter, map, mergeMap, switchMap, catchError, concatMap, tap } from 'rxjs/operators';

@Injectable()
export class ExtraTabsEffects {
    @Effect()
    preMaxTabsWarning$ = this.actions$
        .ofType(
            fromSavedApply.TO_DETAIL_SAVED_APPLY,
            fromSavedApply.TO_EDIT_SAVED_APPLY
        )
        .pipe(
            withLatestFrom(this.store.select(getExtraTabs)),
            filter(([_, tabs]) => tabs.length >= MAX_TABS_COUNT),
            map(() => new fromExtraTabs.MaxTabsWarningAction())
        )

    @Effect({ dispatch: false })
    maxTabsWarning$ = this.actions$
        .ofType(fromExtraTabs.MAX_TABS_WARNING)
        .pipe(tap(() => {
            this.notify.warning(
                `过多的标签页`,
                `标签页最多额外打开 ${MAX_TABS_COUNT} 个`
            )
        }))

    @Effect()
    switchApplyTypeForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.SWITCH_APPLY_TYPE)
        .pipe(
            map((action: fromExtraTabs.SwitchApplyTypeAction) => action.payload),
            mergeMap(payload => [
                new fromExtraTabs.FetchApplyInfoAction(payload),
                new fromExtraTabs.FetchApproversAction(payload)
            ])
        )

    @Effect()
    fetchApplyInfoForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.FETCH_APPLY_INFO)
        .pipe(
            map((action: fromExtraTabs.FetchApplyInfoAction) => action.payload),
            switchMap(payload => {
                return this.systemOnOffApplyService
                    .fetchApplyInfo(payload.applyType)
                    .pipe(
                        map(
                            applyInfo =>
                                new fromExtraTabs.FetchApplyInfoSuccessAction({
                                    applyInfo,
                                    tabIndex: payload.tabIndex
                                })
                        ),
                        catchError(e =>
                            of(
                                new fromExtraTabs.FetchApplyInfoFailureAction(
                                    payload.tabIndex
                                )
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    fetchApplyInfoFailureForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.FETCH_APPLY_INFO_FAILURE)
        .pipe(tap(() => {
            this.notify.error(`获取申请信息`, '啊哦，获取申请信息失败！')
        }))

    @Effect()
    fetchApproversForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.FETCH_APPROVERS)
        .pipe(
            map((action: fromExtraTabs.FetchApproversAction) => action.payload),
            switchMap(payload => {
                return this.systemOnOffApplyService
                    .fetchApprovers(payload.applyType)
                    .pipe(
                        map(
                            approvers =>
                                new fromExtraTabs.FetchApproversSuccessAction({
                                    approvers,
                                    tabIndex: payload.tabIndex
                                })
                        ),
                        catchError(e =>
                            of(
                                new fromExtraTabs.FetchApproversFailureAction(
                                    payload.tabIndex
                                )
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    fetchApproversFailureForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.FETCH_APPROVERS_FAILURE)
        .pipe(tap(() => {
            this.notify.error(`获取审批人信息`, '啊哦，获取审批人信息失败！')
        }))

    @Effect()
    ensureRequirementApplyForExtraTabs$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_SYSTEM_ONOFF_APPLY)
        .pipe(
            map(
                (action: fromExtraTabs.EnsureEditSystemOnOffApplyAction) =>
                    action.tabIndex
            ),
            withLatestFrom(this.store.select(getExtraTabs)),
            switchMap(([tabIndex, tabs]) => {
                return this.systemOnOffApplyService
                    .editSavedApply(TabOptions.generateApply(tabs[tabIndex]))
                    .pipe(
                        concatMap(() => [
                            new fromExtraTabs.EnsureEditSystemOnOffApplySuccessAction(
                                tabIndex
                            ),
                            new fromSavedApply.FetchSavedAppliesAction()
                        ]),
                        catchError(() =>
                            of(
                                new fromExtraTabs.EnsureEditSystemOnOffApplyFailureAction(
                                    tabIndex
                                )
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    ensureEditRequirementApplySuccess$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_SYSTEM_ONOFF_APPLY_SUCCESS)
        .pipe(tap(() => {
            this.notify.success(
                `编辑系统上下线`,
                '恭喜您，编辑系统上下线成功！'
            )
        }))

    @Effect({ dispatch: false })
    ensureEditRequirementApplyFailure$ = this.actions$
        .ofType(fromExtraTabs.ENSURE_EDIT_SYSTEM_ONOFF_APPLY_FAILURE)
        .pipe(tap(() => {
            this.notify.error(`编辑系统上下线`, '啊哦，编辑系统上下线失败！')
        }))

    constructor(
        private actions$: Actions,
        private systemOnOffApplyService: SystemOnOffService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) { }
}
