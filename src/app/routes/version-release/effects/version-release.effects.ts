import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import * as fromVersionRelease from '../actions/version-release.action'
import { VersionReleaseService } from '../services/version-release.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import {
    State,
    getApplyInfo,
    getAddedApplyResources,
    getApprovers
} from '../reducers'
import { tap, withLatestFrom, switchMap, map, catchError } from 'rxjs/operators'

@Injectable()
export class VersionReleaseEffects {
    @Effect()
    fetchApplyInfo$ = this.actions$
        .ofType(fromVersionRelease.FETCH_APPLY_INFO)
        .pipe(
            switchMap(() => {
                return this.versionReleaseApplyService
                    .fetchApplyInfo()
                    .pipe(
                        map(
                            applyInfo =>
                                new fromVersionRelease.FetchApplyInfoSuccessAction(
                                    applyInfo
                                )
                        ),
                        catchError(e =>
                            of(
                                new fromVersionRelease.FetchApplyInfoFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    fetchApplyInfoFailure$ = this.actions$
        .ofType(fromVersionRelease.FETCH_APPLY_INFO_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`获取申请信息`, '啊哦，获取申请信息失败！')
            })
        )

    @Effect()
    fetchApprovers$ = this.actions$
        .ofType(fromVersionRelease.FETCH_APPROVERS)
        .pipe(
            switchMap(() => {
                return this.versionReleaseApplyService
                    .fetchApprovers()
                    .pipe(
                        map(
                            approvers =>
                                new fromVersionRelease.FetchApproversSuccessAction(
                                    approvers
                                )
                        ),
                        catchError(e =>
                            of(
                                new fromVersionRelease.FetchApproversFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    fetchApproversFailure$ = this.actions$
        .ofType(fromVersionRelease.FETCH_APPROVERS_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `获取审批人信息`,
                    '啊哦，获取审批人信息失败！'
                )
            })
        )

    @Effect()
    saveVersionReleaseApply$ = this.actions$
        .ofType(fromVersionRelease.SAVE_VERSION_RELEASE_APPLY)
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
                return this.versionReleaseApplyService
                    .saveVersionReleaseApply(apply)
                    .pipe(
                        map(
                            () =>
                                new fromVersionRelease.SaveVersionReleaseApplySuccessAction()
                        ),
                        catchError(() =>
                            of(
                                new fromVersionRelease.SaveVersionReleaseApplyFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    saveVersionReleaseApplySuccess$ = this.actions$
        .ofType(fromVersionRelease.SAVE_VERSION_RELEASE_APPLY_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `保存申请信息`,
                    '恭喜您，保存申请信息成功！'
                )
            })
        )

    @Effect({ dispatch: false })
    saveVersionReleaseApplyFailure$ = this.actions$
        .ofType(fromVersionRelease.SAVE_VERSION_RELEASE_APPLY_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`保存申请信息`, '啊哦，保存申请信息失败！')
            })
        )

    @Effect()
    submitVersionReleaseApply$ = this.actions$
        .ofType(fromVersionRelease.SUBMIT_VERSION_RELEASE_APPLY)
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
                return this.versionReleaseApplyService
                    .submitVersionReleaseApply(apply)
                    .pipe(
                        map(
                            () =>
                                new fromVersionRelease.SubmitVersionReleaseApplySuccessAction()
                        ),
                        catchError(() =>
                            of(
                                new fromVersionRelease.SumitVersionReleaseApplyFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    submitVersionReleaseApplySuccess$ = this.actions$
        .ofType(fromVersionRelease.SUBMIT_VERSION_RELEASE_APPLY_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `提交申请信息`,
                    '恭喜您，提交申请信息成功！'
                )
            })
        )

    @Effect({ dispatch: false })
    submitVersionReleaseApplyFailure$ = this.actions$
        .ofType(fromVersionRelease.SUBMIT_VERSION_RELEASE_APPLY_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`提交申请信息`, '啊哦，提交申请信息失败！')
            })
        )

    constructor(
        private actions$: Actions,
        private versionReleaseApplyService: VersionReleaseService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
