import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromFastpass from './fastpass.reducer';

const getFastpassFeatureState = createFeatureSelector<fromFastpass.FastpassState>('fastpasses');

export const getFastpasses = createSelector(
	getFastpassFeatureState,
	fromFastpass.selectAll
);
