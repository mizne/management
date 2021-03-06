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

export const routes: Routes = [
    {
        path: '',
        component: VersionReleaseComponent
    }
]
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
    declarations: [VersionReleaseComponent],
    providers: [VersionReleaseService],
    entryComponents: []
})
export class VersionReleaseModule {}
