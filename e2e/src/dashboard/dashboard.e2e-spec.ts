import { browser } from 'protractor';

import { DashboardPage } from './dashboard.po';
import { FastpassesPage } from '../fastpasses/fastpasses.po';

describe('Dashboard Page', () => {
	let dashboardPage: DashboardPage;
	let fastpassesPage: FastpassesPage;

	beforeEach(() => {
		// Arrange
		dashboardPage = new DashboardPage();
		fastpassesPage = new FastpassesPage();

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

	it('should navigate to the Fastpasses page when the Fastpass is clicked', () => {
		// Arrange
		fastpassesPage.navigateToFastpasses();
		fastpassesPage.fillInAddFastpass('Star Tours', [23, 30], [23, 55], [23, 55]);
		dashboardPage.navigateToDashboard();

		// Act
		dashboardPage.getNextFastpass().click();

		// Assert
		expect(browser.getCurrentUrl()).toContain('/fastpasses');
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
