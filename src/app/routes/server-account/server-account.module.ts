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

import { ToCreateClusterServerAccountComponent } from './modals/to-create-cluster-server-account/to-create-cluster-server-account.component'
import { ToCreatePhysicalServerAccountComponent } from './modals/to-create-physical-server-account/to-create-physical-server-account.component'
import { ToCreateVirtualServerAccountComponent } from './modals/to-create-virtual-server-account/to-create-virtual-server-account.component'
import { ToEditClusterServerAccountComponent } from './modals/to-edit-cluster-server-account/to-edit-cluster-server-account.component'
import { ToEditPhysicalServerAccountComponent } from './modals/to-edit-physical-server-account/to-edit-physical-server-account.component'
import { ToEditVirtualServerAccountComponent } from './modals/to-edit-virtual-server-account/to-edit-virtual-server-account.component'
import { ToShowClusterServerAccountComponent } from './modals/to-show-cluster-server-account/to-show-cluster-server-account.component'
import { ToShowPhysicalServerAccountComponent } from './modals/to-show-physical-server-account/to-show-physical-server-account.component'
import { ToShowVirtualServerAccountComponent } from './modals/to-show-virtual-server-account/to-show-virtual-server-account.component'

export const routes: Routes = [
    {
        path: '',
        component: ServerAccountComponent
    }
]

const modals = [
    ToCreateClusterServerAccountComponent,
    ToCreatePhysicalServerAccountComponent,
    ToCreateVirtualServerAccountComponent,
    ToEditClusterServerAccountComponent,
    ToEditPhysicalServerAccountComponent,
    ToEditVirtualServerAccountComponent,
    ToShowClusterServerAccountComponent,
    ToShowPhysicalServerAccountComponent,
    ToShowVirtualServerAccountComponent
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
    declarations: [ServerAccountComponent, ...modals],
    providers: [ServerAccountService],
    entryComponents: [...modals]
})
export class ServerAccountModule {}
