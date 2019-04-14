import { browser } from 'protractor';

import { AppPage } from './app.po';

describe('MagiGuide App', () => {
	let appPage: AppPage;

	beforeEach(() => {
		// Arrange
		appPage = new AppPage();

		// Act
		appPage.navigateToApp();
	});

	afterEach(() => {
		browser.executeScript('window.localStorage.clear();');
	});

	it('should display the Active Park bar', () => {
		// Assert
		expect(appPage.getActiveParkBar()).toBeDefined();
	});

	it('should display the nav bar', () => {
		// Assert
		expect(appPage.getNavBar()).toBeDefined();
	});

	it('should display the Dashboard button', () => {
		// Assert
		expect(appPage.getNavDashboardButton().getText()).toEqual('Dashboard');
	});

	it('should redirect to the Dashboard page when Dashboard is clicked', () => {
		// Act
		appPage.getNavDashboardButton().click();

		// Assert
		expect(browser.driver.getCurrentUrl()).toMatch(/\/$/);
	});

	it('should display the Attractions button', () => {
		// Assert
		expect(appPage.getNavAttractionsButton().getText()).toEqual('Attractions');
	});

	it('should display the Fastpass button', () => {
		// Assert
		expect(appPage.getNavFastpassButton().getText()).toEqual('Fastpass');
	});

	it('should redirect to the Fastpasses page when Fastpass is clicked', () => {
		// Act
		appPage.getNavFastpassButton().click();

		// Assert
		expect(browser.driver.getCurrentUrl()).toContain('/fastpasses');
	});

	it('should display the Settings button', () => {
		// Assert
		expect(appPage.getNavSettingsButton().getText()).toEqual('Settings');
	});

	it('should redirect to the Settings page when Settings is clicked', () => {
		// Act
		appPage.getNavSettingsButton().click();

		// Assert
		expect(browser.driver.getCurrentUrl()).toContain('/settings');
	});
});
