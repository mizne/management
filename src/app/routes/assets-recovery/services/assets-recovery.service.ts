import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
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
    constructor() {}
    fetchAssetsRecoveries(
        params: FetchItemsParams
    ): Observable<AssetsRecovery[]> {
        if (params.condition.searchText) {
            console.log(
                `search assets recovery with ${params.condition.searchText}`
            )
        }
        return Observable.of(
            AssetsRecovery.generateFakeDataItems(params.options)
        ).delay(4e2)
    }

    fetchAssetsRecoveriesCount(
        params: FetchAssetsRecoveriesCountParams
    ): Observable<number> {
        console.log(`search assets recovery count with `, params)
        return Observable.of(42).delay(3e2)
    }

    ensureRecovery(assetsRecovery: AssetsRecovery): Observable<any> {
        return Observable.of(null).delay(4e2)
    }
}
