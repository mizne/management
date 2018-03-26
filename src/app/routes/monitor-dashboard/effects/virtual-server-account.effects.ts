import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import * as fromVirtualServerAccount from '../actions/virtual-server-account.action'
import { MonitorDashboardService } from '../services/monitor-dashboard.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'
import { map, switchMap, catchError, concatMap, tap } from 'rxjs/operators'

@Injectable()
export class VirtualServerAccountEffects {
    @Effect()
    fetchVirtualServerAccounts$ = this.actions$
        .ofType(fromVirtualServerAccount.FETCH_VIRTUAL_SERVER_ACCOUNTS)
        .pipe(
            map(
                (
                    action: fromVirtualServerAccount.FetchVirtualServerAccountsAction
                ) => action.payload
            ),
            switchMap(params =>
                this.serverAccountService.fetchVirtualServerAccounts(params)
            ),
            map(
                accounts =>
                    new fromVirtualServerAccount.FetchVirtualServerAccountsSuccessAction(
                        accounts
                    )
            ),
            catchError(() =>
                of(
                    new fromVirtualServerAccount.FetchVirtualServerAccountsFailureAction()
                )
            )
        )

    @Effect()
    fetchVirtualServerAccountsCount$ = this.actions$
        .ofType(fromVirtualServerAccount.FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT)
        .pipe(
            map(
                (
                    action: fromVirtualServerAccount.FetchVirtualServerAccountsCountAction
                ) => action.searchText
            ),
            switchMap(searchText =>
                this.serverAccountService.fetchVirtualServerAccountsCount(
                    searchText
                )
            ),
            map(
                count =>
                    new fromVirtualServerAccount.FetchVirtualServerAccountsCountSuccessAction(
                        count
                    )
            ),
            catchError(() =>
                of(
                    new fromVirtualServerAccount.FetchVirtualServerAccountsCountFailureAction()
                )
            )
        )

    // TODO 新增完的查询逻辑
    @Effect()
    createVirtualServerAccount$ = this.actions$
        .ofType(fromVirtualServerAccount.CREATE_VIRTUAL_SERVER_ACCOUNT)
        .pipe(
            map(
                (
                    action: fromVirtualServerAccount.CreateVirtualServerAccountAction
                ) => action.account
            ),
            switchMap(account =>
                this.serverAccountService.createVirtualServerAccount(account)
            ),
            concatMap(() => [
                new fromVirtualServerAccount.CreateVirtualServerAccountSuccessAction(),
                new fromVirtualServerAccount.FetchVirtualServerAccountsAction(),
                new fromVirtualServerAccount.FetchVirtualServerAccountsCountAction()
            ]),
            catchError(() =>
                of(
                    new fromVirtualServerAccount.CreateVirtualServerAccountFailureAction()
                )
            )
        )

    @Effect({ dispatch: false })
    createVirtualServerAccountSuccess$ = this.actions$
        .ofType(fromVirtualServerAccount.CREATE_VIRTUAL_SERVER_ACCOUNT_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `新增虚拟服务器台帐`,
                    `恭喜您，新增虚拟服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    createVirtualServerAccountFailure$ = this.actions$
        .ofType(fromVirtualServerAccount.CREATE_VIRTUAL_SERVER_ACCOUNT_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `新增虚拟服务器台帐`,
                    `啊哦，新增虚拟服务器台帐失败！`
                )
            })
        )

    // TODO 编辑完的查询逻辑
    @Effect()
    editVirtualServerAccount$ = this.actions$
        .ofType(fromVirtualServerAccount.EDIT_VIRTUAL_SERVER_ACCOUNT)
        .pipe(
            map(
                (
                    action: fromVirtualServerAccount.EditVirtualServerAccountAction
                ) => action.account
            ),
            switchMap(account =>
                this.serverAccountService.editVirtualServerAccount(account)
            ),
            concatMap(() => [
                new fromVirtualServerAccount.EditVirtualServerAccountSuccessAction(),
                new fromVirtualServerAccount.FetchVirtualServerAccountsAction()
            ]),
            catchError(() =>
                of(
                    new fromVirtualServerAccount.EditVirtualServerAccountFailureAction()
                )
            )
        )

    @Effect({ dispatch: false })
    editVirtualServerAccountSuccess$ = this.actions$
        .ofType(fromVirtualServerAccount.EDIT_VIRTUAL_SERVER_ACCOUNT_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `编辑虚拟服务器台帐`,
                    `恭喜您，编辑虚拟服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    editVirtualServerAccountFailure$ = this.actions$
        .ofType(fromVirtualServerAccount.EDIT_VIRTUAL_SERVER_ACCOUNT_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `编辑虚拟服务器台帐`,
                    `啊哦，编辑虚拟服务器台帐失败！`
                )
            })
        )

    constructor(
        private actions$: Actions,
        private serverAccountService: MonitorDashboardService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
