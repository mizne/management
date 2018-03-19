import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Terminal, TerminalStatus } from '@core/models/terminal.model'
import {
    defaultPaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'
import { TerminalService } from '@core/services/terminal.service'
import { ExhibitorService } from '@core/services/exhibitor.service'
import { Exhibitor } from '@core/models/exhibitor.model'

@Injectable()
export class TerminalListService {
    constructor(
        private terminalService: TerminalService,
        private exhibitorService: ExhibitorService
    ) { }
    fetchTerminals(params: FetchItemsParams): Observable<Terminal[]> {
        return this.terminalService.fetchTerminals(params)
    }

    fetchTerminalsCount(): Observable<number> {
        return this.terminalService.fetchTerminalsCount()
    }

    createTerminal(params: Terminal): Observable<any> {
        return this.terminalService.createTerminal(params)
    }

    singleDelete(id: string): Observable<any> {
        return this.terminalService.singleDelete(id)
    }

    batchDelete(ids: string[]): Observable<any> {
        return this.terminalService.batchDelete(ids)
    }

    assignTerminal(id: string, exhibitorId: string): Observable<any> {
        return this.terminalService.assignTerminal(id, exhibitorId)
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
