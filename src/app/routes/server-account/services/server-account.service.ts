import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import {
    PhysicalServerAccount,
    VirtualServerAccount,
    ClusterServerAccount
} from '@core/models/server-account.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

@Injectable()
export class ServerAccountService {
    constructor() { }
    fetchPhysicalServerAccounts(
        params: FetchItemsParams
    ): Observable<PhysicalServerAccount[]> {
        if (params.condition.searchText) {
            console.log(`search physical with ${params.condition.searchText}`)
        }
        return of(
            PhysicalServerAccount.generateFakeDataItems(params.options)
        ).pipe(delay(4e2))
    }

    fetchPhysicalServerAccountsCount(searchText: string): Observable<number> {
        if (searchText) {
            console.log(`search physical count with ${searchText}`)
        }
        return of(42).pipe(delay(3e2))
    }

    createPhysicalServerAccount(
        account: PhysicalServerAccount
    ): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editPhysicalServerAccount(account: PhysicalServerAccount): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    fetchVirtualServerAccounts(
        params: FetchItemsParams
    ): Observable<VirtualServerAccount[]> {
        if (params.condition.searchText) {
            console.log(`search virtual with ${params.condition.searchText}`)
        }
        return of(
            VirtualServerAccount.generateFakeDataItems(params.options)
        ).pipe(delay(4e2))
    }

    fetchVirtualServerAccountsCount(searchText: string): Observable<number> {
        if (searchText) {
            console.log(`search virtual count with ${searchText}`)
        }
        return of(42).pipe(delay(3e2))
    }

    createVirtualServerAccount(account: VirtualServerAccount): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editVirtualServerAccount(account: VirtualServerAccount): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    fetchClusterServerAccounts(
        params: FetchItemsParams
    ): Observable<ClusterServerAccount[]> {
        if (params.condition.searchText) {
            console.log(`search cluster with ${params.condition.searchText}`)
        }
        return of(
            ClusterServerAccount.generateFakeDataItems(params.options)
        ).pipe(delay(4e2))
    }

    fetchClusterServerAccountsCount(searchText: string): Observable<number> {
        if (searchText) {
            console.log(`search cluster count with ${searchText}`)
        }
        return of(42).pipe(delay(3e2))
    }

    createClusterServerAccount(account: ClusterServerAccount): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editClusterServerAccount(account: ClusterServerAccount): Observable<any> {
        return of(null).pipe(delay(4e2))
    }
}
