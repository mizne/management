import { VisitorResp } from '@core/models/visitor.model'

export class Exhibitor {
    // 基本信息
    id?: string
    name: string
    address: string
    email: string
    fax: string
    tel: string
    website: string

    // 地址信息
    country: string
    province: string
    city: string

    // 行业信息
    industry: string
    categories: string
    categories2: string

    // 参展信息
    boothArea: string
    boothNo: string
    showArea: string
    introduction: string

    // 展示联系人
    linkList: Link[]
    // 展商产品
    productList: Product[]

    // 统计信息
    scanCardsCount: number
    inviteVisitorsCount: number
    inviteExhibitorsCount: number

    disabled?: boolean
    checked?: boolean

    static convertFromResp(resp: ExhibitorResp): Exhibitor {
        return {
            id: resp.RecordId,
            name: resp.CompanyName,
            address: resp.Addr,
            email: resp.Email,
            fax: resp.Fax,
            tel: resp.Tel,
            website: resp.Website,
            country: resp.Country,
            province: resp.Province,
            city: resp.City,
            industry: resp.Industry,
            categories: resp.Categories,
            categories2: resp.Categories2,
            boothArea: resp.BoothArea,
            boothNo: resp.BoothNo,
            showArea: resp.ShowArea,
            introduction: resp.Introduction,
            linkList: resp.LinkList.map(Link.convertFromResp),
            productList: resp.ProductList.map(Product.convertFromResp),
            scanCardsCount: resp.CardNumber || 0,
            inviteVisitorsCount: resp.InviteInfoNumber || 0,
            inviteExhibitorsCount: resp.InviteInfoExhiNumber || 0
        }
    }

    static EMPTY: Exhibitor = {
        name: '',
        address: '',
        email: '',
        fax: '',
        tel: '',
        website: '',

        country: '',
        province: '',
        city: '',

        industry: '',
        categories: '',
        categories2: '',

        boothArea: '',
        boothNo: '',
        showArea: '',
        introduction: '',

        linkList: [],
        productList: [],

        scanCardsCount: 0,
        inviteVisitorsCount: 0,
        inviteExhibitorsCount: 0
    }
}

export interface ExhibitorContactResp {
    Name: string
    CompanyName: string
    Job: string
}

export interface ExhibitorResp {
    RecordId?: string
    CompanyName: string
    Addr: string
    Email: string
    Fax: string
    Tel: string
    Website: string
    Logo: string

    Country: string
    Province: string
    City: string

    Industry: string
    Categories: string
    Categories2: string

    BoothArea: string
    BoothNo: string
    ExHall: string
    ShowArea: string
    Introduction: string
    Heat: number

    LinkList: LinkResp[]
    ProductList: ProductResp[]
    Visitors: VisitorResp[]

    CardNumber: number
    InviteInfoNumber: number
    InviteInfoExhiNumber: number
}

export class Link {
    isAdmin: boolean
    name: string
    job: string
    phone: string

    static convertFromResp(resp: LinkResp): Link {
        return {
            isAdmin: resp.admin === 0,
            name: resp.LinkName,
            job: resp.Job,
            phone: resp.LinkMob
        }
    }
}

export interface LinkResp {
    Job: string
    LinkMob: string
    LinkName: string
    admin: number
}

export class Product {
    name: string
    remark: string
    picList: Pic[]

    static convertFromResp(resp: ProductResp): Product {
        return {
            name: resp.Name,
            remark: resp.Remark,
            picList: resp.PicList.map(Pic.convertFromResp)
        }
    }
}

export interface ProductResp {
    Name: string
    Remark: string
    PicList: PicResp[]
}

export class Pic {
    path: string
    static convertFromResp(resp: PicResp): Pic {
        return {
            path: resp.PicPath
        }
    }
}

export interface PicResp {
    PicPath: string
}
