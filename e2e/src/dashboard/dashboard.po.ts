import { browser, by, element, ElementFinder, promise } from 'protractor';

import { MagiGuidePage } from '../common.po';

export class DashboardPage extends MagiGuidePage {
	public navigateToDashboard(): promise.Promise<any> {
		return browser.get('/dashboard');
	}

	public getNextFastpass(): ElementFinder {
		return element(by.tagName('mg-view-fastpass'));
	}

	public getNextFastpassRide(): promise.Promise<string> {
		return this.getNextFastpass().element(by.className('ride-name')).getText();
	}

	public getNextFastpassStartTime(): promise.Promise<string> {
		return this.getNextFastpass().element(by.className('start-time')).getText();
	}

	public getNextAvailableTime(): promise.Promise<string> {
		return element(by.id('next-available-time')).getText();
	}

	public getAddFastpassButton(): ElementFinder {
		return element(by.buttonText('Add new Fastpass'));
	}
}
