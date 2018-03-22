import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromSubPackage from '../actions/subpackage-apply.action'
import { UnifiedApplyService } from '../services/unified-apply.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import {
    State,
    getSubPackageInfo,
    getSubPackageAddedApplyResources
} from '../reducers'

@Injectable()
export class SubPackageApplyEffects {
    @Effect()
    fetchSubPackageInfo$ = this.actions$
        .ofType(fromSubPackage.FETCH_SUBPACKAGE_INFO)
        .switchMap(() => {
            return this.unifiedApplyService
                .fetchSubPackageInfo()
                .map(
                    subpackageInfo =>
                        new fromSubPackage.FetchSubPackageInfoSuccessAction(
                            subpackageInfo
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromSubPackage.FetchSubPackageInfoFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    fetchSubPackageInfoFailure$ = this.actions$
        .ofType(fromSubPackage.FETCH_SUBPACKAGE_INFO_FAILURE)
        .do(() => {
            this.notify.error(`获取分包信息`, '啊哦，获取分包信息失败！')
        })


    @Effect()
    saveSubPackageApply$ = this.actions$
        .ofType(fromSubPackage.SAVE_SUBPACKAGE_APPLY)
        .withLatestFrom(
            this.store.select(getSubPackageInfo),
            (_, subPackageInfo) => subPackageInfo
        )
        .withLatestFrom(
            this.store.select(getSubPackageAddedApplyResources),
            (subPackageInfo, resources) => ({
                subPackageInfo,
                resources
            })
        )
        .switchMap(apply => {
            return this.unifiedApplyService
                .saveSubPackageApply(apply)
                .map(
                    () =>
                        new fromSubPackage.SaveSubPackageApplySuccessAction()
                )
                .catch(() =>
                    Observable.of(
                        new fromSubPackage.SaveSubPackageApplyFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    saveSubPackageApplySuccess$ = this.actions$
        .ofType(fromSubPackage.SAVE_SUBPACKAGE_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(`保存分包信息`, '恭喜您，保存分包信息成功！')
        })

    @Effect({ dispatch: false })
    saveSubPackageApplyFailure$ = this.actions$
        .ofType(fromSubPackage.SAVE_SUBPACKAGE_APPLY_FAILURE)
        .do(() => {
            this.notify.error(`保存分包信息`, '啊哦，保存分包信息失败！')
        })

    @Effect()
    submitSubPackageApply$ = this.actions$
        .ofType(fromSubPackage.SUBMIT_SUBPACKAGE_APPLY)
        .withLatestFrom(
            this.store.select(getSubPackageInfo),
            (_, subPackageInfo) => subPackageInfo
        )
        .withLatestFrom(
            this.store.select(getSubPackageAddedApplyResources),
            (subPackageInfo, resources) => ({
                subPackageInfo,
                resources
            })
        )
        .switchMap(apply => {
            return this.unifiedApplyService
                .submitSubPackageApply(apply)
                .map(
                    () =>
                        new fromSubPackage.SubmitSubPackageApplySuccessAction()
                )
                .catch(() =>
                    Observable.of(
                        new fromSubPackage.SubmitSubPackageApplyFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    submitSubPackageApplySuccess$ = this.actions$
        .ofType(fromSubPackage.SUBMIT_SUBPACKAGE_APPLY_SUCCESS)
        .do(() => {
            this.notify.success(`提交分包信息`, '恭喜您，提交分包信息成功！')
        })

    @Effect({ dispatch: false })
    submitSubPackageApplyFailure$ = this.actions$
        .ofType(fromSubPackage.SUBMIT_SUBPACKAGE_APPLY_FAILURE)
        .do(() => {
            this.notify.error(`提交分包信息`, '啊哦，提交分包信息失败！')
        })

    constructor(
        private actions$: Actions,
        private unifiedApplyService: UnifiedApplyService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
