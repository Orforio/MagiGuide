import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSettings from './settings.reducer';

const getSettingsFeatureState = createFeatureSelector<fromSettings.SettingsState>('settings');

export const getEnableDebug = createSelector(
	getSettingsFeatureState,
	state => state.enableDebug
);
