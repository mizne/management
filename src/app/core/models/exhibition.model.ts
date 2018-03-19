import * as moment from 'moment'

export class Exhibition {
    id?: string
    name?: string
    startDate?: string
    endDate?: string
    address?: string

    static convertFromResp(resp: ExhibitionResp): Exhibition {
        return {
            id: resp.RecordId,
            name: resp.ExName,
            startDate: resp.StartTime.split('/').join('-'),
            endDate: resp.EndTime.split('/').join('-'),
            address: resp.Place
        }
    }

    static findLatestExhibition(exhibitions: Exhibition[]): Exhibition {
        return exhibitions.sort((a, b) => {
            const momentA = moment(a.startDate, 'YYYY-MM-DD').valueOf()
            const momentB = moment(b.startDate, 'YYYY-MM-DD').valueOf()
            return momentB - momentA
        })[0]
    }
}

export class ExhibitionStatistics extends Exhibition {
    exhibitorCount: number
    visitorCount: number
    terminalCount: number
    invitationCount: number
}

export interface ExhibitionResp {
    RecordId?: string
    ExName: string
    StartTime: string
    EndTime: string
    Place: string
}
