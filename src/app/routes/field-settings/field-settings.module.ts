import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { FieldSettingsComponent } from './field-settings.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { effects } from './effects'
import { reducers } from './reducers'
import { services } from './services'
import { modals } from './modals'

export const routes: Routes = [
    {
        path: '',
        component: FieldSettingsComponent
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromFieldSettings', reducers),
        EffectsModule.forFeature(effects)
    ],
    exports: [],
    declarations: [FieldSettingsComponent, ...modals],
    providers: [...services],
    entryComponents: [...modals]
})
export class FieldSettingsModule {}
