import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import { ResourceInfo } from '@core/models/resource-info.model'

@Injectable()
export class ResourceInfoService {
    constructor() {}

    fetchResourceInfos(params: any): Observable<ResourceInfo[]> {
        console.log(`fetch added resource info, params: `, params)
        return of(ResourceInfo.generateFakeDataItems()).pipe(delay(4e2))
    }

    fetchResourceInfosCount(params: any): Observable<number> {
        console.log(`fetch added resource info count, params: `, params)
        return of(42).pipe(delay(4e2))
    }
}
