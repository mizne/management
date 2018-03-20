import * as fromRequirementApply from '../actions/requirement-apply.action'
import {
    ApplyInfo,
    ApplyResource,
    Approver,
    RequirementApply
} from '@core/models/resource-apply.model'

export interface State {
    fetchApplyInfoLoading: boolean
    applyInfo: ApplyInfo
    fetchApproversLoading: boolean
    approvers: Approver[]
    addedApplyResources: ApplyResource[]
    fetchAddableApplyResourcesLoading: boolean
    addableApplyResources: ApplyResource[]
    saveOrSubmitLoading: boolean
    saveOrSubmitText: string
}

const initialState: State = {
    fetchApplyInfoLoading: false,
    applyInfo: null,
    fetchApproversLoading: false,
    approvers: [],
    addedApplyResources: [],
    fetchAddableApplyResourcesLoading: false,
    addableApplyResources: [],
    saveOrSubmitLoading: false,
    saveOrSubmitText: ''
}

export function reducer(
    state: State = initialState,
    action: fromRequirementApply.Actions
): State {
    switch (action.type) {
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
        case fromRequirementApply.FETCH_ADDABLE_APPLY_RESOURCE:
            return {
                ...state,
                fetchAddableApplyResourcesLoading: true
            }
        case fromRequirementApply.FETCH_ADDABLE_APPLY_RESOURCE_SUCCESS:
            return {
                ...state,
                fetchAddableApplyResourcesLoading: false,
                addableApplyResources: action.resources
            }
        case fromRequirementApply.FETCH_ADDABLE_APPLY_RESOURCE_FAILURE:
            return {
                ...state,
                fetchAddableApplyResourcesLoading: false
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

export const getFetchApplyInfoLoading = (state: State) =>
    state.fetchApplyInfoLoading
export const getApplyInfo = (state: State) => state.applyInfo
export const getFetchApproversLoading = (state: State) =>
    state.fetchApproversLoading
export const getApprovers = (state: State) => state.approvers
export const getAddedApplyResources = (state: State) =>
    state.addedApplyResources
export const getFetchAddableApplyResourcesLoading = (state: State) =>
    state.fetchAddableApplyResourcesLoading
export const getAddableApplyResources = (state: State) =>
    state.addableApplyResources
export const getSaveOrSubmitLoading = (state: State) =>
    state.saveOrSubmitLoading
export const getSaveOrSubmitText = (state: State) => state.saveOrSubmitText
