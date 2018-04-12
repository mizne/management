import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import { SoftwareType } from '@core/models/resource-info.model'

@Injectable()
export class SoftwareTypeService {
    constructor() {}

    fetchSoftwareTypes(): Observable<SoftwareType[]> {
        return of(SoftwareType.generateFakeDataItems()).pipe(delay(4e2))
    }

    createSoftwareType(params: SoftwareType): Observable<any> {
        SoftwareType.createFakeData(params)
        return of(null)
    }

    deleteSoftwareType(id: string): Observable<any> {
        SoftwareType.deleteFakeData(id)
        return of(null)
    }
}
