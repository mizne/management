import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import {
    SystemLogger,
    SystemSoftwareAccount,
    MiddlewareSoftwareAccount
} from '@core/models/software-account.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

@Injectable()
export class SoftwareAccountService {
    constructor() {}
    fetchApplicationSoftwareAccounts(
        params: FetchItemsParams
    ): Observable<SystemLogger[]> {
        if (params.condition.searchText) {
            console.log(
                `search application with ${params.condition.searchText}`
            )
        }
        return of(SystemLogger.generateFakeDataItems(params.options)).pipe(
            delay(4e2)
        )
    }

    fetchApplicationSoftwareAccountsCount(
        searchText: string
    ): Observable<number> {
        if (searchText) {
            console.log(`search application count with ${searchText}`)
        }
        return of(42).pipe(delay(3e2))
    }

    createApplicationSoftwareAccount(account: SystemLogger): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editApplicationSoftwareAccount(account: SystemLogger): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    fetchSystemSoftwareAccounts(
        params: FetchItemsParams
    ): Observable<SystemSoftwareAccount[]> {
        if (params.condition.searchText) {
            console.log(`search system with ${params.condition.searchText}`)
        }
        return of(
            SystemSoftwareAccount.generateFakeDataItems(params.options)
        ).pipe(delay(4e2))
    }

    fetchSystemSoftwareAccountsCount(searchText: string): Observable<number> {
        if (searchText) {
            console.log(`search system count with ${searchText}`)
        }
        return of(42).pipe(delay(3e2))
    }

    createSystemSoftwareAccount(
        account: SystemSoftwareAccount
    ): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editSystemSoftwareAccount(account: SystemSoftwareAccount): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    fetchMiddlewareSoftwareAccounts(
        params: FetchItemsParams
    ): Observable<MiddlewareSoftwareAccount[]> {
        if (params.condition.searchText) {
            console.log(`search middleware with ${params.condition.searchText}`)
        }
        return of(
            MiddlewareSoftwareAccount.generateFakeDataItems(params.options)
        ).pipe(delay(4e2))
    }

    fetchMiddlewareSoftwareAccountsCount(
        searchText: string
    ): Observable<number> {
        if (searchText) {
            console.log(`search middleware count with ${searchText}`)
        }
        return of(42).pipe(delay(3e2))
    }

    createMiddlewareSoftwareAccount(
        account: MiddlewareSoftwareAccount
    ): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editMiddlewareSoftwareAccount(
        account: MiddlewareSoftwareAccount
    ): Observable<any> {
        return of(null).pipe(delay(4e2))
    }
}
