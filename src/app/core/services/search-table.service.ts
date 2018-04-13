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
 * 组建级别 service 用于辅助 对表单form 搜索表格数据的 操作
 *
 * @export
 * @class SearchTableService
 */
@Injectable()
export class SearchTableService<S extends BaseSearchOptions, E extends DataItem>
    implements OnDestroy {
    private id: string

    private dataItemsHandler: (params?: S) => Observable<E[]>
    private dataItemsCountHandler: (params?: S) => Observable<number>

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
        const firstFetch = this.initFetchSub
            .asObservable()
            .pipe(
                switchMap(() => this.dataItemsHandler()),
                takeUntil(this.destroySub.asObservable())
            )
            .subscribe(this.dataItemsSub)

        // search或reset时 当前pageIndex=1 pageSize=10 才进行查询
        // 其他情况 都通过 改变pageIndex pageSize去查询
        const searchItems = this.searchSub
            .asObservable()
            .pipe(
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
                switchMap(params => this.dataItemsHandler(params)),
                takeUntil(this.destroySub)
            )
            .subscribe(this.dataItemsSub)

        const pageChangeItems = combineLatest(
            this.pageIndex$.pipe(distinctUntilChanged()),
            this.pageSize$.pipe(distinctUntilChanged())
        )
            .pipe(
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
                switchMap(params => this.dataItemsHandler(params)),
                takeUntil(this.destroySub)
            )
            .subscribe(this.dataItemsSub)

        const checkAll = this.checkAllSub
            .asObservable()
            .pipe(
                withLatestFrom(this.dataItems$),
                map(([checked, items]) =>
                    items.map(e => {
                        return Object.assign({}, e, { checked })
                    })
                ),
                takeUntil(this.destroySub)
            )
            .subscribe(this.dataItemsSub)

        const checkOne = this.checkOneSub
            .asObservable()
            .pipe(
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
                ),
                takeUntil(this.destroySub)
            )
            .subscribe(this.dataItemsSub)
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

        merge(firstFetch, searchItems).subscribe(this.dataItemsCountSub)
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
