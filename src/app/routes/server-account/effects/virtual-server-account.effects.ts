import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromVirtualServerAccount from '../actions/virtual-server-account.action'
import { ServerAccountService } from '../services/server-account.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'

@Injectable()
export class VirtualServerAccountEffects {
    @Effect()
    fetchVirtualServerAccounts$ = this.actions$
        .ofType(fromVirtualServerAccount.FETCH_VIRTUAL_SERVER_ACCOUNTS)
        .map(
            (
                action: fromVirtualServerAccount.FetchVirtualServerAccountsAction
            ) => action.payload
        )
        .switchMap(params => {
            return this.serverAccountService
                .fetchVirtualServerAccounts(params)
                .map(
                    accounts =>
                        new fromVirtualServerAccount.FetchVirtualServerAccountsSuccessAction(
                            accounts
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromVirtualServerAccount.FetchVirtualServerAccountsFailureAction()
                    )
                )
        })

    @Effect()
    fetchVirtualServerAccountsCount$ = this.actions$
        .ofType(fromVirtualServerAccount.FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT)
        .switchMap(() => {
            return this.serverAccountService
                .fetchVirtualServerAccountsCount()
                .map(
                    count =>
                        new fromVirtualServerAccount.FetchVirtualServerAccountsCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromVirtualServerAccount.FetchVirtualServerAccountsCountFailureAction()
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
