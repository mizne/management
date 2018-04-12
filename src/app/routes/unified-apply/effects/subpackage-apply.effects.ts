import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import * as fromSubPackage from '../actions/subpackage-apply.action'
import { UnifiedApplyService } from '../services/unified-apply.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import {
    State,
    getSubPackageInfo,
    getSubPackageAddedApplyResources
} from '../reducers'
import { switchMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators'

@Injectable()
export class SubPackageApplyEffects {
    @Effect()
    fetchSubPackageInfo$ = this.actions$
        .ofType(fromSubPackage.FETCH_SUBPACKAGE_INFO)
        .pipe(
            switchMap(() => {
                return this.unifiedApplyService
                    .fetchSubPackageInfo()
                    .pipe(
                        map(
                            subpackageInfo =>
                                new fromSubPackage.FetchSubPackageInfoSuccessAction(
                                    subpackageInfo
                                )
                        ),
                        catchError(e =>
                            of(
                                new fromSubPackage.FetchSubPackageInfoFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    fetchSubPackageInfoFailure$ = this.actions$
        .ofType(fromSubPackage.FETCH_SUBPACKAGE_INFO_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`获取分包信息`, '啊哦，获取分包信息失败！')
            })
        )

    @Effect()
    saveSubPackageApply$ = this.actions$
        .ofType(fromSubPackage.SAVE_SUBPACKAGE_APPLY)
        .pipe(
            withLatestFrom(
                this.store.select(getSubPackageInfo),
                (_, subPackageInfo) => subPackageInfo
            ),
            withLatestFrom(
                this.store.select(getSubPackageAddedApplyResources),
                (subPackageInfo, resources) => ({
                    subPackageInfo,
                    resources
                })
            ),
            switchMap(apply => {
                return this.unifiedApplyService
                    .saveSubPackageApply(apply)
                    .pipe(
                        map(
                            () =>
                                new fromSubPackage.SaveSubPackageApplySuccessAction()
                        ),
                        catchError(() =>
                            of(
                                new fromSubPackage.SaveSubPackageApplyFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    saveSubPackageApplySuccess$ = this.actions$
        .ofType(fromSubPackage.SAVE_SUBPACKAGE_APPLY_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `保存分包信息`,
                    '恭喜您，保存分包信息成功！'
                )
            })
        )

    @Effect({ dispatch: false })
    saveSubPackageApplyFailure$ = this.actions$
        .ofType(fromSubPackage.SAVE_SUBPACKAGE_APPLY_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`保存分包信息`, '啊哦，保存分包信息失败！')
            })
        )

    @Effect()
    submitSubPackageApply$ = this.actions$
        .ofType(fromSubPackage.SUBMIT_SUBPACKAGE_APPLY)
        .pipe(
            withLatestFrom(
                this.store.select(getSubPackageInfo),
                (_, subPackageInfo) => subPackageInfo
            ),
            withLatestFrom(
                this.store.select(getSubPackageAddedApplyResources),
                (subPackageInfo, resources) => ({
                    subPackageInfo,
                    resources
                })
            ),
            switchMap(apply => {
                return this.unifiedApplyService
                    .submitSubPackageApply(apply)
                    .pipe(
                        map(
                            () =>
                                new fromSubPackage.SubmitSubPackageApplySuccessAction()
                        ),
                        catchError(() =>
                            of(
                                new fromSubPackage.SubmitSubPackageApplyFailureAction()
                            )
                        )
                    )
            })
        )

    @Effect({ dispatch: false })
    submitSubPackageApplySuccess$ = this.actions$
        .ofType(fromSubPackage.SUBMIT_SUBPACKAGE_APPLY_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `提交分包信息`,
                    '恭喜您，提交分包信息成功！'
                )
            })
        )

    @Effect({ dispatch: false })
    submitSubPackageApplyFailure$ = this.actions$
        .ofType(fromSubPackage.SUBMIT_SUBPACKAGE_APPLY_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`提交分包信息`, '啊哦，提交分包信息失败！')
            })
        )

    constructor(
        private actions$: Actions,
        private unifiedApplyService: UnifiedApplyService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
