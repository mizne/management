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
    defaultFetchItemsCountParams,
    defaultPaginationParams
} from '../models/pagination.model'
import {
    VisitorInvitation,
    RejectVisitorInvitationParams,
    BatchRejectVisitorInvitationsParams,
    APPROVAL_TIME_FORMAT,
    VisitorInvitationStatus
} from '../models/visitor-invitation.model'

@Injectable()
export class VisitorInvitationService {
    private singleQueryUrl = '/data/query/InvitationInfo'
    private queryUrl = '/data/queryList/InvitationInfo'
    private queryCountUrl = '/data/queryCount/InvitationInfo'
    private updateUrl = '/data/update/InvitationInfo'
    private batchUpdateUrl = '/data/updateList/InvitationInfo'
    private deleteUrl = '/data/delete/InvitationInfo'
    private batchDeleteUrl = '/data/deleteList/InvitationInfo'

    constructor(
        private http: HttpClient,
        private tenantService: TenantService,
        private errorLogger: ErrorLoggerService
    ) { }

    fetchVisitorInvitations(
        params: FetchItemsParams = defaultFetchItemsParams
    ): Observable<VisitorInvitation[]> {
        return this.http
            .post(this.queryUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ...params.condition,
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        OrganizationId: true
                    },
                    options: params.options || defaultPaginationParams
                }
            })
            .map(res => VisitorInvitation.removeIllegal((res as any).result))
            .map(result => result.map(VisitorInvitation.convertFromResp))
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'VisitorInvitationService',
                    method: 'fetchVisitorInvitations',
                    error: e
                })
            })
    }

    fetchVisitorInvitationsCount(
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
                    module: 'VisitorInvitationService',
                    method: 'fetchVisitorInvitationsCount',
                    error: e
                })
            })
    }

    singleAgree(id: string): Observable<any> {
        return this.http
            .post(this.updateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    recordId: id,
                    setValue: {
                        State: VisitorInvitationStatus.AUDIT_SUCCEED,
                        ApprovalTime: moment().format(APPROVAL_TIME_FORMAT)
                    }
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'VisitorInvitationService',
                    method: 'singleAgree',
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
                    module: 'VisitorInvitationService',
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
                    module: 'VisitorInvitationService',
                    method: 'batchDelete',
                    error: e
                })
            })
    }

    singleAuditFailed(params: RejectVisitorInvitationParams): Observable<any> {
        return this.http
            .post(this.updateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    recordId: params.id,
                    setValue: {
                        State: VisitorInvitationStatus.AUDIT_FAILED,
                        ApprovalTime: moment().format(APPROVAL_TIME_FORMAT),
                        Remark: params.reason
                    }
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'VisitorInvitationService',
                    method: 'singleAuditFailed',
                    error: e
                })
            })
    }

    batchAuditSucceed(ids: string[]): Observable<any> {
        return this.http
            .post(this.batchUpdateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: ids.map(id => ({
                    recordId: id,
                    setValue: {
                        State: VisitorInvitationStatus.AUDIT_SUCCEED,
                        ApprovalTime: moment().format(APPROVAL_TIME_FORMAT)
                    }
                }))
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'VisitorInvitationService',
                    method: 'batchAuditSucceed',
                    error: e
                })
            })
    }

    batchAuditFailed(
        params: BatchRejectVisitorInvitationsParams
    ): Observable<any> {
        return this.http
            .post(this.batchUpdateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: params.ids.map(id => ({
                    recordId: id,
                    setValue: {
                        State: VisitorInvitationStatus.AUDIT_FAILED,
                        ApprovalTime: moment().format(APPROVAL_TIME_FORMAT),
                        Remark: params.reason
                    }
                }))
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'VisitorInvitationService',
                    method: 'batchAuditFailed',
                    error: e
                })
            })
    }

    // TODO
    allAuditSucceed(): Observable<any> {
        return this.http
            .post(this.batchUpdateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: []
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'VisitorInvitationService',
                    method: 'allAuditSucceed',
                    error: e
                })
            })
    }

    // TODO
    allAuditFailed(): Observable<any> {
        return this.http
            .post(this.batchUpdateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: []
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'VisitorInvitationService',
                    method: 'allAuditFailed',
                    error: e
                })
            })
    }
}
