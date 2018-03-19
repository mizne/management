import {
    PaginationParams,
    FetchItemsParams,
    FetchItemsCountParams
} from './pagination.model'
import {
    ExhibitorResp,
    ExhibitorContactResp
} from '@core/models/exhibitor.model'
import { VisitorResp } from '@core/models/visitor.model'

export const APPROVAL_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export class VisitorInvitation {
    id?: string
    initiatorCompany: string
    initiator: string
    initiatorJob: string
    receiverCompany: string
    receiver: string
    receiverJob: string
    approvedAt: string
    createdAt: string
    status: VisitorInvitationStatus
    reason: string

    checked?: boolean
    disabled?: boolean

    static removeIllegal(
        total: VisitorInvitationResp[]
    ): VisitorInvitationResp[] {
        return total.filter(res => {
            if (
                (res.Type === '1' &&
                    res.InitatorChild.length > 0 &&
                    res.VisitorReceiver.length > 0) ||
                (res.Type === '0' &&
                    res.VisitorInitator.length > 0 &&
                    res.ReceiverChild.length > 0)
            ) {
                return true
            }
            console.warn(
                `Illegal visitor invitation: record id: ${res.RecordId}`
            )
            return false
        })
    }

    static convertFromResp(resp: VisitorInvitationResp): VisitorInvitation {
        const { initiator, receiver } = VisitorInvitation.extractFromResp(resp)
        return {
            id: resp.RecordId,
            initiatorCompany: initiator.companyName || '',
            initiator: initiator.name || '',
            initiatorJob: initiator.job || '',
            receiverCompany: receiver.companyName || '',
            receiver: receiver.name || '',
            receiverJob: receiver.job || '',
            status: VisitorInvitation.convertStatusFromState(resp.State),
            reason: resp.Remark,
            approvedAt: resp.ApprovalTime,
            createdAt: resp.CreatedAt,
            disabled: false,
            checked: false
        }
    }

    static extractFromResp(
        resp: VisitorInvitationResp
    ): {
        initiator: NormalizerContact
        receiver: NormalizerContact
    } {
        switch (resp.Type) {
            case '1':
                return {
                    initiator: NormalizerContact.convertFromExhibitorContatctResp(
                        resp.InitatorChild[0]
                    ),
                    receiver: NormalizerContact.convertFromVisitorResp(
                        resp.VisitorReceiver[0]
                    )
                }
            case '0':
                return {
                    initiator: NormalizerContact.convertFromVisitorResp(
                        resp.VisitorInitator[0]
                    ),
                    receiver: NormalizerContact.convertFromExhibitorContatctResp(
                        resp.ReceiverChild[0]
                    )
                }
            default:
                console.warn(`Unknown visitor invitation type: ${resp.Type}`)
                break
        }
    }

    static convertStatusFromState(state: string): VisitorInvitationStatus {
        const dest = VisitorInvitationStatuses.find(e => e.status === state)
        if (dest) {
            return dest.status
        }
        console.warn(`Unknown visitor invitation state: ${state};`)
        return VisitorInvitationStatus.UNKNOWN
    }

    static convertFetchItemsParams(
        params: FetchVisitorInvitationsParams
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
        params: FetchVisitorInvitationsCountParams
    ): FetchItemsCountParams {
        return {
            condition: {
                State: params.status,
                ApprovalTime: params.approveAt
            }
        }
    }
}

export interface VisitorInvitationResp {
    RecordId?: string
    // Type为1 展商发起约请
    Initator: ExhibitorResp[] // 发送方展商
    InitatorChild: ExhibitorContactResp[] // 发送方展商联系人
    VisitorReceiver: VisitorResp[] // 接收方买家

    // Type为0 买家发起约请
    Receiver: ExhibitorResp[] // 接收方展商
    VisitorInitator: VisitorResp[] // 发送方买家
    ReceiverChild: ExhibitorContactResp[] // 接收方展商联系人
    State: string
    Remark: string
    ApprovalTime: string
    CreatedAt: string
    Type: string
}

export class NormalizerContact {
    name: string
    companyName: string
    job: string

    static convertFromExhibitorContatctResp(
        resp: ExhibitorContactResp
    ): NormalizerContact {
        return {
            name: resp.Name,
            companyName: resp.CompanyName,
            job: resp.Job
        }
    }

    static convertFromVisitorResp(resp: VisitorResp): NormalizerContact {
        return {
            name: resp.Name,
            companyName: resp.CompanyName,
            job: resp.Job
        }
    }
}

export enum VisitorInvitationStatus {
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

export const VisitorInvitationStatuses = [
    {
        label: '未审核',
        status: VisitorInvitationStatus.UN_AUDIT
    },
    {
        label: '审核未通过',
        status: VisitorInvitationStatus.AUDIT_FAILED
    },
    {
        label: '未答复',
        status: VisitorInvitationStatus.AUDIT_SUCCEED
    },
    {
        label: '已同意',
        status: VisitorInvitationStatus.AGREE
    },
    {
        label: '已拒绝',
        status: VisitorInvitationStatus.REFUSE
    },
    {
        label: '已删除',
        status: VisitorInvitationStatus.DELETED
    },
    {
        label: '已取消',
        status: VisitorInvitationStatus.CANCEL
    },
    {
        label: '已赴约',
        status: VisitorInvitationStatus.KEEP_APPOINTMENT
    },
    {
        label: '已爽约',
        status: VisitorInvitationStatus.FAIL_KEEP_APPOINITMENT
    }
]

export interface FetchVisitorInvitationsParams extends PaginationParams {
    status?: VisitorInvitationStatus
    approveAt?: string
}
export const defaultFetchVisitorInvitationsParams: FetchVisitorInvitationsParams = {
    pageIndex: 1,
    pageSize: 10
}

export interface FetchVisitorInvitationsCountParams {
    status?: VisitorInvitationStatus
    approveAt?: string
}
export const defaultFetchVisitorInvitationsCountParams: FetchVisitorInvitationsCountParams = {}

export interface RejectVisitorInvitationParams {
    id: string
    reason: string
}
export interface BatchRejectVisitorInvitationsParams {
    ids: string[]
    reason: string
}
export interface AllRejectVisitorInvitationsParams {
    reason: string
}
