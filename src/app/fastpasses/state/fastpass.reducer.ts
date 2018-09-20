import { FastpassActions, FastpassActionTypes } from './fastpass.actions';
import { Fastpass } from '../fastpass.model';

export interface FastpassState {
	error: string;
	fastpasses: Fastpass[];
	nextAvailableTime: Date;
}

export const initialState: FastpassState = {
	error: '',
	fastpasses: [],
	nextAvailableTime: new Date()
};

export function reducer(state = initialState, action: FastpassActions): FastpassState {
	switch (action.type) {
		case FastpassActionTypes.LoadFastpassesSuccess:
			return {
				...state,
				error: '',
				fastpasses: action.payload
			};
		case FastpassActionTypes.LoadFastpassesFail:
			return {
				...state,
				error: action.payload,
				fastpasses: []
			};
		default:
			return state;
	}
}
