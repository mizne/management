import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import * as R from 'ramda'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'
import { Exhibitor } from '@core/models/exhibitor.model'
import { ExhibitorService } from '@core/services/exhibitor.service'
import { ErrorLoggerService } from '@core/services/error-logger.service';

@Injectable()
export class ExhibitorListService {
    constructor(
        private exhibitorService: ExhibitorService,
        private errorLoggerService: ErrorLoggerService
    ) { }

    fetchExhibitors(params: FetchItemsParams): Observable<Exhibitor[]> {
        return this.exhibitorService.fetchExhibitors(params)
    }

    fetchExhibitorsCount(): Observable<number> {
        return this.exhibitorService.fetchExhibitorsCount()
    }

    singleDelete(id: string): Observable<any> {
        return this.exhibitorService.singleDelete(id)
    }

    batchDelete(ids: string[]): Observable<any> {
        return this.exhibitorService.batchDelete(ids)
    }

    fetchExhibitorDetail(id: string): Observable<Exhibitor> {
        return this.exhibitorService
            .fetchExhibitors({
                condition: { RecordId: id }
            })
            .mergeMap(e => {
                return e.length > 0 ? Observable.of(e[0]) : Observable.throw(new Error(`Not found exhibitor for id: ${id};`))
            })
            .catch(e => {
                return this.errorLoggerService.httpError({
                    module: 'ExhibitorListService',
                    method: 'fetchExhibitorDetail',
                    error: e
                })
            })
    }
}
