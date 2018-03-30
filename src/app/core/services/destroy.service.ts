import { Subject } from 'rxjs/Subject'
import { Injectable, OnDestroy } from '@angular/core'
import * as uuid from 'uuid'

/**
 * 组件级别的服务 用于 在组件销毁时自动取消订阅 Observable
 * example:
 * this.veryImportant$ = source$.moreOperators.takeUntil(this.destroyService)
 *
 * @export
 * @class DestroyService
 * @extends {Subject<void>}
 * @implements {OnDestroy}
 */
@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
    private id: string
    constructor() {
        super()
        this.id = uuid.v4()
    }

    ngOnDestroy() {
        this.complete()
    }
}
