import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import { SoftwareName } from '@core/models/resource-info.model'

@Injectable()
export class SoftwareNameService {
    constructor() {}

    fetchSoftwareNames(): Observable<SoftwareName[]> {
        return of(SoftwareName.generateFakeDataItems()).pipe(delay(4e2))
    }

    createSoftwareName(params: SoftwareName): Observable<any> {
        SoftwareName.createFakeData(params)
        return of(null)
    }

    deleteSoftwareName(id: string): Observable<any> {
        SoftwareName.deleteFakeData(id)
        return of(null)
    }
}
