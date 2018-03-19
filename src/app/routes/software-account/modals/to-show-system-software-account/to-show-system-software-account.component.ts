import { Component, OnInit, Input } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'
import { Exhibitor } from '@core/models/exhibitor.model'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { SystemSoftwareAccount } from '@core/models/software-account.model'

@Component({
    selector: 'app-to-show-system-software-account',
    templateUrl: './to-show-system-software-account.component.html',
    providers: [DestroyService]
})
export class ToShowSystemSoftwareAccountComponent implements OnInit {
    constructor(
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input() account: SystemSoftwareAccount

    ngOnInit() {}

    toSave() {
        this.subject.destroy('onOk')
    }
}
