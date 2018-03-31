import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'

import { ServerAccountService } from '../services/server-account.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { effectsHelps } from '../reducers/physical-server-account.reducer'

@Injectable()
export class PhysicalServerAccountEffects {
    @Effect()
    fetchPhysicalServerAccounts$ = this.actions$
        .pipe(
            effectsHelps.fetchItemsPipeable(params => this.serverAccountService.fetchPhysicalServerAccounts(params))
        )

    @Effect()
    fetchPhysicalServerAccountsCount$ = this.actions$
        .pipe(
            effectsHelps.fetchItemsCountPipeable(params => this.serverAccountService.fetchPhysicalServerAccountsCount(params))
        )

    // TODO 新增完的查询逻辑
    @Effect()
    createPhysicalServerAccount$ = this.actions$
        .pipe(
            effectsHelps.createItemPipeable(account => this.serverAccountService.createPhysicalServerAccount(account))
        )

    @Effect({ dispatch: false })
    createPhysicalServerAccountSuccess$ = this.actions$
        .pipe(
            effectsHelps.createItemSuccessPipeable(() => {
                this.notify.success(
                    `新增物理服务器台帐`,
                    `恭喜您，新增物理服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    createPhysicalServerAccountFailure$ = this.actions$
        .pipe(
            effectsHelps.createItemFailurePipeable(() => {
                this.notify.error(
                    `新增物理服务器台帐`,
                    `啊哦，新增物理服务器台帐失败！`
                )
            })
        )
    // TODO 编辑完的查询逻辑
    @Effect()
    editPhysicalServerAccount$ = this.actions$
        .pipe(
            effectsHelps.editItemPipeable(account => this.serverAccountService.editPhysicalServerAccount(account))
        )

    @Effect({ dispatch: false })
    editPhysicalServerAccountSuccess$ = this.actions$
        .pipe(
            effectsHelps.editItemSuccessPipeable(() => {
                this.notify.success(
                    `编辑物理服务器台帐`,
                    `恭喜您，编辑物理服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    editPhysicalServerAccountFailure$ = this.actions$
        .pipe(
            effectsHelps.editItemFailurePipeable(() => {
                this.notify.error(
                    `编辑物理服务器台帐`,
                    `啊哦，编辑物理服务器台帐失败！`
                )
            })
        )

    constructor(
        private actions$: Actions,
        private serverAccountService: ServerAccountService,
        private notify: NzNotificationService,
    ) { }
}
