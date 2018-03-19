import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import {
    ApplicationSoftwareAccount,
    SystemSoftwareAccount,
    MiddlewareSoftwareAccount
} from '@core/models/software-account.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

@Injectable()
export class SoftwareAccountService {
    constructor() { }
    fetchApplicationSoftwareAccounts(
        params: FetchItemsParams
    ): Observable<ApplicationSoftwareAccount[]> {
        if (params.condition.searchText) {
            console.log(
                `search application with ${params.condition.searchText}`
            )
        }
        return Observable.of(
            ApplicationSoftwareAccount.generateFakeDataItems(params.options)
        ).delay(4e2)
    }

    fetchApplicationSoftwareAccountsCount(
        searchText: string
    ): Observable<number> {
        if (searchText) {
            console.log(`search application count with ${searchText}`)
        }
        return Observable.of(42).delay(3e2)
    }

    createApplicationSoftwareAccount(
        account: ApplicationSoftwareAccount
    ): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    editApplicationSoftwareAccount(
        account: ApplicationSoftwareAccount
    ): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    fetchSystemSoftwareAccounts(
        params: FetchItemsParams
    ): Observable<SystemSoftwareAccount[]> {
        if (params.condition.searchText) {
            console.log(`search system with ${params.condition.searchText}`)
        }
        return Observable.of(
            SystemSoftwareAccount.generateFakeDataItems(params.options)
        ).delay(4e2)
    }

    fetchSystemSoftwareAccountsCount(searchText: string): Observable<number> {
        if (searchText) {
            console.log(`search system count with ${searchText}`)
        }
        return Observable.of(42).delay(3e2)
    }

    createSystemSoftwareAccount(
        account: SystemSoftwareAccount
    ): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    editSystemSoftwareAccount(account: SystemSoftwareAccount): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    fetchMiddlewareSoftwareAccounts(
        params: FetchItemsParams
    ): Observable<MiddlewareSoftwareAccount[]> {
        if (params.condition.searchText) {
            console.log(`search middleware with ${params.condition.searchText}`)
        }
        return Observable.of(
            MiddlewareSoftwareAccount.generateFakeDataItems(params.options)
        ).delay(4e2)
    }

    fetchMiddlewareSoftwareAccountsCount(
        searchText: string
    ): Observable<number> {
        if (searchText) {
            console.log(`search middleware count with ${searchText}`)
        }
        return Observable.of(42).delay(3e2)
    }

    createMiddlewareSoftwareAccount(
        account: MiddlewareSoftwareAccount
    ): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    editMiddlewareSoftwareAccount(
        account: MiddlewareSoftwareAccount
    ): Observable<any> {
        return Observable.of(null).delay(4e2)
    }
}
