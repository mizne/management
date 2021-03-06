import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import { XlsxService } from '@delon/abc'
import {
    State,
    getUnifiedSaveOrSubmitLoading,
    getUnifiedSaveOrSubmitText,
    getFetchApplyInfoLoading,
    getApplyInfo,
    getFetchApproversLoading,
    getApprovers,
    getUnifiedAddedApplyResources,
    getAddableApplyResources,
    getFetchSavedUnifiedAppliesLoading,
    getSavedUnifiedApplies,
    getExtraTabs,
    getNeedManualSetTabIndex,
    getTabIndexToNeedManualSet,
    getFetchSavedSubPackageAppliesLoading,
    getSavedSubPackageApplies,
    getSubPackageSaveOrSubmitText,
    getSubPackageSaveOrSubmitLoading,
    getFetchSubPackageInfoLoading,
    getSubPackageInfo,
    getSubPackageAddedApplyResources
} from './reducers'
import { getApplyResourceForSelect, getResourceTypes } from '@app/reducers'
import {
    AddApplyResourcesAction,
    CreateApplyResourceAction,
    EditTempApplyResourceAction,
    DeleteApplyResourceAction,
    SaveUnifiedApplyAction,
    SubmitUnifiedApplySuccessAction,
    ResetUnifiedApplyAction,
    FetchApplyInfoAction,
    FetchApproversAction,
    SubmitUnifiedApplyAction
} from './actions/unified-apply.action'
import * as fromSubPackage from './actions/subpackage-apply.action'
import {
    FetchSavedUnifiedAppliesAction,
    ToDetailSavedUnifiedApplyAction,
    ToEditSavedUnifiedApplyAction,
    SubmitSavedUnifiedApplyAction,
    DeleteSavedUnifiedApplyAction,
    FetchSavedSubPackageAppliesAction,
    ToDetailSavedSubPackageApplyAction,
    ToEditSavedSubPackageApplyAction,
    SubmitSavedSubPackageApplyAction,
    DeleteSavedSubPackageApplyAction
} from './actions/saved-apply.action'

import * as fromExtraTabs from './actions/extra-tabs.action'

import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'
import {
    ToCreateApplyResourceComponent,
    ToEditApplyResourceComponent,
    ToShowApplyResourceComponent,
    ToAddApplyResourceComponent,
    ToCreateDividePakageComponent
} from '@shared/modals'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import {
    ApplyInfo,
    Approver,
    UnifiedApply,
    SubPackageApply,
    TabOptions,
    TabAction,
    SubPackageInfo
} from '@core/models/unified-apply.model'
import { ResourceInfo } from '@core/models/resource-info.model'
import {
    CloseExtraTabAction,
    ResetNeedManualSetTabIndexAction
} from './actions/extra-tabs.action'
import {
    SaveSubPackageApplyAction,
    SubmitSubPackageApplyAction,
    ResetSubPackageApplyAction
} from './actions/subpackage-apply.action'
import {
    filter,
    takeUntil,
    mergeMap,
    withLatestFrom,
    first
} from 'rxjs/operators'

