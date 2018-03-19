import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'

import { TenantService } from './tenant.service'
import { ErrorLoggerService } from './error-logger.service'
import { Visitor, VisitorSex } from '../models/visitor.model'
import {
    FetchItemsParams,
    defaultFetchItemsParams,
    defaultPaginationParams,
    FetchItemsCountParams,
    defaultFetchItemsCountParams
} from '../models/pagination.model'

@Injectable()
export class VisitorService {
    private createUrl = '/data/insert/Visitor'
    private queryUrl = '/data/queryList/Visitor'
    private queryCountUrl = '/data/queryCount/Visitor'
    private deleteUrl = '/data/delete/Visitor'
    private batchDeleteUrl = '/data/deleteList/Visitor'
    private updateUrl = '/data/update/Visitor'

    constructor(
        private http: HttpClient,
        private tenantService: TenantService,
        private errorLogger: ErrorLoggerService
    ) {}
    fetchVisitors(
        params: FetchItemsParams = defaultFetchItemsParams
    ): Observable<Visitor[]> {
        return this.http
            .post(this.queryUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ...params.condition,
                        ExhibitionId: this.tenantService.getExhibitionID()
                    },
                    options: params.options || defaultPaginationParams
                }
            })
            .map(res => (res as any).result.map(Visitor.convertFromResp))
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'VisitorService',
                    method: 'fetchVisitors',
                    error: e
                })
            })
    }

    fetchVisitorsById(ids: string[]): Observable<Visitor[]> {
        return this.http
            .post(this.queryUrl, {
                params: {
                    recordIdList: ids
                }
            })
            .map(res => (res as any).result.map(Visitor.convertFromResp))
    }

    fetchVisitorsCount(
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
                    module: 'VisitorService',
                    method: 'fetchVisitorsCount',
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
                    module: 'VisitorService',
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
                    module: 'VisitorService',
                    method: 'batchDelete',
                    error: e
                })
            })
    }
}
