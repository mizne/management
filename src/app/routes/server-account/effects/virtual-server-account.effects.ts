import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'

import { ServerAccountService } from '../services/server-account.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { effectsHelps } from '../reducers/virtual-server-account.reducer'

@Injectable()
export class VirtualServerAccountEffects {
    @Effect()
    fetchVirtualServerAccounts$ = this.actions$
        .pipe(
            effectsHelps.fetchItemsPipeable(params => this.serverAccountService.fetchVirtualServerAccounts(params))
        )

    @Effect()
    fetchVirtualServerAccountsCount$ = this.actions$
        .pipe(
            effectsHelps.fetchItemsCountPipeable(searchText => this.serverAccountService.fetchVirtualServerAccountsCount(searchText))
        )

    // TODO 新增完的查询逻辑
    @Effect()
    createVirtualServerAccount$ = this.actions$
        .pipe(
            effectsHelps.createItemPipeable(account => this.serverAccountService.createVirtualServerAccount(account))
        )

    @Effect({ dispatch: false })
    createVirtualServerAccountSuccess$ = this.actions$
        .pipe(
            effectsHelps.createItemSuccessPipeable(() => {
                this.notify.success(
                    `新增虚拟服务器台帐`,
                    `恭喜您，新增虚拟服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    createVirtualServerAccountFailure$ = this.actions$
        .pipe(
            effectsHelps.createItemFailurePipeable(() => {
                this.notify.error(
                    `新增虚拟服务器台帐`,
                    `啊哦，新增虚拟服务器台帐失败！`
                )
            })
        )

    // TODO 编辑完的查询逻辑
    @Effect()
    editVirtualServerAccount$ = this.actions$
        .pipe(
            effectsHelps.editItemPipeable(account => this.serverAccountService.editVirtualServerAccount(account))
        )

    @Effect({ dispatch: false })
    editVirtualServerAccountSuccess$ = this.actions$
        .pipe(
            effectsHelps.editItemSuccessPipeable(() => {
                this.notify.success(
                    `编辑虚拟服务器台帐`,
                    `恭喜您，编辑虚拟服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    editVirtualServerAccountFailure$ = this.actions$
        .pipe(
            effectsHelps.editItemFailurePipeable(() => {
                this.notify.error(
                    `编辑虚拟服务器台帐`,
                    `啊哦，编辑虚拟服务器台帐失败！`
                )
            })
        )

    constructor(
        private actions$: Actions,
        private serverAccountService: ServerAccountService,
        private notify: NzNotificationService,
    ) { }
}
