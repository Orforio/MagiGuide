import { by, element, promise } from 'protractor';

export class MagiGuidePage {
	public getPageTitle(): promise.Promise<string> {
		return element(by.tagName('h1')).getText();
	}
}
