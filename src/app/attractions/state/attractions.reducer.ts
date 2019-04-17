import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { AttractionActions, AttractionActionTypes } from './attractions.actions';
import { Attraction } from '../attraction.model';

export interface AttractionsState extends EntityState<Attraction> {
	error: string;
}

const attractionsAdapter: EntityAdapter<Attraction> = createEntityAdapter<Attraction>({});

export const initialAttractionsState: AttractionsState = attractionsAdapter.getInitialState({
	error: ''
});

export function attractionsReducer(state = initialAttractionsState, action: AttractionActions): AttractionsState {
	switch (action.type) {
		case AttractionActionTypes.LoadAttractionsFailure:
			return {
				...state,
				error: action.payload.error
			};
		case AttractionActionTypes.LoadAttractionsSuccess:
			return attractionsAdapter.upsertMany(action.payload.attractions, {
				...state,
				error: ''
			});
		default:
			return state;
	}
}
