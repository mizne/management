import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromVisitorResult from '../actions/visitor-result.action'
import { VisitorResultService } from '../services/visitor-result.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getVisitorPageParams } from '../reducers'

@Injectable()
export class VisitorResultEffects {
    @Effect()
    fetchVisitors$ = this.actions$
        .ofType(fromVisitorResult.FETCH_VISITORS)
        .map((action: fromVisitorResult.FetchVisitorsAction) => action.params)
        .switchMap(params => {
            return this.visitorResultService
                .fetchVisitors(params)
                .map(
                    visitors =>
                        new fromVisitorResult.FetchVisitorsSuccessAction(
                            visitors
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromVisitorResult.FetchVisitorsFailureAction()
                    )
                )
        })

    @Effect()
    fetchVisitorsCount$ = this.actions$
        .ofType(fromVisitorResult.FETCH_VISITORS_COUNT)
        .map(
            (action: fromVisitorResult.FetchVisitorsCountAction) =>
                action.params
        )
        .switchMap(params => {
            return this.visitorResultService
                .fetchVisitorsCount(params)
                .map(
                    count =>
                        new fromVisitorResult.FetchVisitorsCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromVisitorResult.FetchVisitorsCountFailureAction()
                    )
                )
        })

    constructor(
        private actions$: Actions,
        private visitorResultService: VisitorResultService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
