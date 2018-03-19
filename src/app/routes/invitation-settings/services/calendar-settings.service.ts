import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { CalendarSettings, CALENDAR_SETTINGS_NAME } from '../models/calendar-settings.model'
import { ErrorLoggerService } from '@core/services/error-logger.service'
import { TenantService } from '@core/services/tenant.service'

@Injectable()
export class CalendarSettingsService {
    private queryUrl = '/data/querybycondition/Calendar'
    private updateUrl = '/data/update/Calendar'
    private createUrl = '/data/insert/Calendar'

    constructor(
        private http: HttpClient,
        private errorLogger: ErrorLoggerService,
        private tenantService: TenantService
    ) { }
    fetchCalendarSettings(): Observable<CalendarSettings> {
        return this.http
            .post(this.queryUrl, {
                // tenantId: this.tenantService.getTenantID(),
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        Type: '3'
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
                        CalendarSettings.convertFromResp(results[0])
                    )
                }
                return this.insertCalendarSettings().do(e => {
                    // console.log('after insert calendar settings')
                    // console.log(e)
                })
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'CalendarSettingsService',
                    method: 'fetchCalendarSettings',
                    error: e
                })
            })
    }

    insertCalendarSettings(): Observable<CalendarSettings> {
        return this.http
            .post(this.createUrl, {
                params: {
                    record: {
                        name: CALENDAR_SETTINGS_NAME,
                        ExhibitionId: this.tenantService.getExhibitionID(),
                        EStartDate: this.tenantService.getExhibitionStartDate(),
                        EEndDate: this.tenantService.getExhibitionEndDate(),
                        EStartTime: '09:00',
                        EEndTime: '18:00',
                        IntervalTime: '60',
                        LunchStartTime: '12:00',
                        LunchEndTime: '13:00',
                        Type: '3',
                        CalendarTime: []
                    }
                }
            })
            .map(res => (res as any).result)
            .map(CalendarSettings.convertFromResp)
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'CalendarSettingsService',
                    method: 'insertCalendarSettings',
                    error: e
                })
            })
    }

    updateCalendarSettings(params: CalendarSettings): Observable<number> {
        // console.log(`update calendar settings params: `, params)
        return this.http
            .post(this.updateUrl, {
                params: {
                    recordId: params.id,
                    setValue: {
                        EStartDate: params.startDate,
                        EEndDate: params.endDate,
                        EStartTime: params.startTime,
                        EEndTime: params.endTime,
                        IntervalTime: params.duration,
                        LunchStartTime: params.startLunch,
                        LunchEndTime: params.endLunch
                    }
                }
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'CalendarSettingsService',
                    method: 'updateCalendarSettings',
                    error: e
                })
            })
    }
}
