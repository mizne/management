import { Component, OnInit, Input } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { AssetsRecovery } from '@core/models/assets-recovery.model'

@Component({
    selector: 'app-to-show-resource-info',
    templateUrl: './to-show-resource-info.component.html',
    providers: [DestroyService]
})
export class ToShowResourceInfoComponent implements OnInit {
    constructor(
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input() assetsRecovery: AssetsRecovery

    ngOnInit() {}

    toSave() {
        this.subject.destroy('onOk')
    }
}
