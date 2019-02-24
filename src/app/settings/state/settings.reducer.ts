import { SettingsActions, SettingsActionTypes } from './settings.actions';

export interface SettingsState {
	enableDebug: boolean;
}

export const initialSettingsState: SettingsState = {
	enableDebug: false
};

export function settingsReducer(state = initialSettingsState, action: SettingsActions): SettingsState {
	switch (action.type) {
		case SettingsActionTypes.SetDebug:
			return {
				...state,
				enableDebug: action.payload.enableDebug
			};
		default:
			return state;
	}
}
