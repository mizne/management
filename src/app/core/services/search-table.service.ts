import { Injectable, OnDestroy } from '@angular/core'
import * as uuid from 'uuid'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import {
    map,
    mergeMap,
    filter,
    takeUntil,
    mapTo,
    tap,
    switchMap,
    withLatestFrom,
    take,
    skip,
    startWith,
    distinctUntilChanged,
    catchError
} from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { merge } from 'rxjs/observable/merge'
import { of } from 'rxjs/observable/of'

export interface BaseSearchOptions {
    [key: string]: any
}

interface CheckOneOptions {
    id: string
    checked: boolean
}

export interface DataItem {
    id?: string
    checked?: boolean
}

export interface PageChangeOptions {
    pageIndex: number
    pageSize: number
}

/**
 * 组建级别 service 用于辅助 对 包含表单form 搜索表格数据的 操作
 * 支持 表单搜索或重置时 更新表格数据、表格状态
 * 支持 点击分页 更新表格数据
 * 支持 选中所有表格数据/选中某几条数据 来更新表格状态
 * @export
 * @class SearchTableService
 */
@Injectable()
export class SearchTableService<S extends BaseSearchOptions, E extends DataItem>
    implements OnDestroy {
    private id: string

    private dataItemsHandler: (params?: S) => Observable<E[]> = () => of([])
    private dataItemsCountHandler: (params?: S) => Observable<number> = () =>
        of(0)

    // 搜索表格 支持的操作
    private searchSub: Subject<S> = new Subject<S>()
    private pageIndexChangeSub: Subject<number> = new Subject<number>()
    private pageSizeChangeSub: Subject<number> = new Subject<number>()
    private checkOneSub: Subject<CheckOneOptions> = new Subject<
        CheckOneOptions
    >()
    private checkAllSub: Subject<boolean> = new Subject<boolean>()

    private dataItemsSub: BehaviorSubject<E[]> = new BehaviorSubject<E[]>([])
    public dataItems$: Observable<E[]> = this.dataItemsSub.asObservable()

    private dataItemsCountSub: BehaviorSubject<number> = new BehaviorSubject<
        number
    >(0)
    public dataItemsCount$: Observable<
        number
    > = this.dataItemsCountSub.asObservable()

    public loading$: Observable<boolean>

    private pageIndexSub: BehaviorSubject<number> = new BehaviorSubject<number>(
        1
    )
    public pageIndex$: Observable<number> = this.pageIndexSub.asObservable()

    private pageSizeSub: BehaviorSubject<number> = new BehaviorSubject<number>(
        10
    )
    public pageSize$: Observable<number> = this.pageSizeSub.asObservable()

    public allChecked$: Observable<boolean>
    public indeterminate$: Observable<boolean>

    private initFetchSub: Subject<void> = new Subject<void>()
    private destroySub: Subject<void> = new Subject<void>()

    constructor() {
        this.id = uuid.v4()
        this.initStream()
    }

    setDataItemsHandler(handler: (params: S) => Observable<E[]>) {
        this.dataItemsHandler = (params: S) =>
            handler(params).pipe(catchError(() => of([])))
    }

    setDataItemsCountHandler(handler: (params: S) => Observable<number>) {
        this.dataItemsCountHandler = (params: S) =>
            handler(params).pipe(catchError(() => of(0)))
    }

    initFetch() {
        this.initFetchSub.next()
    }

    searchForm(params: S) {
        this.searchSub.next(params)
    }

    pageIndexChange(index: number) {
        this.pageIndexChangeSub.next(index)
    }

    pageSizeChange(size: number) {
        this.pageSizeChangeSub.next(size)
    }

    checkOne(params: CheckOneOptions) {
        this.checkOneSub.next(params)
    }

    checkAll(checked: boolean) {
        this.checkAllSub.next(checked)
    }

    ngOnDestroy() {
        this.destroySub.complete()
    }

    private initStream() {
        this.initDataItems()
        this.initDataItemsCount()
        this.initLoading()

        this.initPageIndex()
        this.initPageSize()
        this.initAllCheckd()
        this.initIndeterminate()
    }

    private initDataItems() {
        const firstFetch = this.firstFetchForDataItems()
        const searchItems = this.searchForDataItems()
        const pageChangeItems = this.pageChangeForDataItems()
        const checkAll = this.checkAllForDataItems()
        const checkOne = this.checkOneForDataItems()

        merge(firstFetch, searchItems, pageChangeItems, checkAll, checkOne)
            .pipe(takeUntil(this.destroySub))
            .subscribe(this.dataItemsSub)
    }

    private firstFetchForDataItems(): Observable<E[]> {
        return this.initFetchSub
            .asObservable()
            .pipe(switchMap(() => this.dataItemsHandler()))
    }

    private searchForDataItems(): Observable<E[]> {
        // 由于 search或reset 需将pageIndex置为1 pageSize置为10
        // 如果当前pageIndex不为1 或pageSize不为10 则会触发pageChange 继而发起获取数据请求
        // 所以 更正为 search或reset时 当前pageIndex=1 pageSize=10 才进行查询
        // 其他情况 都通过 触发pageChange 发起获取数据请求
        return this.searchSub.asObservable().pipe(
            withLatestFrom(this.pageIndex$, (params, pageIndex) => ({
                params,
                pageIndex
            })),
            withLatestFrom(
                this.pageSize$,
                ({ params, pageIndex }, pageSize) => ({
                    params,
                    pageIndex,
                    pageSize
                })
            ),
            filter(
                ({ params, pageIndex, pageSize }) =>
                    pageIndex === 1 && pageSize === 10
            ),

            map(({ params, pageIndex, pageSize }) => params),
            switchMap(params => this.dataItemsHandler(params))
        )
    }

    private pageChangeForDataItems(): Observable<E[]> {
        return combineLatest(
            this.pageIndex$.pipe(distinctUntilChanged()),
            this.pageSize$.pipe(distinctUntilChanged())
        ).pipe(
            skip(1),
            withLatestFrom(
                this.searchSub.asObservable().pipe(startWith(null)),
                ([pageIndex, pageSize], searchOpt) => {
                    return Object.assign(
                        {
                            pageIndex,
                            pageSize
                        },
                        searchOpt
                    )
                }
            ),
            switchMap(params => this.dataItemsHandler(params))
        )
    }

    private checkAllForDataItems(): Observable<E[]> {
        return this.checkAllSub.asObservable().pipe(
            withLatestFrom(this.dataItems$),
            map(([checked, items]) =>
                items.map(e => {
                    return Object.assign({}, e, { checked })
                })
            )
        )
    }

    private checkOneForDataItems(): Observable<E[]> {
        return this.checkOneSub.asObservable().pipe(
            withLatestFrom(this.dataItems$),
            map(([opt, items]) =>
                items.map(e => {
                    if (e.id === opt.id) {
                        return Object.assign({}, e, {
                            checked: opt.checked
                        })
                    }
                    return Object.assign({}, e)
                })
            )
        )
    }

    private initDataItemsCount() {
        const firstFetch = this.initFetchSub.asObservable().pipe(
            switchMap(() => {
                return this.dataItemsCountHandler()
            })
        )
        const searchItems = this.searchSub
            .asObservable()
            .pipe(switchMap(params => this.dataItemsCountHandler(params)))

        merge(firstFetch, searchItems)
            .pipe(takeUntil(this.destroySub))
            .subscribe(this.dataItemsCountSub)
    }

    private initLoading() {
        const search = this.searchSub.asObservable().pipe(mapTo(true))
        const pageIndex = this.pageIndex$.pipe(skip(1), mapTo(true))
        const pageSize = this.pageSize$.pipe(skip(1), mapTo(true))
        const dataItems = this.dataItems$.pipe(skip(1), mapTo(false))

        this.loading$ = merge(search, pageIndex, pageSize, dataItems).pipe(
            startWith(true)
        )
    }

    private initPageIndex() {
        merge(
            this.pageIndexChangeSub.asObservable(),
            this.searchSub.asObservable().pipe(mapTo(1))
        )
            .pipe(takeUntil(this.destroySub))
            .subscribe(this.pageIndexSub)
    }
    private initPageSize() {
        merge(
            this.pageSizeChangeSub.asObservable(),
            this.searchSub.asObservable().pipe(mapTo(10))
        )
            .pipe(takeUntil(this.destroySub))
            .subscribe(this.pageSizeSub)
    }

    private initAllCheckd() {
        this.allChecked$ = this.dataItems$.pipe(
            map(items => {
                const allChecked = items.every(e => e.checked)
                return items.length > 0 && allChecked
            })
        )
    }

    private initIndeterminate() {
        this.indeterminate$ = this.dataItems$.pipe(
            map(items => {
                if (items.length === 0) {
                    return false
                }
                const allChecked = items.every(e => e.checked)
                const allUnChecked = items.every(e => !e.checked)
                return !(allChecked || allUnChecked)
            })
        )
    }
}
