import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { SearchResultComponent } from './search-result.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { VisitorResultEffects } from './effects/visitor-result.effects'
import { ExhibitorResultEffects } from './effects/exhibitor-result.effects'

import { VisitorResultService } from './services/visitor-result.service'
import { ExhibitorResultService } from './services/exhibitor-result.service'

export const routes: Routes = [
    {
        path: ':searchText',
        component: SearchResultComponent,
        data: { title: '搜索结果' }
    }
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromSearchResult', reducers),
        EffectsModule.forFeature([VisitorResultEffects, ExhibitorResultEffects])
    ],
    exports: [],
    declarations: [SearchResultComponent],
    providers: [VisitorResultService, ExhibitorResultService]
})
export class SearchResultModule {}
