import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromExhibitorDetail from '../actions/exhibitor-detail.action'
import { ExhibitorListService } from '../services/exhibitor-list.service'
import { NzNotificationService } from 'ng-zorro-antd'

@Injectable()
export class ExhibitorDetailEffects {
    @Effect()
    fetchExhibitorDetail$ = this.actions$
        .ofType(fromExhibitorDetail.FETCH_EXHIBITOR_DETAIL)
        .map(
        (action: fromExhibitorDetail.FetchExhibitorDetailAction) =>
            action.id
        )
        .switchMap(id => {
            return this.exhibitorListService
                .fetchExhibitorDetail(id)
                .map(
                exhibitor => new fromExhibitorDetail.FetchExhibitorDetailSuccessAction(
                    exhibitor
                )
                )
                .catch(err =>
                    Observable.of(
                        new fromExhibitorDetail.FetchExhibitorDetailFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    fetchExhibitorDetailSuccess$ = this.actions$
        .ofType(fromExhibitorDetail.FETCH_EXHIBITOR_DETAIL_SUCCESS)
        .do(() => {
            this.notify.success(`展商详情`, `恭喜您，获取展商详情成功！`)
        })

    @Effect({ dispatch: false })
    fetchExhibitorDetailFailure$ = this.actions$
        .ofType(fromExhibitorDetail.FETCH_EXHIBITOR_DETAIL_FAILURE)
        .do(() => {
            this.notify.error(`展商详情`, `啊哦，获取展商详情失败！`)
        })

    constructor(
        private actions$: Actions,
        private exhibitorListService: ExhibitorListService,
        private notify: NzNotificationService
    ) { }
}
