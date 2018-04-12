import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import { ResourceType } from '@core/models/resource-info.model'

@Injectable()
export class ResourceTypeService {
    constructor() {}

    fetchResourceTypes(): Observable<ResourceType[]> {
        return of(ResourceType.generateFakeDataItems()).pipe(delay(4e2))
    }

    createResourceType(params: ResourceType): Observable<any> {
        ResourceType.createFakeData(params)
        return of(null)
    }

    deleteResourceType(id: string): Observable<any> {
        ResourceType.deleteFakeData(id)
        return of(null)
    }
}
