import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { TabAction } from '@core/models/system-onoff.model'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import { Store } from '@ngrx/store'
import {
    State,
    getListNumber,
    getSaveOrSubmitLoading,
    getSaveOrSubmitText,
    getFetchApplyInfoLoading,
    getApplyInfo,
    getFetchApproversLoading,
    getApprovers,
    getAddedApplyResources,
    getAddableApplyResources,
    getFetchSavedAppliesLoading,
    getSavedApplies,
    getExtraTabs,
    getNeedManualSetTabIndex,
    getTabIndexToNeedManualSet,
    getShowCreateApplyResourceBtn
} from './reducers'
import { getApplyResourceForSelect, getResourceTypes } from '@app/reducers'
import {
    SwitchApplyTypeAction,
    AddApplyResourcesAction,
    CreateApplyResourceAction,
    EditTempApplyResourceAction,
    DeleteApplyResourceAction,
    SaveSystemOnOffApplyAction,
    SubmitSystemOnOffApplySuccessAction,
    ResetSystemOnOffApplyAction,
    FetchApplyInfoAction,
    FetchApproversAction,
    SubmitSystemOnOffApplyAction,
    FetchListNumberAction
} from './actions/system-onoff.action'
import {
    FetchSavedAppliesAction,
    ToDetailSavedApplyAction,
    ToEditSavedApplyAction,
    SubmitSavedApplyAction,
    DeleteSavedApplyAction
} from './actions/saved-apply.action'

import * as fromExtraTabs from './actions/extra-tabs.action'

import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'
import {
    ToCreateApplyResourceComponent,
    ToEditApplyResourceComponent,
    ToShowApplyResourceComponent,
    ToAddApplyResourceComponent
} from '@shared/modals'
import {
    ApplyInfo,
    Approver,
    SystemOnOffApply,
    TabOptions
} from '@core/models/system-onoff.model'
import { ResourceInfo } from '@core/models/resource-info.model'
import { ToSelectOffLineSystemComponent } from './modals/to-select-offline-system/to-select-offline-system.component'
import {
    CloseExtraTabAction,
    ResetNeedManualSetTabIndexAction
} from './actions/extra-tabs.action'
import {
    filter,
    takeUntil,
    mergeMap,
    distinctUntilChanged,
    map,
    withLatestFrom,
    first
} from 'rxjs/operators'

@Component({
    selector: 'app-system-onoff',
    templateUrl: './system-onoff.component.html',
    styleUrls: ['./system-onoff.component.less'],
    providers: [DestroyService]
})
export class SystemOnOffComponent implements OnInit {
    tabIndex = 0
    tabChangeSub: Subject<number> = new Subject<number>()

    // 第一个tab
    applyForm: FormGroup

    saveOrSubmitText$: Observable<string>
    saveOrSubmitLoading$: Observable<boolean>
    toSaveSub: Subject<SystemOnOffApply> = new Subject<SystemOnOffApply>()
    toSubmitSub: Subject<SystemOnOffApply> = new Subject<SystemOnOffApply>()
    toResetSub: Subject<SystemOnOffApply> = new Subject<SystemOnOffApply>()

    showCreateApplyResourceBtn$: Observable<boolean>
    fetchApplyInfoLoading$: Observable<boolean>
    applyInfo$: Observable<ApplyInfo>

    addedApplyResources$: Observable<ResourceInfo[]>
    toSelectOffLineSystemSub: Subject<void> = new Subject<void>()
    toCreateResourceSub: Subject<void> = new Subject<void>()
    toAddResourcesSub: Subject<void> = new Subject<void>()
    toShowResourceSub: Subject<ResourceInfo> = new Subject<ResourceInfo>()
    toEditTempResourceSub: Subject<ResourceInfo> = new Subject<ResourceInfo>()
    toDeleteResourceSub: Subject<number> = new Subject<number>()

    fetchApproversLoading$: Observable<boolean>
    approvers$: Observable<Approver[]>

