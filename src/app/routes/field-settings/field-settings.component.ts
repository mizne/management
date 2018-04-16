import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { SystemLogger } from '@core/models/system-logger.model'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import { Store } from '@ngrx/store'
import {
    State,
    getResourceFieldSettingsLoading,
    getResourceFieldSettings,
    getResourceFieldSettingsCount
} from './reducers'
import { fromResourceFieldSettings } from './actions'

import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'
import { ToShowSystemLoggerComponent } from './modals'
import {
    mergeMap,
    takeUntil,
    filter,
    tap,
    withLatestFrom
} from 'rxjs/operators'

@Component({
    selector: 'app-field-settings',
    templateUrl: './field-settings.component.html',
    styleUrls: ['./field-settings.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldSettingsComponent implements OnInit {
    tabIndex = 0

    nodes = [
        {
            name: '资源类型',
            children: [
                {
                    name: '软件资源',
                    children: [
                        {
                            name: '软件类型',
                            children: [
                                {
                                    name: '应用软件',
                                    children: [
                                        {
                                            name: '软件名称',
                                            children: [
                                                {
                                                    name: 'Office',
                                                    children: [
                                                        {
                                                            name: '软件版本',
                                                            children: [
                                                                {
                                                                    name: 'V16',
                                                                    children: []
                                                                },
                                                                {
                                                                    name:
                                                                        '新增属性值',
                                                                    children: []
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: '新增属性值',
                                                    children: []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: '系统软件',
                                    children: []
                                },
                                {
                                    name: '新增属性值',
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '计算资源',
                    children: []
                },
                {
                    name: '存储资源',
                    children: []
                },
                {
                    name: '数据库资源',
                    children: []
                },
                {
                    name: 'IP地址资源',
                    children: []
                },
                {
                    name: '防火墙访问权限资源',
                    children: []
                }
            ]
        }
    ]

    options = {}

    form: FormGroup
    regExpDesc = '*代表任意字符串， ?代表任意单个字符，+代表一个到多个字符; 常用正则举例如下: '
    exampleRegExp1 = '^[0-9]*$ 表示都是数字组成的字符串'
    exampleRegExp2 = '^[A-Za-z]+$ 标识由26个英文字母组成的字符串'

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

    onEvent(ev: any) {
        console.log('onEvent', ev)
    }

    tabChange(tabIndex: number) {}

    toCreate() {}

    toEdit() {}

    toCancel() {}

    toDelete() {}

    private buildForm() {
        this.form = this.fb.group({
            name: [null, Validators.required],
            type: [null, Validators.required],
            length: [null, Validators.length],
            pattern: [null, Validators.required],
            remark: ['*代表任意字符串， ?代表任意单个字符，+代表一个到多个字符']
        })
    }

    private intDataSource(): void {}

    private initDispatcher(): void {}

    private initSubscriber(): void {}
}
