import { AttractionActions, AttractionActionTypes } from './attractions.actions';

export interface AttractionsState {

}

export const initialAttractionsState: AttractionsState = {

};

export function attractionsReducer(state = initialAttractionsState, action: AttractionActions): AttractionsState {
	switch (action.type) {
		case AttractionActionTypes.LoadAttractions:
			return state;
		case AttractionActionTypes.LoadAttractionsSuccess:
			return state;
		case AttractionActionTypes.LoadAttractionsFailure:
			return state;
		default:
			return state;
	}
}
