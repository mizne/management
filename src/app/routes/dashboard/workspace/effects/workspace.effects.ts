import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromWorkspace from '../actions/workspace.action'
import { WorkspaceService } from '../services/workspace.service'
import { NzNotificationService } from 'ng-zorro-antd'

@Injectable()
export class WorkspaceEffects {
    @Effect()
    fetchActivities$ = this.actions$
        .ofType(fromWorkspace.FETCH_INVITATION_ACTIVITIES)
        .switchMap(() => {
            return this.workspaceService
                .fetchActivities()
                .map(
                    activities =>
                        new fromWorkspace.FetchInvitationActivitiesSuccessAction(
                            activities
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromWorkspace.FetchInvitationActivitiesFailureAction()
                    )
                )
        })

    @Effect()
    fetchStatistics$ = this.actions$
        .ofType(fromWorkspace.FETCH_EXHIBITION_STATISTICS)
        .switchMap(() => {
            return this.workspaceService
                .fetchStatistics()
                .map(
                    statistics =>
                        new fromWorkspace.FetchExhibitionStatisticsSuccessAction(
                            statistics
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromWorkspace.FetchExhibitionStatisticsFailureAction()
                    )
                )
        })

    constructor(
        private actions$: Actions,
        private workspaceService: WorkspaceService,
        private notify: NzNotificationService
    ) {}
}
