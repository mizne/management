import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import * as fromPhysicalServerAccount from '../actions/physical-server-account.action'
import { MonitorDashboardService } from '../services/monitor-dashboard.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'
import { map, switchMap, catchError, concatMap, tap } from 'rxjs/operators'

@Injectable()
export class PhysicalServerAccountEffects {
    @Effect()
    fetchPhysicalServerAccounts$ = this.actions$
        .ofType(fromPhysicalServerAccount.FETCH_PHYSICAL_SERVER_ACCOUNTS)
        .pipe(
            map(
                (
                    action: fromPhysicalServerAccount.FetchPhysicalServerAccountsAction
                ) => action.payload
            ),
            switchMap(params =>
                this.serverAccountService.fetchPhysicalServerAccounts(params)
                .pipe(
                    map(
                        accounts =>
                            new fromPhysicalServerAccount.FetchPhysicalServerAccountsSuccessAction(
                                accounts
                            )
                    ),
                    catchError(() =>
                        of(
                            new fromPhysicalServerAccount.FetchPhysicalServerAccountsFailureAction()
                        )
                    )
                )
            ),
            
        )

    @Effect()
    fetchPhysicalServerAccountsCount$ = this.actions$
        .ofType(fromPhysicalServerAccount.FETCH_PHYSICAL_SERVER_ACCOUNTS_COUNT)
        .pipe(
            map(
                (
                    action: fromPhysicalServerAccount.FetchPhysicalServerAccountsCountAction
                ) => action.searchText
            ),
            switchMap(searchText =>
                this.serverAccountService.fetchPhysicalServerAccountsCount(
                    searchText
                ).pipe(
                    map(
                        count =>
                            new fromPhysicalServerAccount.FetchPhysicalServerAccountsCountSuccessAction(
                                count
                            )
                    ),
                    catchError(() =>
                        of(
                            new fromPhysicalServerAccount.FetchPhysicalServerAccountsCountFailureAction()
                        )
                    )
                )
            ),
            
        )

    // TODO 新增完的查询逻辑
    @Effect()
    createPhysicalServerAccount$ = this.actions$
        .ofType(fromPhysicalServerAccount.CREATE_PHYSICAL_SERVER_ACCOUNT)
        .pipe(
            map(
                (
                    action: fromPhysicalServerAccount.CreatePhysicalServerAccountAction
                ) => action.account
            ),
            switchMap(account =>
                this.serverAccountService.createPhysicalServerAccount(account)
                .pipe(
                    concatMap(() => [
                        new fromPhysicalServerAccount.CreatePhysicalServerAccountSuccessAction(),
                        new fromPhysicalServerAccount.FetchPhysicalServerAccountsAction(),
                        new fromPhysicalServerAccount.FetchPhysicalServerAccountsCountAction()
                    ]),
                    catchError(() =>
                        of(
                            new fromPhysicalServerAccount.CreatePhysicalServerAccountFailureAction()
                        )
                    )
                )
            ),
            
        )

    @Effect({ dispatch: false })
    createPhysicalServerAccountSuccess$ = this.actions$
        .ofType(
            fromPhysicalServerAccount.CREATE_PHYSICAL_SERVER_ACCOUNT_SUCCESS
        )
        .pipe(
            tap(() => {
                this.notify.success(
                    `新增物理服务器台帐`,
                    `恭喜您，新增物理服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    createPhysicalServerAccountFailure$ = this.actions$
        .ofType(
            fromPhysicalServerAccount.CREATE_PHYSICAL_SERVER_ACCOUNT_FAILURE
        )
        .pipe(
            tap(() => {
                this.notify.error(
                    `新增物理服务器台帐`,
                    `啊哦，新增物理服务器台帐失败！`
                )
            })
        )

    // TODO 编辑完的查询逻辑
    @Effect()
    editPhysicalServerAccount$ = this.actions$
        .ofType(fromPhysicalServerAccount.EDIT_PHYSICAL_SERVER_ACCOUNT)
        .pipe(
            map(
                (
                    action: fromPhysicalServerAccount.EditPhysicalServerAccountAction
                ) => action.account
            ),
            switchMap(account =>
                this.serverAccountService.editPhysicalServerAccount(account)
                .pipe(
                    concatMap(() => [
                        new fromPhysicalServerAccount.EditPhysicalServerAccountSuccessAction(),
                        new fromPhysicalServerAccount.FetchPhysicalServerAccountsAction()
                    ]),
                    catchError(() =>
                        of(
                            new fromPhysicalServerAccount.EditPhysicalServerAccountFailureAction()
                        )
                    )
                )
            ),
            
        )

    @Effect({ dispatch: false })
    editPhysicalServerAccountSuccess$ = this.actions$
        .ofType(fromPhysicalServerAccount.EDIT_PHYSICAL_SERVER_ACCOUNT_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `编辑物理服务器台帐`,
                    `恭喜您，编辑物理服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    editPhysicalServerAccountFailure$ = this.actions$
        .ofType(fromPhysicalServerAccount.EDIT_PHYSICAL_SERVER_ACCOUNT_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `编辑物理服务器台帐`,
                    `啊哦，编辑物理服务器台帐失败！`
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
