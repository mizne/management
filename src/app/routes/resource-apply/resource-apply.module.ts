import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { ResourceApplyComponent } from './resource-apply.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { RequirementApplyEffects } from './effects/requirement-apply.effects'
import { SavedApplyEffects } from './effects/saved-apply.effects'
import { ExtraTabsEffects } from './effects/extra-tabs.effects'
import { ToAddApplyResourceEffects } from './effects/to-add-apply-resource.effects'
import { reducers } from './reducers'
import { ResourceApplyService } from './services/resource-apply.service'

import { ToCreateApplyResourceComponent } from './modals/to-create-apply-resource/to-create-apply-resource.component'
import { ToCreateSystemSoftwareAccountComponent } from './modals/to-create-system-software-account/to-create-system-software-account.component'
import { ToAddApplyResourceComponent } from './modals/to-add-apply-resource/to-add-apply-resource.component'

import { ToEditApplicationSoftwareAccountComponent } from './modals/to-edit-application-software-account/to-edit-application-software-account.component'
import { ToEditSystemSoftwareAccountComponent } from './modals/to-edit-system-software-account/to-edit-system-software-account.component'
import { ToEditMiddlewareSoftwareAccountComponent } from './modals/to-edit-middleware-software-account/to-edit-middleware-software-account.component'

import { ToShowApplyResourceComponent } from './modals/to-show-apply-resource/to-show-apply-resource.component'
import { ToShowSystemSoftwareAccountComponent } from './modals/to-show-system-software-account/to-show-system-software-account.component'
import { ToShowMiddlewareSoftwareAccountComponent } from './modals/to-show-middleware-software-account/to-show-middleware-software-account.component'

export const routes: Routes = [
    {
        path: '',
        component: ResourceApplyComponent
    }
]
const modals = [
    ToCreateApplyResourceComponent,
    ToCreateSystemSoftwareAccountComponent,
    ToAddApplyResourceComponent,
    ToEditApplicationSoftwareAccountComponent,
    ToEditSystemSoftwareAccountComponent,
    ToEditMiddlewareSoftwareAccountComponent,
    ToShowApplyResourceComponent,
    ToShowSystemSoftwareAccountComponent,
    ToShowMiddlewareSoftwareAccountComponent
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromResourceApply', reducers),
        EffectsModule.forFeature([
            RequirementApplyEffects,
            SavedApplyEffects,
            // ExtraTabsEffects
            ToAddApplyResourceEffects
        ])
    ],
    exports: [],
    declarations: [ResourceApplyComponent, ...modals],
    providers: [ResourceApplyService],
    entryComponents: [...modals]
})
export class ResourceApplyModule {}
