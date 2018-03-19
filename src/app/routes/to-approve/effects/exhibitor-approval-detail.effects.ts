import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromExhibitorApprovalDetail from '../actions/exhibitor-approval-detail.action'
import { ToApproveExhibitorService } from '../services/to-approve-exhibitor.service'
import { NzNotificationService } from 'ng-zorro-antd'

@Injectable()
export class ExhibitorApprovalDetailEffects {
    @Effect()
    fetchExhibitorApprovalDetail$ = this.actions$
        .ofType(fromExhibitorApprovalDetail.FETCH_EXHIBITOR_APPROVAL_DETAIL)
        .map(
            (
                action: fromExhibitorApprovalDetail.FetchExhibitorApprovalDetailAction
            ) => action.id
        )
        .switchMap(id => {
            return this.toApproveExhibitorService
                .fetchExhibitorApprovalDetail(id)
                .map(
                    ExhibitorApproval =>
                        new fromExhibitorApprovalDetail.FetchExhibitorApprovalDetailSuccessAction(
                            ExhibitorApproval
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromExhibitorApprovalDetail.FetchExhibitorApprovalDetailFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    fetchExhibitorApprovalDetailSuccess$ = this.actions$
        .ofType(
            fromExhibitorApprovalDetail.FETCH_EXHIBITOR_APPROVAL_DETAIL_SUCCESS
        )
        .do(() => {
            this.notify.success(
                `展商约请详情`,
                `恭喜您，获取展商约请详情成功！`
            )
        })

    @Effect({ dispatch: false })
    fetchExhibitorApprovalDetailFailure$ = this.actions$
        .ofType(
            fromExhibitorApprovalDetail.FETCH_EXHIBITOR_APPROVAL_DETAIL_FAILURE
        )
        .do(() => {
            this.notify.error(`展商约请详情`, `啊哦，获取展商约请详情失败！`)
        })

    constructor(
        private actions$: Actions,
        private toApproveExhibitorService: ToApproveExhibitorService,
        private notify: NzNotificationService
    ) {}
}
