import { browser } from 'protractor';

import { DashboardPage } from './dashboard.po';

describe('Dashboard Page', () => {
	let dashboardPage: DashboardPage;

	beforeEach(() => {
		// Arrange
		dashboardPage = new DashboardPage();

		// Act
		dashboardPage.navigateToDashboard();
	});

	afterEach(() => {
		browser.executeScript('window.localStorage.clear();');
	});

	it('should display the Dashboard header', () => {
		// Assert
		expect(dashboardPage.getPageTitle()).toEqual('MagiGuide Dashboard');
	});

	it('should navigate to the Fastpasses page when "Add new Fastpasses" is clicked', () => {
		// Act
		dashboardPage.getAddFastpassButton().click();

		// Assert
		expect(browser.getCurrentUrl()).toContain('/fastpasses');
	});

	describe('with no Fastpasses', () => {
		it('should not display a Fastpass', () => {
			// Assert
			expect(dashboardPage.getNextFastpass().isPresent()).toBeFalsy();
		});

		it('should say that a Fastpass is now available', () => {
			// Assert
			expect(dashboardPage.getNextAvailableTime()).toContain('available now');
		});
	});
});
