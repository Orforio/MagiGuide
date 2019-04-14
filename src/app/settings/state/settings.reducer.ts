import { SettingsActions, SettingsActionTypes } from './settings.actions';
import { Parks } from '../../common';

export interface SettingsState {
	activePark: Parks;
	enableDebug: boolean;
}

export const initialSettingsState: SettingsState = {
	activePark: Parks.DisneylandPark,
	enableDebug: false
};

export function settingsReducer(state = initialSettingsState, action: SettingsActions): SettingsState {
	switch (action.type) {
		case SettingsActionTypes.SetActivePark:
			return {
				...state,
				activePark: action.payload.activePark
			};
		case SettingsActionTypes.SetDebug:
			return {
				...state,
				enableDebug: action.payload.enableDebug
			};
		default:
			return state;
	}
}
