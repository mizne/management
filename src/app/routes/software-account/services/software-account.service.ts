import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay, tap, map } from 'rxjs/operators'
import {
    ApplicationSoftwareAccount,
    SystemSoftwareAccount,
    MiddlewareSoftwareAccount,
} from '@core/models/software-account.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

export interface RestResp {
    code: number
    date: any[]
    describe: string
}

@Injectable()
export class SoftwareAccountService {
    constructor(private http: HttpClient) { }
    fetchApplicationSoftwareAccounts(
        params: FetchItemsParams
    ): Observable<ApplicationSoftwareAccount[]> {
        // if (params.condition.searchText) {
        //     console.log(
        //         `search application with ${params.condition.searchText}`
        //     )
        // }

        // return of(ApplicationSoftwareAccount.generateFakeDataItems(params.options)).pipe(
        //     delay(4e2)
        // )
        return this.http.post('/gdxm-manage/ledger/PersonalSoftware', {
            'userID': '',
            'softwareType': '应用软件',
            'page': params.options.pageIndex,
            'limit': params.options.pageSize,
        })
            .pipe(
                map(res => (res as any).date.map(ApplicationSoftwareAccount.convertFromResp)),
        )
    }

    fetchApplicationSoftwareAccountsCount(
        searchText: string
    ): Observable<number> {
        // if (searchText) {
        //     console.log(`search application count with ${searchText}`)
        // }
        // return of(42).pipe(delay(3e2))
        return this.http.post('/gdxm-manage/ledger/PersonalSoftware/getRecordNum', {
            'userID': '',
            'softwareType': '应用软件'
        })
            .pipe(
                map((res) => (res as any).date.RecordNum)
            )
    }

    createApplicationSoftwareAccount(account: ApplicationSoftwareAccount): Observable<any> {
        // return of(null).pipe(delay(4e2))
        return this.http.post('/gdxm-manage/ledger/PersonalSoftware/insert', {
            'userID': '',
            'softwareType': '',
            'softwareInfo': {
                'name': account.name,
                'type': account.type,
                'version': account.version,
                'person': account.whoUse,
                'start_time': account.startTimeUse,
                'usetime': account.yearsUse,
                'license': account.license,
                'remarks': account.remark
            }
        })

    }

    editApplicationSoftwareAccount(account: ApplicationSoftwareAccount): Observable<any> {
        // return of(null).pipe(delay(4e2))
        return this.http.post('/gdxm-manage/ledger/PersonalSoftware/updateById', {
            'userID': '',
            'softwareType': '',
            'uniqueid': account.id,
            'softwareInfo': {
                'name': account.name,
                'type': account.type,
                'version': account.version,
                'person': account.whoUse,
                'start_time': account.startTimeUse,
                'usetime': account.yearsUse,
                'license': account.license,
                'remarks': account.remark
            }
        })
    }

    deleteApplicationSoftwareAccount(id: string): Observable<any> {
        return this.http.post('/gdxm-manage/ledger/PersonalSoftware/deleteById', {
            'userID': '',
            'softwareType': '',
            'uniqueid': id,
        })
    }

    fetchSystemSoftwareAccounts(
        params: FetchItemsParams
    ): Observable<SystemSoftwareAccount[]> {
        // if (params.condition.searchText) {
        //     console.log(`search system with ${params.condition.searchText}`)
        // }
        // return of(
        //     SystemSoftwareAccount.generateFakeDataItems(params.options)
        // ).pipe(delay(4e2))
        return this.http.post('/gdxm-manage/ledger/Select/OperatingSystemSoftware', {
            'userID': '',
            'softwareType': '系统软件',
            'page': params.options.pageIndex,
            'limit': params.options.pageSize,
        })
            .pipe(
                map(res => (res as RestResp).date.map(SystemSoftwareAccount.convertFromResp)),
        )
    }

    fetchSystemSoftwareAccountsCount(searchText: string): Observable<any> {
        return this.http.post('/gdxm-manage/ledger/OperatingSystem/getRecordNum', {
            'userID': '',
            'softwareType': '系统软件'
        })
            .pipe(
                map((res) => (res as any).data.RecordNum)
            )
    }

    createSystemSoftwareAccount(
        account: SystemSoftwareAccount
    ): Observable<any> {
        // return of(null).pipe(delay(4e2))
        return this.http.post('/gdxm-manage/ledger/OperatingSystemSoftware/insert', {
            'userID': '',
            'softwareType': '',
            'OperatingSystemInfo': {
                'name': account.name,
                'type': account.type,
                'version': account.version,
                'person': account.whoUse,
                'start_time': account.startTimeUse,
                'usetime': account.yearsUse,
                'license': account.license,
                'remarks': account.remark
            }
        })
    }

    editSystemSoftwareAccount(account: SystemSoftwareAccount): Observable<any> {
        // return of(null).pipe(delay(4e2))
        return this.http.post('/gdxm-manage/ledger/OperatingSystemSoftware/updateById', {
            'userID': '',
            'softwareType': '',
            'uniqueid': account.id,
            'softwareInfo': {
                'name': account.name,
                'type': account.type,
                'version': account.version,
                'person': account.whoUse,
                'start_time': account.startTimeUse,
                'usetime': account.yearsUse,
                'license': account.license,
                'remarks': account.remark
            }
        })
    }

    deleteSystemSoftwareAccount(id: string): Observable<any> {
        return this.http.post('/gdxm-manage/ledger/OperatingSystemSoftware/deleteById', {
            'userID': '',
            'softwareType': '',
            'uniqueid': id,
        })
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
