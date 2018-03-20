import { Action } from '@ngrx/store'

import { InvitationActivity } from '../models/workspace.model'

export const FETCH_INVITATION_ACTIVITIES =
    '[Workspace] Fetch Invitation Activities'
export const FETCH_INVITATION_ACTIVITIES_SUCCESS =
    '[Workspace] Fetch Invitation Activitie Success'
export const FETCH_INVITATION_ACTIVITIES_FAILURE =
    '[Workspace] Fetch Invitation Activitie Failure'

export const FETCH_EXHIBITION_STATISTICS =
    '[Workspace] Fetch Exhibition Statitics'
export const FETCH_EXHIBITION_STATISTICS_SUCCESS =
    '[Workspace] Fetch Exhibition Statitics Success'
export const FETCH_EXHIBITION_STATISTICS_FAILURE =
    '[Workspace] Fetch Exhibition Statitics Failure'

export class FetchInvitationActivitiesAction implements Action {
    readonly type = FETCH_INVITATION_ACTIVITIES
}
export class FetchInvitationActivitiesSuccessAction implements Action {
    readonly type = FETCH_INVITATION_ACTIVITIES_SUCCESS
    constructor(public invitationActivities: InvitationActivity[]) {}
}
export class FetchInvitationActivitiesFailureAction implements Action {
    readonly type = FETCH_INVITATION_ACTIVITIES_FAILURE
}

export class FetchExhibitionStatisticsAction implements Action {
    readonly type = FETCH_EXHIBITION_STATISTICS
}
export class FetchExhibitionStatisticsSuccessAction implements Action {
    readonly type = FETCH_EXHIBITION_STATISTICS_SUCCESS
    constructor(public exhibitionStatistics: any) {}
}
export class FetchExhibitionStatisticsFailureAction implements Action {
    readonly type = FETCH_EXHIBITION_STATISTICS_FAILURE
}

export type Actions =
    | FetchInvitationActivitiesAction
    | FetchInvitationActivitiesSuccessAction
    | FetchInvitationActivitiesFailureAction
    | FetchExhibitionStatisticsAction
    | FetchExhibitionStatisticsSuccessAction
    | FetchExhibitionStatisticsFailureAction
