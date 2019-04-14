import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAttractions from './attractions.reducer';

const getAttractionsFeatureState = createFeatureSelector<fromAttractions.AttractionsState>('attractions');
