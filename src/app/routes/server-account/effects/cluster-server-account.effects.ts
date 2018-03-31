import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'

import { ServerAccountService } from '../services/server-account.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { effectsHelps } from '../reducers/cluster-server-account.reducer'

@Injectable()
export class ClusterServerAccountEffects {
    @Effect()
    fetchClusterServerAccounts$ = this.actions$
        .pipe(
            effectsHelps.fetchItemsPipeable(params => this.serverAccountService.fetchClusterServerAccounts(params)),
    )

    @Effect()
    fetchClusterServerAccountsCount$ = this.actions$
        .pipe(
            effectsHelps.fetchItemsCountPipeable(params => this.serverAccountService.fetchClusterServerAccountsCount(params))
        )

    // TODO 新增完的查询逻辑
    @Effect()
    createClusterServerAccount$ = this.actions$
        .pipe(
            effectsHelps.createItemPipeable(account => this.serverAccountService.createClusterServerAccount(account))
        )

    @Effect({ dispatch: false })
    createClusterServerAccountSuccess$ = this.actions$
        .pipe(
            effectsHelps.createItemSuccessPipeable(() => {
                this.notify.success(
                    `新增集群服务器台帐`,
                    `恭喜您，新增集群服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    createClusterServerAccountFailure$ = this.actions$
        .pipe(
            effectsHelps.createItemFailurePipeable(() => {
                this.notify.error(
                    `新增集群服务器台帐`,
                    `啊哦，新增集群服务器台帐失败！`
                )
            })
        )

    // TODO 编辑完的查询逻辑
    @Effect()
    editClusterServerAccount$ = this.actions$
        .pipe(
            effectsHelps.editItemPipeable(account => this.serverAccountService.editClusterServerAccount(account))
        )

    @Effect({ dispatch: false })
    editClusterServerAccountSuccess$ = this.actions$
        .pipe(
            effectsHelps.editItemSuccessPipeable(() => {
                this.notify.success(
                    `编辑集群服务器台帐`,
                    `恭喜您，编辑集群服务器台帐成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    editClusterServerAccountFailure$ = this.actions$
        .pipe(
            effectsHelps.editItemFailurePipeable(() => {
                this.notify.error(
                    `编辑集群服务器台帐`,
                    `啊哦，编辑集群服务器台帐失败！`
                )
            })
        )

    constructor(
        private actions$: Actions,
        private serverAccountService: ServerAccountService,
        private notify: NzNotificationService,
    ) { }
}
