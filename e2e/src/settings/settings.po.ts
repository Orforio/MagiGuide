import { browser, by, element, promise, ElementArrayFinder, ElementFinder } from 'protractor';

import { MagiGuidePage } from '../common.po';

export class SettingsPage extends MagiGuidePage {
	public navigateToSettingsPage(): promise.Promise<any> {
		return browser.get('/settings');
	}

	public getSettings(): ElementArrayFinder {
		return element.all(by.css('.card'));
	}

	public getFastpassSettings(): ElementFinder {
		return this.getSettings().get(0);
	}

	public getFastpassSettingsHeading(): promise.Promise<string> {
		return this.getFastpassSettings().element(by.tagName('h2')).getText();
	}

	public getFastpassSettingsButtons(): ElementArrayFinder {
		return this.getFastpassSettings().all(by.tagName('button'));
	}

	public getRemoveOldFastpassesButton(): ElementFinder {
		return this.getFastpassSettingsButtons().get(0);
	}

	public getDebugSettings(): ElementFinder {
		return this.getSettings().get(1);
	}

	public getDebugSettingsHeading(): promise.Promise<string> {
		return this.getDebugSettings().element(by.tagName('h2')).getText();
	}

	public getDebugSettingsEnable(): ElementFinder {
		return this.getDebugSettings().element(by.css('input[type="checkbox"'));
	}

	public getDebugSettingsButtons(): ElementArrayFinder {
		return this.getDebugSettings().all(by.tagName('button'));
	}

	public getDebugSettingsResetAppButton(): ElementFinder {
		return this.getDebugSettings().element(by.partialButtonText('Reset app'));
	}

	public clickAndConfirmResetApp(): void {
		this.getDebugSettingsResetAppButton().click();
		browser.driver.switchTo().alert().then((alert) => {
			alert.accept();
		});
	}
}
