import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { ApprovalSettings, AutoApproveStatus, SETTINGS_NAME } from '../models/approval-settings.model'
import { TenantService } from '@core/services/tenant.service'
import { ErrorLoggerService } from '@core/services/error-logger.service'

// let temp = false

@Injectable()
export class ApprovalSettingsService {
    private queryUrl = '/data/queryList/AutoApprovalInvition'
    private createUrl = '/data/insert/AutoApprovalInvition'
    private updateUrl = '/data/update/AutoApprovalInvition'

    constructor(
        private http: HttpClient,
        private tenantService: TenantService,
        private errorLogger: ErrorLoggerService
    ) { }
    fetchApprovalSettings(): Observable<ApprovalSettings> {
        return this.http
            .post(this.queryUrl, {
                params: {
                    condition: {
                        ExhibitionId: this.tenantService.getExhibitionID()
                    }
                }
            })
            .map(res => (res as any).result)
            .do(e => {
                // console.log('after fetch approval settings')
                // console.log(e)
            })
            .mergeMap((results: any[]) => {
                if (results.length > 0) {
                    return Observable.of(
                        ApprovalSettings.convertFromResp(results[0])
                    )
                }
                return this.insertApprovalSettings()
                    .map(ApprovalSettings.convertFromResp)
                    .do(e => {
                        // console.log('after insert approval settings')
                        // console.log(e)
                    })
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ApprovalSettingsService',
                    method: 'fetchApprovalSettings',
                    error: e
                })
            })
    }

    insertApprovalSettings(): Observable<any> {
        return this.http
            .post(this.createUrl, {
                params: {
                    record: {
                        name: SETTINGS_NAME,
                        isOpen: AutoApproveStatus.CLOSE,
                        ExhibitionId: this.tenantService.getExhibitionID()
                    }
                }
            })
            .map(res => (res as any).result)
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ApprovalSettingsService',
                    method: 'insertApprovalSettings',
                    error: e
                })
            })
    }

    updateApprovalSettings(params: ApprovalSettings): Observable<number> {
        // console.log(`update approval settings params: `, params)
        return this.http
            .post(this.updateUrl, {
                params: {
                    recordId: params.id,
                    setValue: {
                        isOpen: params.autoApprove ? AutoApproveStatus.OPEN : AutoApproveStatus.CLOSE
                    }
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ApprovalSettingsService',
                    method: 'updateApprovalSettings',
                    error: e
                })
            })
    }
}
