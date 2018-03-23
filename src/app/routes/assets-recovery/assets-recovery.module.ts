import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { AssetsRecoveryComponent } from './assets-recovery.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { AssetsRecoveryEffects } from './effects/assets-recovery.effects'
import { reducers } from './reducers'
import { AssetsRecoveryService } from './services/assets-recovery.service'

import { ToShowResourceInfoComponent } from './modals/to-show-resource-info/to-show-resource-info.component'

export const routes: Routes = [
    {
        path: '',
        component: AssetsRecoveryComponent
    }
]

const modals = [ToShowResourceInfoComponent]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromAssetsRecovery', reducers),
        EffectsModule.forFeature([AssetsRecoveryEffects])
    ],
    exports: [],
    declarations: [AssetsRecoveryComponent, ...modals],
    providers: [AssetsRecoveryService],
    entryComponents: [...modals]
})
export class AssetsRecoveryModule {}
