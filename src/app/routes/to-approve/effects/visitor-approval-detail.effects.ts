import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromVisitorApprovalDetail from '../actions/visitor-approval-detail.action'
import { ToApproveVisitorService } from '../services/to-approve-visitor.service'
import { NzNotificationService } from 'ng-zorro-antd'

@Injectable()
export class VisitorApprovalDetailEffects {
  @Effect()
  fetchVisitorApprovalDetail$ = this.actions$
    .ofType(fromVisitorApprovalDetail.FETCH_VISITOR_APPROVAL_DETAIL)
    .map(
    (
      action: fromVisitorApprovalDetail.FetchVisitorApprovalDetailAction
    ) => action.id
    )
    .switchMap(id => {
      return this.toApproveVisitorService
        .fetchVisitorApprovalDetail(id)
        .map(
        visitorApproval =>
          new fromVisitorApprovalDetail.FetchVisitorApprovalDetailSuccessAction(
            visitorApproval
          )
        )
        .catch(err =>
          Observable.of(
            new fromVisitorApprovalDetail.FetchVisitorApprovalDetailFailureAction()
          )
        )
    })

  @Effect({ dispatch: false })
  fetchVisitorApprovalDetailSuccess$ = this.actions$
    .ofType(fromVisitorApprovalDetail.FETCH_VISITOR_APPROVAL_DETAIL_SUCCESS)
    .do(() => {
      this.notify.success(`买家约请详情`, `恭喜您，获取买家约请详情成功！`)
    })

  @Effect({ dispatch: false })
  fetchVisitorApprovalDetailFailure$ = this.actions$
    .ofType(fromVisitorApprovalDetail.FETCH_VISITOR_APPROVAL_DETAIL_FAILURE)
    .do(() => {
      this.notify.error(`买家约请详情`, `啊哦，获取买家约请详情失败！`)
    })

  constructor(
    private actions$: Actions,
    private toApproveVisitorService: ToApproveVisitorService,
    private notify: NzNotificationService
  ) { }
}
