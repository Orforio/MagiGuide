import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

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
		rehydrate: true
	})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ?
	[localStorageSyncReducer, storeFreeze] :
	[localStorageSyncReducer];
