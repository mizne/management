import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { VisitorListComponent } from './visitor-list.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { VisitorListEffects } from './effects/visitor-list.effects'
import { VisitorDetailEffects } from './effects/visitor-detail.effects'

import { VisitorListService } from './services/visitor-list.service'
import { VisitorDetailComponent } from './visitor-detail/visitor-detail.component'

export const routes: Routes = [
  {
    path: '',
    component: VisitorListComponent
  },
  {
    path: ':id',
    component: VisitorDetailComponent,
    data: { title: '买家详情' }
  }
]
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('fromVisitorList', reducers),
    EffectsModule.forFeature([VisitorListEffects, VisitorDetailEffects])
  ],
  exports: [],
  declarations: [VisitorListComponent, VisitorDetailComponent],
  providers: [VisitorListService]
})
export class VisitorListModule { }
