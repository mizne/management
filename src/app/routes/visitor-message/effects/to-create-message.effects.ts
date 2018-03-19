import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromToCreateMessage from '../actions/to-create-message.action'
import { VisitorMessageService } from '../services/visitor-message.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getSearchPageParams } from '../reducers'

@Injectable()
export class ToCreateMessageEffects {
    @Effect()
    searchVisitors$ = this.actions$
        .ofType(fromToCreateMessage.SEARCH_VISITORS)
        .map(
            (action: fromToCreateMessage.SearchVisitorsAction) =>
                action.searchText
        )
        .switchMap(query => {
            return this.visitorMessageService
                .searchVisitors(query)
                .map(
                    Visitors =>
                        new fromToCreateMessage.SearchVisitorsSuccessAction(
                            Visitors
                        )
                )
                .catch(() =>
                    Observable.of(
                        new fromToCreateMessage.SearchVisitorsFailureAction()
                    )
                )
        })

    @Effect()
    initFetchVisitors$ = this.actions$
        .ofType(fromToCreateMessage.INIT_FETCH_VISITORS)
        .switchMap(() => {
            return this.visitorMessageService
                .initFetchVisitors()
                .map(
                    Visitors =>
                        new fromToCreateMessage.InitFetchVisitorsSuccessAction(
                            Visitors
                        )
                )
                .catch(() =>
                    Observable.of(
                        new fromToCreateMessage.InitFetchVisitorsFailureAction()
                    )
                )
        })

    @Effect()
    searchMoreVisitors$ = this.actions$
        .ofType(fromToCreateMessage.SEARCH_MORE_VISITORS)
        .map(
            (action: fromToCreateMessage.SearchMoreVisitorsAction) =>
                action.searchText
        )
        .withLatestFrom(this.store.select(getSearchPageParams))
        .switchMap(([query, params]) => {
            return this.visitorMessageService
                .searchMoreVisitors(query, params)
                .map(
                    visitors =>
                        new fromToCreateMessage.SearchMoreVisitorsSuccessAction(
                            visitors
                        )
                )
                .catch(() =>
                    Observable.of(
                        new fromToCreateMessage.SearchMoreVisitorsFailureAction()
                    )
                )
        })

    constructor(
        private actions$: Actions,
        private visitorMessageService: VisitorMessageService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
