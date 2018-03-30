import { Component, OnInit, Input } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { SystemLogger } from '@core/models/system-logger.model'

@Component({
    selector: 'app-to-show-system-logger',
    templateUrl: './to-show-system-logger.component.html',
    providers: [DestroyService]
})
export class ToShowSystemLoggerComponent implements OnInit {
    constructor(
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input() logger: SystemLogger

    ngOnInit() {}

    toSave() {
        this.subject.destroy('onOk')
    }
}
