import { browser, by, element, ElementArrayFinder, ElementFinder, promise } from 'protractor';

export class AppPage {
	public navigateToApp(): promise.Promise<any> {
		return browser.get('/');
	}

	public getActiveParkBar(): ElementFinder {
		return element(by.id('active-park-bar'));
	}

	public getNavBar(): ElementFinder {
		return element(by.id('navigation-bar'));
	}

	public getNavButtons(): ElementArrayFinder {
		return this.getNavBar().all(by.tagName('a'));
	}

	public getNavDashboardButton(): ElementFinder {
		return this.getNavButtons().get(0);
	}

	public getNavAttractionsButton(): ElementFinder {
		return this.getNavButtons().get(1);
	}

	public getNavFastpassButton(): ElementFinder {
		return this.getNavButtons().get(2);
	}

	public getNavSettingsButton(): ElementFinder {
		return this.getNavButtons().get(3);
	}
}
