import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromExhibitorResult from '../actions/exhibitor-result.action'
import { ExhibitorResultService } from '../services/exhibitor-result.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getExhibitorPageParams } from '../reducers'

@Injectable()
export class ExhibitorResultEffects {
    @Effect()
    fetchExhibitors$ = this.actions$
        .ofType(fromExhibitorResult.FETCH_EXHIBITORS)
        .map(
            (action: fromExhibitorResult.FetchExhibitorsAction) => action.params
        )
        .switchMap(params => {
            return this.exhibitorResultService
                .fetchExhibitors(params)
                .map(
                    terminals =>
                        new fromExhibitorResult.FetchExhibitorsSuccessAction(
                            terminals
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromExhibitorResult.FetchExhibitorsFailureAction()
                    )
                )
        })

    @Effect()
    fetchExhibitorsCount$ = this.actions$
        .ofType(fromExhibitorResult.FETCH_EXHIBITORS_COUNT)
        .map(
            (action: fromExhibitorResult.FetchExhibitorsCountAction) =>
                action.params
        )
        .switchMap(params => {
            return this.exhibitorResultService
                .fetchExhibitorsCount(params)
                .map(
                    count =>
                        new fromExhibitorResult.FetchExhibitorsCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromExhibitorResult.FetchExhibitorsCountFailureAction()
                    )
                )
        })

    constructor(
        private actions$: Actions,
        private exhibitorResultService: ExhibitorResultService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
