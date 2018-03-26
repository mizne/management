import { Component, OnInit, Input } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { VirtualServerAccount } from '@core/models/server-account.model'

@Component({
    selector: 'app-to-show-virtual-server-account',
    templateUrl: './to-show-virtual-server-account.component.html',
    providers: [DestroyService]
})
export class ToShowVirtualServerAccountComponent implements OnInit {
    constructor(
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input() account: VirtualServerAccount

    ngOnInit() {}

    toSave() {
        this.subject.destroy('onOk')
    }
}
