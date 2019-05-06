import { browser, ExpectedConditions } from 'protractor';

import { AppPage } from '../app.po';
import { FastpassesPage } from './fastpasses.po';

describe('Fastpasses Page', () => {
	let appPage: AppPage;
	let fastpassesPage: FastpassesPage;

	beforeEach(() => {
		// Arrange
		appPage = new AppPage();
		fastpassesPage = new FastpassesPage();

		// Act
		fastpassesPage.navigateToFastpasses();
	});

	afterEach(() => {
		browser.executeScript('window.localStorage.clear();');
	});

	it('should display the Fastpass header', () => {
		// Assert
		expect(fastpassesPage.getPageTitle()).toEqual('Fastpass');
	});

	describe('on first load', () => {
		it('should display the "new Fastpass available" message', () => {
			// Assert
			expect(fastpassesPage.getNextAvailableFastpass()).toContain('available now');
		});

		it('should display no Fastpasses', () => {
			// Assert
			expect(fastpassesPage.getFastpasses().count()).toEqual(0);
		});

		it('should not display the Update Fastpass form', () => {
			// Assert
			expect(fastpassesPage.getUpdateFastpass().isPresent()).toBeFalsy();
		});

		it('should display the Add Fastpass form', () => {
			// Assert
			expect(fastpassesPage.getAddFastpass()).toBeDefined();
			expect(fastpassesPage.getAddFastpassButton().getText()).toEqual('Add Fastpass');
		});
	});

	describe('changing the Active Park', () => {
		it('should only show Disneyland Park Fastpass attractions when selected', () => {
			// Arrange

			// Act
			appPage.selectActivePark('Disneyland Park');
			fastpassesPage.waitForApiLoad();

			// Assert
			expect(
				fastpassesPage.getAddFastpassAttractionOption('Big Thunder Mountain').isPresent()
			).toBeTruthy('Fastpass Attraction not present');
			expect(
				fastpassesPage.getAddFastpassAttractionOption('Pirates of the Caribbean').isPresent()
			).toBeFalsy('Non-Fastpass Attraction present');
			expect(
				fastpassesPage.getAddFastpassAttractionOption('The Twilight Zone Tower of Terror™').isPresent()
			).toBeFalsy('Attraction from wrong park present');
		});

		it('should only show Walt Disney Studios Fastpass attractions when selected', () => {
			// Arrange

			// Act
			appPage.selectActivePark('Walt Disney Studios');
			fastpassesPage.waitForApiLoad();

			// Assert
			expect(
				fastpassesPage.getAddFastpassAttractionOption('The Twilight Zone Tower of Terror™').isPresent()
			).toBeTruthy('Fastpass Attraction not present');
			expect(
				fastpassesPage.getAddFastpassAttractionOption('RC Racer').isPresent()
			).toBeFalsy('Non-Fastpass Attraction present');
			expect(
				fastpassesPage.getAddFastpassAttractionOption('Big Thunder Mountain').isPresent()
			).toBeFalsy('Attraction from wrong park present');
		});
	});

	describe('adding a Fastpass', () => {
		beforeEach(() => {
			// Arrange
			// Act
			fastpassesPage.fillInAddFastpass('Star Tours', [12, 15], [12, 45], [14, 15]);
		});

		it('should display the newly added Fastpass', () => {
			// Assert
			expect(fastpassesPage.getFastpasses().count()).toEqual(1);
		});
	});

	describe('editing a Fastpass', () => {
		beforeEach(() => {
			// Arrange
			fastpassesPage.fillInAddFastpass('Big Thunder Mountain', [11, 0], [11, 30], [10, 45]);
			fastpassesPage.getFastpassEditButton(0).click();
		});

		it('should display the update Fastpass form', () => {
			// Assert
			expect(fastpassesPage.getUpdateFastpass().isPresent()).toBeTruthy();
		});

		it('should display the newly updated Fastpass', () => {
			// Act
			fastpassesPage.fillInUpdateFastpass('Big Thunder Mountain', [11, 15], [11, 45], [11, 0]);

			// Assert
			expect(fastpassesPage.getFastpasses().count()).toEqual(1);
			expect(fastpassesPage.getFastpassAttraction(0).getText()).toEqual('Big Thunder Mountain');
			expect(fastpassesPage.getFastpassStartTime(0).getText()).toEqual('11:15');
			expect(fastpassesPage.getFastpassEndTime(0).getText()).toEqual('11:45');
		});

		it('should cancel the update when the Cancel button is clicked', () => {
			// Act
			fastpassesPage.getUpdateFastpassCancelButton().click();

			// Assert
			expect(fastpassesPage.getUpdateFastpass().isPresent()).toBeFalsy();
			expect(fastpassesPage.getFastpasses().count()).toEqual(1);
			expect(fastpassesPage.getFastpassAttraction(0).getText()).toEqual('Big Thunder Mountain');
			expect(fastpassesPage.getFastpassStartTime(0).getText()).toEqual('11:00');
			expect(fastpassesPage.getFastpassEndTime(0).getText()).toEqual('11:30');
		});
	});

	describe('removing a Fastpass', () => {
		beforeEach(() => {
			// Arrange
			fastpassesPage.fillInAddFastpass('Big Thunder Mountain', [16, 20], [16, 50], [13, 30]);
		});

		it('should remove the Fastpass when the Remove button is clicked', () => {
			// Act
			fastpassesPage.getFastpassDeleteButton(0).click();

			// Assert
			expect(fastpassesPage.getFastpasses().count()).toBe(0);
		});
	});
});
