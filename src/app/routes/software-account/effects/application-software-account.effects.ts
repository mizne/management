import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { fromApplicationSoftwareAccount } from '../actions'
import { SoftwareAccountService } from '../services/software-account.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getApplicationSoftwareAccountsPageParams } from '../reducers'
import { map, switchMap, catchError, concatMap, tap } from 'rxjs/operators'

@Injectable()
export class ApplicationSoftwareAccountEffects {
    @Effect()
    fetchApplicationSoftwareAccounts$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.FETCH_APPLICATION_SOFTWARE_ACCOUNTS
        )
        .pipe(
            map(
                (
                    action: fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsAction
                ) => action.payload
            ),
            switchMap(params =>
                this.softwareAccountService
                    .fetchApplicationSoftwareAccounts(params)
                    .pipe(
                        map(
                            accounts =>
                                new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsSuccessAction(
                                    accounts
                                )
                        ),
                        catchError(() =>
                            of(
                                new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsFailureAction()
                            )
                        )
                    )
            )
        )

    @Effect()
    fetchApplicationSoftwareAccountsCount$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.FETCH_APPLICATION_SOFTWARE_ACCOUNTS_COUNT
        )
        .pipe(
            map(
                (
                    action: fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsCountAction
                ) => action.searchText
            ),
            switchMap(searchText =>
                this.softwareAccountService
                    .fetchApplicationSoftwareAccountsCount(searchText)
                    .pipe(
                        map(
                            count =>
                                new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsCountSuccessAction(
                                    count
                                )
                        ),
                        catchError(() =>
                            of(
                                new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsCountFailureAction()
                            )
                        )
                    )
            )
        )

    // TODO 新增完的查询逻辑
    @Effect()
    createApplicationSoftwareAccount$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.CREATE_APPLICATION_SOFTWARE_ACCOUNT
        )
        .pipe(
            map(
                (
                    action: fromApplicationSoftwareAccount.CreateApplicationSoftwareAccountAction
                ) => action.account
            ),
            switchMap(account =>
                this.softwareAccountService
                    .createApplicationSoftwareAccount(account)
                    .pipe(
                        concatMap(() => [
                            new fromApplicationSoftwareAccount.CreateApplicationSoftwareAccountSuccessAction(),
                            new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsAction(),
                            new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsCountAction()
                        ]),
                        catchError(() =>
                            of(
                                new fromApplicationSoftwareAccount.CreateApplicationSoftwareAccountFailureAction()
                            )
                        )
                    )
            )
        )

    @Effect({ dispatch: false })
    createApplicationSoftwareAccountSuccess$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.CREATE_APPLICATION_SOFTWARE_ACCOUNT_SUCCESS
        )
        .pipe(
            tap(() => {
                this.notify.success(
                    `新增应用软件台帐`,
                    `恭喜您，新增应用软件台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    createApplicationSoftwareAccountFailure$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.CREATE_APPLICATION_SOFTWARE_ACCOUNT_FAILURE
        )
        .pipe(
            tap(() => {
                this.notify.error(
                    `新增应用软件台帐`,
                    `啊哦，新增应用软件台帐失败！`
                )
            })
        )

    // TODO 编辑完的查询逻辑
    @Effect()
    editApplicationSoftwareAccount$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.EDIT_APPLICATION_SOFTWARE_ACCOUNT
        )
        .pipe(
            map(
                (
                    action: fromApplicationSoftwareAccount.EditApplicationSoftwareAccountAction
                ) => action.account
            ),
            switchMap(account =>
                this.softwareAccountService
                    .editApplicationSoftwareAccount(account)
                    .pipe(
                        concatMap(() => [
                            new fromApplicationSoftwareAccount.EditApplicationSoftwareAccountSuccessAction(),
                            new fromApplicationSoftwareAccount.FetchApplicationSoftwareAccountsAction()
                        ]),
                        catchError(() =>
                            of(
                                new fromApplicationSoftwareAccount.EditApplicationSoftwareAccountFailureAction()
                            )
                        )
                    )
            )
        )

    @Effect({ dispatch: false })
    editApplicationSoftwareAccountSuccess$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.EDIT_APPLICATION_SOFTWARE_ACCOUNT_SUCCESS
        )
        .pipe(
            tap(() => {
                this.notify.success(
                    `编辑应用软件台帐`,
                    `恭喜您，编辑应用软件台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    editApplicationSoftwareAccountFailure$ = this.actions$
        .ofType(
            fromApplicationSoftwareAccount.EDIT_APPLICATION_SOFTWARE_ACCOUNT_FAILURE
        )
        .pipe(
            tap(() => {
                this.notify.error(
                    `编辑应用软件台帐`,
                    `啊哦，编辑应用软件台帐失败！`
                )
            })
        )

    constructor(
        private actions$: Actions,
        private softwareAccountService: SoftwareAccountService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
