import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../state';
import * as fromFastpasses from './fastpass.reducer';

export interface State extends fromRoot.State {
	fastpasses: fromFastpasses.FastpassState;
}

const getFastpassFeatureState = createFeatureSelector<fromFastpasses.FastpassState>('fastpasses');

export const getError = createSelector(
	getFastpassFeatureState,
	state => state.error
);

export const getFastpasses = createSelector(
	getFastpassFeatureState,
	state => state.fastpasses
);

export const getNextAvailableTime = createSelector(
	getFastpassFeatureState,
	state => state.nextAvailableTime
);
