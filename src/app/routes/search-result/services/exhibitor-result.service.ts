import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import {
    PaginationParams,
    FetchItemsParams,
    FetchItemsCountParams
} from '@core/models/pagination.model'
import { Exhibitor } from '@core/models/exhibitor.model'
import { ExhibitorService } from '@core/services/exhibitor.service'

@Injectable()
export class ExhibitorResultService {
    constructor(private exhibitorService: ExhibitorService) {}

    fetchExhibitors(params: FetchItemsParams): Observable<Exhibitor[]> {
        return this.exhibitorService.fetchExhibitors(params)
    }

    fetchExhibitorsCount(params: FetchItemsCountParams): Observable<number> {
        return this.exhibitorService.fetchExhibitorsCount(params)
    }
}
