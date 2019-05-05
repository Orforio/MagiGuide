import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromSettings from '../settings/state';
import * as fromFastpasses from '../fastpasses/state';
import { environment } from '../../environments/environment';

export interface State {
	fastpasses: fromFastpasses.FastpassesState;
	settings: fromSettings.SettingsState;
}

export const reducers: ActionReducerMap<any> = {
	settings: fromSettings.settingsReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	return localStorageSync({
		keys: [
			'attractions',
			'fastpasses',
			'settings'
		],
		rehydrate: true,
		removeOnUndefined: true
	})(reducer);
}

export function resetAppReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	return function (state, action) {
		return reducer(action.type === fromSettings.SettingsActionTypes.ResetApp ? undefined : state, action);
	};
}

export const metaReducers: MetaReducer<State>[] = !environment.production ?
	[localStorageSyncReducer, resetAppReducer, storeFreeze] :
	[localStorageSyncReducer, resetAppReducer];
