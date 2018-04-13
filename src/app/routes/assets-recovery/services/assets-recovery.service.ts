import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { delay } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'
import {
    AssetsRecovery,
    FetchAssetsRecoveriesCountParams
} from '@core/models/assets-recovery.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

@Injectable()
export class AssetsRecoveryService {
    constructor() { }
    fetchAssetsRecoveries(
        params: any
    ): Observable<AssetsRecovery[]> {
        console.log(
            `search assets recovery with `, params
        )
        const pageIndex = params ? (params.pageIndex || 1) : 1
        const pageSize = params ? (params.pageSize || 10) : 10
        return of(
            AssetsRecovery.generateFakeDataItems({ pageIndex, pageSize })
        ).pipe(delay(4e2))
    }

    fetchAssetsRecoveriesCount(
        params: any
    ): Observable<number> {
        console.log(`search assets recovery count with `, params)
        return of(42).pipe(delay(4e2))
    }

    ensureRecovery(assetsRecovery: AssetsRecovery): Observable<any> {
        return of(null).pipe(delay(4e2))
    }
}
