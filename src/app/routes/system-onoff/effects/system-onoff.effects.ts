import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import * as fromSystemOnOff from '../actions/system-onoff.action'
import { SystemOnOffService } from '../services/system-onoff.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import {
    State,
    getApplyInfo,
    getAddedApplyResources,
    getApprovers
} from '../reducers'
import {
    map,
    mergeMap,
    switchMap,
    catchError,
    tap,
    withLatestFrom
} from 'rxjs/operators'

@Injectable()
export class SystemOnOffEffects {
    @Effect()
    fetchListNumber$ = this.actions$
        .ofType(fromSystemOnOff.FETCH_LIST_NUMBER)
        .pipe(
            switchMap(() => {
                return this.resourceApplyService
                    .fetchListNumber()
                    .pipe(
                        map(
                            listNumber =>
                                new fromSystemOnOff.FetchListNumberSuccessAction(
                                    listNumber
                                )
                        ),
                        catchError(e =>
                            of(
                                new fromSystemOnOff.FetchListNumberFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    fetchListNumberFailure$ = this.actions$
        .ofType(fromSystemOnOff.FETCH_LIST_NUMBER_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`获取申请单号`, '啊哦，获取申请单号失败！')
            })
        )

    @Effect()
    switchApplyType$ = this.actions$
        .ofType(fromSystemOnOff.SWITCH_APPLY_TYPE)
        .pipe(
            map(
                (action: fromSystemOnOff.SwitchApplyTypeAction) =>
                    action.applyType
            ),
            mergeMap(applyType => [
                // new fromSystemOnOff.FetchApplyInfoAction(applyType),
                new fromSystemOnOff.FetchApproversAction(applyType)
            ])
        )

    @Effect()
    fetchApplyInfo$ = this.actions$
        .ofType(fromSystemOnOff.FETCH_APPLY_INFO)
        .pipe(
            map(
                (action: fromSystemOnOff.FetchApplyInfoAction) =>
                    action.applyType
            ),
            switchMap(applyType => {
                return this.resourceApplyService
                    .fetchApplyInfo(applyType)
                    .pipe(
                        map(
                            applyInfo =>
                                new fromSystemOnOff.FetchApplyInfoSuccessAction(
                                    applyInfo
                                )
                        ),
                        catchError(e =>
                            of(
                                new fromSystemOnOff.FetchApplyInfoFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    fetchApplyInfoFailure$ = this.actions$
        .ofType(fromSystemOnOff.FETCH_APPLY_INFO_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`获取申请信息`, '啊哦，获取申请信息失败！')
            })
        )

    @Effect()
    fetchApprovers$ = this.actions$
        .ofType(fromSystemOnOff.FETCH_APPROVERS)
        .pipe(
            map(
                (action: fromSystemOnOff.FetchApproversAction) =>
                    action.applyType
            ),
            switchMap(applyType => {
                return this.resourceApplyService
                    .fetchApprovers(applyType)
                    .pipe(
                        map(
                            approvers =>
                                new fromSystemOnOff.FetchApproversSuccessAction(
                                    approvers
                                )
                        ),
                        catchError(e =>
                            of(
                                new fromSystemOnOff.FetchApproversFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    fetchApproversFailure$ = this.actions$
        .ofType(fromSystemOnOff.FETCH_APPROVERS_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `获取审批人信息`,
                    '啊哦，获取审批人信息失败！'
                )
            })
        )

    @Effect()
    saveSystemOnOffApply$ = this.actions$
        .ofType(fromSystemOnOff.SAVE_SYSTEM_ONOFF_APPLY)
        .pipe(
            withLatestFrom(
                this.store.select(getApplyInfo),
                (_, applyInfo) => applyInfo
            ),
            withLatestFrom(
                this.store.select(getAddedApplyResources),
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
                return this.resourceApplyService
                    .saveSystemOnOffApply(apply)
                    .pipe(
                        map(
                            () =>
                                new fromSystemOnOff.SaveSystemOnOffApplySuccessAction()
                        ),
                        catchError(() =>
                            of(
                                new fromSystemOnOff.SaveSystemOnOffApplyFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    saveSystemOnOffApplySuccess$ = this.actions$
        .ofType(fromSystemOnOff.SAVE_SYSTEM_ONOFF_APPLY_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `保存申请信息`,
                    '恭喜您，保存申请信息成功！'
                )
            })
        )

    @Effect({ dispatch: false })
    saveSystemOnOffApplyFailure$ = this.actions$
        .ofType(fromSystemOnOff.SAVE_SYSTEM_ONOFF_APPLY_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`保存申请信息`, '啊哦，保存申请信息失败！')
            })
        )

    @Effect()
    submitSystemOnOffApply$ = this.actions$
        .ofType(fromSystemOnOff.SUBMIT_SYSTEM_ONOFF_APPLY)
        .pipe(
            withLatestFrom(
                this.store.select(getApplyInfo),
                (_, applyInfo) => applyInfo
            ),
            withLatestFrom(
                this.store.select(getAddedApplyResources),
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
                return this.resourceApplyService
                    .submitSystemOnOffApply(apply)
                    .pipe(
                        map(
                            () =>
                                new fromSystemOnOff.SubmitSystemOnOffApplySuccessAction()
                        ),
                        catchError(() =>
                            of(
                                new fromSystemOnOff.SumitSystemOnOffApplyFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    submitSystemOnOffApplySuccess$ = this.actions$
        .ofType(fromSystemOnOff.SUBMIT_SYSTEM_ONOFF_APPLY_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `提交申请信息`,
                    '恭喜您，提交申请信息成功！'
                )
            })
        )

    @Effect({ dispatch: false })
    submitSystemOnOffApplyFailure$ = this.actions$
        .ofType(fromSystemOnOff.SUBMIT_SYSTEM_ONOFF_APPLY_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`提交申请信息`, '啊哦，提交申请信息失败！')
            })
        )

    constructor(
        private actions$: Actions,
        private resourceApplyService: SystemOnOffService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
