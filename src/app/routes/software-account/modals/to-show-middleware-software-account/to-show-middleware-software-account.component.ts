import { Component, OnInit, Input } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'
import { Exhibitor } from '@core/models/exhibitor.model'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { MiddlewareSoftwareAccount } from '@core/models/software-account.model'

@Component({
    selector: 'app-to-show-middleware-software-account',
    templateUrl: './to-show-middleware-software-account.component.html',
    providers: [DestroyService]
})
export class ToShowMiddlewareSoftwareAccountComponent implements OnInit {
    constructor(
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input() account: MiddlewareSoftwareAccount

    ngOnInit() {}

    toSave() {
        this.subject.destroy('onOk')
    }
}
