import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';

export interface State {
	temp: number;
}

export const reducers: ActionReducerMap<State> = {
	temp: null
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
