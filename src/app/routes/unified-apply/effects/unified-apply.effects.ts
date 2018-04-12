import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import * as fromUnifiedApply from '../actions/unified-apply.action'
import { UnifiedApplyService } from '../services/unified-apply.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import {
    State,
    getApplyInfo,
    getUnifiedAddedApplyResources,
    getApprovers
} from '../reducers'
import { tap, switchMap, map, catchError, withLatestFrom } from 'rxjs/operators'

@Injectable()
export class UnifiedApplyEffects {
    @Effect()
    fetchApplyInfo$ = this.actions$
        .ofType(fromUnifiedApply.FETCH_APPLY_INFO)
        .pipe(
            switchMap(() => {
                return this.unifiedApplyService
                    .fetchApplyInfo()
                    .pipe(
                        map(
                            applyInfo =>
                                new fromUnifiedApply.FetchApplyInfoSuccessAction(
                                    applyInfo
                                )
                        ),
                        catchError(e =>
                            of(
                                new fromUnifiedApply.FetchApplyInfoFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    fetchApplyInfoFailure$ = this.actions$
        .ofType(fromUnifiedApply.FETCH_APPLY_INFO_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`获取申请信息`, '啊哦，获取申请信息失败！')
            })
        )

    @Effect()
    fetchApprovers$ = this.actions$
        .ofType(fromUnifiedApply.FETCH_APPROVERS)
        .pipe(
            switchMap(applyType => {
                return this.unifiedApplyService
                    .fetchApprovers()
                    .pipe(
                        map(
                            approvers =>
                                new fromUnifiedApply.FetchApproversSuccessAction(
                                    approvers
                                )
                        ),
                        catchError(e =>
                            of(
                                new fromUnifiedApply.FetchApproversFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    fetchApproversFailure$ = this.actions$
        .ofType(fromUnifiedApply.FETCH_APPROVERS_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `获取审批人信息`,
                    '啊哦，获取审批人信息失败！'
                )
            })
        )

    @Effect()
    saveUnifiedApply$ = this.actions$
        .ofType(fromUnifiedApply.SAVE_UNIFIED_APPLY)
        .pipe(
            withLatestFrom(
                this.store.select(getApplyInfo),
                (_, applyInfo) => applyInfo
            ),
            withLatestFrom(
                this.store.select(getUnifiedAddedApplyResources),
                (applyInfo, resources) => ({
                    applyInfo,
                    resources
                })
            ),
            withLatestFrom(
                this.store.select(getApprovers),
                ({ applyInfo, resources }, approvers) => ({
                    applyInfo,
                    resources,
                    approvers
                })
            ),
            switchMap(apply => {
                return this.unifiedApplyService
                    .saveUnifiedApply(apply)
                    .pipe(
                        map(
                            () =>
                                new fromUnifiedApply.SaveUnifiedApplySuccessAction()
                        ),
                        catchError(() =>
                            of(
                                new fromUnifiedApply.SaveUnifiedApplyFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    saveUnifiedApplySuccess$ = this.actions$
        .ofType(fromUnifiedApply.SAVE_UNIFIED_APPLY_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `保存统一申请信息`,
                    '恭喜您，保存统一申请信息成功！'
                )
            })
        )

    @Effect({ dispatch: false })
    saveUnifiedApplyFailure$ = this.actions$
        .ofType(fromUnifiedApply.SAVE_UNIFIED_APPLY_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `保存统一申请信息`,
                    '啊哦，保存统一申请信息失败！'
                )
            })
        )

    @Effect()
    submitUnifiedApply$ = this.actions$
        .ofType(fromUnifiedApply.SUBMIT_UNIFIED_APPLY)
        .pipe(
            withLatestFrom(
                this.store.select(getApplyInfo),
                (_, applyInfo) => applyInfo
            ),
            withLatestFrom(
                this.store.select(getUnifiedAddedApplyResources),
                (applyInfo, resources) => ({
                    applyInfo,
                    resources
                })
            ),
            withLatestFrom(
                this.store.select(getApprovers),
                ({ applyInfo, resources }, approvers) => ({
                    applyInfo,
                    resources,
                    approvers
                })
            ),
            switchMap(apply => {
                return this.unifiedApplyService
                    .submitUnifiedApply(apply)
                    .pipe(
                        map(
                            () =>
                                new fromUnifiedApply.SubmitUnifiedApplySuccessAction()
                        ),
                        catchError(() =>
                            of(
                                new fromUnifiedApply.SubmitUnifiedApplyFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    submitUnifiedApplySuccess$ = this.actions$
        .ofType(fromUnifiedApply.SUBMIT_UNIFIED_APPLY_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `提交统一申请信息`,
                    '恭喜您，提交统一申请信息成功！'
                )
            })
        )

    @Effect({ dispatch: false })
    submitUnifiedApplyFailure$ = this.actions$
        .ofType(fromUnifiedApply.SUBMIT_UNIFIED_APPLY_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `提交统一申请信息`,
                    '啊哦，提交统一申请信息失败！'
                )
            })
        )

    constructor(
        private actions$: Actions,
        private unifiedApplyService: UnifiedApplyService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
