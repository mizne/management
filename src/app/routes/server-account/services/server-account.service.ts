import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay, map } from 'rxjs/operators'
import {
    PhysicalServerAccount,
    VirtualServerAccount,
    ClusterServerAccount
} from '@core/models/server-account.model'
import {
    PaginationParams,
    FetchItemsParams,
    FetchItemsCountParams
} from '@core/models/pagination.model'

@Injectable()
export class ServerAccountService {
    constructor(private http: HttpClient) { }
    fetchPhysicalServerAccounts(
        params: FetchItemsParams
    ): Observable<PhysicalServerAccount[]> {
        // if (params.condition.searchText) {
        //     console.log(`search physical with ${params.condition.searchText}`)
        // }
        // return of(
        //     PhysicalServerAccount.generateFakeDataItems(params.options)
        // ).pipe(delay(4e2))
        return this.http.post('/gdxm-manage/ledger/Server', {
            'userID': '',
            'serverType': '物理机',
            'page': params.options.pageIndex,
            'limit': params.options.pageSize,
        })
            .pipe(
                map(res => (res as any).data.map(PhysicalServerAccount.convertFromResp)),
        )
    }

    fetchPhysicalServerAccountsCount(params: FetchItemsCountParams): Observable<number> {
        // return of(42).pipe(delay(3e2))
        return this.http.post('/gdxm-manage/ledger/Server/getRecordNum', {
            'userID': '',
            'serverType': '物理机'
        })
            .pipe(
                map((res) => (res as any).data.RecordNum)
            )
    }

    createPhysicalServerAccount(
        account: PhysicalServerAccount
    ): Observable<any> {
        return of(null).pipe(delay(4e2))

    }

    editPhysicalServerAccount(account: PhysicalServerAccount): Observable<PhysicalServerAccount> {
        return of(PhysicalServerAccount.generateFakeItem()).pipe(delay(4e2))
    }

    fetchVirtualServerAccounts(
        params: FetchItemsParams
    ): Observable<VirtualServerAccount[]> {
        // if (params.condition.searchText) {
        //     console.log(`search virtual with ${params.condition.searchText}`)
        // }
        // return of(
        //     VirtualServerAccount.generateFakeDataItems(params.options)
        // ).pipe(delay(4e2))
        return this.http.post('/gdxm-manage/ledger/Virtual_machine', {
            'userID': '',
            'serverType': '虚拟机',
            'page': params.options.pageIndex,
            'limit': params.options.pageSize,
        })
            .pipe(
                map(res => (res as any).date.map(VirtualServerAccount.convertFromResp)),
        )
    }

    fetchVirtualServerAccountsCount(params: FetchItemsCountParams): Observable<number> {
        // return of(42).pipe(delay(3e2))
        return this.http.post('/gdxm-manage/ledger/Virtual_machine/getRecordNum', {
            'userID': '',
            'serverType': '虚拟机'
        })
            .pipe(
                map((res) => (res as any).date.RecordNum)
            )
    }

    createVirtualServerAccount(account: VirtualServerAccount): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editVirtualServerAccount(account: VirtualServerAccount): Observable<VirtualServerAccount> {
        return of(VirtualServerAccount.generateFakeItem()).pipe(delay(4e2))
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
        // return this.http.post('/gdxm-manage/ledger/Server_Group', {
        //     'userID': '',
        //     'serverType': '服务器集群',
        //     'page': params.options.pageIndex,
        //     'limit': params.options.pageSize,
        // })
        //     .pipe(
        //         map(res => (res as any).date.map(ClusterServerAccount.convertFromResp)),
        // )
    }

    fetchClusterServerAccountsCount(params: FetchItemsCountParams): Observable<number> {
        return of(42).pipe(delay(3e2))
        // return this.http.post('/gdxm-manage/ledger/Server_Group/getRecordNum', {
        //     'userID': '',
        //     'serverType': '服务器集群'
        // })
        //     .pipe(
        //         map((res) => (res as any).date.RecordNum)
        //     )
    }

    createClusterServerAccount(account: ClusterServerAccount): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editClusterServerAccount(account: ClusterServerAccount): Observable<ClusterServerAccount> {
        return of(ClusterServerAccount.generateFakeItem()).pipe(delay(4e2))
    }
}
