import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'

import { LayoutDefaultComponent } from './default/default.component'
import { LayoutFullScreenComponent } from './fullscreen/fullscreen.component'
import { HeaderComponent } from './default/header/header.component'
import { SidebarComponent } from './default/sidebar/sidebar.component'
import { HeaderSearchComponent } from './default/header/components/search.component'
import { HeaderThemeComponent } from './default/header/components/theme.component'
import { HeaderNotifyComponent } from './default/header/components/notify.component'
import { HeaderTaskComponent } from './default/header/components/task.component'
import { HeaderIconComponent } from './default/header/components/icon.component'
import { HeaderFullScreenComponent } from './default/header/components/fullscreen.component'
import { HeaderI18nComponent } from './default/header/components/i18n.component'
import { HeaderStorageComponent } from './default/header/components/storage.component'
import { HeaderUserComponent } from './default/header/components/user.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './default/reducers'
import { HeaderEffects } from './default/effects/header.effects'
import { HeaderService } from './default/services/header.service'

const COMPONENTS = [
    LayoutDefaultComponent,
    LayoutFullScreenComponent,
    HeaderComponent,
    SidebarComponent
]

const HEADERCOMPONENTS = [
    HeaderSearchComponent,
    HeaderNotifyComponent,
    HeaderTaskComponent,
    HeaderIconComponent,
    HeaderFullScreenComponent,
    HeaderThemeComponent,
    HeaderI18nComponent,
    HeaderStorageComponent,
    HeaderUserComponent
]

// passport
import { LayoutPassportComponent } from './passport/passport.component'
const PASSPORT = [LayoutPassportComponent]

@NgModule({
    imports: [
        SharedModule,
        StoreModule.forFeature('fromLayout', reducers),
        EffectsModule.forFeature([HeaderEffects])
    ],
    providers: [HeaderService],
    declarations: [...COMPONENTS, ...HEADERCOMPONENTS, ...PASSPORT],
    exports: [...COMPONENTS, ...PASSPORT]
})
export class LayoutModule {}
