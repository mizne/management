import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { PlatformMessage } from '@core/models/message.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'
import { MessageService } from '@core/services/message.service'

@Injectable()
export class PlatformMessageService {
    constructor(private messageService: MessageService) {}
    fetchPlatformMessages(
        params: FetchItemsParams
    ): Observable<PlatformMessage[]> {
        return this.messageService.fetchPlatforMessage(params)
    }

    fetchPlatformMessagesCount(): Observable<number> {
        return this.messageService.fetchPlatformMessageCount()
    }

    singleDelete(id: string): Observable<any> {
        return this.messageService.singleDeletePlatformMessage(id)
    }

    batchDelete(ids: string[]): Observable<any> {
        return this.messageService.batchDeletePlatformMessage(ids)
    }
}