    // 第二个tab
    fetchSavedAppliesLoading$: Observable<boolean>
    savedApplies$: Observable<SystemOnOffApply[]>
    toEditSavedApplySub: Subject<SystemOnOffApply> = new Subject<
        SystemOnOffApply
    >()
    toDetailSavedApplySub: Subject<SystemOnOffApply> = new Subject<
        SystemOnOffApply
    >()
    toSubmitSavedApplySub: Subject<SystemOnOffApply> = new Subject<
        SystemOnOffApply
    >()
    toDeleteSavedApplySub: Subject<SystemOnOffApply> = new Subject<
        SystemOnOffApply
    >()

    // 额外的tabs
    extraTabs$: Observable<TabOptions[]>
    toCloseExtraTabSub: Subject<string> = new Subject<string>()
    cancelEditSub: Subject<void> = new Subject<void>()
    ensureEditSub: Subject<void> = new Subject<void>()
    EDIT_EXTRA_TAB_ACTION = TabAction.EDIT
    DETAIL_EXTRA_TAB_ACTION = TabAction.DETAIL

    get type() {
        return this.applyForm.controls.type
    }
    get listNumber() {
        return this.applyForm.controls.listNumber
    }
    get systemName() {
        return this.applyForm.controls.systemName
    }
    get version() {
        return this.applyForm.controls.version
    }
    get onlineTime() {
        return this.applyForm.controls.onlineTime
    }
    get devDept() {
        return this.applyForm.controls.devDept
    }
    get projectName() {
        return this.applyForm.controls.projectName
    }
    get projectOwner() {
        return this.applyForm.controls.projectOwner
    }
    get projectOwnerPhone() {
        return this.applyForm.controls.projectOwnerPhone
    }
    get techOwner() {
        return this.applyForm.controls.techOwner
    }
    get techOwnerPhone() {
        return this.applyForm.controls.techOwnerPhone
    }
    get description() {
        return this.applyForm.controls.description
    }
    get remark() {
        return this.applyForm.controls.remark
    }

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.buildForm()
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    tabChange(tabIndex: number) {
        this.tabChangeSub.next(tabIndex)
    }

    toSelectOffLineSystem() {
        this.toSelectOffLineSystemSub.next()
    }

    toCreateResource() {
        this.toCreateResourceSub.next()
    }

    toAddResources() {
        this.toAddResourcesSub.next()
    }

    toShowResource(resource: ResourceInfo) {
        this.toShowResourceSub.next(resource)
    }

    toEditTempResource(resource: ResourceInfo) {
        this.toEditTempResourceSub.next(resource)
    }

    toDeleteResource(index: number) {
        this.toDeleteResourceSub.next(index)
    }

    toSave() {
        this.toSaveSub.next()
    }

    toSubmit() {
        this.toSubmitSub.next()
    }

    toCancel() {
        this.toResetSub.next()
    }

    toShowSavedApply(apply: SystemOnOffApply) {
        this.toDetailSavedApplySub.next(apply)
    }

    toEditSavedApply(apply: SystemOnOffApply) {
        this.toEditSavedApplySub.next(apply)
    }

    toSubmitSavedApply(apply: SystemOnOffApply) {
        this.toSubmitSavedApplySub.next(apply)
    }

    toDeleteSavedApply(apply: SystemOnOffApply) {
        this.toDeleteSavedApplySub.next(apply)
    }

    closeTab(id: string) {
        this.toCloseExtraTabSub.next(id)
    }

    toCancelEdit() {
        this.cancelEditSub.next()
    }

    toEnsureEdit() {
        this.ensureEditSub.next()
    }

    private buildForm(): void {
        this.applyForm = this.fb.group({
            type: [null, Validators.required],
            listNumber: [null, Validators.required],
            systemName: [null, Validators.required],
            version: [null, Validators.required],
            onlineTime: [null, Validators.required],
            devDept: [null, Validators.required],
            projectName: [null, Validators.required],
            projectOwner: [null, Validators.required],
            projectOwnerPhone: [null, Validators.required],
            techOwner: [null, Validators.required],
            techOwnerPhone: [null, Validators.required],
            description: [null, Validators.required],
            remark: [null, Validators.required]
        })
    }

    private intDataSource(): void {
        this.initFirstTabDataSource()
        this.initSecondTabDataSource()
        this.initExtraTabsDataSource()
    }

