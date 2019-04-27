import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { AttractionActions, AttractionActionTypes } from './attractions.actions';
import { Attraction } from '../attraction.model';

export interface AttractionsState extends EntityState<Attraction> {
	error: string;
	loading: boolean;
}

const attractionsAdapter: EntityAdapter<Attraction> = createEntityAdapter<Attraction>({});

export const initialAttractionsState: AttractionsState = attractionsAdapter.getInitialState({
	error: '',
	loading: false
});

export function attractionsReducer(state = initialAttractionsState, action: AttractionActions): AttractionsState {
	switch (action.type) {
		case AttractionActionTypes.LoadAttractions:
			return {
				...state,
				loading: true
			};
		case AttractionActionTypes.LoadAttractionsFailure:
			return {
				...state,
				error: action.payload.error,
				loading: false
			};
		case AttractionActionTypes.LoadAttractionsSuccess:
			return attractionsAdapter.upsertMany(action.payload.attractions, {
				...state,
				error: '',
				loading: false
			});
		default:
			return state;
	}
}

export const {
	selectAll,
	selectEntities,
	selectIds,
	selectTotal
} = attractionsAdapter.getSelectors();
