import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import { UseEnvironment } from '@core/models/resource-info.model'

@Injectable()
export class UseEnvironmentService {
    constructor() {}

    fetchUseEnvironments(): Observable<UseEnvironment[]> {
        return of(UseEnvironment.generateFakeDataItems()).pipe(delay(4e2))
    }

    createUseEnvironment(params: UseEnvironment): Observable<any> {
        UseEnvironment.createFakeData(params)
        return of(null)
    }

    deleteUseEnvironment(id: string): Observable<any> {
        UseEnvironment.deleteFakeData(id)
        return of(null)
    }
}
