import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import * as fromClusterServerAccount from '../actions/server-topology.action'
import { ServerTopologyService } from '../services/server-topology.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'
import { map, switchMap, catchError, concatMap, tap } from 'rxjs/operators'

@Injectable()
export class ServerTopologyEffects {
    @Effect()
    fetchClusterServerAccounts$ = this.actions$
        .ofType(fromClusterServerAccount.FETCH_CLUSTER_SERVER_ACCOUNTS)
        .pipe(
            map(
                (
                    action: fromClusterServerAccount.FetchClusterServerAccountsAction
                ) => action.payload
            ),
            switchMap(params =>
                this.serverAccountService.fetchClusterServerAccounts(params)
            ),
            map(
                accounts =>
                    new fromClusterServerAccount.FetchClusterServerAccountsSuccessAction(
                        accounts
                    )
            ),
            catchError(() =>
                of(
                    new fromClusterServerAccount.FetchClusterServerAccountsFailureAction()
                )
            )
        )

    @Effect()
    fetchClusterServerAccountsCount$ = this.actions$
        .ofType(fromClusterServerAccount.FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT)
        .pipe(
            map(
                (
                    action: fromClusterServerAccount.FetchClusterServerAccountsCountAction
                ) => action.searchText
            ),
            switchMap(searchText =>
                this.serverAccountService.fetchClusterServerAccountsCount(
                    searchText
                )
            ),
            map(
                count =>
                    new fromClusterServerAccount.FetchClusterServerAccountsCountSuccessAction(
                        count
                    )
            ),
            catchError(() =>
                of(
                    new fromClusterServerAccount.FetchClusterServerAccountsCountFailureAction()
                )
            )
        )

    // TODO 新增完的查询逻辑
    @Effect()
    createClusterServerAccount$ = this.actions$
        .ofType(fromClusterServerAccount.CREATE_CLUSTER_SERVER_ACCOUNT)
        .pipe(
            map(
                (
                    action: fromClusterServerAccount.CreateClusterServerAccountAction
                ) => action.account
            ),
            switchMap(account =>
                this.serverAccountService.createClusterServerAccount(account)
            ),
            concatMap(() => [
                new fromClusterServerAccount.CreateClusterServerAccountSuccessAction(),
                new fromClusterServerAccount.FetchClusterServerAccountsAction(),
                new fromClusterServerAccount.FetchClusterServerAccountsCountAction()
            ]),
            catchError(() =>
                of(
                    new fromClusterServerAccount.CreateClusterServerAccountFailureAction()
                )
            )
        )

    @Effect({ dispatch: false })
    createClusterServerAccountSuccess$ = this.actions$
        .ofType(fromClusterServerAccount.CREATE_CLUSTER_SERVER_ACCOUNT_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `新增集群服务器台帐`,
                    `恭喜您，新增集群服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    createClusterServerAccountFailure$ = this.actions$
        .ofType(fromClusterServerAccount.CREATE_CLUSTER_SERVER_ACCOUNT_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `新增集群服务器台帐`,
                    `啊哦，新增集群服务器台帐失败！`
                )
            })
        )

    // TODO 编辑完的查询逻辑
    @Effect()
    editClusterServerAccount$ = this.actions$
        .ofType(fromClusterServerAccount.EDIT_CLUSTER_SERVER_ACCOUNT)
        .pipe(
            map(
                (
                    action: fromClusterServerAccount.EditClusterServerAccountAction
                ) => action.account
            ),
            switchMap(account =>
                this.serverAccountService.editClusterServerAccount(account)
            ),
            concatMap(() => [
                new fromClusterServerAccount.EditClusterServerAccountSuccessAction(),
                new fromClusterServerAccount.FetchClusterServerAccountsAction()
            ]),
            catchError(() =>
                of(
                    new fromClusterServerAccount.EditClusterServerAccountFailureAction()
                )
            )
        )

    @Effect({ dispatch: false })
    editClusterServerAccountSuccess$ = this.actions$
        .ofType(fromClusterServerAccount.EDIT_CLUSTER_SERVER_ACCOUNT_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `编辑集群服务器台帐`,
                    `恭喜您，编辑集群服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    editClusterServerAccountFailure$ = this.actions$
        .ofType(fromClusterServerAccount.EDIT_CLUSTER_SERVER_ACCOUNT_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `编辑集群服务器台帐`,
                    `啊哦，编辑集群服务器台帐失败！`
                )
            })
        )

    constructor(
        private actions$: Actions,
        private serverAccountService: ServerTopologyService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
