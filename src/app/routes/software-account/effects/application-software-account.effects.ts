import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromApplicationSoftwareAccount from '../actions/application-software-account.action'
import { SoftwareAccountService } from '../services/software-account.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getApplicationSoftwareAccountsPageParams } from '../reducers'

@Injectable()
export class ApplicationSoftwareAccountEffects {
    @Effect()
    fetchApplicationSoftwareAccounts$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.FETCH_APPLICATION_SOFTWARE_ACCOUNTS
        )
        .map(
            (
                action: fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsAction
            ) => action.payload
        )
        .switchMap(params => {
            return this.softwareAccountService
                .fetchApplicationSoftwareAccounts(params)
                .map(
                    accounts =>
                        new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsSuccessAction(
                            accounts
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsFailureAction()
                    )
                )
        })

    @Effect()
    fetchApplicationSoftwareAccountsCount$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.FETCH_APPLICATION_SOFTWARE_ACCOUNTS_COUNT
        )
        .map(
            (
                action: fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsCountAction
            ) => action.searchText
        )
        .switchMap(searchText => {
            return this.softwareAccountService
                .fetchApplicationSoftwareAccountsCount(searchText)
                .map(
                    count =>
                        new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsCountFailureAction()
                    )
                )
        })

    // TODO 新增完的查询逻辑
    @Effect()
    createApplicationSoftwareAccount$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.CREATE_APPLICATION_SOFTWARE_ACCOUNT
        )
        .map(
            (
                action: fromApplicationSoftwareAccount.CreateApplicationSoftwareAccountAction
            ) => action.account
        )
        .switchMap(account => {
            return this.softwareAccountService
                .createApplicationSoftwareAccount(account)
                .concatMap(() => [
                    new fromApplicationSoftwareAccount.CreateApplicationSoftwareAccountSuccessAction(),
                    new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsAction(),
                    new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromApplicationSoftwareAccount.CreateApplicationSoftwareAccountFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    createApplicationSoftwareAccountSuccess$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.CREATE_APPLICATION_SOFTWARE_ACCOUNT_SUCCESS
        )
        .do(() => {
            this.notify.success(
                `新增应用软件台帐`,
                `恭喜您，新增应用软件台帐成功！`
            )
        })

    @Effect({ dispatch: false })
    createApplicationSoftwareAccountFailure$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.CREATE_APPLICATION_SOFTWARE_ACCOUNT_FAILURE
        )
        .do(() => {
            this.notify.error(
                `新增应用软件台帐`,
                `啊哦，新增应用软件台帐失败！`
            )
        })

    // TODO 编辑完的查询逻辑
    @Effect()
    editApplicationSoftwareAccount$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.EDIT_APPLICATION_SOFTWARE_ACCOUNT
        )
        .map(
            (
                action: fromApplicationSoftwareAccount.EditApplicationSoftwareAccountAction
            ) => action.account
        )
        .switchMap(account => {
            return this.softwareAccountService
                .editApplicationSoftwareAccount(account)
                .concatMap(() => [
                    new fromApplicationSoftwareAccount.EditApplicationSoftwareAccountSuccessAction(),
                    new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromApplicationSoftwareAccount.EditApplicationSoftwareAccountFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    editApplicationSoftwareAccountSuccess$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.EDIT_APPLICATION_SOFTWARE_ACCOUNT_SUCCESS
        )
        .do(() => {
            this.notify.success(
                `编辑应用软件台帐`,
                `恭喜您，编辑应用软件台帐成功！`
            )
        })

    @Effect({ dispatch: false })
    editApplicationSoftwareAccountFailure$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.EDIT_APPLICATION_SOFTWARE_ACCOUNT_FAILURE
        )
        .do(() => {
            this.notify.error(
                `编辑应用软件台帐`,
                `啊哦，编辑应用软件台帐失败！`
            )
        })

    constructor(
        private actions$: Actions,
        private softwareAccountService: SoftwareAccountService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) { }
}
