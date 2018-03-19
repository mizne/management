import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import {
    TemplateSettings,
    TEMPLATE_SETTINGS_NAME,
    DEFAULT_VTE_TEMPLATE,
    TemplateType
} from '../models/template-settings.model'
import { ErrorLoggerService } from '@core/services/error-logger.service'
import { TenantService } from '@core/services/tenant.service'

@Injectable()
export class TemplateSettingsService {
    private queryUrl = '/data/querybycondition/SmsTemplate'
    private updateUrl = '/data/update/SmsTemplate'
    private createUrl = '/data/insert/SmsTemplate'

    constructor(
        private http: HttpClient,
        private tenantService: TenantService,
        private errorLogger: ErrorLoggerService
    ) {}
    fetchTemplateSettings(type: TemplateType): Observable<TemplateSettings> {
        return this.http
            .post(this.queryUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        Name: type
                    }
                }
            })
            .map(res => (res as any).result)
            .do(e => {
                // console.log('after fetch calendar settings')
                // console.log(e)
            })
            .mergeMap((results: any[]) => {
                if (results.length > 0) {
                    return Observable.of(
                        TemplateSettings.convertFromResp(results[0])
                    )
                }
                return this.insertTemplateSettings(type).do(e => {
                    // console.log('after insert calendar settings')
                    // console.log(e)
                })
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'TemplateSettingsService',
                    method: 'fetchTemplateSettings',
                    error: e
                })
            })
    }

    insertTemplateSettings(type: TemplateType): Observable<any> {
        return this.http
            .post(this.createUrl, {
                params: {
                    record: {
                        Name: type,
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        Content: TemplateSettings.convertDefaultTemplateFromType(
                            type
                        ),
                        Type: '1',
                        IsActive: true
                    }
                }
            })
            .map(res => (res as any).result)
            .map(TemplateSettings.convertFromResp)
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'TemplateSettingsService',
                    method: 'insertTemplateSettings',
                    error: e
                })
            })
    }

    updateTemplateSettings(params: TemplateSettings): Observable<number> {
        // console.log(`update template settings params: `, params)
        return this.http
            .post(this.updateUrl, {
                params: {
                    recordId: params.id,
                    setValue: {
                        Content: params.template
                    }
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'TemplateSettingsService',
                    method: 'updateTemplateSettings',
                    error: e
                })
            })
    }
}
