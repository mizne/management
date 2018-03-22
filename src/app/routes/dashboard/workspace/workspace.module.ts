import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../../shared/shared.module'

import { DashboardWorkspaceComponent } from './workspace.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { WorkspaceEffects } from './effects/workspace.effects'

import { WorkspaceService } from './services/workspace.service'
import { ExhibitionDescPipe } from './pipes/exhibition-desc.pipe'

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardWorkspaceComponent
    }
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromWorkspace', reducers),
        EffectsModule.forFeature([WorkspaceEffects])
    ],
    exports: [],
    declarations: [DashboardWorkspaceComponent, ExhibitionDescPipe],
    providers: [WorkspaceService]
})
export class WorkspaceModule {}
