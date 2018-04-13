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

import { ToAddApplyResourceComponent } from './modals/to-add-apply-resource/to-add-apply-resource.component'

export const routes: Routes = [
    {
        path: '',
        component: UnifiedApplyComponent
    }
]
const modals = [ToAddApplyResourceComponent]
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
