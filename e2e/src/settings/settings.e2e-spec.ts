import { browser } from 'protractor';

import { SettingsPage } from './settings.po';
import { FastpassesPage } from '../fastpasses/fastpasses.po';

describe('Settings Page', () => {
	let settingsPage: SettingsPage;

	beforeEach(() => {
		// Arrange
		settingsPage = new SettingsPage();

		// Act
		settingsPage.navigateToSettingsPage();
	});

	afterEach(() => {
		browser.executeScript('window.localStorage.clear();');
	});

	it('should display the Settings header', () => {
		// Assert
		expect(settingsPage.getPageTitle()).toEqual('Settings');
	});

	describe('Fastpass settings', () => {
		it('should display the Fastpass settings', () => {
			// Assert
			expect(settingsPage.getFastpassSettingsHeading()).toEqual('Fastpass settings');
		});

		it('should display the Fastpass settings buttons', () => {
			// Assert
			expect(settingsPage.getRemoveOldFastpassesButton().getText()).toEqual('Remove old Fastpasses');
		});
	});

	describe('Debug settings', () => {
		it('should display the Debug settings', () => {
			// Assert
			expect(settingsPage.getDebugSettingsHeading()).toEqual('Debug settings');
		});

		it('should by default not show the Debug settings buttons', () => {
			// Assert
			expect(settingsPage.getDebugSettingsEnable().isSelected()).toBeFalsy();
			settingsPage.getDebugSettingsButtons().each(button => expect(button.isDisplayed()).toBeFalsy());
		});

		it('should show the Debug settings button when the "Enable debug settings" box is ticked', () => {
			// Act
			settingsPage.getDebugSettingsEnable().click();

			// Assert
			expect(settingsPage.getDebugSettingsEnable().isSelected()).toBeTruthy();
			settingsPage.getDebugSettingsButtons().each(button => expect(button.isDisplayed()).toBeTruthy());
		});

		describe('Reset app data & state', () => {
			let fastpassesPage: FastpassesPage;

			beforeEach(() => {
				// Arrange
				fastpassesPage = new FastpassesPage();
				fastpassesPage.navigateToFastpasses();
				fastpassesPage.fillInAddFastpass('Star Tours', [10, 30], [11, 0], [12, 30]);
				settingsPage.navigateToSettingsPage();
				settingsPage.getDebugSettingsEnable().click();
			});

			it('should clear all settings and Fastpasses', () => {
				// Act
				settingsPage.clickAndConfirmResetApp();

				// Assert
				expect(settingsPage.getDebugSettingsEnable().isSelected()).toBeFalsy();
				fastpassesPage.navigateToFastpasses();
				expect(fastpassesPage.getNextAvailableFastpass()).toEqual('New Fastpass available now!');
				expect(fastpassesPage.getFastpasses().count()).toEqual(0);
			});
		});
	});
});
