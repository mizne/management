import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { SystemOnOffComponent } from './system-onoff.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { SystemOnOffEffects } from './effects/system-onoff.effects'
import { SavedApplyEffects } from './effects/saved-apply.effects'
import { ExtraTabsEffects } from './effects/extra-tabs.effects'
import { ToAddApplyResourceEffects } from './effects/to-add-apply-resource.effects'
import { reducers } from './reducers'
import { SystemOnOffService } from './services/system-onoff.service'
import { ToSelectOffLineSystemComponent } from './modals/to-select-offline-system/to-select-offline-system.component'

export const routes: Routes = [
    {
        path: '',
        component: SystemOnOffComponent
    }
]

const modals = [ToSelectOffLineSystemComponent]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromSystemOnOff', reducers),
        EffectsModule.forFeature([
            SystemOnOffEffects,
            SavedApplyEffects,
            ExtraTabsEffects,
            ToAddApplyResourceEffects
        ])
    ],
    exports: [],
    declarations: [SystemOnOffComponent, ...modals],
    providers: [SystemOnOffService],
    entryComponents: [...modals]
})
export class SystemOnOffModule {}
