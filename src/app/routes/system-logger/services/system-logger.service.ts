import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import { SystemLogger } from '@core/models/system-logger.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

@Injectable()
export class SystemLoggerService {
    constructor() {}
    fetchSystemLoggers(params: FetchItemsParams): Observable<SystemLogger[]> {
        if (params.condition.searchText) {
            console.log(
                `search system logger with ${params.condition.searchText}`
            )
        }
        return of(SystemLogger.generateFakeDataItems(params.options)).pipe(
            delay(4e2)
        )
    }

    fetchSystemLoggersCount(searchText: string): Observable<number> {
        if (searchText) {
            console.log(`search system logger count with ${searchText}`)
        }
        return of(42).pipe(delay(3e2))
    }
}
