import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { ExhibitorListComponent } from './exhibitor-list.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { ExhibitorListEffects } from './effects/exhibitor-list.effects'
import { ExhibitorDetailEffects } from './effects/exhibitor-detail.effects'

import { ExhibitorListService } from './services/exhibitor-list.service'
import { ExhibitorDetailComponent } from './exhibitor-detail/exhibitor-detail.component'

export const routes: Routes = [
    {
        path: '',
        component: ExhibitorListComponent
    },
    {
        path: ':id',
        component: ExhibitorDetailComponent,
        data: { title: '展商详情' }
    }
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromExhibitorList', reducers),
        EffectsModule.forFeature([ExhibitorListEffects, ExhibitorDetailEffects])
    ],
    exports: [],
    declarations: [ExhibitorListComponent, ExhibitorDetailComponent],
    providers: [ExhibitorListService]
})
export class ExhibitorListModule {}
