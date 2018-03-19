import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromVisitorDetail from '../actions/visitor-detail.action'
import { VisitorListService } from '../services/visitor-list.service'
import { NzNotificationService } from 'ng-zorro-antd'

@Injectable()
export class VisitorDetailEffects {
    @Effect()
    fetchVisitorDetail$ = this.actions$
        .ofType(fromVisitorDetail.FETCH_VISITOR_DETAIL)
        .map((action: fromVisitorDetail.FetchVisitorDetailAction) => action.id)
        .switchMap(id => {
            return this.visitorListService
                .fetchVisitorDetail(id)
                .map(
                visitor => new fromVisitorDetail.FetchVisitorDetailSuccessAction(
                    visitor
                )
                )
                .catch(err =>
                    Observable.of(
                        new fromVisitorDetail.FetchVisitorDetailFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    fetchVisitorDetailSuccess$ = this.actions$
        .ofType(fromVisitorDetail.FETCH_VISITOR_DETAIL_SUCCESS)
        .do(() => {
            this.notify.success(`买家详情`, `恭喜您，获取买家详情成功！`)
        })

    @Effect({ dispatch: false })
    fetchVisitorDetailFailure$ = this.actions$
        .ofType(fromVisitorDetail.FETCH_VISITOR_DETAIL_FAILURE)
        .do(() => {
            this.notify.error(`买家详情`, `啊哦，获取买家详情失败！`)
        })

    constructor(
        private actions$: Actions,
        private visitorListService: VisitorListService,
        private notify: NzNotificationService
    ) { }
}
