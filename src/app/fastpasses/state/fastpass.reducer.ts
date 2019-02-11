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
		case FastpassActionTypes.DeleteFastpassSuccess:
			return {
				...state,
				error: '',
				fastpasses: [...state.fastpasses.filter(fastpass => fastpass.id !== action.payload)]
			};
		case FastpassActionTypes.DeleteFastpassFail:
			return {
				...state,
				error: action.payload
			};
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
		case FastpassActionTypes.SaveFastpassSuccess:
			return {
				...state,
				error: '',
				fastpasses: [...state.fastpasses, action.payload]
			};
		case FastpassActionTypes.SaveFastpassFail:
			return {
				...state,
				error: action.payload,
				fastpasses: []
			};
		default:
			return state;
	}
}
