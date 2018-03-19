import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
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
    constructor() {}
    fetchPhysicalServerAccounts(
        params: FetchItemsParams
    ): Observable<PhysicalServerAccount[]> {
        return Observable.of(
            PhysicalServerAccount.generateFakeDataItems()
        ).delay(4e2)
    }

    fetchPhysicalServerAccountsCount(): Observable<number> {
        return Observable.of(42).delay(3e2)
    }

    fetchVirtualServerAccounts(
        params: FetchItemsParams
    ): Observable<VirtualServerAccount[]> {
        return Observable.of(
            VirtualServerAccount.generateFakeDataItems()
        ).delay(4e2)
    }

    fetchVirtualServerAccountsCount(): Observable<number> {
        return Observable.of(42).delay(3e2)
    }

    fetchClusterServerAccounts(
        params: FetchItemsParams
    ): Observable<ClusterServerAccount[]> {
        return Observable.of(
            ClusterServerAccount.generateFakeDataItems()
        ).delay(4e2)
    }

    fetchClusterServerAccountsCount(): Observable<number> {
        return Observable.of(42).delay(3e2)
    }
}