    private initFirstTabDataSource() {
        this.saveOrSubmitText$ = this.store.select(getSaveOrSubmitText)
        this.saveOrSubmitLoading$ = this.store.select(getSaveOrSubmitLoading)

        this.fetchApplyInfoLoading$ = this.store.select(
            getFetchApplyInfoLoading
        )
        this.applyInfo$ = this.store.select(getApplyInfo)

        this.addedApplyResources$ = this.store.select(getAddedApplyResources)
        this.showCreateApplyResourceBtn$ = this.store.select(
            getShowCreateApplyResourceBtn
        )
        this.fetchApproversLoading$ = this.store.select(
            getFetchApproversLoading
        )
        this.approvers$ = this.store.select(getApprovers)
    }

    private initSecondTabDataSource() {
        this.fetchSavedAppliesLoading$ = this.store.select(
            getFetchSavedAppliesLoading
        )
        this.savedApplies$ = this.store.select(getSavedApplies)
    }

    private initExtraTabsDataSource() {
        this.extraTabs$ = this.store.select(getExtraTabs)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchListNumberAction())
    }

    private initSubscriber(): void {
        this.initFirstTabSubscriber()
        this.initSecondTabSubscriber()
        this.initExtraTabsSubscriber()
    }

    private initFirstTabSubscriber() {
        this.initSwitchApplyType()
        this.initPatchListNumber()
        this.initSelectOffLineSystem()

        this.initSaveRequirementApply()
        this.initSubmitRequirementApply()
        this.initResetRequirementApply()

        this.initCreateApplyResource()
        this.initAddApplyResources()
        this.initShowApplyResource()
        this.initEditTempApplyResource()
        this.initDeleteApplyResource()
    }

    private initSecondTabSubscriber() {
        this.initFetchSavedApplies()
        this.initToShowSavedApply()
        this.initToEditSavedApply()
        this.initToSubmitSavedApply()
        this.initToDeleteSavedApply()
    }

    private initExtraTabsSubscriber() {
        this.initCloseExtraTab()
        this.initNeedManualResetTabIndex()

        this.initSwitchApplyTypeForExtra()
        this.initCancelEdit()
        this.initEnsureEdit()

        this.initCreateApplyResourceForExtra()
        this.initAddApplyResourcesForExtra()
        this.initEditTempApplyResourceForExtra()
        this.initShowApplyResourceForExtra()
        this.initDeleteApplyResourceForExtra()
    }

    private initSwitchApplyType() {
        this.type.valueChanges
            .pipe(filter(e => !!e), takeUntil(this.destroyService))
            .subscribe(applyType => {
                this.store.dispatch(new SwitchApplyTypeAction(applyType))
                if (applyType === '上线') {
                    this.clearApplyForm()
                }
            })
    }

    private initPatchListNumber() {
        this.store
            .select(getListNumber)
            .pipe(takeUntil(this.destroyService))
            .subscribe(listNumber => {
                this.applyForm.patchValue({
                    listNumber
                })
            })
    }

    private clearApplyForm() {
        this.applyForm.patchValue({
            systemName: '',
            version: '',
            onlineTime: '',
            devDept: '',
            projectName: '',
            projectOwner: '',
            projectOwnerPhone: '',
            techOwner: '',
            techOwnerPhone: ''
        })
    }

    private initSelectOffLineSystem() {
        this.toSelectOffLineSystemSub
            .asObservable()
            .pipe(
                mergeMap(() => {
                    return this.modalService.open({
                        title: '选择下线系统',
                        content: ToSelectOffLineSystemComponent,
                        footer: false,
                        width: 1000
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(system => {
                this.applyForm.patchValue(system)
            })
    }

    private initSaveRequirementApply() {
        this.toSaveSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(new SaveSystemOnOffApplyAction())
            })
    }

    private initSubmitRequirementApply() {
        this.toSubmitSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(new SubmitSystemOnOffApplyAction())
            })
    }

    private initResetRequirementApply() {
        this.toResetSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(new ResetSystemOnOffApplyAction())
            })
    }

    private initCreateApplyResource() {
        this.toCreateResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex < 2),
                withLatestFrom(this.store.select(getApplyResourceForSelect)),
                mergeMap(([_, applyResourceForSelect]) => {
                    return this.modalService.open({
                        title: '新建资源信息',
                        content: ToCreateApplyResourceComponent,
                        footer: false,
                        width: 800,
                        componentParams: { applyResourceForSelect }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resource => {
                this.store.dispatch(new CreateApplyResourceAction(resource))
            })
    }

    private initAddApplyResources() {
        this.toAddResourcesSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex < 2),
                withLatestFrom(this.store.select(getResourceTypes)),
                mergeMap(([_, resourceTypes]) => {
                    return this.modalService.open({
                        title: '选择资源信息',
                        content: ToAddApplyResourceComponent,
                        footer: false,
                        width: 1000,
                        componentParams: { resourceTypes }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resources => {
                this.store.dispatch(new AddApplyResourcesAction(resources))
            })
    }

    private initShowApplyResource() {
        this.toShowResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex < 2),
                mergeMap(resource => {
                    return this.modalService.open({
                        title: `${resource.id ? '添加' : '新增'}的资源信息`,
                        content: ToShowApplyResourceComponent,
                        footer: false,
                        width: 800,
                        componentParams: { resource }
                    })
                }),
                takeUntil(this.destroyService)
            )
            .subscribe(() => {})
    }

    private initEditTempApplyResource() {
        this.toEditTempResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex < 2),
                withLatestFrom(this.store.select(getApplyResourceForSelect)),
                mergeMap(([resource, applyResourceForSelect]) => {
                    return this.modalService.open({
                        title: '新增的资源信息',
                        content: ToEditApplyResourceComponent,
                        footer: false,
                        width: 1000,
                        componentParams: { resource, applyResourceForSelect }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resource => {
                this.store.dispatch(new EditTempApplyResourceAction(resource))
            })
    }

    private initDeleteApplyResource() {
        this.toDeleteResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex < 2),
                takeUntil(this.destroyService)
            )
            .subscribe(index => {
                this.modalService.confirm({
                    title: '删除资源信息',
                    content: '确定删除这个资源信息?',
                    onOk: () => {
                        this.store.dispatch(
                            new DeleteApplyResourceAction(index)
                        )
                    }
                })
            })
    }

    private initFetchSavedApplies() {
        this.tabChangeSub
            .asObservable()
            .pipe(
                filter(tabIndex => tabIndex === 1),
                first(),
                takeUntil(this.destroyService)
            )
            .subscribe(tabIndex => {
                this.store.dispatch(new FetchSavedAppliesAction())
            })
    }

    private initToShowSavedApply() {
        this.toDetailSavedApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.store.dispatch(new ToDetailSavedApplyAction(apply))
            })
    }

    private initToEditSavedApply() {
        this.toEditSavedApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.store.dispatch(new ToEditSavedApplyAction(apply))
            })
    }

    private initToSubmitSavedApply() {
        this.toSubmitSavedApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.modalService.confirm({
                    title: '提交申请',
                    content: '确定提交这个申请?',
                    onOk: () => {
                        this.store.dispatch(new SubmitSavedApplyAction(apply))
                    }
                })
            })
    }

    private initToDeleteSavedApply() {
        this.toDeleteSavedApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.modalService.confirm({
                    title: '删除申请',
                    content: '确定删除这个申请?',
                    onOk: () => {
                        this.store.dispatch(new DeleteSavedApplyAction(apply))
                    }
                })
            })
    }

    private initCloseExtraTab() {
        this.toCloseExtraTabSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(id => {
                this.store.dispatch(new CloseExtraTabAction(id))
            })
    }

    private initNeedManualResetTabIndex() {
        this.store
            .select(getNeedManualSetTabIndex)
            .pipe(
                filter(e => e),
                withLatestFrom(this.store.select(getTabIndexToNeedManualSet)),
                takeUntil(this.destroyService)
            )
            .subscribe(([_, tabIndex]) => {
                this.tabIndex = tabIndex + 2
                this.store.dispatch(new ResetNeedManualSetTabIndexAction())
            })
    }

    private initSwitchApplyTypeForExtra() {
        this.extraTabs$
            .pipe(
                mergeMap(tabs => {
                    return merge(
                        ...tabs.map((tab, i) =>
                            tab.data.applyInfoForm
                                .get('type')
                                .valueChanges.pipe(
                                    map(e => ({
                                        applyType: e,
                                        tabIndex: i
                                    }))
                                )
                        )
                    )
                }),
                distinctUntilChanged(
                    (prev, curr) =>
                        prev.applyType === curr.applyType &&
                        prev.tabIndex === curr.tabIndex
                ),
                takeUntil(this.destroyService)
            )
            .subscribe(payload => {
                this.store.dispatch(
                    new fromExtraTabs.SwitchApplyTypeAction({
                        applyType: payload.applyType,
                        tabIndex: payload.tabIndex
                    })
                )
            })
    }

    private initCancelEdit() {
        this.cancelEditSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new fromExtraTabs.CancelEditSystemOnOffApplyAction(
                        this.tabIndex - 2
                    )
                )
            })
    }

    private initEnsureEdit() {
        this.ensureEditSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new fromExtraTabs.EnsureEditSystemOnOffApplyAction(
                        this.tabIndex - 2
                    )
                )
            })
    }

    private initCreateApplyResourceForExtra() {
        this.toCreateResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex >= 2),
                withLatestFrom(this.store.select(getApplyResourceForSelect)),
                mergeMap(([_, applyResourceForSelect]) => {
                    return this.modalService.open({
                        title: '新建资源信息',
                        content: ToCreateApplyResourceComponent,
                        footer: false,
                        width: 800,
                        componentParams: { applyResourceForSelect }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resource => {
                this.store.dispatch(
                    new fromExtraTabs.CreateApplyResourceAction({
                        applyResource: resource,
                        tabIndex: this.tabIndex - 2
                    })
                )
            })
    }

    private initAddApplyResourcesForExtra() {
        this.toAddResourcesSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex >= 2),
                withLatestFrom(this.store.select(getResourceTypes)),
                mergeMap(([_, resourceTypes]) => {
                    return this.modalService.open({
                        title: '选择资源信息',
                        content: ToAddApplyResourceComponent,
                        footer: false,
                        width: 1000,
                        componentParams: { resourceTypes }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resources => {
                this.store.dispatch(
                    new fromExtraTabs.AddApplyResourcesAction({
                        tabIndex: this.tabIndex - 2,
                        applyResources: resources
                    })
                )
            })
    }

    private initEditTempApplyResourceForExtra() {
        this.toEditTempResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex >= 2),
                withLatestFrom(this.store.select(getApplyResourceForSelect)),
                mergeMap(([resource, applyResourceForSelect]) => {
                    return this.modalService.open({
                        title: '新增的资源信息',
                        content: ToEditApplyResourceComponent,
                        footer: false,
                        width: 1000,
                        componentParams: { resource, applyResourceForSelect }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resource => {
                this.store.dispatch(
                    new fromExtraTabs.EditTempApplyResourceAction({
                        tabIndex: this.tabIndex - 2,
                        resource
                    })
                )
            })
    }

    private initShowApplyResourceForExtra() {
        this.toShowResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex >= 2),
                mergeMap(resource => {
                    return this.modalService.open({
                        title: `${resource.id ? '添加' : '新增'}的资源信息`,
                        content: ToShowApplyResourceComponent,
                        footer: false,
                        width: 800,
                        componentParams: { resource }
                    })
                }),
                takeUntil(this.destroyService)
            )
            .subscribe(() => {})
    }

    private initDeleteApplyResourceForExtra() {
        this.toDeleteResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex >= 2),
                takeUntil(this.destroyService)
            )
            .subscribe(index => {
                this.modalService.confirm({
                    title: '删除资源信息',
                    content: '确定删除这个资源信息?',
                    onOk: () => {
                        this.store.dispatch(
                            new fromExtraTabs.DeleteApplyResourceAction({
                                tabIndex: this.tabIndex - 2,
                                resourceIndex: index
                            })
                        )
                        console.log(
                            `delete apply resource; tab index: ${
                                this.tabIndex
                            }; resource index: ${index}`
                        )
                    }
                })
            })
    }
}
