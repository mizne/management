import * as moment from 'moment'

export class Terminal {
    id?: string
    name: string
    status: TerminalStatus
    exhibitorID: string
    time: string

    disabled?: boolean
    checked?: boolean

    static convertFromResp(resp: TerminalResp): Terminal {
        return {
            id: resp.RecordId,
            name: resp.name,
            status: Terminal.convertStatusFromResp(resp.State),
            exhibitorID: resp.ExhibitorId,
            time: resp.DistributeTime,
            disabled: false,
            checked: false
        }
    }

    static convertFromModel(terminal: Terminal): TerminalResp {
        return {
            name: terminal.name,
            State: terminal.exhibitorID ? TerminalStatus.BIND : TerminalStatus.UNBIND,
            DistributeTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            ExhibitorId: terminal.exhibitorID
        }
    }


    static convertStatusFromResp(state: string): TerminalStatus {
        if (state === '0') {
            return TerminalStatus.UNBIND
        }
        if (state === '1') {
            return TerminalStatus.BIND
        }
        console.warn(`Unknown terminal state from resp: ${state}!`)
    }
}

export enum TerminalStatus {
    BIND = '1',
    UNBIND = '0'
}

export interface TerminalResp {
    RecordId?: string
    name: string
    State: string
    DistributeTime: string
    ExhibitorId: string
}


