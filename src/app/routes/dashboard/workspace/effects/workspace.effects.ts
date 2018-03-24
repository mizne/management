import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { switchMap, map, catchError } from 'rxjs/operators'

import * as fromWorkspace from '../actions/workspace.action'
import { WorkspaceService } from '../services/workspace.service'
import { NzNotificationService } from 'ng-zorro-antd'

@Injectable()
export class WorkspaceEffects {
    @Effect()
    fetchActivities$ = this.actions$
        .ofType(fromWorkspace.FETCH_INVITATION_ACTIVITIES)
        .pipe(
            switchMap(() => this.workspaceService.fetchActivities()),
            map(activities =>
                new fromWorkspace.FetchInvitationActivitiesSuccessAction(
                    activities
                )),
            catchError(() => of(new fromWorkspace.FetchInvitationActivitiesFailureAction()))
        )


    @Effect()
    fetchStatistics$ = this.actions$
        .ofType(fromWorkspace.FETCH_EXHIBITION_STATISTICS)
        .pipe(
            switchMap(() => this.workspaceService.fetchStatistics()),
            map(statistics =>
                new fromWorkspace.FetchExhibitionStatisticsSuccessAction(
                    statistics
                )),
            catchError(() => of(new fromWorkspace.FetchExhibitionStatisticsFailureAction()))
        )

    constructor(
        private actions$: Actions,
        private workspaceService: WorkspaceService,
        private notify: NzNotificationService
    ) { }
}
