import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { FastpassesActions, FastpassesActionTypes } from './fastpasses.actions';
import { Fastpass } from '../fastpass.model';

export interface FastpassesState extends EntityState<Fastpass> {
	editFastpass: string | null;
}

const fastpassesAdapter: EntityAdapter<Fastpass> = createEntityAdapter<Fastpass>({
	sortComparer: sortByStartTime
});

export const initialFastpassesState: FastpassesState = fastpassesAdapter.getInitialState({
	editFastpass: null
});

function sortByStartTime(fastpass1: Fastpass, fastpass2: Fastpass): number {
	return fastpass1.startTime.getTime() - fastpass2.startTime.getTime();
}

export function fastpassesReducer(state = initialFastpassesState, action: FastpassesActions): FastpassesState {
	switch (action.type) {
		case FastpassesActionTypes.AddFastpass:
			return fastpassesAdapter.addOne(action.payload.fastpass, state);
		case FastpassesActionTypes.ClearFastpasses:
			return fastpassesAdapter.removeAll(state);
		case FastpassesActionTypes.DeleteFastpass:
			return fastpassesAdapter.removeOne(action.payload.id, state);
		case FastpassesActionTypes.EditFastpass:
			return {
				...state,
				editFastpass: action.payload.id
			};
		case FastpassesActionTypes.LoadFastpasses:
			return fastpassesAdapter.addAll(action.payload.fastpasses, state);
		case FastpassesActionTypes.PruneFastpasses:
			return fastpassesAdapter.removeMany(
				(fastpass) => {
					return fastpass.startTime.getTime() < action.payload.todayCutoff.getTime(); },
				state
			);
		case FastpassesActionTypes.UpsertFastpass:
			return fastpassesAdapter.upsertOne(action.payload.fastpass, {
				...state,
				editFastpass: null
			});
		default:
			return state;
	}
}

export const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal
} = fastpassesAdapter.getSelectors();
