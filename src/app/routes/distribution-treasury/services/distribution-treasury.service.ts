import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
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
        return Observable.of(
            ResourceInfo.generateFakeDataItems(params.options)
        ).delay(4e2)
    }

    fetchResourceInfoesCount(
        params: Partial<FetchResourceInfoesCountParams>
    ): Observable<number> {
        console.log(`search resource info count with `, params)
        return Observable.of(42).delay(3e2)
    }

    createResourceInfo(account: ResourceInfo): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    editResourceInfo(resourceInfo: ResourceInfo): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    fetchResourceUseInfoes(
        params: FetchItemsParams
    ): Observable<ResourceUseInfo[]> {
        if (params.condition.searchText) {
            console.log(
                `search resource use info with ${params.condition.searchText}`
            )
        }
        return Observable.of(
            ResourceUseInfo.generateFakeDataItems(params.options)
        ).delay(4e2)
    }

    fetchResourceUseInfoesCount(
        params: Partial<FetchResourceUseInfoesCountParams>
    ): Observable<number> {
        console.log(`search resource use info count with `, params)
        return Observable.of(42).delay(3e2)
    }

    editResourceUseInfo(resourceUseInfo: ResourceUseInfo): Observable<any> {
        return Observable.of(null).delay(4e2)
    }
}
