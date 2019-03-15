import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { FastpassActions, FastpassActionTypes } from './fastpass.actions';
import { Fastpass } from '../fastpass.model';
import * as fromRoot from '../../state';

export interface State extends fromRoot.State {
	fastpasses: FastpassState;
}

export interface FastpassState extends EntityState<Fastpass> {}

const fastpassAdapter: EntityAdapter<Fastpass> = createEntityAdapter<Fastpass>({
	sortComparer: sortByStartTime
});

export const initialFastpassState: FastpassState = fastpassAdapter.getInitialState({});

function sortByStartTime(fastpass1: Fastpass, fastpass2: Fastpass): number {
	return fastpass1.startTime.getTime() - fastpass2.startTime.getTime();
}

export function fastpassReducer(state = initialFastpassState, action: FastpassActions): FastpassState {
	switch (action.type) {
		case FastpassActionTypes.AddFastpass:
			return fastpassAdapter.addOne(action.payload.fastpass, state);
		case FastpassActionTypes.ClearFastpasses:
			return fastpassAdapter.removeAll(state);
		case FastpassActionTypes.DeleteFastpass:
			return fastpassAdapter.removeOne(action.payload.id, state);
		case FastpassActionTypes.LoadFastpasses:
			return fastpassAdapter.addAll(action.payload.fastpasses, state);
		case FastpassActionTypes.PruneFastpasses:
			return fastpassAdapter.removeMany(
				(fastpass) => {
					return fastpass.startTime.getTime() < action.payload.todayCutoff.getTime(); },
				state
			);
		case FastpassActionTypes.UpsertFastpass:
			return fastpassAdapter.upsertOne(action.payload.fastpass, state);
		default:
			return state;
	}
}

export const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal
} = fastpassAdapter.getSelectors();
