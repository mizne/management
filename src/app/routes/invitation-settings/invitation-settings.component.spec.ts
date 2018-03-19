import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { InvitationSettingsComponent } from './invitation-settings.component'

describe('InvitationSettingsComponent', () => {
    let component: InvitationSettingsComponent
    let fixture: ComponentFixture<InvitationSettingsComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [InvitationSettingsComponent]
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(InvitationSettingsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
