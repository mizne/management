import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { DistributionTreasuryComponent } from './distribution-treasury.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { ResourceEntryEffects } from './effects/resource-entry.effects'
import { ResourceAssignEffects } from './effects/resource-assign.effects'
import { reducers } from './reducers'
import { DistributionTreasuryService } from './services/distribution-treasury.service'

import { ToCreateResourceInfoComponent } from './modals/to-create-resource-info/to-create-resource-info.component'
import { ToEditResourceInfoComponent } from './modals/to-edit-resource-info/to-edit-resource-info.component'
import { ToShowResourceInfoComponent } from './modals/to-show-resource-info/to-show-resource-info.component'

export const routes: Routes = [
    {
        path: '',
        component: DistributionTreasuryComponent
    }
]

const modals = [
    ToCreateResourceInfoComponent,
    ToEditResourceInfoComponent,
    ToShowResourceInfoComponent
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromDistributionTreasury', reducers),
        EffectsModule.forFeature([ResourceEntryEffects, ResourceAssignEffects])
    ],
    exports: [],
    declarations: [DistributionTreasuryComponent, ...modals],
    providers: [DistributionTreasuryService],
    entryComponents: [...modals]
})
export class DistributionTreasuryModule {}
