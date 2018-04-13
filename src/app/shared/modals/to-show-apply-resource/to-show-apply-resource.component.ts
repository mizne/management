import { Component, OnInit, Input } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { SystemLogger } from '@core/models/software-account.model'
import { ResourceInfo } from '@core/models/resource-info.model'

@Component({
    selector: 'app-to-show-apply-resource',
    templateUrl: './to-show-apply-resource.component.html',
    providers: [DestroyService]
})
export class ToShowApplyResourceComponent implements OnInit {
    constructor(
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input() resource: ResourceInfo

    ngOnInit() {}

    toSave() {
        this.subject.destroy('onOk')
    }
}
