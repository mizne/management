import * as fromSystemOnOff from '../actions/system-onoff.action'
import {
    ApplyInfo,
    Approver,
    SystemOnOffApply
} from '@core/models/system-onoff.model'
import { ResourceInfo } from '@core/models/resource-info.model'


export interface State {
    fetchApplyInfoLoading: boolean
    applyInfo: ApplyInfo
    fetchApproversLoading: boolean
    approvers: Approver[]
    addedApplyResources: ResourceInfo[]
    showCreateApplyResourceBtn: boolean
    saveOrSubmitLoading: boolean
    saveOrSubmitText: string
}

const initialState: State = {
    fetchApplyInfoLoading: false,
    applyInfo: null,
    fetchApproversLoading: false,
    approvers: [],
    addedApplyResources: [],
    showCreateApplyResourceBtn: false,
    saveOrSubmitLoading: false,
    saveOrSubmitText: ''
}

export function reducer(
    state: State = initialState,
    action: fromSystemOnOff.Actions
): State {
    switch (action.type) {
        case fromSystemOnOff.SWITCH_APPLY_TYPE:
            return {
                ...state,
                showCreateApplyResourceBtn: action.applyType === '上线'
            }
        case fromSystemOnOff.FETCH_APPLY_INFO:
            return {
                ...state,
                fetchApplyInfoLoading: true
            }
        case fromSystemOnOff.FETCH_APPLY_INFO_SUCCESS:
            return {
                ...state,
                applyInfo: action.applyInfo,
                fetchApplyInfoLoading: false
            }
        case fromSystemOnOff.FETCH_APPLY_INFO_FAILURE:
            return {
                ...state,
                fetchApplyInfoLoading: false
            }

        case fromSystemOnOff.FETCH_APPROVERS:
            return {
                ...state,
                fetchApproversLoading: true
            }
        case fromSystemOnOff.FETCH_APPROVERS_SUCCESS:
            return {
                ...state,
                approvers: action.approvers,
                fetchApproversLoading: false
            }
        case fromSystemOnOff.FETCH_APPROVERS_FAILURE:
            return {
                ...state,
                fetchApproversLoading: false
            }
        case fromSystemOnOff.ADD_APPLY_RESOURCES:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.concat(
                    action.applyResources
                )
            }
        case fromSystemOnOff.CREATE_APPLY_RESOURCE:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.concat(
                    action.applyResource
                )
            }
        case fromSystemOnOff.EDIT_TEMP_APPLY_RESOURCE:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.map(e => {
                    if (e.tempID === action.resource.tempID) {
                        return action.resource
                    }
                    return e
                })
            }
        case fromSystemOnOff.DELETE_APPLY_RESOURCE:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.filter(
                    (_, i) => i !== action.index
                )
            }
        case fromSystemOnOff.SAVE_SYSTEM_ONOFF_APPLY:
            return {
                ...state,
                saveOrSubmitLoading: true,
                saveOrSubmitText: '正在保存申请信息'
            }
        case fromSystemOnOff.SUBMIT_SYSTEM_ONOFF_APPLY:
            return {
                ...state,
                saveOrSubmitLoading: true,
                saveOrSubmitText: '正在提交申请信息'
            }
        case fromSystemOnOff.SAVE_SYSTEM_ONOFF_APPLY_SUCCESS:
        case fromSystemOnOff.SUBMIT_SYSTEM_ONOFF_APPLY_SUCCESS:
            return {
                ...state,
                saveOrSubmitLoading: false,
                saveOrSubmitText: '',
                applyInfo: null,
                approvers: [],
                addedApplyResources: []
            }
        case fromSystemOnOff.SAVE_SYSTEM_ONOFF_APPLY_FAILURE:
        case fromSystemOnOff.SUBMIT_SYSTEM_ONOFF_APPLY_FAILURE:
            return {
                ...state,
                saveOrSubmitLoading: false,
                saveOrSubmitText: ''
            }
        case fromSystemOnOff.RESET_SYSTEM_ONOFF_APPLY:
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
export const getShowCreateApplyResourceBtn = (state: State) => state.showCreateApplyResourceBtn
export const getSaveOrSubmitLoading = (state: State) =>
    state.saveOrSubmitLoading
export const getSaveOrSubmitText = (state: State) => state.saveOrSubmitText
