import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms'
import {
    FetchAssetsRecoveriesCountParams,
    AssetsRecovery
} from '@core/models/assets-recovery.model'
import { Observable } from 'rxjs/Observable'
import * as R from 'ramda'
import { Store } from '@ngrx/store'
import {
    State,
    getAssetsRecoveries,
    getAssetsRecoveriesCount,
    getLoading,
    getAssetsRecoveryPageParams
} from './reducers'
import {
    fromAssetsRecovery
} from './actions'

import { Subject } from 'rxjs/Subject'
import { takeUntil, mergeMap, filter, tap, withLatestFrom } from 'rxjs/operators'
import { merge } from 'rxjs/observable/merge'
import { DestroyService } from '@core/services/destroy.service'
import { SearchTableService } from '@core/services/search-table.service'
import { AssetsRecoveryService } from './services/assets-recovery.service'
import { ToShowResourceInfoComponent } from './modals'

interface SearchOptions {
    resourceType?: string
    computeResourceType?: string
}

@Component({
    selector: 'app-assets-recovery',
    templateUrl: './assets-recovery.component.html',
    styleUrls: ['./assets-recovery.component.less'],
    providers: [DestroyService, SearchTableService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsRecoveryComponent implements OnInit {
    searchForm: FormGroup
    assetsRecoveries$: Observable<AssetsRecovery[]>
    assetsRecoveriesCount$: Observable<number>
    loading$: Observable<boolean>
    pageIndex$: Observable<number>
    pageSize$: Observable<number>


    toRecoverySub: Subject<AssetsRecovery> = new Subject<AssetsRecovery>()
    toShowSub: Subject<AssetsRecovery> = new Subject<AssetsRecovery>()

    trackByFn = (index, item) => {
        return item.id
    }

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService,
        private fb: FormBuilder,
        private searchTableService: SearchTableService<SearchOptions, AssetsRecovery>,
        private assetRecoveryService: AssetsRecoveryService
    ) {
        this.searchTableService.setDataItemsHandler(params => {
            return this.assetRecoveryService.fetchAssetsRecoveries(params)
        })
        this.searchTableService.setDataItemsCountHandler(params => {
            return this.assetRecoveryService.fetchAssetsRecoveriesCount(params)
        })
    }

    ngOnInit() {
        this.buildForm()
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    queryForm() {
        this.searchTableService.searchForm(this.convertFormValue())
    }

    resetForm() {
        this.searchForm.reset()
    }

    pageIndexChange(index: number) {
        this.searchTableService.pageIndexChange(index)
    }

    pageSizeChange(size: number) {
        this.searchTableService.pageSizeChange(size)
    }

    toRecovery(resourceInfo: AssetsRecovery) {
        this.toRecoverySub.next(resourceInfo)
    }

    toShow(resourceInfo: AssetsRecovery) {
        this.toShowSub.next(resourceInfo)
    }

    private buildForm() {
        this.searchForm = this.fb.group({
            resourceType: [null],
            computeResourceType: [null]
        })
    }

    private intDataSource(): void {
        this.assetsRecoveries$ = this.searchTableService.dataItems$
        this.assetsRecoveriesCount$ = this.searchTableService.dataItemsCount$
        this.loading$ = this.searchTableService.loading$
        this.pageIndex$ = this.searchTableService.pageIndex$
        this.pageSize$ = this.searchTableService.pageSize$
    }

    private initDispatcher(): void {
        this.searchTableService.initFetch()
    }

    private initSubscriber(): void {
        this.initEnsureRecovery()
        this.initShowAssetsRecovery()
    }

    private initEnsureRecovery() {
        this.toRecoverySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(assetsRecovery => {
                this.modalService.confirm({
                    title: '回收资产信息',
                    content: '确定回收这个资产信息?',
                    onOk: () => {
                        this.store.dispatch(
                            new fromAssetsRecovery.EnsureRecoveryAction(assetsRecovery)
                        )
                        console.log('ensure recovery, ', assetsRecovery)
                    }
                })
            })
    }

    private initShowAssetsRecovery() {
        this.toShowSub
            .asObservable()
            .pipe(
                mergeMap(assetsRecovery => {
                    return this.modalService.open({
                        title: '可回收资源详情',
                        content: ToShowResourceInfoComponent,
                        footer: false,
                        componentParams: { assetsRecovery },
                        width: 800
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resourceInfo => {
                console.log(`show asset recovery detail success`)
            })
    }

    private convertFormValue(): SearchOptions {
        return R.filter(R.complement(R.isNil), {
            resourceType: this.searchForm.value.resourceType,
            computeResourceType: this.searchForm.value.computeResourceType
        })
    }
}
