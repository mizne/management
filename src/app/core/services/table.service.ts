import { Injectable, OnDestroy } from '@angular/core'
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

@Injectable()
export class TableService implements OnDestroy {
    private id: string

    private createItemSub: Subject<CreateOptions> = new Subject<CreateOptions>()
    private editItemSub: Subject<EditOptions> = new Subject<EditOptions>()
    private showItemSub: Subject<ShowOptions> = new Subject<ShowOptions>()
    private singleDeleteSub: Subject<SingleDeleteOptions> = new Subject<
        SingleDeleteOptions
    >()

    constructor(
        private destroyService: DestroyService,
        private modalService: NzModalService
    ) {
        this.id = uuid.v4()
    }

    preCreateItem(params: CreateOptions) {
        this.createItemSub.next(params)
    }

    toCreateItem(type?: string): Observable<any> {
        return this.createItemSub.asObservable().pipe(
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
        this.editItemSub.next(params)
    }

    toEditItem(type?: string): Observable<any> {
        return this.editItemSub.asObservable().pipe(
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
        this.showItemSub.next(params)
    }

    toShowItem(type?: string): Observable<any> {
        return this.showItemSub.asObservable().pipe(
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
        this.singleDeleteSub.next(params)
    }

    toSingleDeleteItem(type?: string): Observable<string> {
        return this.singleDeleteSub.asObservable().pipe(
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

    ngOnDestroy() {}
}
