export class KeySettings {
    id?: string
    keys: string[]

    static convertFromResp(resp: KeySettingsResp): KeySettings {
        return {
            id: resp.RecordId,
            keys: resp.KeyWord || []
        }
    }
}

export interface KeySettingsResp {
    RecordId?: string
    KeyWord: string[]
}
