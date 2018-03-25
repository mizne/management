import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms'
import {
    FetchAssetsRecoveriesCountParams,
    AssetsRecovery
} from '@core/models/assets-recovery.model'
import { Observable } from 'rxjs/Observable'
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

import { ToShowResourceInfoComponent } from './modals'

@Component({
    selector: 'app-assets-recovery',
    templateUrl: './assets-recovery.component.html',
    styleUrls: ['./assets-recovery.component.less'],
    providers: [DestroyService]
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsRecoveryComponent implements OnInit {
    searchForm: FormGroup
    assetsRecoveries$: Observable<AssetsRecovery[]>
    assetsRecoveriesCount$: Observable<number>
    loading$: Observable<boolean>
    assetsRecoveryPageIndex = 1
    assetsRecoveryPageSize = 10
    pageChangeSub: Subject<void> = new Subject<void>()
    toRecoverySub: Subject<AssetsRecovery> = new Subject<AssetsRecovery>()
    toShowSub: Subject<AssetsRecovery> = new Subject<AssetsRecovery>()
    resetSub: Subject<void> = new Subject<void>()

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.buildForm()
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    queryForm() {
        this.resetSub.next()
    }

    resetForm() {
        this.searchForm.reset()
    }

    fetchAssetsRecoveries() {
        this.pageChangeSub.next()
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
        this.assetsRecoveries$ = this.store.select(getAssetsRecoveries)
        this.assetsRecoveriesCount$ = this.store.select(
            getAssetsRecoveriesCount
        )
        this.loading$ = this.store.select(getLoading)
    }

    private initDispatcher(): void {
        this.store.dispatch(new fromAssetsRecovery.FetchAssetsRecoveriesAction())
        this.store.dispatch(new fromAssetsRecovery.FetchAssetsRecoveriesCountAction())
    }

    private initSubscriber(): void {
        this.initEnsureRecovery()
        this.initShowAssetsRecovery()
        this.initSearchResourceInfoAndPageChange()
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

    private initSearchResourceInfoAndPageChange(): void {
        this.resetSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new fromAssetsRecovery.FetchAssetsRecoveriesCountAction(this.searchForm.value)
                )
            })

        merge(
            this.pageChangeSub.asObservable(),
            this.resetSub
                .asObservable()
                .pipe(
                    tap(() => {
                        this.assetsRecoveryPageIndex = 1
                        this.assetsRecoveryPageSize = 10
                    }),
                    withLatestFrom(this.store.select(getAssetsRecoveryPageParams)),
                    filter(([_, { pageIndex, pageSize }]) =>
                        pageIndex === this.assetsRecoveryPageIndex &&
                        pageSize === this.assetsRecoveryPageSize
                    ),
            ))
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new fromAssetsRecovery.EnsurePageParamsAction({
                        pageIndex: this.assetsRecoveryPageIndex,
                        pageSize: this.assetsRecoveryPageSize
                    })
                )
                this.store.dispatch(
                    new fromAssetsRecovery.FetchAssetsRecoveriesAction({
                        condition: this.searchForm.value,
                        options: {
                            pageIndex: this.assetsRecoveryPageIndex,
                            pageSize: this.assetsRecoveryPageSize
                        }
                    })
                )
            })
    }
}
