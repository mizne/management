import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
// delon
import { NgZorroAntdExtraModule } from 'ng-zorro-antd-extra'
import { AlainThemeModule } from '@delon/theme'
import { AlainACLModule } from '@delon/acl'
import { ZORROMODULES, ABCMODULES } from '../delon.module'
// i18n
import { TranslateModule } from '@ngx-translate/core'
import { ViserModule } from 'viser-ng'
import { NzTreeModule } from 'ng-tree-antd'

import { components } from './components'
import { pipes } from './pipes'
import { modals } from './modals'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule,
        AlainThemeModule.forChild(),
        ...ABCMODULES,
        AlainACLModule,
        ViserModule,
        NzTreeModule
    ],
    declarations: [...pipes, ...components, ...modals],
    exports: [
        NzTreeModule,
        ViserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule,
        AlainThemeModule,
        ...ABCMODULES,
        TranslateModule,
        ...pipes,
        ...components
    ],
    entryComponents: [...modals]
})
export class SharedModule {}
