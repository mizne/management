import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { UnifiedApplyComponent } from './unified-apply.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { UnifiedApplyEffects } from './effects/unified-apply.effects'
import { SubPackageApplyEffects } from './effects/subpackage-apply.effects'
import { SavedApplyEffects } from './effects/saved-apply.effects'
import { ExtraTabsEffects } from './effects/extra-tabs.effects'
import { ToAddApplyResourceEffects } from './effects/to-add-apply-resource.effects'
import { reducers } from './reducers'
import { UnifiedApplyService } from './services/unified-apply.service'

import { ToCreateApplyResourceComponent } from './modals/to-create-apply-resource/to-create-apply-resource.component'
import { ToAddApplyResourceComponent } from './modals/to-add-apply-resource/to-add-apply-resource.component'
import { ToEditApplyResourceComponent } from './modals/to-edit-apply-resource/to-edit-apply-resource.component'
import { ToShowApplyResourceComponent } from './modals/to-show-apply-resource/to-show-apply-resource.component'

export const routes: Routes = [
    {
        path: '',
        component: UnifiedApplyComponent
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
        StoreModule.forFeature('fromUnifiedApply', reducers),
        EffectsModule.forFeature([
            UnifiedApplyEffects,
            SubPackageApplyEffects,
            SavedApplyEffects,
            ExtraTabsEffects,
            ToAddApplyResourceEffects
        ])
    ],
    exports: [],
    declarations: [UnifiedApplyComponent, ...modals],
    providers: [UnifiedApplyService],
    entryComponents: [...modals]
})
export class UnifiedApplyModule {}
