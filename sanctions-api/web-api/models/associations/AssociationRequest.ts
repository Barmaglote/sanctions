import { AREA_TYPE_SINGLE } from '../AreaTypeSingle'

export class AssociationRequest {
    type: AREA_TYPE_SINGLE
    isNew: Boolean
    reputationObject: ReputationObjectShort
    confirmed: Boolean    
}

export class ReputationObjectShort {
    titleeng: String
    _id: String
}