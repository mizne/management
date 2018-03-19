import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Visitor, VisitorSex } from '@core/models/visitor.model'
import { FetchItemsParams } from '@core/models/pagination.model'
import { VisitorService } from '@core/services/visitor.service'
import { ErrorLoggerService } from '@core/services/error-logger.service'

@Injectable()
export class VisitorListService {
    constructor(
        private visitorService: VisitorService,
        private errorLoggerService: ErrorLoggerService,
    ) { }
    fetchVisitors(params: FetchItemsParams): Observable<Visitor[]> {
        return this.visitorService.fetchVisitors(params)
    }

    fetchVisitorsCount(): Observable<number> {
        return this.visitorService.fetchVisitorsCount()
    }

    singleDelete(id: string): Observable<any> {
        return this.visitorService.singleDelete(id)
    }

    batchDelete(ids: string[]): Observable<any> {
        return this.visitorService.batchDelete(ids)
    }

    fetchVisitorDetail(id: string): Observable<Visitor> {
        return this.visitorService
            .fetchVisitors({
                condition: {
                    RecordId: id
                }
            })
            .mergeMap(e => {
                return e.length > 0 ? Observable.of(e[0]) : Observable.throw(new Error(`Not found visitor for id: ${id};`))
            })
            .catch(e => {
                return this.errorLoggerService.httpError({
                    module: 'VisitorListService',
                    method: 'fetchVisitorDetail',
                    error: e
                })
            })
    }
}
