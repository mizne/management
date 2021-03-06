import * as fromRequirementApply from '../actions/requirement-apply.action'
import {
    ApplyInfo,
    Approver,
    RequirementApply
} from '@core/models/resource-apply.model'
import { ResourceInfo } from '@core/models/resource-info.model'

export interface State {
    fetchApplyInfoLoading: boolean
    applyInfo: ApplyInfo
    fetchApproversLoading: boolean
    approvers: Approver[]
    addedApplyResources: ResourceInfo[]
    saveOrSubmitLoading: boolean
    saveOrSubmitText: string

    hiddenAddResourceBtn: boolean
}

const initialState: State = {
    fetchApplyInfoLoading: false,
    applyInfo: null,
    fetchApproversLoading: false,
    approvers: [],
    addedApplyResources: [],
    saveOrSubmitLoading: false,
    saveOrSubmitText: '',

    hiddenAddResourceBtn: false
}

export function reducer(
    state: State = initialState,
    action: fromRequirementApply.Actions
): State {
    switch (action.type) {
        case fromRequirementApply.SWITCH_APPLY_TYPE:
            return {
                ...state,
                hiddenAddResourceBtn: action.applyType === '个人申请'
            }
        case fromRequirementApply.FETCH_APPLY_INFO:
            return {
                ...state,
                fetchApplyInfoLoading: true
            }
        case fromRequirementApply.FETCH_APPLY_INFO_SUCCESS:
            return {
                ...state,
                applyInfo: action.applyInfo,
                fetchApplyInfoLoading: false
            }
        case fromRequirementApply.FETCH_APPLY_INFO_FAILURE:
            return {
                ...state,
                fetchApplyInfoLoading: false
            }

        case fromRequirementApply.FETCH_APPROVERS:
            return {
                ...state,
                fetchApproversLoading: true
            }
        case fromRequirementApply.FETCH_APPROVERS_SUCCESS:
            return {
                ...state,
                approvers: action.approvers,
                fetchApproversLoading: false
            }
        case fromRequirementApply.FETCH_APPROVERS_FAILURE:
            return {
                ...state,
                fetchApproversLoading: false
            }
        case fromRequirementApply.ADD_APPLY_RESOURCES:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.concat(
                    action.applyResources
                )
            }
        case fromRequirementApply.CREATE_APPLY_RESOURCE:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.concat(
                    action.applyResource
                )
            }
        case fromRequirementApply.EDIT_TEMP_APPLY_RESOURCE:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.map(e => {
                    if (e.tempID === action.resource.tempID) {
                        return action.resource
                    }
                    return e
                })
            }
        case fromRequirementApply.DELETE_APPLY_RESOURCE:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.filter(
                    (_, i) => i !== action.index
                )
            }
        case fromRequirementApply.SAVE_REQUIREMENT_APPLY:
            return {
                ...state,
                saveOrSubmitLoading: true,
                saveOrSubmitText: '正在保存需求信息'
            }
        case fromRequirementApply.SUBMIT_REQUIREMENT_APPLY:
            return {
                ...state,
                saveOrSubmitLoading: true,
                saveOrSubmitText: '正在提交需求信息'
            }
        case fromRequirementApply.SAVE_REQUIREMENT_APPLY_SUCCESS:
        case fromRequirementApply.SUBMIT_REQUIREMENT_APPLY_SUCCESS:
            return {
                ...state,
                saveOrSubmitLoading: false,
                saveOrSubmitText: '',
                applyInfo: null,
                approvers: [],
                addedApplyResources: []
            }
        case fromRequirementApply.SAVE_REQUIREMENT_APPLY_FAILURE:
        case fromRequirementApply.SUBMIT_REQUIREMENT_APPLY_FAILURE:
            return {
                ...state,
                saveOrSubmitLoading: false,
                saveOrSubmitText: ''
            }
        case fromRequirementApply.RESET_REQUIREMENT_APPLY:
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

export const getHiddenAddResourceBtn = (state: State) =>
    state.hiddenAddResourceBtn
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
