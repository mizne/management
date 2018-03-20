import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromRequirementApply from '../actions/requirement-apply.action'
import { ResourceApplyService } from '../services/resource-apply.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import {
    State,
    getApplyInfo,
    getAddedApplyResources,
    getApprovers
} from '../reducers'

@Injectable()
export class RequirementApplyEffects {
    @Effect()
    switchApplyType$ = this.actions$
        .ofType(fromRequirementApply.SWITCH_APPLY_TYPE)
        .map(
            (action: fromRequirementApply.SwitchApplyTypeAction) =>
                action.applyType
        )
        .mergeMap(applyType => [
            new fromRequirementApply.FetchApplyInfoAction(applyType),
            new fromRequirementApply.FetchApproversAction(applyType)
        ])

    @Effect()
    fetchApplyInfo$ = this.actions$
        .ofType(fromRequirementApply.FETCH_APPLY_INFO)
        .map(
            (action: fromRequirementApply.FetchApplyInfoAction) =>
                action.applyType
        )
        .switchMap(applyType => {
            return this.resourceApplyService
                .fetchApplyInfo(applyType)
                .map(
                    applyInfo =>
                        new fromRequirementApply.FetchApplyInfoSuccessAction(
                            applyInfo
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromRequirementApply.FetchApplyInfoFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    fetchApplyInfoFailure$ = this.actions$
        .ofType(fromRequirementApply.FETCH_APPLY_INFO_FAILURE)
        .do(() => {
            this.notify.error(`获取申请信息`, '啊哦，获取申请信息失败！')
        })

    @Effect()
    fetchApprovers$ = this.actions$
        .ofType(fromRequirementApply.FETCH_APPROVERS)
        .map(
            (action: fromRequirementApply.FetchApproversAction) =>
                action.applyType
        )
        .switchMap(applyType => {
            return this.resourceApplyService
                .fetchApprovers(applyType)
                .map(
                    approvers =>
                        new fromRequirementApply.FetchApproversSuccessAction(
                            approvers
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromRequirementApply.FetchApproversFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    fetchApproversFailure$ = this.actions$
        .ofType(fromRequirementApply.FETCH_APPROVERS_FAILURE)
        .do(() => {
            this.notify.error(`获取审批人信息`, '啊哦，获取审批人信息失败！')
        })

    @Effect()
    fetchAddableApplyResources$ = this.actions$
        .ofType(fromRequirementApply.FETCH_ADDABLE_APPLY_RESOURCE)
        .switchMap(() => {
            return this.resourceApplyService
                .fetchAddableApplyResources()
                .map(
                    resources =>
                        new fromRequirementApply.FetchAddableApplyResourceSuccessAction(
                            resources
                        )
                )
                .catch(() =>
                    Observable.of(
                        new fromRequirementApply.FetchAddableApplyResourceFailureAction()
                    )
                )
        })

    @Effect()
    saveRequirementApply$ = this.actions$
        .ofType(fromRequirementApply.SAVE_REQUIREMENT_APPLY)
        .withLatestFrom(
            this.store.select(getApplyInfo),
            (_, applyInfo) => applyInfo
        )
        .withLatestFrom(
            this.store.select(getAddedApplyResources),
            (applyInfo, resources) => ({
                applyInfo,
                resources
            })
        )
        .withLatestFrom(
            this.store.select(getApprovers),
            ({ applyInfo, resources }, approvers) => ({
                applyInfo,
                resources,
                approvers
            })
        )
        .switchMap(apply => {
            return this.resourceApplyService
                .saveRequirementApply(apply)
                .map(
                    () =>
                        new fromRequirementApply.SaveRequirementApplySuccessAction()
                )
                .catch(() =>
                    Observable.of(
                        new fromRequirementApply.SaveRequirementApplyFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    saveRequirementApplySuccess$ = this.actions$
        .ofType(fromRequirementApply.SAVE_REQUIREMENT_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(`保存需求信息`, '恭喜您，保存需求信息成功！')
        })

    @Effect({ dispatch: false })
    saveRequirementApplyFailure$ = this.actions$
        .ofType(fromRequirementApply.SAVE_REQUIREMENT_APPLY_FAILURE)
        .do(() => {
            this.notify.error(`保存需求信息`, '啊哦，保存需求信息失败！')
        })

    @Effect()
    submitRequirementApply$ = this.actions$
        .ofType(fromRequirementApply.SUBMIT_REQUIREMENT_APPLY)
        .withLatestFrom(
            this.store.select(getApplyInfo),
            (_, applyInfo) => applyInfo
        )
        .withLatestFrom(
            this.store.select(getAddedApplyResources),
            (applyInfo, resources) => ({
                applyInfo,
                resources
            })
        )
        .withLatestFrom(
            this.store.select(getApprovers),
            ({ applyInfo, resources }, approvers) => ({
                applyInfo,
                resources,
                approvers
            })
        )
        .switchMap(apply => {
            return this.resourceApplyService
                .submitRequirementApply(apply)
                .map(
                    () =>
                        new fromRequirementApply.SubmitRequirementApplySuccessAction()
                )
                .catch(() =>
                    Observable.of(
                        new fromRequirementApply.SumitRequirementApplyFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    submitRequirementApplySuccess$ = this.actions$
        .ofType(fromRequirementApply.SUBMIT_REQUIREMENT_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(`提交需求信息`, '恭喜您，提交需求信息成功！')
        })

    @Effect({ dispatch: false })
    submitRequirementApplyFailure$ = this.actions$
        .ofType(fromRequirementApply.SUBMIT_REQUIREMENT_APPLY_FAILURE)
        .do(() => {
            this.notify.error(`提交需求信息`, '啊哦，提交需求信息失败！')
        })

    constructor(
        private actions$: Actions,
        private resourceApplyService: ResourceApplyService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}