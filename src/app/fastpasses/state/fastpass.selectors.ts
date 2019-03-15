import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromFastpass from './fastpass.reducer';

const getFastpassFeatureState = createFeatureSelector<fromFastpass.FastpassState>('fastpasses');

export const getEditFastpass = createSelector(
	getFastpassFeatureState,
	state => state.editFastpass
);

export const getFastpasses = createSelector(
	getFastpassFeatureState,
	fromFastpass.selectAll
);

export const getNextAvailableTime = createSelector(
	getFastpasses,
	fastpasses => fastpasses.map(
		fastpass => fastpass.nextAvailableTime).reduce(
			(accumulator, currentValue) => accumulator && accumulator.getTime() > currentValue.getTime() ? accumulator : currentValue,
			null)
);
