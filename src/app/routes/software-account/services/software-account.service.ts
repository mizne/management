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
    constructor() {}
    fetchApplicationSoftwareAccounts(
        params: FetchItemsParams
    ): Observable<ApplicationSoftwareAccount[]> {
        return Observable.of(
            ApplicationSoftwareAccount.generateFakeDataItems(params.options)
        ).delay(4e2)
    }

    fetchApplicationSoftwareAccountsCount(): Observable<number> {
        return Observable.of(42).delay(3e2)
    }

    createApplicationSoftwareAccount(
        account: ApplicationSoftwareAccount
    ): Observable<any> {
        return Observable.of().delay(4e2)
    }

    editApplicationSoftwareAccount(
        account: ApplicationSoftwareAccount
    ): Observable<any> {
        return Observable.of().delay(4e2)
    }

    fetchSystemSoftwareAccounts(
        params: FetchItemsParams
    ): Observable<SystemSoftwareAccount[]> {
        return Observable.of(
            SystemSoftwareAccount.generateFakeDataItems(params.options)
        ).delay(4e2)
    }

    fetchSystemSoftwareAccountsCount(): Observable<number> {
        return Observable.of(42).delay(3e2)
    }

    createSystemSoftwareAccount(
        account: SystemSoftwareAccount
    ): Observable<any> {
        return Observable.of().delay(4e2)
    }

    editSystemSoftwareAccount(account: SystemSoftwareAccount): Observable<any> {
        return Observable.of().delay(4e2)
    }

    fetchMiddlewareSoftwareAccounts(
        params: FetchItemsParams
    ): Observable<MiddlewareSoftwareAccount[]> {
        return Observable.of(
            MiddlewareSoftwareAccount.generateFakeDataItems(params.options)
        ).delay(4e2)
    }

    fetchMiddlewareSoftwareAccountsCount(): Observable<number> {
        return Observable.of(42).delay(3e2)
    }

    createMiddlewareSoftwareAccount(
        account: MiddlewareSoftwareAccount
    ): Observable<any> {
        return Observable.of().delay(4e2)
    }

    editMiddlewareSoftwareAccount(
        account: MiddlewareSoftwareAccount
    ): Observable<any> {
        return Observable.of().delay(4e2)
    }
}
