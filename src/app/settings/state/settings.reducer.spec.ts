import { SettingsState, initialSettingsState, settingsReducer } from './settings.reducer';
import * as settingsActions from './settings.actions';

describe('Settings Reducer', () => {
	describe('SetDebug', () => {
		it('should set enableDebug to the payload', () => {
			// Arrange
			const previousState: SettingsState = {
				...initialSettingsState,
				enableDebug: true
			};
			const expectedResult: SettingsState = {
				...initialSettingsState,
				enableDebug: false
			};
			const action = new settingsActions.SetDebug({ enableDebug: false });

			// Act
			const result = settingsReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('default', () => {
		it('should return the initial state', () => {
			// Arrange
			const action = {} as any;

			// Act
			const result = settingsReducer(initialSettingsState, action);

			// Assert
			expect(result).toEqual(initialSettingsState);
		});
	});
});
