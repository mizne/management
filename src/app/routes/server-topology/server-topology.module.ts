import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { ServerTopologyComponent } from './server-topology.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { effects } from './effects'
import { reducers } from './reducers'
import { services } from './services'

export const routes: Routes = [
    {
        path: '',
        component: ServerTopologyComponent
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
        // StoreModule.forFeature('fromServerAccount', reducers),
        // EffectsModule.forFeature(effects)
    ],
    exports: [],
    declarations: [ServerTopologyComponent],
    providers: [...services],
    entryComponents: []
})
export class ServerTopologyModule {}
