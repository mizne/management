import * as ResourceTypeAction from '../actions/resource-type.action'
import * as SoftwareNameAction from '../actions/software-name.action'
import * as SoftwareSpecAction from '../actions/software-spec.action'
import * as SoftwareTypeAction from '../actions/software-type.action'
import * as UseEnvironmentAction from '../actions/use-environment.action'
import {
    ResourceType,
    SoftwareName,
    SoftwareSpec,
    SoftwareType,
    UseEnvironment
} from '@core/models/resource-info.model'

type Actions =
    | ResourceTypeAction.Actions
    | SoftwareNameAction.Actions
    | SoftwareSpecAction.Actions
    | SoftwareTypeAction.Actions
    | UseEnvironmentAction.Actions

export interface State {
    resourceTypes: ResourceType[]
    softwareNames: SoftwareName[]
    softwareTypes: SoftwareType[]
    softwareSpecs: SoftwareSpec[]
    useEnvironments: UseEnvironment[]
}
const initialState: State = {
    resourceTypes: [],
    softwareNames: [],
    softwareTypes: [],
    softwareSpecs: [],
    useEnvironments: []
}

export function reduder(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ResourceTypeAction.FETCH_RESOURCE_TYPES_SUCCESS:
            return {
                ...state,
                resourceTypes: action.resourceTypes
            }
        case SoftwareNameAction.FETCH_SOFTWARE_NAMES_SUCCESS:
            return {
                ...state,
                softwareNames: action.softwareNames
            }
        case SoftwareSpecAction.FETCH_SOFTWARE_SPECS_SUCCESS:
            return {
                ...state,
                softwareSpecs: action.softwareSpecs
            }
        case SoftwareTypeAction.FETCH_SOFTWARE_TYPES_SUCCESS:
            return {
                ...state,
                softwareTypes: action.softwareTypes
            }
        case UseEnvironmentAction.FETCH_USE_ENVIRONMENTS_SUCCESS:
            return {
                ...state,
                useEnvironments: action.useEnvironments
            }
        default:
            return state
    }
}

export const getResourceTypes = (state: State) => state.resourceTypes
export const getSoftwareNames = (state: State) => state.softwareNames
export const getSoftwareTypes = (state: State) => state.softwareTypes
export const getSoftwareSpecs = (state: State) => state.softwareSpecs
export const getUseEnvironments = (state: State) => state.useEnvironments
