import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { Routes, RouterModule } from '@angular/router'

import { ToApproveComponent } from './to-approve.component'
import { reducers } from './reducers'
import { ToApproveVisitorEffects } from './effects/to-approve-visitor.effects'
import { ToApproveExhibitorEffects } from './effects/to-approve-exhibitor.effects'
import { VisitorApprovalDetailEffects } from './effects/visitor-approval-detail.effects'
import { ExhibitorApprovalDetailEffects } from './effects/exhibitor-approval-detail.effects'
import { SharedModule } from '../../shared/shared.module'
import { ToApproveVisitorService } from './services/to-approve-visitor.service'
import { ToApproveExhibitorService } from './services/to-approve-exhibitor.service'
import { VisitorApprovalDetailComponent } from './visitor-approval-detail/visitor-approval-detail.component'
import { ExhibitorApprovalDetailComponent } from './exhibitor-approval-detail/exhibitor-approval-detail.component'

export const routes: Routes = [
  {
    path: '',
    component: ToApproveComponent
  },
  {
    path: 'visitor/:id',
    component: VisitorApprovalDetailComponent,
    data: { title: '买家约请审批详情' }
  },
  {
    path: 'exhibitor/:id',
    component: ExhibitorApprovalDetailComponent,
    data: { title: '展商约请审批详情' }
  }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('fromToApprove', reducers),
    EffectsModule.forFeature([
      ToApproveVisitorEffects,
      ToApproveExhibitorEffects,
      VisitorApprovalDetailEffects,
      ExhibitorApprovalDetailEffects
    ])
  ],
  exports: [],
  declarations: [
    ToApproveComponent,
    VisitorApprovalDetailComponent,
    ExhibitorApprovalDetailComponent
  ],
  providers: [ToApproveVisitorService, ToApproveExhibitorService]
})
export class ToApproveModule { }
