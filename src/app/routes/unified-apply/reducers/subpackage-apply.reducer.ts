import * as fromSubPackageApply from '../actions/subpackage-apply.action'
import {
    UnifiedApply,
    SubPackageInfo
} from '@core/models/unified-apply.model'
import { ResourceInfo } from '@core/models/resource-info.model'


export interface State {
    fetchSubPackageInfoLoading: boolean
    subPackageInfo: SubPackageInfo
    addedApplyResources: ResourceInfo[]
    saveOrSubmitLoading: boolean
    saveOrSubmitText: string
}

const initialState: State = {
    fetchSubPackageInfoLoading: false,
    subPackageInfo: null,
    addedApplyResources: [],
    saveOrSubmitLoading: false,
    saveOrSubmitText: ''
}

export function reducer(
    state: State = initialState,
    action: fromSubPackageApply.Actions
): State {
    switch (action.type) {
        case fromSubPackageApply.FETCH_SUBPACKAGE_INFO:
            return {
                ...state,
                fetchSubPackageInfoLoading: true
            }
        case fromSubPackageApply.FETCH_SUBPACKAGE_INFO_SUCCESS:
            return {
                ...state,
                subPackageInfo: action.subpackageInfo,
                fetchSubPackageInfoLoading: false
            }
        case fromSubPackageApply.FETCH_SUBPACKAGE_INFO_FAILURE:
            return {
                ...state,
                fetchSubPackageInfoLoading: false
            }
        case fromSubPackageApply.ADD_APPLY_RESOURCES:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.concat(
                    action.applyResources
                )
            }
        case fromSubPackageApply.DELETE_APPLY_RESOURCE:
            return {
                ...state,
                addedApplyResources: state.addedApplyResources.filter(
                    (_, i) => i !== action.index
                )
            }
        case fromSubPackageApply.SAVE_SUBPACKAGE_APPLY:
            return {
                ...state,
                saveOrSubmitLoading: true,
                saveOrSubmitText: '正在保存统一申请信息'
            }
        case fromSubPackageApply.SUBMIT_SUBPACKAGE_APPLY:
            return {
                ...state,
                saveOrSubmitLoading: true,
                saveOrSubmitText: '正在提交统一申请信息'
            }
        case fromSubPackageApply.SAVE_SUBPACKAGE_APPLY_SUCCESS:
        case fromSubPackageApply.SUBMIT_SUBPACKAGE_APPLY_SUCCESS:
            return {
                ...state,
                saveOrSubmitLoading: false,
                saveOrSubmitText: '',
                subPackageInfo: null,
                addedApplyResources: []
            }
        case fromSubPackageApply.SAVE_SUBPACKAGE_APPLY_FAILURE:
        case fromSubPackageApply.SUBMIT_SUBPACKAGE_APPLY_FAILURE:
            return {
                ...state,
                saveOrSubmitLoading: false,
                saveOrSubmitText: ''
            }
        case fromSubPackageApply.RESET_SUBPACKAGE_APPLY:
            return {
                ...state,
                subPackageInfo: null,
                addedApplyResources: []
            }
        default:
            return state
    }
}

export const getFetchSubPackageInfoLoading = (state: State) =>
    state.fetchSubPackageInfoLoading
export const getSubPackageInfo = (state: State) => state.subPackageInfo
export const getAddedApplyResources = (state: State) =>
    state.addedApplyResources
export const getSaveOrSubmitLoading = (state: State) =>
    state.saveOrSubmitLoading
export const getSaveOrSubmitText = (state: State) => state.saveOrSubmitText
