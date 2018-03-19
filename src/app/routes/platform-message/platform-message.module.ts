import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { PlatformMessageComponent } from './platform-message.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { PlatformMessageEffects } from './effects/platform-message.effects'
import { reducers } from './reducers'
import { PlatformMessageService } from './services/platform-message.service'

export const routes: Routes = [
  {
    path: '',
    component: PlatformMessageComponent
  }
]
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('fromPlatformMessage', reducers),
    EffectsModule.forFeature([PlatformMessageEffects])
  ],
  exports: [],
  declarations: [PlatformMessageComponent],
  providers: [PlatformMessageService]
})
export class PlatformMessageModule {}
