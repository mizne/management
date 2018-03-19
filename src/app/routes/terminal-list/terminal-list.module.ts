import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { TerminalListComponent } from './terminal-list.component'
import { reducers } from './reducers'
import { TerminalListEffects } from './effects/terminal-list.effects'
import { TerminalListService } from './services/terminal-list.service'
import { TerminalStatusPipe } from './pipes/terminal-status.pipe'
import { ToCreateTerminalComponent } from './modals/to-create-terminal/to-create-terminal.component'
import { ToAssignTerminalComponent } from './modals/to-assign-terminal/to-assign-terminal.component'

export const components = [TerminalListComponent]
export const pipes = [TerminalStatusPipe]

export const modals = [ToCreateTerminalComponent, ToAssignTerminalComponent]

export const routes: Routes = [
    {
        path: '',
        component: TerminalListComponent
    }
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromTerminalList', reducers),
        EffectsModule.forFeature([TerminalListEffects])
    ],
    exports: [],
    declarations: [...components, ...pipes, ...modals],
    providers: [TerminalListService],
    entryComponents: [...modals]
})
export class TerminalListModule {}