@Component({
    selector: 'app-unified-apply',
    templateUrl: './unified-apply.component.html',
    styleUrls: ['./unified-apply.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnifiedApplyComponent implements OnInit {
    tabIndex = 0
    tabChangeSub: Subject<number> = new Subject<number>()

    // 第一个tab
    applyInfoForm: FormGroup

    saveOrSubmitUnifiedText$: Observable<string>
    saveOrSubmitUnifiedLoading$: Observable<boolean>
    toSaveUnifiedSub: Subject<UnifiedApply> = new Subject<UnifiedApply>()
    toSubmitUnifiedSub: Subject<UnifiedApply> = new Subject<UnifiedApply>()
    toResetUnifiedSub: Subject<UnifiedApply> = new Subject<UnifiedApply>()

    fetchApplyInfoLoading$: Observable<boolean>
    applyInfo$: Observable<ApplyInfo>

    unifiedAddedApplyResources$: Observable<ResourceInfo[]>
    toExportSub: Subject<void> = new Subject<void>()
    toCreateResourceSub: Subject<void> = new Subject<void>()
    //
    toDividePackage: Subject<void> = new Subject<void>()
    //
    toAddResourcesSub: Subject<void> = new Subject<void>()
    toShowResourceSub: Subject<ResourceInfo> = new Subject<ResourceInfo>()
    toEditTempResourceSub: Subject<ResourceInfo> = new Subject<ResourceInfo>()
    toDeleteResourceSub: Subject<number> = new Subject<number>()

    fetchApproversLoading$: Observable<boolean>
    approvers$: Observable<Approver[]>

    // 第二个tab
    subPackageInfoForm: FormGroup

    saveOrSubmitSubPackageText$: Observable<string>
    saveOrSubmitSubPackageLoading$: Observable<boolean>
    toSaveSubPackageSub: Subject<SubPackageApply> = new Subject<
        SubPackageApply
        >()
    toSubmitSubPackageSub: Subject<SubPackageApply> = new Subject<
        SubPackageApply
        >()
    toResetSubPackageSub: Subject<SubPackageApply> = new Subject<
        SubPackageApply
        >()

    fetchSubPackageInfoLoading$: Observable<boolean>
    subPackageInfo$: Observable<SubPackageInfo>

    subPackageAddedApplyResources$: Observable<ResourceInfo[]>

    // 第三个tab
    fetchSavedUnifiedAppliesLoading$: Observable<boolean>
    savedUnifiedApplies$: Observable<UnifiedApply[]>
    toEditSavedUnifiedApplySub: Subject<UnifiedApply> = new Subject<
        UnifiedApply
        >()
    toDetailSavedUnifiedApplySub: Subject<UnifiedApply> = new Subject<
        UnifiedApply
        >()
    toSubmitSavedUnifiedApplySub: Subject<UnifiedApply> = new Subject<
        UnifiedApply
        >()
    toDeleteSavedUnifiedApplySub: Subject<UnifiedApply> = new Subject<
        UnifiedApply
        >()
    fetchSavedSubPackageAppliesLoading$: Observable<boolean>
    savedSubPackageApplies$: Observable<SubPackageApply[]>
    toEditSavedSubPackageApplySub: Subject<SubPackageApply> = new Subject<
        SubPackageApply
        >()
    toDetailSavedSubPackageApplySub: Subject<SubPackageApply> = new Subject<
        SubPackageApply
        >()
    toSubmitSavedSubPackageApplySub: Subject<SubPackageApply> = new Subject<
        SubPackageApply
        >()
    toDeleteSavedSubPackageApplySub: Subject<SubPackageApply> = new Subject<
        SubPackageApply
        >()

    // 额外的tabs
    extraTabs$: Observable<TabOptions[]>
    toCloseExtraTabSub: Subject<string> = new Subject<string>()
    cancelEditSub: Subject<void> = new Subject<void>()
    ensureEditSub: Subject<void> = new Subject<void>()
    EDIT_UNIFIED_EXTRA_TAB_ACTION = TabAction.EDIT_UNIFIED_APPLY
    DETAIL_UNIFIED_EXTRA_TAB_ACTION = TabAction.DETAIL_UNIFIED_APPLY
    EDIT_SUBPACKAGE_EXTRA_TAB_ACTION = TabAction.EDIT_SUBPACKAGE_APPLY
    DETAIL_SUBPACKAGE_EXTRA_TAB_ACTION = TabAction.DETAIL_SUBPACKAGE_APPLY

    get applyListNumber() {
        return this.applyInfoForm.controls.listNumber
    }
    get applyApplicantName() {
        return this.applyInfoForm.controls.applicantName
    }
    get applyApplicantDept() {
        return this.applyInfoForm.controls.applicantDept
    }
    get applyApplicantPhone() {
        return this.applyInfoForm.controls.applicantPhone
    }
    get applyApplyReason() {
        return this.applyInfoForm.controls.applyReason
    }

    get subPackageListNumber() {
        return this.subPackageInfoForm.controls.subPackageNumber
    }
    get subPackageApplicantName() {
        return this.subPackageInfoForm.controls.applicantName
    }
    get subPackageApplicantDept() {
        return this.subPackageInfoForm.controls.applicantDept
    }
    get subPackageApplicantPhone() {
        return this.subPackageInfoForm.controls.applicantPhone
    }
    get subPackageApplyReason() {
        return this.subPackageInfoForm.controls.applyReason
    }

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService,
        private fb: FormBuilder,
        private xlsx: XlsxService
    ) { }

    ngOnInit() {
        this.buildForm()
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    tabChange(tabIndex: number) {
        this.tabChangeSub.next(tabIndex)
    }

    // 第一个tab
    toExport() {
        console.log('to export excel')
        this.toExportSub.next()
    }

    toUpload() {
        console.log('to upload file')
    }

    toCreateResource() {
        this.toCreateResourceSub.next()
    }
    // 分包
    toDividePackageWindow() {
        this.toDividePackage.next();
    }

    //

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

    toSaveUnified() {
        this.toSaveUnifiedSub.next()
    }

    toSubmitUnified() {
        this.toSubmitUnifiedSub.next()
    }

    toCancelUnified() {
        this.toResetUnifiedSub.next()
    }

    // 第二个tab
    toSaveSubPackage() {
        this.toSaveSubPackageSub.next()
    }

    toSubmitSubPackage() {
        this.toSubmitSubPackageSub.next()
    }

    toCancelSubPackage() {
        this.toResetSubPackageSub.next()
    }

    // 第三个tab
    toShowSavedUnifiedApply(apply: UnifiedApply) {
        this.toDetailSavedUnifiedApplySub.next(apply)
    }

    toEditSavedUnifiedApply(apply: UnifiedApply) {
        this.toEditSavedUnifiedApplySub.next(apply)
    }

    toSubmitSavedUnifiedApply(apply: UnifiedApply) {
        this.toSubmitSavedUnifiedApplySub.next(apply)
    }

    toDeleteSavedUnifiedApply(apply: UnifiedApply) {
        this.toDeleteSavedUnifiedApplySub.next(apply)
    }

    toShowSavedSubPackageApply(apply: SubPackageApply) {
        this.toDetailSavedSubPackageApplySub.next(apply)
    }

    toEditSavedSubPackageApply(apply: SubPackageApply) {
        this.toEditSavedSubPackageApplySub.next(apply)
    }

    toSubmitSavedSubPackageApply(apply: SubPackageApply) {
        this.toSubmitSavedSubPackageApplySub.next(apply)
    }

    toDeleteSavedSubPackageApply(apply: SubPackageApply) {
        this.toDeleteSavedSubPackageApplySub.next(apply)
    }

    // 额外tabs
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
        this.applyInfoForm = this.fb.group({
            type: [null, Validators.required],
            listNumber: [null, Validators.required],
            applicantName: [null, Validators.required],
            applicantDept: [null, Validators.required],
            applicantPhone: [null, Validators.required],
            applyReason: [null]
        })

        this.subPackageInfoForm = this.fb.group({
            subPackageNumber: [null, Validators.required],
            applicantName: [null, Validators.required],
            applicantDept: [null, Validators.required],
            applicantPhone: [null, Validators.required],
            applyReason: [null, Validators.required]
        })
    }

    private intDataSource(): void {
        this.initFirstTabDataSource()
        this.initSecondTabDataSource()
        this.initThirdTabDataSource()
        this.initExtraTabsDataSource()
    }

    private initFirstTabDataSource() {
        this.saveOrSubmitUnifiedText$ = this.store.select(
            getUnifiedSaveOrSubmitText
        )
        this.saveOrSubmitUnifiedLoading$ = this.store.select(
            getUnifiedSaveOrSubmitLoading
        )

        this.fetchApplyInfoLoading$ = this.store.select(
            getFetchApplyInfoLoading
        )
        this.applyInfo$ = this.store.select(getApplyInfo)

        this.unifiedAddedApplyResources$ = this.store.select(
            getUnifiedAddedApplyResources
        )

        this.fetchApproversLoading$ = this.store.select(
            getFetchApproversLoading
        )
        this.approvers$ = this.store.select(getApprovers)
    }

    private initSecondTabDataSource() {
        this.saveOrSubmitSubPackageText$ = this.store.select(
            getSubPackageSaveOrSubmitText
        )
        this.saveOrSubmitSubPackageLoading$ = this.store.select(
            getSubPackageSaveOrSubmitLoading
        )
        this.fetchSubPackageInfoLoading$ = this.store.select(
            getFetchSubPackageInfoLoading
        )
        this.subPackageInfo$ = this.store.select(getSubPackageInfo)
        this.subPackageAddedApplyResources$ = this.store.select(
            getSubPackageAddedApplyResources
        )
    }

    private initThirdTabDataSource() {
        this.fetchSavedUnifiedAppliesLoading$ = this.store.select(
            getFetchSavedUnifiedAppliesLoading
        )
        this.savedUnifiedApplies$ = this.store.select(getSavedUnifiedApplies)

        this.fetchSavedSubPackageAppliesLoading$ = this.store.select(
            getFetchSavedSubPackageAppliesLoading
        )
        this.savedSubPackageApplies$ = this.store.select(
            getSavedSubPackageApplies
        )
    }

    private initExtraTabsDataSource() {
        this.extraTabs$ = this.store.select(getExtraTabs)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchApplyInfoAction())
        this.store.dispatch(new FetchApproversAction())

        this.store.dispatch(new fromSubPackage.FetchSubPackageInfoAction())
    }

    private initSubscriber(): void {
        this.initFirstTabSubscriber()
        this.initSecondTabSubscriber()
        this.initThirdTabSubscriber()
        this.initExtraTabsSubscriber()
    }

    private initFirstTabSubscriber() {
        this.initPatchApplyInfo()

        this.initExportExcel()

        this.initSaveUnifiedApply()
        this.initSubmitUnifiedApply()
        this.initResetUnifiedApply()

        this.initCreateApplyResourceForUnified()
        this.initAddApplyResourcesForUnified()
        this.initShowApplyResourceForUnified()
        this.initEditTempApplyResourceForUnified()
        this.initDeleteApplyResourceForUnified()

        // 分包
        this.initCreateDividePackage()
    }

    private initSecondTabSubscriber() {
        this.initPatchSubPackageInfo()

        this.initSaveSubPackageApply()
        this.initSubmitSubPackageApply()
        this.initResetSubPackageApply()

        this.initAddApplyResourcesForSubPackage()
        this.initShowApplyResourceForSubPackage()
        this.initDeleteApplyResourceForSubPackage()
    }

    private initThirdTabSubscriber() {
        this.initFetchSavedApplies()
        this.initToShowSavedApply()
        this.initToEditSavedApply()
        this.initToSubmitSavedApply()
        this.initToDeleteSavedApply()
    }

    private initExtraTabsSubscriber() {
        this.initCloseExtraTab()
        this.initNeedManualResetTabIndex()

        this.initCancelEdit()
        this.initEnsureEdit()

        this.initCreateApplyResourceForExtra()
        this.initAddApplyResourcesForExtra()
        this.initEditTempApplyResourceForExtra()
        this.initShowApplyResourceForExtra()
        this.initDeleteApplyResourceForExtra()
    }

    private initPatchApplyInfo() {
        this.store
            .select(getApplyInfo)
            .pipe(takeUntil(this.destroyService))
            .subscribe(applyInfo => {
                if (applyInfo) {
                    this.applyInfoForm.patchValue(applyInfo, {
                        emitEvent: false
                    })
                } else {
                    this.applyInfoForm.reset()
                }
            })
    }

    private initExportExcel() {
        this.toExportSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.xlsx.export({
                    sheets: [
                        {
                            data: [
                                ['编号', '姓名'],
                                ['编号1', '姓名1'],
                                ['编号2', '姓名2']
                            ],
                            name: 'sheet name'
                        }
                    ],
                    filename: 'test.xlsx'
                })
            })
    }

    private initSaveUnifiedApply() {
        this.toSaveUnifiedSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(new SaveUnifiedApplyAction())
            })
    }

    private initSubmitUnifiedApply() {
        this.toSubmitUnifiedSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(new SubmitUnifiedApplyAction())
            })
    }

    private initResetUnifiedApply() {
        this.toResetUnifiedSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(new ResetUnifiedApplyAction())
            })
    }

    private initCreateApplyResourceForUnified() {
        this.toCreateResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex === 0),
                withLatestFrom(this.store.select(getApplyResourceForSelect)),
                mergeMap(([_, applyResourceForSelect]) => {
                    return this.modalService.open({
                        title: '新建资源信息',
                        content: ToCreateApplyResourceComponent,
                        footer: false,
                        width: 800,
                        componentParams: {
                            applyResourceForSelect
                        }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resource => {
                this.store.dispatch(new CreateApplyResourceAction(resource))
            })
    }
    // 分包窗口
    private initCreateDividePackage() {
        this.toDividePackage
            .asObservable()
            .pipe(
                filter(() => this.tabIndex === 0),
                mergeMap(resource => {
                    return this.modalService.open({
                        title: '编辑分包',
                        content: ToCreateDividePakageComponent,
                        footer: false,
                        width: 800,
                        // componentParams: { resource }
                    })
                }),
                takeUntil(this.destroyService)
            )
            .subscribe(() => { })
    }


    private initAddApplyResourcesForUnified() {
        this.toAddResourcesSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex === 0),
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

    private initShowApplyResourceForUnified() {
        this.toShowResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex === 0),
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
            .subscribe(() => { })
    }

    private initEditTempApplyResourceForUnified() {
        this.toEditTempResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex === 0),
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

    private initDeleteApplyResourceForUnified() {
        this.toDeleteResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex === 0),
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

    private initPatchSubPackageInfo() {
        this.store
            .select(getSubPackageInfo)
            .pipe(takeUntil(this.destroyService))
            .subscribe(subPackageInfo => {
                if (subPackageInfo) {
                    this.subPackageInfoForm.patchValue(subPackageInfo, {
                        emitEvent: false
                    })
                } else {
                    this.subPackageInfoForm.reset()
                }
            })
    }

    private initSaveSubPackageApply() {
        this.toSaveSubPackageSub
            .asObservable()
            .pipe(
                withLatestFrom(this.subPackageAddedApplyResources$),
                takeUntil(this.destroyService)
            )
            .subscribe(([_, resources]) => {
                console.log(resources)
                this.store.dispatch(new SaveSubPackageApplyAction())
            })
    }

    private initSubmitSubPackageApply() {
        this.toSubmitSubPackageSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(new SubmitSubPackageApplyAction())
            })
    }

    private initResetSubPackageApply() {
        this.toResetSubPackageSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(new ResetSubPackageApplyAction())
            })
    }

    private initAddApplyResourcesForSubPackage() {
        this.toAddResourcesSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex === 1),
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
                    new fromSubPackage.AddApplyResourcesAction(resources)
                )
            })
    }

    private initShowApplyResourceForSubPackage() {
        this.toShowResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex === 1),
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
            .subscribe(() => { })
    }

    private initDeleteApplyResourceForSubPackage() {
        this.toDeleteResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex === 1),
                takeUntil(this.destroyService)
            )
            .subscribe(index => {
                this.modalService.confirm({
                    title: '删除资源信息',
                    content: '确定删除这个资源信息?',
                    onOk: () => {
                        this.store.dispatch(
                            new fromSubPackage.DeleteApplyResourceAction(index)
                        )
                    }
                })
            })
    }

    private initFetchSavedApplies() {
        this.tabChangeSub
            .asObservable()
            .pipe(
                filter(tabIndex => tabIndex === 2),
                first(),
                takeUntil(this.destroyService)
            )
            .subscribe(tabIndex => {
                this.store.dispatch(new FetchSavedUnifiedAppliesAction())
                this.store.dispatch(new FetchSavedSubPackageAppliesAction())
            })
    }

    private initToShowSavedApply() {
        this.toDetailSavedUnifiedApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.store.dispatch(new ToDetailSavedUnifiedApplyAction(apply))
            })

        this.toDetailSavedSubPackageApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.store.dispatch(
                    new ToDetailSavedSubPackageApplyAction(apply)
                )
            })
    }

    private initToEditSavedApply() {
        this.toEditSavedUnifiedApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.store.dispatch(new ToEditSavedUnifiedApplyAction(apply))
            })

        this.toEditSavedSubPackageApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.store.dispatch(new ToEditSavedSubPackageApplyAction(apply))
            })
    }

    private initToSubmitSavedApply() {
        this.toSubmitSavedUnifiedApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.modalService.confirm({
                    title: '提交统一申请',
                    content: '确定提交这个统一申请?',
                    onOk: () => {
                        this.store.dispatch(
                            new SubmitSavedUnifiedApplyAction(apply)
                        )
                    }
                })
            })

        this.toSubmitSavedSubPackageApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.modalService.confirm({
                    title: '提交分包申请',
                    content: '确定提交这个分包申请?',
                    onOk: () => {
                        this.store.dispatch(
                            new SubmitSavedSubPackageApplyAction(apply)
                        )
                    }
                })
            })
    }

    private initToDeleteSavedApply() {
        this.toDeleteSavedUnifiedApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.modalService.confirm({
                    title: '删除统一申请',
                    content: '确定删除这个统一申请?',
                    onOk: () => {
                        this.store.dispatch(
                            new DeleteSavedUnifiedApplyAction(apply)
                        )
                    }
                })
            })

        this.toDeleteSavedSubPackageApplySub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(apply => {
                this.modalService.confirm({
                    title: '删除分包申请',
                    content: '确定删除这个分包申请?',
                    onOk: () => {
                        this.store.dispatch(
                            new DeleteSavedSubPackageApplyAction(apply)
                        )
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
                this.tabIndex = tabIndex + 3
                this.store.dispatch(new ResetNeedManualSetTabIndexAction())
            })
    }

    private initCancelEdit() {
        this.cancelEditSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new fromExtraTabs.CancelEditApplyAction(this.tabIndex - 3)
                )
            })
    }

    private initEnsureEdit() {
        this.ensureEditSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new fromExtraTabs.EnsureEditApplyAction(this.tabIndex - 3)
                )
            })
    }

    private initCreateApplyResourceForExtra() {
        this.toCreateResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex >= 3),
                withLatestFrom(this.store.select(getApplyResourceForSelect)),
                mergeMap(([_, applyResourceForSelect]) => {
                    return this.modalService.open({
                        title: '新建资源信息',
                        content: ToCreateApplyResourceComponent,
                        footer: false,
                        width: 800,
                        componentParams: {
                            applyResourceForSelect
                        }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resource => {
                this.store.dispatch(
                    new fromExtraTabs.CreateApplyResourceAction({
                        applyResource: resource,
                        tabIndex: this.tabIndex - 3
                    })
                )
            })
    }

    private initAddApplyResourcesForExtra() {
        this.toAddResourcesSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex >= 3),
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
                        tabIndex: this.tabIndex - 3,
                        applyResources: resources
                    })
                )
            })
    }

    private initEditTempApplyResourceForExtra() {
        this.toEditTempResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex >= 3),
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
                        tabIndex: this.tabIndex - 3,
                        resource
                    })
                )
            })
    }

    private initShowApplyResourceForExtra() {
        this.toShowResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex >= 3),
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
            .subscribe(() => { })
    }

    private initDeleteApplyResourceForExtra() {
        this.toDeleteResourceSub
            .asObservable()
            .pipe(
                filter(() => this.tabIndex >= 3),
                takeUntil(this.destroyService)
            )
            .subscribe(index => {
                this.modalService.confirm({
                    title: '删除资源信息',
                    content: '确定删除这个资源信息?',
                    onOk: () => {
                        this.store.dispatch(
                            new fromExtraTabs.DeleteApplyResourceAction({
                                tabIndex: this.tabIndex - 3,
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
