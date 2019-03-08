import { SettingsState } from './settings.reducer';
import * as settingsSelectors from './settings.selectors';

describe('Settings Selectors', () => {
	describe('getEnableDebug()', () => {
		it('should return the enableDebug flag', () => {
			// Arrange
			const mockSettingsState: SettingsState = {
				enableDebug: true
			};

			// Act
			const result = settingsSelectors.getEnableDebug.projector(mockSettingsState);

			// Assert
			expect(result).toBe(true);
		});
	});
});
