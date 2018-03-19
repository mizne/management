import * as fromWorkspace from '../actions/workspace.action'
import { InvitationActivity } from '../models/workspace.model'
import { Exhibition, ExhibitionStatistics } from '@core/models/exhibition.model'

export interface State {
    statisticsLoading: boolean
    statistics: ExhibitionStatistics
    activitiesLoading: boolean
    activities: InvitationActivity[]
    exhibition: Exhibition
}

const initialState: State = {
    statisticsLoading: false,
    statistics: null,
    activitiesLoading: false,
    activities: [],
    exhibition: null
}

export function reducer(
    state: State = initialState,
    action: fromWorkspace.Actions
): State {
    switch (action.type) {
        case fromWorkspace.FETCH_INVITATION_ACTIVITIES:
            return {
                ...state,
                activitiesLoading: true
            }
        case fromWorkspace.FETCH_INVITATION_ACTIVITIES_SUCCESS:
            return {
                ...state,
                activities: action.invitationActivities,
                activitiesLoading: false
            }
        case fromWorkspace.FETCH_INVITATION_ACTIVITIES_FAILURE:
            return {
                ...state,
                activitiesLoading: false
            }
        case fromWorkspace.FETCH_EXHIBITION_STATISTICS:
            return {
                ...state,
                statisticsLoading: true
            }
        case fromWorkspace.FETCH_EXHIBITION_STATISTICS_SUCCESS:
            return {
                ...state,
                statistics: action.exhibitionStatistics,
                statisticsLoading: false
            }

        case fromWorkspace.FETCH_EXHIBITION_STATISTICS_FAILURE:
            return {
                ...state,
                statisticsLoading: false
            }
        default:
            return state
    }
}

export const getStaticticsLoading = (state: State) => state.statisticsLoading
export const getExhibitionStatistics = (state: State) => state.statistics
export const getActivitiesLoading = (state: State) => state.activitiesLoading
export const getInvitationActivities = (state: State) => state.activities
