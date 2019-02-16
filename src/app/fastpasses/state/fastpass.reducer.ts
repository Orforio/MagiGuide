import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { FastpassActions, FastpassActionTypes } from './fastpass.actions';
import { Fastpass } from '../fastpass.model';

export interface FastpassState extends EntityState<Fastpass> {}

export const fastpassAdapter: EntityAdapter<Fastpass> = createEntityAdapter<Fastpass>();

export const initialState: FastpassState = fastpassAdapter.getInitialState({});

export function reducer(state = initialState, action: FastpassActions): FastpassState {
	switch (action.type) {
		case FastpassActionTypes.AddFastpass:
			return fastpassAdapter.addOne(action.payload.fastpass, state);
		case FastpassActionTypes.ClearFastpasses:
			return fastpassAdapter.removeAll(state);
		case FastpassActionTypes.DeleteFastpass:
			return fastpassAdapter.removeOne(action.payload.id, state);
		case FastpassActionTypes.LoadFastpasses:
			return fastpassAdapter.addAll(action.payload.fastpasses, state);
		// TODO: Update Fastpass
		// case FastpassActionTypes.UpdateFastpass:
		// 	return fastpassAdapter.updateOne(action.payload.fastpass, state);
		default:
			return state;
	}
}

export const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = fastpassAdapter.getSelectors();
