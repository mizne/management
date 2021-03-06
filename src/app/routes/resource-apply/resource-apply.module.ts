import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { ResourceApplyComponent } from './resource-apply.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { effects } from './effects'
import { reducers } from './reducers'
import { services } from './services'

export const routes: Routes = [
    {
        path: '',
        component: ResourceApplyComponent
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromResourceApply', reducers),
        EffectsModule.forFeature(effects)
    ],
    exports: [],
    declarations: [ResourceApplyComponent],
    providers: [...services],
    entryComponents: []
})
export class ResourceApplyModule { }
