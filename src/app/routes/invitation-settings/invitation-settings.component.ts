import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import * as moment from 'moment'
import { NzMessageService } from 'ng-zorro-antd'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
    State,
    getCalendarSettings,
    getCalendarSettingsLoading,
    getApprovalSettings,
    getApprovalSettingsLoading,
    getKeySettings,
    getKeySettingsLoading,
    getVTETemplateSettings,
    getETVTemplateSettings,
    getETETemplateSettings,
    getTemplateSettingsLoading
} from './reducers'
import {
    FetchCalendarSettingsAction,
    UpdateCalendarSettingsAction
} from './actions/calendar-settings.action'
import {
    FetchApprovalSettingsAction,
    UpdateApprovalSettingsAction
} from './actions/approval-settings.action'
import {
    FetchKeySettingsAction,
    CreateKeyAction,
    DeleteKeyAction
} from './actions/key-settings.action'
import {
    FetchVTETemplateSettingsAction,
    FetchETVTemplateSettingsAction,
    FetchETETemplateSettingsAction,
    UpdateVTETemplateSettingsAction,
    UpdateETVTemplateSettingsAction,
    UpdateETETemplateSettingsAction
} from './actions/template-settings.action'

import { DestroyService } from '../../core/services/destroy.service'
import { CalendarSettings } from './models/calendar-settings.model'
import { TemplateType } from './models/template-settings.model'

@Component({
    selector: 'app-invitation-settings',
    templateUrl: './invitation-settings.component.html',
    styleUrls: ['./invitation-settings.component.less'],
    providers: [DestroyService]
})
export class InvitationSettingsComponent implements OnInit {
    active = 1

    calendarForm: FormGroup
    calendarSettingsLoading$: Observable<boolean>

    autoApprove: FormControl = new FormControl(false)
    approvalSettingsLoading$: Observable<boolean>

    keys = []
    keyInput: FormControl = new FormControl('')
    keySettingsLoading$: Observable<boolean>

    templateIndex = 0
    msgTemplateCtrl: FormControl = new FormControl('')
    templateSettingsLoading$: Observable<boolean>
    line0 = '审核通过即通过此模版发送约请信息给约请接收人。'
    line1 = '消息模版中变量说明。'
    line2 = '${邀请人} 表示 邀请人'
    line3 = '${邀请人职务} 表示 邀请人职务'
    line4 = '${邀请人公司} 表示 邀请人公司'
    line5 = '${受邀人} 表示 受邀人'
    line6 = '${受邀人职务} 表示 受邀人职务'
    line7 = '${受邀人公司} 表示 受邀人公司'
    line8 = '${展会日期} 表示 展会日期'
    line9 = '${邀请开始时间} 表示 邀请开始时间'
    line10 = '${邀请结束时间} 表示 邀请结束时间'
    line11 = '${展会名称} 表示 展会名称'
    line12 = '${见面地点} 表示 见面地点'
    templates = [
        {
            id: 0,
            type: TemplateType.VISITOR_TO_EXHIBITOR,
            active: true,
            name: '买家约请展商',
            icon: 'anticon anticon-apple',
            ctrl: new FormControl('')
        },
        {
            id: 1,
            type: TemplateType.EXHIBITOR_TO_VISITOR,
            active: false,
            name: '展商约请买家',
            icon: 'anticon anticon-android',
            ctrl: new FormControl('')
        },
        {
            id: 2,
            type: TemplateType.EXHIBITOR_TO_EXHIBITOR,
            active: false,
            name: '展商约请展商',
            icon: 'anticon anticon-windows',
            ctrl: new FormControl('')
        }
    ]

    get templateName(): string {
        const template = this.templates.find(e => e.id === this.templateIndex)
        return template ? template.name : ''
    }

    constructor(
        private fb: FormBuilder,
        private store: Store<State>,
        private destroyService: DestroyService,
        private msgService: NzMessageService
    ) {}

    ngOnInit() {
        this.buildForm()
        this.initDataSource()
        this.iniDispatcher()
        this.initSubscriber()
    }

    saveCalendar() {
        if (this.calendarForm.valid) {
            const params = this.convertFromFormValue()
            this.store.dispatch(new UpdateCalendarSettingsAction(params))
        } else {
            this.msgService.info('请检查输入项目是否合法')
        }
    }

    createKey(key: string) {
        if (!key) {
            return this.msgService.info(`请填写关键字`)
        }
        this.store.dispatch(new CreateKeyAction(key))
        this.keyInput.patchValue('', { emitEvent: false })
    }

    deleteKey(key: string) {
        this.store.dispatch(new DeleteKeyAction(key))
    }

    refreshKeySettings() {
        this.store.dispatch(new FetchKeySettingsAction())
    }

    refreshApprovalSettings() {
        this.store.dispatch(new FetchApprovalSettingsAction())
    }

    refreshCalendarSettings() {
        this.store.dispatch(new FetchCalendarSettingsAction())
    }

    refreshTemplateSettings() {
        this.store.dispatch(new FetchVTETemplateSettingsAction())
        this.store.dispatch(new FetchETVTemplateSettingsAction())
        this.store.dispatch(new FetchETETemplateSettingsAction())
    }

