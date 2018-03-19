import * as fromApprovalSettings from '../actions/approval-settings.action'
import { ApprovalSettings } from '../models/approval-settings.model'

export interface State {
  loading: boolean
  approvalSettings: ApprovalSettings
}

const initialState: State = {
  loading: false,
  approvalSettings: null
}

export function reducer(
  state: State = initialState,
  action: fromApprovalSettings.Actions
): State {
  switch (action.type) {
    case fromApprovalSettings.FETCH_APPROVAL_SETTINGS:
    case fromApprovalSettings.UPDATE_APPROVAL_SETTINGS:
      return {
        ...state,
        loading: true
      }
    case fromApprovalSettings.FETCH_APPROVAL_SETTINGS_SUCCESS:
      return {
        ...state,
        approvalSettings: action.approvalSettings,
        loading: false
      }
    case fromApprovalSettings.FETCH_APPROVAL_SETTINGS_FAILURE:
    case fromApprovalSettings.UPDATE_APPROVAL_SETTINGS_SUCCESS:
    case fromApprovalSettings.UPDATE_APPROVAL_SETTINGS_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getApprovalSettings = (state: State) => state.approvalSettings
