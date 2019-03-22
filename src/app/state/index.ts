import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

import { SettingsActionTypes } from '../settings/state/settings.actions';
import { settingsReducer, SettingsState } from '../settings/state/settings.reducer';
import { environment } from '../../environments/environment';

export interface State {
	settings: SettingsState;
}

export const reducers: ActionReducerMap<State> = {
	settings: settingsReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	return localStorageSync({
		keys: ['fastpasses', 'settings'],
		rehydrate: true,
		removeOnUndefined: true
	})(reducer);
}

export function resetAppReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	return function (state, action) {
		return reducer(action.type === SettingsActionTypes.ResetApp ? undefined : state, action);
	};
}

export const metaReducers: MetaReducer<State>[] = !environment.production ?
	[localStorageSyncReducer, resetAppReducer, storeFreeze] :
	[localStorageSyncReducer, resetAppReducer];
