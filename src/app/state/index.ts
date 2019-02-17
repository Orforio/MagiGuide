import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';


import { environment } from '../../environments/environment';

export interface State {
	temp: number;
}

export const reducers: ActionReducerMap<State> = {
	temp: null
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	return localStorageSync({
		keys: ['fastpasses'],
		rehydrate: true
	})(reducer);
}

export const metaReducers: MetaReducer<State>[] = [
	localStorageSyncReducer,
	!environment.production ? storeFreeze : null
];
