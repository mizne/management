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

import { VisitorInvitationsStatusPipe } from './pipes/visitor-invitation-status.pipe'
import { ExhibitorInvitationsStatusPipe } from './pipes/exhibitor-invitation-status.pipe'
import { TimeAgoPipe } from './pipes/time-ago.pipe'
import { VisitorSexPipe } from './pipes/visitor-sex.pipe'

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
        AlainACLModule
    ],
    declarations: [
        VisitorInvitationsStatusPipe,
        ExhibitorInvitationsStatusPipe,
        TimeAgoPipe,
        VisitorSexPipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule,
        AlainThemeModule,
        ...ABCMODULES,
        TranslateModule,
        VisitorInvitationsStatusPipe,
        ExhibitorInvitationsStatusPipe,
        TimeAgoPipe,
        VisitorSexPipe
    ]
})
export class SharedModule {}
