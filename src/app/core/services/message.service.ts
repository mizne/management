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
import {
    PlatformMessage,
    ExhibitorMessage,
    VisitorMessage,
    MessageType,
    MessageStatus
} from '../models/message.model'

@Injectable()
export class MessageService {
    private createUrl = '/data/insert/MsgInfo'
    private queryUrl = '/data/queryList/MsgInfo'
    private queryCountUrl = '/data/queryCount/MsgInfo'
    private deleteUrl = '/data/delete/MsgInfo'
    private deleteListUrl = '/data/deleteList/MsgInfo'
    private updateUrl = '/data/update/MsgInfo'

    constructor(
        private http: HttpClient,
        private tenantService: TenantService,
        private errorLogger: ErrorLoggerService
    ) {}

    fetchPlatforMessage(
        params: FetchItemsParams = defaultFetchItemsParams
    ): Observable<PlatformMessage[]> {
        return this.http
            .post(this.queryUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ...params.condition,
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        Type: {
                            $in: [
                                MessageType.SYS_TO_VISITOR,
                                MessageType.SYS_TO_EXHIBITOR,
                                MessageType.SYS_TO_ORGANIZATION
                            ]
                        }
                    },
                    options: params.options
                }
            })
            .map(res =>
                (res as any).result.map(PlatformMessage.convertFromResp)
            )
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'MessageService',
                    method: 'fetchPlatforMessage',
                    error: e
                })
            })
    }

    fetchPlatformMessageCount(): Observable<number> {
        return this.http
            .post(this.queryCountUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        Type: {
                            $in: [
                                MessageType.SYS_TO_VISITOR,
                                MessageType.SYS_TO_EXHIBITOR,
                                MessageType.SYS_TO_ORGANIZATION
                            ]
                        }
                    }
                }
            })
            .map(res => (res as any).result)
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'MessageService',
                    method: 'fetchPlatformMessageCount',
                    error: e
                })
            })
    }

    singleDeletePlatformMessage(id: string): Observable<any> {
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
                    module: 'MessageService',
                    method: 'singleDeletePlatformMessage',
                    error: e
                })
            })
    }

    batchDeletePlatformMessage(ids: string[]): Observable<any> {
        return this.http
            .post(this.deleteListUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: ids.map(e => ({ recordId: e }))
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'MessageService',
                    method: 'batchDeletePlatformMessage',
                    error: e
                })
            })
    }

    fetchExhibitorMessage(
        params: FetchItemsParams = defaultFetchItemsParams
    ): Observable<ExhibitorMessage[]> {
        return this.http
            .post(this.queryUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ...params.condition,
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        Type: MessageType.ORGANIZATION_TO_EXHIBITOR
                    },
                    properties: [
                        'ExhibitorReceiver.ExhibitorContact.Name',
                        'OrganizationSender.Organization.Name'
                    ],
                    options: params.options
                }
            })
            .map(res =>
                (res as any).result.map(ExhibitorMessage.convertFromResp)
            )
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'MessageService',
                    method: 'fetchExhibitorMessage',
                    error: e
                })
            })
    }

    fetchExhibitorMessageCount(): Observable<number> {
        return this.http
            .post(this.queryCountUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        Type: MessageType.ORGANIZATION_TO_EXHIBITOR
                    }
                }
            })
            .map(res => (res as any).result)
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'MessageService',
                    method: 'fetchExhibitorMessageCount',
                    error: e
                })
            })
    }

    createExhibitorMessage(params: ExhibitorMessage): Observable<any> {
        return this.http
            .post(this.createUrl, {
                params: {
                    record: {
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        Title: params.title,
                        Content: params.content,
                        ExhibitorReceiver: params.receiver,
                        OrganizationSender: this.tenantService.getOrganizationID(),
                        LinkInfo: 'www.baidu.com',
                        Type: MessageType.ORGANIZATION_TO_EXHIBITOR,
                        State: MessageStatus.UNREAD
                    }
                }
            })
            .map(res => (res as any).result)
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'MessageService',
                    method: 'createExhibitorMessage',
                    error: e
                })
            })
    }

    singleDeleteExhibitorMessage(id: string): Observable<any> {
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
                    module: 'MessageService',
                    method: 'singleDeleteExhibitorMessage',
                    error: e
                })
            })
    }

    batchDeleteExhibitorMessage(ids: string[]): Observable<any> {
        return this.http
            .post(this.deleteListUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: ids.map(e => ({ recordId: e }))
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'MessageService',
                    method: 'batchDeleteExhibitorMessage',
                    error: e
                })
            })
    }

    fetchVisitorMessage(
        params: FetchItemsParams = defaultFetchItemsParams
    ): Observable<VisitorMessage[]> {
        return this.http
            .post(this.queryUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ...params.condition,
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        Type: MessageType.ORGANIZATION_TO_VISITOR
                    },
                    properties: [
                        'VisitorReceiver.Visitor.Name',
                        'OrganizationSender.Organization.Name'
                    ],
                    options: params.options
                }
            })
            .map(res => (res as any).result.map(VisitorMessage.convertFromResp))
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'MessageService',
                    method: 'fetchVisitorMessage',
                    error: e
                })
            })
    }

    fetchVisitorMessageCount(): Observable<number> {
        return this.http
            .post(this.queryCountUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        Type: MessageType.ORGANIZATION_TO_VISITOR
                    }
                }
            })
            .map(res => (res as any).result)
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'MessageService',
                    method: 'fetchVisitorMessageCount',
                    error: e
                })
            })
    }

    createVisitorMessage(params: VisitorMessage): Observable<any> {
        return this.http
            .post(this.createUrl, {
                params: {
                    record: {
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        Title: params.title,
                        Content: params.content,
                        VisitorReceiver: params.receiver,
                        OrganizationSender: this.tenantService.getOrganizationID(),
                        LinkInfo: 'www.baidu.com',
                        Type: MessageType.ORGANIZATION_TO_VISITOR,
                        State: MessageStatus.UNREAD
                    }
                }
            })
            .map(res => (res as any).result)
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'MessageService',
                    method: 'createVisitorMessage',
                    error: e
                })
            })
    }

    singleDeleteVisitorMessage(id: string): Observable<any> {
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
                    module: 'MessageService',
                    method: 'singleDeleteVisitorMessage',
                    error: e
                })
            })
    }

    batchDeleteVisitorMessage(ids: string[]): Observable<any> {
        return this.http
            .post(this.deleteListUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: ids.map(e => ({ recordId: e }))
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'MessageService',
                    method: 'batchDeleteVisitorMessage',
                    error: e
                })
            })
    }
}
