import { browser, by, element, ElementArrayFinder, ElementFinder, promise } from 'protractor';

import { MagiGuidePage } from '../common.po';

export class FastpassesPage extends MagiGuidePage {
	public navigateToFastpasses(): promise.Promise<any> {
		return browser.get('/fastpasses');
	}

	public getNextAvailableFastpass(): promise.Promise<string> {
		return element(by.id('next-available-time-alert')).getText();
	}

	public getFastpasses(): ElementArrayFinder {
		return element.all(by.tagName('mg-view-fastpass'));
	}

	public getFastpass(number: number): ElementFinder {
		return this.getFastpasses().get(number);
	}

	public getFastpassRide(number: number): ElementFinder {
		return this.getFastpass(number).element(by.className('ride-name'));
	}

	public getFastpassStartTime(number: number): ElementFinder {
		return this.getFastpass(number).element(by.className('start-time'));
	}

	public getFastpassEndTime(number: number): ElementFinder {
		return this.getFastpass(number).element(by.className('end-time'));
	}

	public getFastpassEditButton(number: number): ElementFinder {
		return this.getFastpass(number).element(by.className('edit-fastpass'));
	}

	public getFastpassDeleteButton(number: number): ElementFinder {
		return this.getFastpass(number).element(by.className('remove-fastpass'));
	}

	public getUpdateFastpass(): ElementFinder {
		return element(by.css('mg-upsert-fastpass#update-fastpass'));
	}

	public getUpdateFastpassRide(): ElementFinder {
		return this.getUpdateFastpass().element(by.name('ride'));
	}

	public getUpdateFastpassStartTime(): ElementFinder {
		return this.getUpdateFastpass().element(by.name('startTime'));
	}

	public getUpdateFastpassEndTime(): ElementFinder {
		return this.getUpdateFastpass().element(by.name('endTime'));
	}

	public getUpdateFastpassNextAvailableTime(): ElementFinder {
		return this.getUpdateFastpass().element(by.name('nextAvailableTime'));
	}

	public getUpdateFastpassButton(): ElementFinder {
		return this.getUpdateFastpass().element(by.css('button[type="submit"]'));
	}

	public getUpdateFastpassCancelButton(): ElementFinder {
		return this.getUpdateFastpass().element(by.buttonText('Cancel Update'));
	}

	public getAddFastpass(): ElementFinder {
		return element(by.css('mg-upsert-fastpass#add-fastpass'));
	}

	public getAddFastpassRide(): ElementFinder {
		return this.getAddFastpass().element(by.name('ride'));
	}

	public getAddFastpassStartTime(): ElementFinder {
		return this.getAddFastpass().element(by.name('startTime'));
	}

	public getAddFastpassEndTime(): ElementFinder {
		return this.getAddFastpass().element(by.name('endTime'));
	}

	public getAddFastpassNextAvailableTime(): ElementFinder {
		return this.getAddFastpass().element(by.name('nextAvailableTime'));
	}

	public getAddFastpassButton(): ElementFinder {
		return this.getAddFastpass().element(by.css('button[type="submit"]'));
	}

	public fillInAddFastpass(
		ride: string,
		startTime: number[],
		endTime: number[],
		nextAvailableTime: number[]
		): void {
			this.getAddFastpassRide().element(by.cssContainingText('option', ride)).click();
			this.getAddFastpassStartTime().all(by.tagName('input')).each((input, index) => input.sendKeys(startTime[index]));
			this.getAddFastpassEndTime().all(by.tagName('input')).each((input, index) => input.sendKeys(endTime[index]));
			this.getAddFastpassNextAvailableTime().all(by.tagName('input')).each((input, index) => input.sendKeys(nextAvailableTime[index]));
			this.getAddFastpassButton().click();
		}

	public fillInUpdateFastpass(
		ride: string,
		startTime: number[],
		endTime: number[],
		nextAvailableTime: number[]
		): void {
			this.getUpdateFastpassRide().element(by.cssContainingText('option', ride)).click();
			this.getUpdateFastpassStartTime().all(by.tagName('input')).each((input, index) => {
				input.clear();
				input.sendKeys(startTime[index]);
			});
			this.getUpdateFastpassEndTime().all(by.tagName('input')).each((input, index) => {
				input.clear();
				input.sendKeys(endTime[index]);
			});
			this.getUpdateFastpassNextAvailableTime().all(by.tagName('input')).each((input, index) => {
				input.clear();
				input.sendKeys(nextAvailableTime[index]);
			});
			this.getUpdateFastpassButton().click();
		}
}
