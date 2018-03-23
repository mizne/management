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

import { ToCreateApplyResourceComponent } from './modals/to-create-apply-resource/to-create-apply-resource.component'
import { ToAddApplyResourceComponent } from './modals/to-add-apply-resource/to-add-apply-resource.component'
import { ToEditApplyResourceComponent } from './modals/to-edit-apply-resource/to-edit-apply-resource.component'
import { ToShowApplyResourceComponent } from './modals/to-show-apply-resource/to-show-apply-resource.component'

export const routes: Routes = [
    {
        path: '',
        component: SystemOnOffComponent
    }
]
const modals = [
    ToCreateApplyResourceComponent,
    ToAddApplyResourceComponent,
    ToEditApplyResourceComponent,
    ToShowApplyResourceComponent
]
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
