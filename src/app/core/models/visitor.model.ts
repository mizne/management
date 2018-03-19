export class Visitor {
    // 基本信息
    id?: string
    name: string
    phone: string
    sex: VisitorSex
    email: string

    // 地址信息
    country: string
    province: string
    city: string
    county: string

    // 公司信息
    companyName: string
    companyAddress: string
    department: string

    // 参展信息
    objective: string
    remark: string

    disabled?: boolean
    checked?: boolean

    static convertFromResp(resp: VisitorResp): Visitor {
        return {
            id: resp.RecordId,
            name: resp.Name,
            phone: resp.Mob,
            sex: Visitor.convertSexFromResp(resp.Sex),
            email: resp.Email,

            country: resp.Country,
            province: resp.Province,
            city: resp.City,
            county: resp.County,

            companyName: resp.CompanyName,
            companyAddress: resp.CompAddr,
            department: resp.Dept,

            objective: resp.Objective,
            remark: resp.Remark,
            disabled: false,
            checked: false
        }
    }

    static convertSexFromResp(s: string): VisitorSex {
        switch (s) {
            case '0':
                return VisitorSex.MALE
            case '1':
                return VisitorSex.FEMALE
            default:
                return VisitorSex.UNKNOWN
        }
    }
}

export enum VisitorSex {
    MALE,
    FEMALE,
    UNKNOWN
}

export interface VisitorResp {
    RecordId?: string
    Name: string
    Mob: string
    Sex: string
    Email: string
    Dept: string
    Job: string
    Industry?: string

    Country: string
    Province: string
    City: string
    County: string

    CompAddr: string
    CompanyName: string

    HeadImgUrl: string
    Card?: string

    Objective: string
    Remark: string
}
