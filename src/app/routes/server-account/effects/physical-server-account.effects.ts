import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromPhysicalServerAccount from '../actions/physical-server-account.action'
import { ServerAccountService } from '../services/server-account.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'

@Injectable()
export class PhysicalServerAccountEffects {
    @Effect()
    fetchPhysicalServerAccounts$ = this.actions$
        .ofType(fromPhysicalServerAccount.FETCH_PHYSICAL_SERVER_ACCOUNTS)
        .map(
            (
                action: fromPhysicalServerAccount.FetchPhysicalServerAccountsAction
            ) => action.payload
        )
        .switchMap(params => {
            return this.serverAccountService
                .fetchPhysicalServerAccounts(params)
                .map(
                    accounts =>
                        new fromPhysicalServerAccount.FetchPhysicalServerAccountsSuccessAction(
                            accounts
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromPhysicalServerAccount.FetchPhysicalServerAccountsFailureAction()
                    )
                )
        })

    @Effect()
    fetchPhysicalServerAccountsCount$ = this.actions$
        .ofType(fromPhysicalServerAccount.FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT)
        .switchMap(() => {
            return this.serverAccountService
                .fetchPhysicalServerAccountsCount()
                .map(
                    count =>
                        new fromPhysicalServerAccount.FetchPhysicalServerAccountsCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromPhysicalServerAccount.FetchPhysicalServerAccountsCountFailureAction()
                    )
                )
        })

    constructor(
        private actions$: Actions,
        private serverAccountService: ServerAccountService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
