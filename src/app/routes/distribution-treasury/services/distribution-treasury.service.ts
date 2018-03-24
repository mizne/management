import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import {
    ResourceInfo,
    ResourceUseInfo,
    FetchResourceInfoesCountParams,
    FetchResourceUseInfoesCountParams
} from '@core/models/distribution-treasury.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

@Injectable()
export class DistributionTreasuryService {
    constructor() { }
    fetchResourceInfoes(params: FetchItemsParams): Observable<ResourceInfo[]> {
        if (params.condition.searchText) {
            console.log(
                `search resource info with ${params.condition.searchText}`
            )
        }
        return of(
            ResourceInfo.generateFakeDataItems(params.options)
        ).pipe(delay(4e2))
    }

    fetchResourceInfoesCount(
        params: Partial<FetchResourceInfoesCountParams>
    ): Observable<number> {
        console.log(`search resource info count with `, params)
        return of(42).pipe(delay(3e2))
    }

    createResourceInfo(account: ResourceInfo): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editResourceInfo(resourceInfo: ResourceInfo): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    fetchResourceUseInfoes(
        params: FetchItemsParams
    ): Observable<ResourceUseInfo[]> {
        if (params.condition.searchText) {
            console.log(
                `search resource use info with ${params.condition.searchText}`
            )
        }
        return of(
            ResourceUseInfo.generateFakeDataItems(params.options)
        ).pipe(delay(4e2))
    }

    fetchResourceUseInfoesCount(
        params: Partial<FetchResourceUseInfoesCountParams>
    ): Observable<number> {
        console.log(`search resource use info count with `, params)
        return of(42).pipe(delay(3e2))
    }

    editResourceUseInfo(resourceUseInfo: ResourceUseInfo): Observable<any> {
        return of(null).pipe(delay(4e2))
    }
}
