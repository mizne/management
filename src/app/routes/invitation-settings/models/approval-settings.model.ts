export class ApprovalSettings {
    id?: string
    autoApprove: boolean

    static convertFromResp(resp: ApprovalSettingsResp): ApprovalSettings {
        return {
            id: resp.RecordId,
            autoApprove: resp.isOpen === AutoApproveStatus.OPEN
        }
    }
}

export const SETTINGS_NAME = '自动审批设置'

export enum AutoApproveStatus {
    OPEN = '1',
    CLOSE = '0'
}

export interface ApprovalSettingsResp {
    RecordId?: string
    // 0 不自动审批
    // 1 自动审批
    isOpen: string
}
