import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'

import { TenantService } from './tenant.service'
import { ErrorLoggerService } from './error-logger.service'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams,
    FetchItemsCountParams,
    defaultFetchItemsCountParams
} from '../models/pagination.model'
import { Exhibitor } from '../models/exhibitor.model'

@Injectable()
export class ExhibitorService {
    private createUrl = '/data/insert/Exhibitor'
    private queryUrl = '/data/queryList/Exhibitor'
    private queryCountUrl = '/data/queryCount/Exhibitor'
    private deleteUrl = '/data/delete/Exhibitor'
    private batchDeleteUrl = '/data/deleteList/Exhibitor'
    private updateUrl = '/data/update/Exhibitor'

    constructor(
        private http: HttpClient,
        private tenantService: TenantService,
        private errorLogger: ErrorLoggerService
    ) { }

    fetchExhibitors(
        params: FetchItemsParams = defaultFetchItemsParams
    ): Observable<Exhibitor[]> {
        return this.http
            .post(this.queryUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: Object.assign(params.condition, {
                        ExhibitionId: this.tenantService.getExhibitionID()
                    }),
                    options: params.options
                }
            })
            .map(res => (res as any).result.map(Exhibitor.convertFromResp))
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitorService',
                    method: 'fetchExhibitors',
                    error: e
                })
            })
    }

    fetchExhibitorsById(ids: string[]): Observable<Exhibitor[]> {
        return this.http
            .post(this.queryUrl, {
                params: {
                    recordIdList: ids
                }
            })
            .map(res => (res as any).result.map(Exhibitor.convertFromResp))
    }

    fetchExhibitorsCount(
        params: FetchItemsCountParams = defaultFetchItemsCountParams
    ): Observable<number> {
        return this.http
            .post(this.queryCountUrl, {
                params: {
                    condition: {
                        ...params.condition,
                        ExhibitionId: this.tenantService.getExhibitionID()
                    }
                }
            })
            .map(res => (res as any).result)
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitorService',
                    method: 'fetchExhibitorsCount',
                    error: e
                })
            })
    }

    singleDelete(id: string): Observable<any> {
        return this.http
            .post(this.deleteUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    recordId: id
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitorService',
                    method: 'singleDelete',
                    error: e
                })
            })
    }

    batchDelete(ids: string[]): Observable<any> {
        return this.http
            .post(this.batchDeleteUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: ids.map(e => ({
                    recordId: e
                }))
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitorService',
                    method: 'batchDelete',
                    error: e
                })
            })
    }
}
