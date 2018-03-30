import { Component, OnInit, Input } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { PhysicalServerAccount } from '@core/models/server-account.model'

@Component({
    selector: 'app-to-show-physical-server-account',
    templateUrl: './to-show-physical-server-account.component.html',
    providers: [DestroyService]
})
export class ToShowPhysicalServerAccountComponent implements OnInit {
    constructor(
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input() data: PhysicalServerAccount

    ngOnInit() {}

    toSave() {
        this.subject.destroy('onOk')
    }
}
