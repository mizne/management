import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import { DividePackageInfo } from '@core/models/dividepackage-info.model'

@Injectable()
export class DividePackageInfoService {
    constructor() { }

    fetchResourceInfos(params: any): Observable<DividePackageInfo[]> {
        console.log(`fetch added resource info, params: `, params)
        const pageIndex = params ? (params.pageIndex || 1) : 1
        const pageSize = params ? (params.pageSize || 10) : 10
        return of(
            DividePackageInfo.generateFakeDataItems({ pageIndex, pageSize })
        ).pipe(delay(4e2))
    }

    fetchResourceInfosCount(params: any): Observable<number> {
        console.log(`fetch added resource info count, params: `, params)
        return of(42).pipe(delay(4e2))
    }
}
