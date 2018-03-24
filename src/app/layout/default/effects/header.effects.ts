import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { Store } from '@ngrx/store'
import * as fromHeader from '../actions/header.action'
import { HeaderService } from '../services/header.service'
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class HeaderEffects {
    @Effect()
    fetchVisitorApprovalsCount$ = this.actions$
        .ofType(fromHeader.FETCH_VISITOR_APPROVALS_COUNT)
        .pipe(
            switchMap(() => {
                return this.headerService
                    .fetchVisitorApprovalsCount()
            }),
            map(
                count =>
                    new fromHeader.FetchVisitorApprovalsCountSuccessAction(count)
            ),
            catchError(e =>
                of(
                    new fromHeader.FetchVisitorApprovalsCountFailureAction()
                )
            )
        )

    @Effect()
    fetchExhibitorApprovalsCount$ = this.actions$
        .ofType(fromHeader.FETCH_EXHIBITOR_APPROVALS_COUNT)
        .pipe(
            switchMap(() => {
                return this.headerService
                    .fetchExhibitorApprovalsCount()
            }),
            map(
                count =>
                    new fromHeader.FetchExhibitorApprovalsCountSuccessAction(count)
            ),
            catchError(e =>
                of(
                    new fromHeader.FetchExhibitorApprovalsCountFailureAction()
                )
            )
        )

    constructor(
        private actions$: Actions,
        private headerService: HeaderService,
    ) { }
}
