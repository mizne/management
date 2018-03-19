import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromClusterServerAccount from '../actions/cluster-server-account.action'
import { ServerAccountService } from '../services/server-account.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'

@Injectable()
export class ClusterServerAccountEffects {
    @Effect()
    fetchClusterServerAccounts$ = this.actions$
        .ofType(fromClusterServerAccount.FETCH_CLUSTER_SERVER_ACCOUNTS)
        .map(
            (
                action: fromClusterServerAccount.FetchClusterServerAccountsAction
            ) => action.payload
        )
        .switchMap(params => {
            return this.serverAccountService
                .fetchClusterServerAccounts(params)
                .map(
                    accounts =>
                        new fromClusterServerAccount.FetchClusterServerAccountsSuccessAction(
                            accounts
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromClusterServerAccount.FetchClusterServerAccountsFailureAction()
                    )
                )
        })

    @Effect()
    fetchClusterServerAccountsCount$ = this.actions$
        .ofType(fromClusterServerAccount.FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT)
        .switchMap(() => {
            return this.serverAccountService
                .fetchClusterServerAccountsCount()
                .map(
                    count =>
                        new fromClusterServerAccount.FetchClusterServerAccountsCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromClusterServerAccount.FetchClusterServerAccountsCountFailureAction()
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
