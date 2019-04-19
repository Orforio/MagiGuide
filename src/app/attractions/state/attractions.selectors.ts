import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAttractions from './attractions.reducer';
import * as fromSettings from '../../settings/state/settings.selectors';

const getAttractionsFeatureState = createFeatureSelector<fromAttractions.AttractionsState>('attractions');

export const getAttractions = createSelector(
	getAttractionsFeatureState,
	fromAttractions.selectAll
);

export const getAttractionsForPark = createSelector(
	getAttractions,
	fromSettings.getActivePark,
	(attractions, activePark) => attractions.filter(attraction => attraction.park === activePark)
);
