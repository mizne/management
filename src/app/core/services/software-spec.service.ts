import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import { SoftwareSpec } from '@core/models/resource-info.model'

@Injectable()
export class SoftwareSpecService {
    constructor() {}

    fetchSoftwareSpecs(): Observable<SoftwareSpec[]> {
        return of(SoftwareSpec.generateFakeDataItems()).pipe(delay(4e2))
    }

    createSoftwareSpec(params: SoftwareSpec): Observable<any> {
        SoftwareSpec.createFakeData(params)
        return of(null)
    }

    deleteSoftwareSpec(id: string): Observable<any> {
        SoftwareSpec.deleteFakeData(id)
        return of(null)
    }
}
