import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { ServerAccountComponent } from './server-account.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { PhysicalServerAccountEffects } from './effects/physical-server-account.effects'
import { VirtualServerAccountEffects } from './effects/virtual-server-account.effects'
import { ClusterServerAccountEffects } from './effects/cluster-server-account.effects'
import { reducers } from './reducers'
import { ServerAccountService } from './services/server-account.service'

export const routes: Routes = [
    {
        path: '',
        component: ServerAccountComponent
    }
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromServerAccount', reducers),
        EffectsModule.forFeature([
            PhysicalServerAccountEffects,
            VirtualServerAccountEffects,
            ClusterServerAccountEffects
        ])
    ],
    exports: [],
    declarations: [ServerAccountComponent],
    providers: [ServerAccountService]
})
export class ServerAccountModule {}
