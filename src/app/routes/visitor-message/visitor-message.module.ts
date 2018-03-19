import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { VisitorMessageComponent } from './visitor-message.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { VisitorMessageEffects } from './effects/visitor-message.effects'
import { ToCreateMessageEffects } from './effects/to-create-message.effects'

import { VisitorMessageService } from './services/visitor-message.service'
import { ToCreateMessageComponent } from './modals/to-create-message/to-create-message.component'
import { VisitorReceiverPipe } from './pipes/visitor-receiver.pipe'

export const routes: Routes = [
    {
        path: '',
        component: VisitorMessageComponent
    }
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromVisitorMessage', reducers),
        EffectsModule.forFeature([
            VisitorMessageEffects,
            ToCreateMessageEffects
        ])
    ],
    exports: [],
    declarations: [
        VisitorMessageComponent,
        ToCreateMessageComponent,
        VisitorReceiverPipe
    ],
    providers: [VisitorMessageService],
    entryComponents: [ToCreateMessageComponent]
})
export class VisitorMessageModule {}