    saveMsgTemplate() {
        const template = this.templates.find(e => e.id === this.templateIndex)
        if (!template) {
            console.warn(`Unknown template index: ${this.templateIndex}`)
            return
        }
        if (!template.ctrl.value) {
            return this.msgService.info(`请填写消息模版`)
        }
        switch (template.type) {
            case TemplateType.VISITOR_TO_EXHIBITOR:
                this.store.dispatch(
                    new UpdateVTETemplateSettingsAction(template.ctrl.value)
                )
                break
            case TemplateType.EXHIBITOR_TO_VISITOR:
                this.store.dispatch(
                    new UpdateETVTemplateSettingsAction(template.ctrl.value)
                )
                break
            case TemplateType.EXHIBITOR_TO_EXHIBITOR:
                this.store.dispatch(
                    new UpdateETETemplateSettingsAction(template.ctrl.value)
                )
                break
            default:
                console.warn(`Unknown template type: ${template.type}`)
                break
        }
    }

    private initDataSource() {
        this.calendarSettingsLoading$ = this.store.select(
            getCalendarSettingsLoading
        )
        this.approvalSettingsLoading$ = this.store.select(
            getApprovalSettingsLoading
        )
        this.keySettingsLoading$ = this.store.select(getKeySettingsLoading)
        this.templateSettingsLoading$ = this.store.select(
            getTemplateSettingsLoading
        )
    }

    private iniDispatcher() {
        this.store.dispatch(new FetchCalendarSettingsAction())
        this.store.dispatch(new FetchApprovalSettingsAction())
        this.store.dispatch(new FetchKeySettingsAction())
        this.store.dispatch(new FetchVTETemplateSettingsAction())
        this.store.dispatch(new FetchETVTemplateSettingsAction())
        this.store.dispatch(new FetchETETemplateSettingsAction())
    }

    private initSubscriber() {
        this.initPatchCalendarForm()
        this.initPatchApproval()
        this.initKeySettings()
        this.initTemplateSettings()
    }

    private initPatchCalendarForm() {
        this.store
            .select(getCalendarSettings)
            .filter(e => !!e)
            .takeUntil(this.destroyService)
            .subscribe(calendarSettings => {
                this.calendarForm.patchValue(
                    this.convertToFormValue(calendarSettings)
                )
            })
    }

    private initPatchApproval() {
        this.store
            .select(getApprovalSettings)
            .filter(e => !!e)
            .takeUntil(this.destroyService)
            .subscribe(approvalSettings => {
                this.autoApprove.patchValue(approvalSettings.autoApprove, {
                    emitEvent: false
                })
            })

        this.autoApprove.valueChanges
            .takeUntil(this.destroyService)
            .subscribe(autoApprove => {
                this.store.dispatch(
                    new UpdateApprovalSettingsAction({
                        autoApprove
                    })
                )
            })
    }

    private initKeySettings() {
        this.store
            .select(getKeySettings)
            .filter(e => !!e)
            .takeUntil(this.destroyService)
            .subscribe(keySettings => {
                this.keys = keySettings.keys
            })
    }

    private initTemplateSettings() {
        this.store
            .select(getVTETemplateSettings)
            .filter(e => !!e)
            .takeUntil(this.destroyService)
            .subscribe(templateSettings => {
                const template = this.templates.find(
                    e => e.type === TemplateType.VISITOR_TO_EXHIBITOR
                )
                if (template) {
                    template.ctrl.patchValue(templateSettings.template, {
                        emitEvent: false
                    })
                }
            })

        this.store
            .select(getETVTemplateSettings)
            .filter(e => !!e)
            .takeUntil(this.destroyService)
            .subscribe(templateSettings => {
                const template = this.templates.find(
                    e => e.type === TemplateType.EXHIBITOR_TO_VISITOR
                )
                if (template) {
                    template.ctrl.patchValue(templateSettings.template, {
                        emitEvent: false
                    })
                }
            })

        this.store
            .select(getETETemplateSettings)
            .filter(e => !!e)
            .takeUntil(this.destroyService)
            .subscribe(templateSettings => {
                const template = this.templates.find(
                    e => e.type === TemplateType.EXHIBITOR_TO_EXHIBITOR
                )
                if (template) {
                    template.ctrl.patchValue(templateSettings.template, {
                        emitEvent: false
                    })
                }
            })
    }

    private buildForm() {
        this.calendarForm = this.fb.group({
            startDate: [null, Validators.required],
            endDate: [null, Validators.required],
            startTime: [null, Validators.required],
            endTime: [null, Validators.required],
            duration: [null, Validators.required],
            startLunch: [null, Validators.required],
            endLunch: [null, Validators.required]
        })
    }

    private convertFromFormValue(): CalendarSettings {
        return {
            startDate: moment(this.calendarForm.value.startDate).format(
                'YYYY-MM-DD'
            ),
            endDate: moment(this.calendarForm.value.endDate).format(
                'YYYY-MM-DD'
            ),
            startTime: moment(this.calendarForm.value.startTime).format(
                'HH:mm'
            ),
            endTime: moment(this.calendarForm.value.endTime).format('HH:mm'),
            startLunch: moment(this.calendarForm.value.startLunch).format(
                'HH:mm'
            ),
            endLunch: moment(this.calendarForm.value.endLunch).format('HH:mm'),
            duration: this.calendarForm.value.duration
        }
    }

    private convertToFormValue(calendarSettings: CalendarSettings) {
        return {
            startDate: moment(
                calendarSettings.startDate,
                'YYYY-MM-DD'
            ).toDate(),
            endDate: moment(calendarSettings.endDate, 'YYYY-MM-DD').toDate(),
            startTime: moment(calendarSettings.startTime, 'HH:mm').toDate(),
            endTime: moment(calendarSettings.endTime, 'HH:mm').toDate(),
            startLunch: moment(calendarSettings.startLunch, 'HH:mm').toDate(),
            endLunch: moment(calendarSettings.endLunch, 'HH:mm').toDate(),
            duration: calendarSettings.duration
        }
    }
}
