import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { AssetsRecoveryComponent } from './assets-recovery.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { effects } from './effects'
import { services } from './services'

import { modals } from './modals'

export const routes: Routes = [
    {
        path: '',
        component: AssetsRecoveryComponent
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromAssetsRecovery', reducers),
        EffectsModule.forFeature(effects)
    ],
    exports: [],
    declarations: [AssetsRecoveryComponent, ...modals],
    providers: [...services],
    entryComponents: [...modals]
})
export class AssetsRecoveryModule { }
