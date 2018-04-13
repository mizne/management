import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { VersionReleaseComponent } from './version-release.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { VersionReleaseEffects } from './effects/version-release.effects'
import { SavedApplyEffects } from './effects/saved-apply.effects'
import { ExtraTabsEffects } from './effects/extra-tabs.effects'
import { ToAddApplyResourceEffects } from './effects/to-add-apply-resource.effects'
import { reducers } from './reducers'
import { VersionReleaseService } from './services/version-release.service'

import { ToAddApplyResourceComponent } from './modals/to-add-apply-resource/to-add-apply-resource.component'

export const routes: Routes = [
    {
        path: '',
        component: VersionReleaseComponent
    }
]
const modals = [ToAddApplyResourceComponent]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromVersionRelease', reducers),
        EffectsModule.forFeature([
            VersionReleaseEffects,
            SavedApplyEffects,
            ExtraTabsEffects,
            ToAddApplyResourceEffects
        ])
    ],
    exports: [],
    declarations: [VersionReleaseComponent, ...modals],
    providers: [VersionReleaseService],
    entryComponents: [...modals]
})
export class VersionReleaseModule {}
