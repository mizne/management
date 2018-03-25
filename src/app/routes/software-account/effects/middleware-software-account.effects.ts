import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { fromMiddlewareSoftwareAccount } from '../actions'
import { SoftwareAccountService } from '../services/software-account.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getMiddlewareSoftwareAccountsPageParams } from '../reducers'
import { tap, switchMap, map, catchError, concatMap } from 'rxjs/operators';

@Injectable()
export class MiddlewareSoftwareAccountEffects {
    @Effect()
    fetchMiddlewareSoftwareAccounts$ = this.actions$
        .ofType(
            fromMiddlewareSoftwareAccount.FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS
        )
        .pipe(
            map(
                (
                    action: fromMiddlewareSoftwareAccount.FetchMiddlewareSoftwareAccountsAction
                ) => action.payload
            ),
            switchMap(params => this.softwareAccountService.fetchMiddlewareSoftwareAccounts(params)),
            map(accounts => new fromMiddlewareSoftwareAccount.FetchMiddlewareSoftwareAccountsSuccessAction(
                accounts
            )),
            catchError(() => of(new fromMiddlewareSoftwareAccount.FetchMiddlewareSoftwareAccountsFailureAction()))
        )

    @Effect()
    fetchMiddlewareSoftwareAccountsCount$ = this.actions$
        .ofType(
            fromMiddlewareSoftwareAccount.FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_COUNT
        )
        .pipe(
            map(
                (
                    action: fromMiddlewareSoftwareAccount.FetchMiddlewareSoftwareAccountsCountAction
                ) => action.searchText
            ),
            switchMap(searchText => this.softwareAccountService.fetchMiddlewareSoftwareAccountsCount(searchText)),
            map((count) => new fromMiddlewareSoftwareAccount.FetchMiddlewareSoftwareAccountsCountSuccessAction(
                count
            )),
            catchError(() => of(new fromMiddlewareSoftwareAccount.FetchMiddlewareSoftwareAccountsCountFailureAction()))
        )

    // TODO 新增完的查询逻辑
    @Effect()
    createMiddlewareSoftwareAccount$ = this.actions$
        .ofType(
            fromMiddlewareSoftwareAccount.CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT
        )
        .pipe(
            map(
                (
                    action: fromMiddlewareSoftwareAccount.CreateMiddlewareSoftwareAccountAction
                ) => action.account
            ),
            switchMap(account => this.softwareAccountService.createMiddlewareSoftwareAccount(account)),
            concatMap(() => [
                new fromMiddlewareSoftwareAccount.CreateMiddlewareSoftwareAccountSuccessAction(),
                new fromMiddlewareSoftwareAccount.FetchMiddlewareSoftwareAccountsAction(),
                new fromMiddlewareSoftwareAccount.FetchMiddlewareSoftwareAccountsCountAction()
            ]),
            catchError(() => of(new fromMiddlewareSoftwareAccount.CreateMiddlewareSoftwareAccountFailureAction()))
        )

    @Effect({ dispatch: false })
    createMiddlewareSoftwareAccountSuccess$ = this.actions$
        .ofType(
            fromMiddlewareSoftwareAccount.CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT_SUCCESS
        )
        .pipe(tap(() => {
            this.notify.success(
                `新增中间件台帐`,
                `恭喜您，新增中间件台帐成功！`
            )
        }))

    @Effect({ dispatch: false })
    createMiddlewareSoftwareAccountFailure$ = this.actions$
        .ofType(
            fromMiddlewareSoftwareAccount.CREATE_MIDDLEWARE_SOFTWARE_ACCOUNT_FAILURE
        )
        .pipe(tap(() => {
            this.notify.error(`新增中间件台帐`, `啊哦，新增中间件台帐失败！`)
        }))

    // TODO 新增完的查询逻辑
    @Effect()
    editMiddlewareSoftwareAccount$ = this.actions$
        .ofType(fromMiddlewareSoftwareAccount.EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT)
        .pipe(
            map(
                (
                    action: fromMiddlewareSoftwareAccount.EditMiddlewareSoftwareAccountAction
                ) => action.account
            ),
            switchMap(account => this.softwareAccountService.editMiddlewareSoftwareAccount(account)),
            concatMap(() => [
                new fromMiddlewareSoftwareAccount.EditMiddlewareSoftwareAccountSuccessAction(),
                new fromMiddlewareSoftwareAccount.FetchMiddlewareSoftwareAccountsAction()
            ]),
            catchError(() => of(new fromMiddlewareSoftwareAccount.EditMiddlewareSoftwareAccountFailureAction()))
        )

    @Effect({ dispatch: false })
    editMiddlewareSoftwareAccountSuccess$ = this.actions$
        .ofType(
            fromMiddlewareSoftwareAccount.EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT_SUCCESS
        )
        .pipe(tap(() => {
            this.notify.success(
                `编辑中间件台帐`,
                `恭喜您，编辑中间件台帐成功！`
            )
        }))

    @Effect({ dispatch: false })
    editMiddlewareSoftwareAccountFailure$ = this.actions$
        .ofType(
            fromMiddlewareSoftwareAccount.EDIT_MIDDLEWARE_SOFTWARE_ACCOUNT_FAILURE
        )
        .pipe(tap(() => {
            this.notify.error(`编辑中间件台帐`, `啊哦，编辑中间件台帐失败！`)
        }))

    constructor(
        private actions$: Actions,
        private softwareAccountService: SoftwareAccountService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) { }
}
