import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { VisitorMessage } from '@core/models/message.model'
import {
    FetchItemsParams,
    defaultFetchItemsParams,
    defaultPaginationParams,
    PaginationParams
} from '@core/models/pagination.model'
import { MessageService } from '@core/services/message.service'
import { VisitorService } from '@core/services/visitor.service'
import { Visitor } from '@core/models/visitor.model'

@Injectable()
export class VisitorMessageService {
    constructor(
        private messageService: MessageService,
        private visitorService: VisitorService
    ) {}
    fetchVisitorMessages(
        params: FetchItemsParams
    ): Observable<VisitorMessage[]> {
        return this.messageService.fetchVisitorMessage(params)
    }

    fetchVisitorMessagesCount(): Observable<number> {
        return this.messageService.fetchVisitorMessageCount()
    }

    singleDelete(id: string): Observable<any> {
        return this.messageService.singleDeleteVisitorMessage(id)
    }

    batchDelete(ids: string[]): Observable<any> {
        return this.messageService.batchDeleteVisitorMessage(ids)
    }

    create(params: VisitorMessage): Observable<any> {
        return this.messageService.createVisitorMessage(params)
    }

    searchVisitors(query: string): Observable<Visitor[]> {
        return this.visitorService.fetchVisitors({
            condition: query
                ? {
                      Name: `/${query}/`
                  }
                : {},
            options: defaultPaginationParams
        })
    }

    searchMoreVisitors(
        query: string,
        params: PaginationParams
    ): Observable<Visitor[]> {
        return this.visitorService.fetchVisitors({
            condition: query
                ? {
                      Name: `/${query}/`
                  }
                : {},
            options: params
        })
    }

    initFetchVisitors(): Observable<Visitor[]> {
        return this.visitorService.fetchVisitors()
    }
}
