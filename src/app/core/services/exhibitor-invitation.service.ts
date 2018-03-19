import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'

import { TenantService } from './tenant.service'
import { ErrorLoggerService } from './error-logger.service'
import {
    FetchItemsParams,
    defaultFetchItemsParams,
    FetchItemsCountParams,
    defaultFetchItemsCountParams,
    defaultPaginationParams
} from '../models/pagination.model'
import {
    ExhibitorInvitation,
    RejectExhibitorInvitationParams,
    BatchRejectExhibitorInvitationsParams,
    ExhibitorInvitationStatus,
    APPROVAL_TIME_FORMAT
} from '../models/exhibitor-invitation.model'

@Injectable()
export class ExhibitorInvitationService {
    private queryUrl = '/data/queryList/InvitationInfoExhi'
    private queryCountUrl = '/data/queryCount/InvitationInfoExhi'
    private updateUrl = '/data/update/InvitationInfoExhi'
    private batchUpdateUrl = '/data/updateList/InvitationInfoExhi'
    private deleteUrl = '/data/delete/InvitationInfoExhi'
    private batchDeleteUrl = '/data/deleteList/InvitationInfoExhi'

    constructor(
        private http: HttpClient,
        private tenantService: TenantService,
        private errorLogger: ErrorLoggerService
    ) {}

    fetchExhibitorInvitations(
        params: FetchItemsParams = defaultFetchItemsParams
    ): Observable<ExhibitorInvitation[]> {
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
            .map(res =>
                (res as any).result.map(ExhibitorInvitation.convertFromResp)
            )
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitorInvitationService',
                    method: 'fetchExhibitorInvitations',
                    error: e
                })
            })
    }

    fetchExhibitorInvitationsCount(
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
                    module: 'ExhibitorInvitationService',
                    method: 'fetchExhibitorInvitationsCount',
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
                    module: 'ExhibitorInvitationService',
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
                    module: 'ExhibitorInvitationService',
                    method: 'batchDelete',
                    error: e
                })
            })
    }

    singleAuditSucceed(id: string): Observable<any> {
        return this.http
            .post(this.updateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    recordId: id,
                    setValue: {
                        State: ExhibitorInvitationStatus.AUDIT_SUCCEED,
                        ApprovalTime: moment().format(APPROVAL_TIME_FORMAT)
                    }
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitorInvitationService',
                    method: 'singleAuditSucceed',
                    error: e
                })
            })
    }

    singleAuditFailed(
        params: RejectExhibitorInvitationParams
    ): Observable<any> {
        return this.http
            .post(this.updateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    recordId: params.id,
                    setValue: {
                        State: ExhibitorInvitationStatus.AUDIT_FAILED,
                        ApprovalTime: moment().format(APPROVAL_TIME_FORMAT),
                        Remark: params.reason
                    }
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitorInvitationService',
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
                        State: ExhibitorInvitationStatus.AUDIT_SUCCEED,
                        ApprovalTime: moment().format(APPROVAL_TIME_FORMAT)
                    }
                }))
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitorInvitationService',
                    method: 'batchAuditSucceed',
                    error: e
                })
            })
    }

    batchAuditFailed(
        params: BatchRejectExhibitorInvitationsParams
    ): Observable<any> {
        return this.http
            .post(this.batchUpdateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: params.ids.map(id => ({
                    recordId: id,
                    setValue: {
                        State: ExhibitorInvitationStatus.AUDIT_FAILED,
                        ApprovalTime: moment().format(APPROVAL_TIME_FORMAT),
                        Remark: params.reason
                    }
                }))
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitorInvitationService',
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
                    module: 'ExhibitorInvitationService',
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
                    module: 'ExhibitorInvitationService',
                    method: 'allAuditFailed',
                    error: e
                })
            })
    }
}
