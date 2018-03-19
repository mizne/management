import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'

import { TenantService } from './tenant.service'
import { ErrorLoggerService } from './error-logger.service'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '../models/pagination.model'
import { Terminal, TerminalStatus } from '../models/terminal.model'

@Injectable()
export class TerminalService {
    private createUrl = '/data/insert/BoxManage'
    private queryUrl = '/data/queryList/BoxManage'
    private queryCountUrl = '/data/queryCount/BoxManage'
    private deleteUrl = '/data/delete/BoxManage'
    private updateUrl = '/data/update/BoxManage'
    private batchDeleteUrl = '/data/deleteList/BoxManage'

    constructor(
        private http: HttpClient,
        private tenantService: TenantService,
        private errorLogger: ErrorLoggerService
    ) { }

    createTerminal(params: Terminal): Observable<any> {
        return this.http
            .post(this.createUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    record: {
                        ...Terminal.convertFromModel(params),
                        ExhibitionId: this.tenantService.getExhibitionID()
                    }
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'TerminalService',
                    method: 'createTerminal',
                    error: e
                })
            })
    }

    fetchTerminals(
        params: FetchItemsParams = defaultFetchItemsParams
    ): Observable<Terminal[]> {
        return this.http
            .post(this.queryUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ...params.condition,
                        ExhibitionId: this.tenantService.getExhibitionID()
                    },
                    properties: [
                        'ExhibitorId.Exhibitor.CompanyName'
                        // 'ExhibitorId.Exhibitor.___all'
                    ],
                    options: params.options
                }
            })
            .map(res => (res as any).result.map(Terminal.convertFromResp))
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'TerminalService',
                    method: 'fetchTerminals',
                    error: e
                })
            })
    }

    fetchTerminalsCount(): Observable<number> {
        return this.http
            .post(this.queryCountUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ExhibitionId: this.tenantService.getExhibitionID()
                    }
                }
            })
            .map(res => (res as any).result)
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'TerminalService',
                    method: 'fetchTerminalsCount',
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
                    module: 'TerminalService',
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
                    module: 'TerminalService',
                    method: 'batchDelete',
                    error: e
                })
            })
    }

    assignTerminal(id: string, exhibitorId: string): Observable<any> {
        return this.http
            .post(this.updateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    recordId: id,
                    setValue: {
                        State: TerminalStatus.BIND,
                        ExhibitorId: exhibitorId
                    }
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'TerminalService',
                    method: 'assignTerminal',
                    error: e
                })
            })
    }
}
