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
        .map(
            (
                action: fromPhysicalServerAccount.FetchPhysicalServerAccountsCountAction
            ) => action.searchText
        )
        .switchMap(searchText => {
            return this.serverAccountService
                .fetchPhysicalServerAccountsCount(searchText)
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

    // TODO 新增完的查询逻辑
    @Effect()
    createPhysicalServerAccount$ = this.actions$
        .ofType(fromPhysicalServerAccount.CREATE_PHYSICAL_SERVER_ACCOUNT)
        .map(
            (
                action: fromPhysicalServerAccount.CreatePhysicalServerAccountAction
            ) => action.account
        )
        .switchMap(account => {
            return this.serverAccountService
                .createPhysicalServerAccount(account)
                .concatMap(() => [
                    new fromPhysicalServerAccount.CreatePhysicalServerAccountSuccessAction(),
                    new fromPhysicalServerAccount.FetchPhysicalServerAccountsAction(),
                    new fromPhysicalServerAccount.FetchPhysicalServerAccountsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromPhysicalServerAccount.CreatePhysicalServerAccountFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    createPhysicalServerAccountSuccess$ = this.actions$
        .ofType(
            fromPhysicalServerAccount.CREATE_PHYSICAL_SERVER_ACCOUNT_SUCCESS
        )
        .do(() => {
            this.notify.success(
                `新增物理服务器台帐`,
                `恭喜您，新增物理服务器台帐成功！`
            )
        })

    @Effect({ dispatch: false })
    createPhysicalServerAccountFailure$ = this.actions$
        .ofType(
            fromPhysicalServerAccount.CREATE_PHYSICAL_SERVER_ACCOUNT_FAILURE
        )
        .do(() => {
            this.notify.error(
                `新增物理服务器台帐`,
                `啊哦，新增物理服务器台帐失败！`
            )
        })

    // TODO 编辑完的查询逻辑
    @Effect()
    editPhysicalServerAccount$ = this.actions$
        .ofType(fromPhysicalServerAccount.EDIT_PHYSICAL_SERVER_ACCOUNT)
        .map(
            (
                action: fromPhysicalServerAccount.EditPhysicalServerAccountAction
            ) => action.account
        )
        .switchMap(account => {
            return this.serverAccountService
                .editPhysicalServerAccount(account)
                .concatMap(() => [
                    new fromPhysicalServerAccount.EditPhysicalServerAccountSuccessAction(),
                    new fromPhysicalServerAccount.FetchPhysicalServerAccountsAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromPhysicalServerAccount.EditPhysicalServerAccountFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    editPhysicalServerAccountSuccess$ = this.actions$
        .ofType(fromPhysicalServerAccount.EDIT_PHYSICAL_SERVER_ACCOUNT_SUCCESS)
        .do(() => {
            this.notify.success(
                `编辑物理服务器台帐`,
                `恭喜您，编辑物理服务器台帐成功！`
            )
        })

    @Effect({ dispatch: false })
    editPhysicalServerAccountFailure$ = this.actions$
        .ofType(fromPhysicalServerAccount.EDIT_PHYSICAL_SERVER_ACCOUNT_FAILURE)
        .do(() => {
            this.notify.error(
                `编辑物理服务器台帐`,
                `啊哦，编辑物理服务器台帐失败！`
            )
        })

    constructor(
        private actions$: Actions,
        private serverAccountService: ServerAccountService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
