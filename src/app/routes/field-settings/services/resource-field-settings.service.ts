import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import { FieldSettings } from '@core/models/field-settings.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

@Injectable()
export class ResourceFieldSettingsService {
    constructor() {}
    fetchFieldSettings(params: FetchItemsParams): Observable<FieldSettings[]> {
        if (params.condition.searchText) {
            console.log(
                `search field settings with ${params.condition.searchText}`
            )
        }
        return of(FieldSettings.generateFakeDataItems(params.options)).pipe(
            delay(4e2)
        )
    }

    fetchFieldSettingsCount(searchText: string): Observable<number> {
        if (searchText) {
            console.log(`search field settings count with ${searchText}`)
        }
        return of(42).pipe(delay(3e2))
    }
}
