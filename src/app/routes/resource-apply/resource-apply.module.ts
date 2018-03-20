import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { ResourceApplyComponent } from './resource-apply.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { RequirementApplyEffects } from './effects/requirement-apply.effects'
import { SavedApplyEffects } from './effects/saved-apply.effects'
import { ExtraTabsEffects } from './effects/extra-tabs.effects'
import { reducers } from './reducers'
import { ResourceApplyService } from './services/resource-apply.service'

import { ToCreateApplicationSoftwareAccountComponent } from './modals/to-create-application-software-account/to-create-application-software-account.component'
import { ToCreateSystemSoftwareAccountComponent } from './modals/to-create-system-software-account/to-create-system-software-account.component'
import { ToCreateMiddlewareSoftwareAccountComponent } from './modals/to-create-middleware-software-account/to-create-middleware-software-account.component'

import { ToEditApplicationSoftwareAccountComponent } from './modals/to-edit-application-software-account/to-edit-application-software-account.component'
import { ToEditSystemSoftwareAccountComponent } from './modals/to-edit-system-software-account/to-edit-system-software-account.component'
import { ToEditMiddlewareSoftwareAccountComponent } from './modals/to-edit-middleware-software-account/to-edit-middleware-software-account.component'

import { ToShowApplicationSoftwareAccountComponent } from './modals/to-show-application-software-account/to-show-application-software-account.component'
import { ToShowSystemSoftwareAccountComponent } from './modals/to-show-system-software-account/to-show-system-software-account.component'
import { ToShowMiddlewareSoftwareAccountComponent } from './modals/to-show-middleware-software-account/to-show-middleware-software-account.component'

export const routes: Routes = [
    {
        path: '',
        component: ResourceApplyComponent
    }
]
const modals = [
    ToCreateApplicationSoftwareAccountComponent,
    ToCreateSystemSoftwareAccountComponent,
    ToCreateMiddlewareSoftwareAccountComponent,
    ToEditApplicationSoftwareAccountComponent,
    ToEditSystemSoftwareAccountComponent,
    ToEditMiddlewareSoftwareAccountComponent,
    ToShowApplicationSoftwareAccountComponent,
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
            SavedApplyEffects
            // ExtraTabsEffects
        ])
    ],
    exports: [],
    declarations: [ResourceApplyComponent, ...modals],
    providers: [ResourceApplyService],
    entryComponents: [...modals]
})
export class ResourceApplyModule {}
