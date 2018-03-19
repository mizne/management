import {
    PaginationParams,
    FetchItemsParams,
    FetchItemsCountParams
} from './pagination.model'
import { ExhibitorResp, ExhibitorContactResp } from './exhibitor.model'

export const APPROVAL_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export class ExhibitorInvitation {
    id?: string
    initiatorCompany: string
    initiator: string
    initiatorJob: string
    receiverCompany: string
    receiver: string
    receiverJob: string
    approvedAt: string
    createdAt: string
    status: ExhibitorInvitationStatus
    reason: string

    checked?: boolean
    disabled?: boolean

    static convertFromResp(resp: ExhibitorInvitationResp): ExhibitorInvitation {
        const { initiator, receiver } = ExhibitorInvitation.extractFromResp(
            resp
        )
        return {
            id: resp.RecordId,
            initiatorCompany: initiator.CompanyName || '',
            initiator: initiator.Name,
            initiatorJob: initiator.Job,
            receiverCompany: receiver.CompanyName,
            receiver: receiver.Name,
            receiverJob: receiver.Job,
            status: ExhibitorInvitation.convertStatusFromState(resp.State),
            reason: resp.Remark,
            approvedAt: resp.ApprovalTime,
            createdAt: resp.CreatedAt,
            disabled: false,
            checked: false
        }
    }

    static extractFromResp(
        resp: ExhibitorInvitationResp
    ): {
        initiator: ExhibitorContactResp
        receiver: ExhibitorContactResp
    } {
        return {
            initiator: resp.InitatorChild[0],
            receiver: resp.ReceiverChild[0]
        }
    }

    static convertStatusFromState(state: string): ExhibitorInvitationStatus {
        const dest = ExhibitorInvitationStatuses.find(e => e.status === state)
        if (dest) {
            return dest.status
        }
        console.warn(`Unknown exhibitor invitation state: ${state};`)
        return ExhibitorInvitationStatus.UNKNOWN
    }

    static convertFetchItemsParams(
        params: FetchExhibitorInvitationsParams
    ): FetchItemsParams {
        return {
            condition: {
                State: params.status,
                ApprovalTime: params.approveAt
            },
            options: {
                pageIndex: params.pageIndex,
                pageSize: params.pageSize
            }
        }
    }

    static convertFetchItemsCountParams(
        params: FetchExhibitorInvitationsCountParams
    ): FetchItemsCountParams {
        return {
            condition: {
                State: params.status,
                ApprovalTime: params.approveAt
            }
        }
    }
}

export interface ExhibitorInvitationResp {
    RecordId?: string
    InitatorChild: ExhibitorContactResp[]
    Initator: ExhibitorResp[]
    ReceiverChild: ExhibitorContactResp[]
    Receiver: ExhibitorResp[]
    State: string
    Remark: string
    ApprovalTime: string
    CreatedAt: string
}

export enum ExhibitorInvitationStatus {
    UNKNOWN = '9', // 未知状态
    UN_AUDIT = '0', // 未审核
    AUDIT_FAILED = '1', // 审核未通过
    AUDIT_SUCCEED = '2', // 审核通过 未答复
    AGREE = '4', // 同意
    REFUSE = '3', // 拒绝
    DELETED = '8', // 已删除
    CANCEL = '7', // 已取消
    KEEP_APPOINTMENT = '5', // 已赴约
    FAIL_KEEP_APPOINITMENT = '6' // 已爽约
}

export const ExhibitorInvitationStatuses = [
    {
        label: '未审核',
        status: ExhibitorInvitationStatus.UN_AUDIT
    },
    {
        label: '审核未通过',
        status: ExhibitorInvitationStatus.AUDIT_FAILED
    },
    {
        label: '未答复',
        status: ExhibitorInvitationStatus.AUDIT_SUCCEED
    },
    {
        label: '已同意',
        status: ExhibitorInvitationStatus.AGREE
    },
    {
        label: '已拒绝',
        status: ExhibitorInvitationStatus.REFUSE
    },
    {
        label: '已删除',
        status: ExhibitorInvitationStatus.DELETED
    },
    {
        label: '已取消',
        status: ExhibitorInvitationStatus.CANCEL
    },
    {
        label: '已赴约',
        status: ExhibitorInvitationStatus.KEEP_APPOINTMENT
    },
    {
        label: '已爽约',
        status: ExhibitorInvitationStatus.FAIL_KEEP_APPOINITMENT
    }
]

export interface FetchExhibitorInvitationsParams extends PaginationParams {
    status?: ExhibitorInvitationStatus
    approveAt?: string
}
export const defaultFetchExhibitorInvitationsParams: FetchExhibitorInvitationsParams = {
    pageIndex: 1,
    pageSize: 10
}

export interface FetchExhibitorInvitationsCountParams {
    status?: ExhibitorInvitationStatus
    approveAt?: string
}
export const defaultFetchExhibitorInvitationsCountParams: FetchExhibitorInvitationsCountParams = {}

export interface RejectExhibitorInvitationParams {
    id: string
    reason: string
}
export interface BatchRejectExhibitorInvitationsParams {
    ids: string[]
    reason: string
}
export interface AllRejectExhibitorInvitationsParams {
    reason: string
}
