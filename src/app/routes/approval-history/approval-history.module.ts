import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { ApprovalHistoryComponent } from './approval-history.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { VisitorApprovalHistoryEffects } from './effects/visitor-approval-history.effects'
import { ExhibitorApprovalHistoryEffects } from './effects/exhibitor-approval-history.effects'

import { ApprovalHistoryService } from './services/approval-history.service'

export const routes: Routes = [
    {
        path: '',
        component: ApprovalHistoryComponent
    }
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromApprovalHistory', reducers),
        EffectsModule.forFeature([
            VisitorApprovalHistoryEffects,
            ExhibitorApprovalHistoryEffects
        ])
    ],
    exports: [],
    declarations: [ApprovalHistoryComponent],
    providers: [ApprovalHistoryService]
})
export class ApprovalHistoryModule {}
