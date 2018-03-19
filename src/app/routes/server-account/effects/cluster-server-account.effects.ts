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
        .map(
            (
                action: fromClusterServerAccount.FetchClusterServerAccountsCountAction
            ) => action.searchText
        )
        .switchMap(searchText => {
            return this.serverAccountService
                .fetchClusterServerAccountsCount(searchText)
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

    // TODO 新增完的查询逻辑
    @Effect()
    createClusterServerAccount$ = this.actions$
        .ofType(fromClusterServerAccount.CREATE_CLUSTER_SERVER_ACCOUNT)
        .map(
            (
                action: fromClusterServerAccount.CreateClusterServerAccountAction
            ) => action.account
        )
        .switchMap(account => {
            return this.serverAccountService
                .createClusterServerAccount(account)
                .concatMap(() => [
                    new fromClusterServerAccount.CreateClusterServerAccountSuccessAction(),
                    new fromClusterServerAccount.FetchClusterServerAccountsAction(),
                    new fromClusterServerAccount.FetchClusterServerAccountsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromClusterServerAccount.CreateClusterServerAccountFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    createClusterServerAccountSuccess$ = this.actions$
        .ofType(fromClusterServerAccount.CREATE_CLUSTER_SERVER_ACCOUNT_SUCCESS)
        .do(() => {
            this.notify.success(
                `新增集群服务器台帐`,
                `恭喜您，新增集群服务器台帐成功！`
            )
        })

    @Effect({ dispatch: false })
    createClusterServerAccountFailure$ = this.actions$
        .ofType(fromClusterServerAccount.CREATE_CLUSTER_SERVER_ACCOUNT_FAILURE)
        .do(() => {
            this.notify.error(
                `新增集群服务器台帐`,
                `啊哦，新增集群服务器台帐失败！`
            )
        })

    // TODO 编辑完的查询逻辑
    @Effect()
    editClusterServerAccount$ = this.actions$
        .ofType(fromClusterServerAccount.EDIT_CLUSTER_SERVER_ACCOUNT)
        .map(
            (action: fromClusterServerAccount.EditClusterServerAccountAction) =>
                action.account
        )
        .switchMap(account => {
            return this.serverAccountService
                .editClusterServerAccount(account)
                .concatMap(() => [
                    new fromClusterServerAccount.EditClusterServerAccountSuccessAction(),
                    new fromClusterServerAccount.FetchClusterServerAccountsAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromClusterServerAccount.EditClusterServerAccountFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    editClusterServerAccountSuccess$ = this.actions$
        .ofType(fromClusterServerAccount.EDIT_CLUSTER_SERVER_ACCOUNT_SUCCESS)
        .do(() => {
            this.notify.success(
                `编辑集群服务器台帐`,
                `恭喜您，编辑集群服务器台帐成功！`
            )
        })

    @Effect({ dispatch: false })
    editClusterServerAccountFailure$ = this.actions$
        .ofType(fromClusterServerAccount.EDIT_CLUSTER_SERVER_ACCOUNT_FAILURE)
        .do(() => {
            this.notify.error(
                `编辑集群服务器台帐`,
                `啊哦，编辑集群服务器台帐失败！`
            )
        })

    constructor(
        private actions$: Actions,
        private serverAccountService: ServerAccountService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
