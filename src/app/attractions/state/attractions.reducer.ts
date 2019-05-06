import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { AttractionsActions, AttractionsActionTypes } from './attractions.actions';
import { SettingsActions, SettingsActionTypes } from '../../settings/state';
import { Attraction } from '../attraction.model';

export interface AttractionsState extends EntityState<Attraction> {
	error: string;
	loading: boolean;
}

const attractionsAdapter: EntityAdapter<Attraction> = createEntityAdapter<Attraction>({
	sortComparer: sortByName
});

export const initialAttractionsState: AttractionsState = attractionsAdapter.getInitialState({
	error: '',
	loading: false
});

function sortByName(attraction1: Attraction, attraction2: Attraction): number {
	return attraction1.name.localeCompare(attraction2.name);
}

export function attractionsReducer(
	state = initialAttractionsState,
	action: AttractionsActions | SettingsActions): AttractionsState {
	switch (action.type) {
		case AttractionsActionTypes.CancelLoadAttractions:
			return {
				...state,
				loading: false
			};
		case AttractionsActionTypes.LoadAttractions:
		case SettingsActionTypes.SetActivePark:
			return {
				...state,
				loading: true
			};
		case AttractionsActionTypes.LoadAttractionsFailure:
			return {
				...state,
				error: action.payload.error,
				loading: false
			};
		case AttractionsActionTypes.LoadAttractionsSuccess:
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
