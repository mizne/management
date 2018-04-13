import * as fromVersionRelease from '../actions/version-release.action'
import {
    ApplyInfo,
    Approver,
} from '@core/models/version-release.model'
import { ResourceInfo } from '@core/models/resource-info.model'


export interface State {
    fetchApplyInfoLoading: boolean
    applyInfo: ApplyInfo
    fetchApproversLoading: boolean
    approvers: Approver[]
    addedApplyResources: ResourceInfo[]
    saveOrSubmitLoading: boolean
    saveOrSubmitText: string
}

const initialState: State = {
    fetchApplyInfoLoading: false,
    applyInfo: null,
    fetchApproversLoading: false,
    approvers: [],
    addedApplyResources: [],
    saveOrSubmitLoading: false,
    saveOrSubmitText: ''
}

export function reducer(
    state: State = initialState,
    action: fromVersionRelease.Actions
): State {
    switch (action.type) {
        case fromVersionRelease.FETCH_APPLY_INFO:
            return {
                ...state,
                fetchApplyInfoLoading: true
            }
        case fromVersionRelease.FETCH_APPLY_INFO_SUCCESS:
            return {
                ...state,
                applyInfo: action.applyInfo,
                fetchApplyInfoLoading: false
            }
        case fromVersionRelease.FETCH_APPLY_INFO_FAILURE:
            return {
                ...state,
                fetchApplyInfoLoading: false
            }

        case fromVersionRelease.FETCH_APPROVERS:
            return {
                ...state,
                fetchApproversLoading: true
            }
        case fromVersionRelease.FETCH_APPROVERS_SUCCESS:
            return {
                ...state,
                approvers: action.approvers,
                fetchApproversLoading: false
            }
        case fromVersionRelease.FETCH_APPROVERS_FAILURE:
            return {
                ...state,
                fetchApproversLoading: false
            }
        case fromVersionRelease.ADD_APPLY_RESOURCES:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.concat(
                    action.applyResources
                )
            }
        case fromVersionRelease.CREATE_APPLY_RESOURCE:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.concat(
                    action.applyResource
                )
            }
        case fromVersionRelease.EDIT_TEMP_APPLY_RESOURCE:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.map(e => {
                    if (e.tempID === action.resource.tempID) {
                        return action.resource
                    }
                    return e
                })
            }
        case fromVersionRelease.DELETE_APPLY_RESOURCE:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.filter(
                    (_, i) => i !== action.index
                )
            }
        case fromVersionRelease.SAVE_VERSION_RELEASE_APPLY:
            return {
                ...state,
                saveOrSubmitLoading: true,
                saveOrSubmitText: '正在保存申请信息'
            }
        case fromVersionRelease.SUBMIT_VERSION_RELEASE_APPLY:
            return {
                ...state,
                saveOrSubmitLoading: true,
                saveOrSubmitText: '正在提交申请信息'
            }
        case fromVersionRelease.SAVE_VERSION_RELEASE_APPLY_SUCCESS:
        case fromVersionRelease.SUBMIT_VERSION_RELEASE_APPLY_SUCCESS:
            return {
                ...state,
                saveOrSubmitLoading: false,
                saveOrSubmitText: '',
                applyInfo: null,
                approvers: [],
                addedApplyResources: []
            }
        case fromVersionRelease.SAVE_VERSION_RELEASE_APPLY_FAILURE:
        case fromVersionRelease.SUBMIT_VERSION_RELEASE_APPLY_FAILURE:
            return {
                ...state,
                saveOrSubmitLoading: false,
                saveOrSubmitText: ''
            }
        case fromVersionRelease.RESET_VERSION_RELEASE_APPLY:
            return {
                ...state,
                applyInfo: null,
                approvers: [],
                addedApplyResources: []
            }
        default:
            return state
    }
}

export const getFetchApplyInfoLoading = (state: State) =>
    state.fetchApplyInfoLoading
export const getApplyInfo = (state: State) => state.applyInfo
export const getFetchApproversLoading = (state: State) =>
    state.fetchApproversLoading
export const getApprovers = (state: State) => state.approvers
export const getAddedApplyResources = (state: State) =>
    state.addedApplyResources
export const getSaveOrSubmitLoading = (state: State) =>
    state.saveOrSubmitLoading
export const getSaveOrSubmitText = (state: State) => state.saveOrSubmitText
