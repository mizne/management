import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { ExhibitorMessageComponent } from './exhibitor-message.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { ExhibitorMessageEffects } from './effects/exhibitor-message.effects'
import { ExhibitorMessageService } from './services/exhibitor-message.service'
import { ToCreateMessageComponent } from './modals/to-create-message/to-create-message.component'
import { ExhibitorReceiverPipe } from './pipes/exhibitor-receiver.pipe'

export const routes: Routes = [
    {
        path: '',
        component: ExhibitorMessageComponent
    }
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromExhibitorMessage', reducers),
        EffectsModule.forFeature([ExhibitorMessageEffects])
    ],
    exports: [],
    declarations: [
        ExhibitorMessageComponent,
        ToCreateMessageComponent,
        ExhibitorReceiverPipe
    ],
    providers: [ExhibitorMessageService],
    entryComponents: [ToCreateMessageComponent]
})
export class ExhibitorMessageModule {}
