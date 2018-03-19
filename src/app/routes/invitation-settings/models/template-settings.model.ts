export class TemplateSettings {
    id: string
    template: string
    name: TemplateType

    static convertFromResp(resp: TemplateSettingsResp): TemplateSettings {
        return {
            id: resp.RecordId,
            template: resp.Content,
            name: TemplateSettings.convertFromName(resp.Name)
        }
    }

    static convertFromName(name: string): TemplateType {
        switch (name) {
            case 'VTE':
                return TemplateType.VISITOR_TO_EXHIBITOR
            case 'ETV':
                return TemplateType.EXHIBITOR_TO_VISITOR
            case 'ETE':
                return TemplateType.EXHIBITOR_TO_EXHIBITOR
        }
    }

    static convertDefaultTemplateFromType(type: TemplateType): string {
        switch (type) {
            case TemplateType.VISITOR_TO_EXHIBITOR:
                return DEFAULT_VTE_TEMPLATE
            case TemplateType.EXHIBITOR_TO_VISITOR:
                return DEFAULT_ETV_TEMPLATE
            case TemplateType.EXHIBITOR_TO_EXHIBITOR:
                return DEFAULT_ETE_TEMPLATE
            default:
                console.warn(`Unknown template type: ${type}`)
                return ''
        }
    }
}

export enum TemplateType {
    VISITOR_TO_EXHIBITOR = 'VTE',
    EXHIBITOR_TO_VISITOR = 'ETV',
    EXHIBITOR_TO_EXHIBITOR = 'ETE'
}
export const TEMPLATE_SETTINGS_NAME = '约请消息模版'
export const DEFAULT_VTE_TEMPLATE =
    '【慕渊智能】亲爱的展商您好，${邀请人}邀请您来到展位${受邀人公司}参观！'
export const DEFAULT_ETV_TEMPLATE =
    '【慕渊智能】亲爱的买家您好，${邀请人}邀请您来到展位${受邀人公司}参观！'
export const DEFAULT_ETE_TEMPLATE =
    '【慕渊智能】亲爱的买家您好，${邀请人}邀请您来到展位${受邀人公司}参观！'

export interface TemplateSettingsResp {
    RecordId?: string
    Content: string
    Name: string
}
