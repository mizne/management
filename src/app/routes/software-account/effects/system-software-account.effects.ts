import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { fromSystemSoftwareAccount } from '../actions'
import { SoftwareAccountService } from '../services/software-account.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getSystemSoftwareAccountsPageParams } from '../reducers'
import { tap, switchMap, map, concatMap, catchError, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class SystemSoftwareAccountEffects {
    @Effect()
    fetchSystemSoftwareAccounts$ = this.actions$
        .ofType(fromSystemSoftwareAccount.FETCH_SYSTEM_SOFTWARE_ACCOUNTS)
        .pipe(
            map(
                (
                    action: fromSystemSoftwareAccount.FetchSystemSoftwareAccountsAction
                ) => action.payload
            ),
            switchMap(params => this.softwareAccountService.fetchSystemSoftwareAccounts(params).pipe(
                map(accounts => new fromSystemSoftwareAccount.FetchSystemSoftwareAccountsSuccessAction(
                    accounts
                )),
                catchError(() => of(new fromSystemSoftwareAccount.FetchSystemSoftwareAccountsFailureAction()))
            )),

    )

    @Effect()
    fetchSystemSoftwareAccountsCount$ = this.actions$
        .ofType(fromSystemSoftwareAccount.FETCH_SYSTEM_SOFTWARE_ACCOUNTS_COUNT)
        .pipe(
            map(
                (
                    action: fromSystemSoftwareAccount.FetchSystemSoftwareAccountsCountAction
                ) => action.searchText
            ),
            switchMap(searchText => this.softwareAccountService.fetchSystemSoftwareAccountsCount(searchText).pipe(
                map(count => new fromSystemSoftwareAccount.FetchSystemSoftwareAccountsCountSuccessAction(
                    count
                )),
                catchError(() => of(new fromSystemSoftwareAccount.FetchSystemSoftwareAccountsCountFailureAction()))
            )),

    )

    // TODO 新增完的查询逻辑
    @Effect()
    createSystemSoftwareAccount$ = this.actions$
        .ofType(fromSystemSoftwareAccount.CREATE_SYSTEM_SOFTWARE_ACCOUNT)
        .pipe(
            map(
                (
                    action: fromSystemSoftwareAccount.CreateSystemSoftwareAccountAction
                ) => action.account
            ),
            switchMap(account => this.softwareAccountService.createSystemSoftwareAccount(account).pipe(
                concatMap(() => [
                    new fromSystemSoftwareAccount.CreateSystemSoftwareAccountSuccessAction(),
                    new fromSystemSoftwareAccount.FetchSystemSoftwareAccountsAction(),
                    new fromSystemSoftwareAccount.FetchSystemSoftwareAccountsCountAction()
                ]),
                catchError(() => of(new fromSystemSoftwareAccount.CreateSystemSoftwareAccountFailureAction()))
            )),

    )

    @Effect({ dispatch: false })
    createSystemSoftwareAccountSuccess$ = this.actions$
        .ofType(
            fromSystemSoftwareAccount.CREATE_SYSTEM_SOFTWARE_ACCOUNT_SUCCESS
        )
        .pipe(tap(() => {
            this.notify.success(
                `新增系统软件台帐`,
                `恭喜您，新增系统软件台帐成功！`
            )
        }))

    @Effect({ dispatch: false })
    createSystemSoftwareAccountFailure$ = this.actions$
        .ofType(
            fromSystemSoftwareAccount.CREATE_SYSTEM_SOFTWARE_ACCOUNT_FAILURE
        )
        .pipe(tap(() => {
            this.notify.error(
                `新增系统软件台帐`,
                `啊哦，新增系统软件台帐失败！`
            )
        }))

    // TODO 新增完的查询逻辑
    @Effect()
    editSystemSoftwareAccount$ = this.actions$
        .ofType(fromSystemSoftwareAccount.EDIT_SYSTEM_SOFTWARE_ACCOUNT)
        .pipe(
            map(
                (
                    action: fromSystemSoftwareAccount.EditSystemSoftwareAccountAction
                ) => action.account
            ),
            switchMap(account => this.softwareAccountService.editSystemSoftwareAccount(account).pipe(
                concatMap(() => [
                    new fromSystemSoftwareAccount.EditSystemSoftwareAccountSuccessAction(),
                    new fromSystemSoftwareAccount.FetchSystemSoftwareAccountsAction()
                ]),
                catchError(() => of(new fromSystemSoftwareAccount.EditSystemSoftwareAccountFailureAction()))
            )),

    )

    @Effect({ dispatch: false })
    editSystemSoftwareAccountSuccess$ = this.actions$
        .ofType(fromSystemSoftwareAccount.EDIT_SYSTEM_SOFTWARE_ACCOUNT_SUCCESS)
        .pipe(tap(() => {
            this.notify.success(
                `编辑系统软件台帐`,
                `恭喜您，编辑系统软件台帐成功！`
            )
        }))

    @Effect({ dispatch: false })
    editSystemSoftwareAccountFailure$ = this.actions$
        .ofType(fromSystemSoftwareAccount.EDIT_SYSTEM_SOFTWARE_ACCOUNT_FAILURE)
        .pipe(tap(() => {
            this.notify.error(
                `编辑系统软件台帐`,
                `啊哦，编辑系统软件台帐失败！`
            )
        }))

    @Effect()
    deleteSystemSoftwareAccount$ = this.actions$
        .ofType(
            fromSystemSoftwareAccount.DELETE_SYSTEM_SOFTWARE_ACCOUNT
        )
        .pipe(
            map(
                (
                    action: fromSystemSoftwareAccount.DeleteSystemSoftwareAccountAction
                ) => action.id
            ),
            withLatestFrom(this.store.select(getSystemSoftwareAccountsPageParams)),
            switchMap(([id, params]) =>
                this.softwareAccountService
                    .deleteSystemSoftwareAccount(id)
                    .pipe(
                        concatMap(() => [
                            new fromSystemSoftwareAccount.DeleteSystemSoftwareAccountSuccessAction(),
                            new fromSystemSoftwareAccount.FetchSystemSoftwareAccountsAction({
                                condition: {},
                                options: params
                            }),
                            new fromSystemSoftwareAccount.FetchSystemSoftwareAccountsCountAction(),
                        ]),
                        catchError(() =>
                            of(
                                new fromSystemSoftwareAccount.DeleteSystemSoftwareAccountFailureAction()
                            )
                        )
                    )
            )
        )

    @Effect({ dispatch: false })
    deleteSystemSoftwareAccountSuccess$ = this.actions$
        .ofType(
            fromSystemSoftwareAccount.DELETE_SYSTEM_SOFTWARE_ACCOUNT_SUCCESS
        )
        .pipe(
            tap(() => {
                this.notify.success(
                    `删除应用软件台帐`,
                    `恭喜您，删除应用软件台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    deleteSystemSoftwareAccountFailure$ = this.actions$
        .ofType(
            fromSystemSoftwareAccount.DELETE_SYSTEM_SOFTWARE_ACCOUNT_FAILURE
        )
        .pipe(
            tap(() => {
                this.notify.error(
                    `删除应用软件台帐`,
                    `啊哦，删除应用软件台帐失败！`
                )
            })
        )
    constructor(
        private actions$: Actions,
        private softwareAccountService: SoftwareAccountService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) { }
}
