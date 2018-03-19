import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { ExhibitorMessage } from '@core/models/message.model'
import {
    FetchItemsParams,
    defaultPaginationParams
} from '@core/models/pagination.model'
import { Exhibitor } from '@core/models/exhibitor.model'
import { MessageService } from '@core/services/message.service'
import { ExhibitorService } from '@core/services/exhibitor.service'

@Injectable()
export class ExhibitorMessageService {
    constructor(
        private messageService: MessageService,
        private exhibitorService: ExhibitorService
    ) { }
    fetchExhibitorMessages(
        params: FetchItemsParams
    ): Observable<ExhibitorMessage[]> {
        return this.messageService.fetchExhibitorMessage(params)
    }

    fetchExhibitorMessagesCount(): Observable<number> {
        return this.messageService.fetchExhibitorMessageCount()
    }

    singleDelete(id: string): Observable<any> {
        return this.messageService.singleDeleteExhibitorMessage(id)
    }

    batchDelete(ids: string[]): Observable<any> {
        return this.messageService.batchDeleteExhibitorMessage(ids)
    }

    create(params: ExhibitorMessage): Observable<any> {
        return this.messageService.createExhibitorMessage(params)
    }

    searchExhibitors(query: string): Observable<Exhibitor[]> {
        return this.exhibitorService.fetchExhibitors({
            condition: query ? {
                CompanyName: `/${query}/`
            } : {},
            options: defaultPaginationParams
        })
    }

    initFetchExhibitors(): Observable<Exhibitor[]> {
        return this.exhibitorService.fetchExhibitors()
    }
}
