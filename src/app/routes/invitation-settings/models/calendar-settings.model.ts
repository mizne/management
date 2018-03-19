export class CalendarSettings {
    id?: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    duration: string
    startLunch: string
    endLunch: string

    static convertFromResp(resp: CalendarSettingResp): CalendarSettings {
        return {
            id: resp.RecordId,
            startDate: resp.EStartDate,
            endDate: resp.EEndDate,
            startTime: resp.EStartTime,
            endTime: resp.EEndTime,
            duration: resp.IntervalTime,
            startLunch: resp.LunchStartTime,
            endLunch: resp.LunchEndTime
        }
    }
}

export const CALENDAR_SETTINGS_NAME = '主办方日程'

export interface CalendarSettingResp {
    RecordId?: string
    EStartDate: string
    EEndDate: string
    EStartTime: string
    EEndTime: string
    IntervalTime: string
    LunchStartTime: string
    LunchEndTime: string
}
