import { Component, OnInit, Input } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { ClusterServerAccount } from '@core/models/server-account.model'

@Component({
    selector: 'app-to-show-cluster-server-account',
    templateUrl: './to-show-cluster-server-account.component.html',
    providers: [DestroyService]
})
export class ToShowClusterServerAccountComponent implements OnInit {
    constructor(
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input() data: ClusterServerAccount

    ngOnInit() {}

    toSave() {
        this.subject.destroy('onOk')
    }
}
