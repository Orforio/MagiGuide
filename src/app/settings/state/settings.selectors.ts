import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSettings from './settings.reducer';

const getSettingsFeatureState = createFeatureSelector<fromSettings.SettingsState>('settings');

export const getActivePark = createSelector(
	getSettingsFeatureState,
	state => state.activePark
);

export const getEnableDebug = createSelector(
	getSettingsFeatureState,
	state => state.enableDebug
);
