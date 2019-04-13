import { initialSettingsState, SettingsState } from './settings.reducer';
import * as settingsSelectors from './settings.selectors';
import { Parks } from '../../common';

describe('Settings Selectors', () => {
	describe('getActivePark()', () => {
		it('should return the activePark', () => {
			// Arrange
			const mockSettingsState: SettingsState = {
				...initialSettingsState,
				activePark: Parks.WaltDisneyStudios
			};

			// Act
			const result = settingsSelectors.getActivePark.projector(mockSettingsState);

			// Assert
			expect(result).toEqual(Parks.WaltDisneyStudios);
		});
	});

	describe('getEnableDebug()', () => {
		it('should return the enableDebug flag', () => {
			// Arrange
			const mockSettingsState: SettingsState = {
				...initialSettingsState,
				enableDebug: true
			};

			// Act
			const result = settingsSelectors.getEnableDebug.projector(mockSettingsState);

			// Assert
			expect(result).toBe(true);
		});
	});
});
