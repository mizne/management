import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { KeySettings } from '../models/key-settings.model'
import { TenantService } from '@core/services/tenant.service'
import { ErrorLoggerService } from '@core/services/error-logger.service'
import { SETTINGS_NAME } from 'app/routes/invitation-settings/models/approval-settings.model';

@Injectable()
export class KeySettingsService {
    private createUrl = '/data/insert/AutoApprovalInvition'
    private queryUrl = '/data/queryList/AutoApprovalInvition'
    private queryCountUrl = '/data/queryCount/AutoApprovalInvition'
    private deleteUrl = '/data/delete/AutoApprovalInvition'
    private updateUrl = '/data/update/AutoApprovalInvition'
    constructor(
        private http: HttpClient,
        private tenantService: TenantService,
        private errorLogger: ErrorLoggerService
    ) { }
    fetchKeySettings(): Observable<KeySettings> {
        return this.http
            .post(this.queryUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ExhibitionId: this.tenantService.getExhibitionID()
                    }
                }
            })
            .map(res => (res as any).result)
            .do(e => {
                // console.log('after fetch key settings')
                // console.log(e)
            })
            .mergeMap((results: any[]) => {
                if (results.length > 0) {
                    return Observable.of(
                        KeySettings.convertFromResp(results[0])
                    )
                }
                return this.insertKeySettings()
                    .map(KeySettings.convertFromResp)
                    .do(e => {
                        // console.log('after insert key settings')
                        // console.log(e)
                    })
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'KeySettingsService',
                    method: 'fetchKeySettings',
                    error: e
                })
            })
    }

    insertKeySettings(): Observable<any> {
        return this.http
            .post(this.createUrl, {
                params: {
                    record: {
                        name: SETTINGS_NAME,
                        KeyWord: [],
                        ExhibitionId: this.tenantService.getExhibitionID()
                    }
                }
            })
            .map(res => (res as any).result)
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'KeySettingsService',
                    method: 'insertKeySettings',
                    error: e
                })
            })
    }

    createKey(keys: string[], id: string): Observable<any> {
        // console.log(`create key: `, keys)

        return this.http
            .post(this.updateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    recordId: id,
                    setValue: {
                        KeyWord: keys
                    }
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'KeySettingsService',
                    method: 'createKey',
                    error: e
                })
            })
    }

    deleteKey(keys: string[], id: string): Observable<any> {
        // console.log(`delete key: `, keys)
        return this.http
            .post(this.updateUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    recordId: id,
                    setValue: {
                        KeyWord: keys
                    }
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'KeySettingsService',
                    method: 'deleteKey',
                    error: e
                })
            })
    }
}
