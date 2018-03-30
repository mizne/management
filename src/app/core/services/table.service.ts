import { Injectable, OnDestroy, InjectionToken, Inject, Optional } from '@angular/core'
import * as uuid from 'uuid'
import { Subject } from 'rxjs/Subject'
import { DestroyService } from './destroy.service'
import { Observable } from 'rxjs/Observable'
import { map, mergeMap, filter, takeUntil, mapTo } from 'rxjs/operators'
import { NzModalService } from 'ng-zorro-antd'

export interface CreateOptions {
    title: string // 弹出框标题
    content: any // 弹出框内容
    type?: string // 不同数据类型的创建
}

export interface EditOptions {
    title: string // 弹出框标题
    content: any // 弹出框内容
    data: any // 待编辑的数据
    type?: string // 不同数据类型的创建
}

export type ShowOptions = EditOptions

export interface SingleDeleteOptions {
    title: string // 弹出框标题
    content: string // 弹出框内容
    id: string // 待删除id
    type?: string // 不同数据类型的删除
}

export const HAS_MULTI_TYPE = new InjectionToken<boolean>('Has Multi type')

export interface Operators {
    createItem: Subject<CreateOptions>
    editItem: Subject<EditOptions>
    showItem: Subject<ShowOptions>
    singleDeleteItem: Subject<SingleDeleteOptions>
}

/**
 * 组建级别 service 用于辅助 对表格数据的 操作
 *
 * @export
 * @class TableService
 * @implements {OnDestroy}
 */
@Injectable()
export class TableService {
    private id: string

    private subjects: Operators = {
        createItem: null,
        editItem: null,
        showItem: null,
        singleDeleteItem: null
    }

    constructor(
        private destroyService: DestroyService,
        private modalService: NzModalService,
        @Optional()
        @Inject(HAS_MULTI_TYPE) private hasMultiType: boolean
    ) {
        this.id = uuid.v4()
    }

    preCreateItem(params: CreateOptions) {
        this.checkMehtodInvokeOrder('createItem')
        this.checkParams(params.type, 'preCreateItem')
        this.subjects['createItem'].next(params)
    }

    private capitalFirst(s: string): string {
        return s[0].toUpperCase() + s.slice(1)
    }

    toCreateItem(type?: string): Observable<any> {
        this.checkParams(type, 'toCreateItem')
        this.lazyInitial('createItem')
        return this.subjects['createItem'].asObservable().pipe(
            filter(params => (type ? type === params.type : true)),
            mergeMap(({ title, content }) => {
                return this.modalService.open({
                    title,
                    content,
                    footer: false,
                    width: 800
                })
            }),
            filter(e => typeof e !== 'string'),
            takeUntil(this.destroyService)
        )
    }

    preEditItem(params: EditOptions) {
        this.checkMehtodInvokeOrder('editItem')
        this.checkParams(params.type, 'preEditItem')
        this.subjects['editItem'].next(params)
    }

    toEditItem(type?: string): Observable<any> {
        this.checkParams(type, 'toEditItem')
        this.lazyInitial('editItem')
        return this.subjects['editItem'].asObservable().pipe(
            filter(params => (type ? type === params.type : true)),
            mergeMap(({ title, content, data }) => {
                return this.modalService.open({
                    title,
                    content,
                    footer: false,
                    width: 800,
                    componentParams: { data }
                })
            }),
            filter(e => typeof e !== 'string'),
            takeUntil(this.destroyService)
        )
    }

    preShowItem(params: ShowOptions) {
        this.checkMehtodInvokeOrder('showItem')
        this.checkParams(params.type, 'preShowItem')
        this.subjects['showItem'].next(params)
    }

    toShowItem(type?: string): Observable<any> {
        this.checkParams(type, 'toShowItem')
        this.lazyInitial('showItem')
        return this.subjects['showItem'].asObservable().pipe(
            filter(params => (type ? type === params.type : true)),
            mergeMap(({ title, content, data }) => {
                return this.modalService.open({
                    title,
                    content,
                    footer: false,
                    width: 800,
                    componentParams: { data }
                })
            }),
            filter(e => typeof e !== 'string'),
            takeUntil(this.destroyService)
        )
    }

    preSingleDeleteItem(params: SingleDeleteOptions) {
        this.checkMehtodInvokeOrder('singleDeleteItem')
        this.checkParams(params.type, 'preSingleDeleteItem')
        this.subjects['singleDeleteItem'].next(params)
    }

    toSingleDeleteItem(type?: string): Observable<string> {
        this.checkParams(type, 'toSingleDeleteItem')
        this.lazyInitial('singleDeleteItem')
        return this.subjects['singleDeleteItem'].asObservable().pipe(
            filter(params => (type ? type === params.type : true)),
            mergeMap(({ title, content, id }) => {
                return this.modalService
                    .confirm({
                        title,
                        content
                    })
                    .pipe(filter(e => e === 'onOk'), mapTo(id))
            }),
            takeUntil(this.destroyService)
        )
    }

    private checkMehtodInvokeOrder(operator: keyof Operators) {
        if (!this.subjects[operator]) {
            const firstInvokeMethodName = `to${this.capitalFirst(operator)}`
            const secondInvokeMethodName = `pre${this.capitalFirst(operator)}`
            throw new Error(`Did you forgot to invoke '${firstInvokeMethodName}' method before '${secondInvokeMethodName}' method?`)
        }
    }

    private lazyInitial(operator: keyof Operators) {
        if (!this.subjects[operator]) {
            this.subjects[operator] = new Subject()
        }
    }

    private checkParams(type: string, method: string) {
        if (type && !this.hasMultiType) {
            throw new Error(`Did you forgot to inject 'HAS_MULTI_TYPE' token for multi types?`)
        }
        if (!type && this.hasMultiType) {
            throw new Error(`Did you forgot to attach 'type' property for method '${method}'?`)
        }
    }
}
