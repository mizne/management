import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Visitor } from '@core/models/visitor.model'
import {
    FetchItemsParams,
    FetchItemsCountParams
} from '@core/models/pagination.model'
import { VisitorService } from '@core/services/visitor.service'

@Injectable()
export class VisitorResultService {
    constructor(private visitorService: VisitorService) {}
    fetchVisitors(params: FetchItemsParams): Observable<Visitor[]> {
        return this.visitorService.fetchVisitors(params)
    }

    fetchVisitorsCount(params: FetchItemsCountParams): Observable<number> {
        return this.visitorService.fetchVisitorsCount(params)
    }
}
