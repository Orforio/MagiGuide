import { MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {
	temp: number;
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
