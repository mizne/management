import { PaginationParams, defaultPaginationParams } from './pagination.model'

// 0 系统发给买家
// 1 系统发给主办
// 2 系统发给展商
// 3 主办发给买家
// 4 主办发给展商
export enum MessageType {
  SYS_TO_VISITOR = '0',
  SYS_TO_ORGANIZATION = '1',
  SYS_TO_EXHIBITOR = '2',
  ORGANIZATION_TO_VISITOR = '3',
  ORGANIZATION_TO_EXHIBITOR = '4'
}

// 0 未读消息
// 1 已读消息
export enum MessageStatus {
  UNREAD = '0',
  READ = '1'
}

export enum TargetVisitor {
  ALL = '000000000000000000000001'
}
export enum TargetExhibitor {
  ALL = '000000000000000000000002'
}

// 消息按发送方和接收方 可分为这几类么
// 系统发给主办(具体某个或全部)、系统发给展商(全部)
// 系统发个买家(全部)
// 主办发给展商(全部)、主办发给买家(全部)
export interface MessageResp {
  RecordId?: string
  CreatedAt: string
  Title: string
  Content: string
  Type: string
  SysSender: string
  ExhibitorReceiver: string
  VisitorReceiver: string
  OrganizationSender: string
  OrganizationReceiver: string
}

export class PlatformMessage {
  id?: string
  time: string
  title: string
  content: string
  sender: string
  receiver: string

  disabled?: boolean
  checked?: boolean

  static convertFromResp(resp: MessageResp): PlatformMessage {
    return {
      id: resp.RecordId,
      time: resp.CreatedAt,
      title: resp.Title,
      content: resp.Content,
      sender: '系统',
      receiver: (() => {
        if (resp.Type === MessageType.SYS_TO_VISITOR) {
          return '全部买家'
        }
        if (resp.Type === MessageType.SYS_TO_EXHIBITOR) {
          return '全部主办'
        }
        if (resp.Type === MessageType.SYS_TO_EXHIBITOR) {
          return '全部展商'
        }
        console.warn(
          `Incorrect type from platform message, type: ${
          resp.Type
          }, record id: ${resp.RecordId}`
        )
        return ''
      })(),
      disabled: false,
      checked: false
    }
  }
}

export class ExhibitorMessage {
  id?: string
  time?: string
  sender: string
  receiver: string
  title: string
  content: string

  disabled?: boolean
  checked?: boolean

  static convertFromResp(resp: MessageResp): ExhibitorMessage {
    return {
      id: resp.RecordId,
      time: resp.CreatedAt,
      sender: resp.OrganizationSender,
      receiver: resp.ExhibitorReceiver,
      title: resp.Title,
      content: resp.Content,
      disabled: false,
      checked: false
    }
  }
}

export class VisitorMessage {
  id?: string
  sender: string
  receiver: string
  time: string
  title: string
  content: string

  disabled?: boolean
  checked?: boolean

  static convertFromResp(resp: MessageResp): VisitorMessage {
    return {
      id: resp.RecordId,
      time: resp.CreatedAt,
      sender: resp.OrganizationSender,
      receiver: resp.VisitorReceiver,
      title: resp.Title,
      content: resp.Content,
      disabled: false,
      checked: false
    }
  }
}
