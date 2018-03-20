import { Component, OnInit, Input } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { ApplicationSoftwareAccount } from '@core/models/software-account.model'

@Component({
    selector: 'app-to-show-application-software-account',
    templateUrl: './to-show-application-software-account.component.html',
    providers: [DestroyService]
})
export class ToShowApplicationSoftwareAccountComponent implements OnInit {
    constructor(
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input() account: ApplicationSoftwareAccount

    ngOnInit() {}

    toSave() {
        this.subject.destroy('onOk')
    }
}
