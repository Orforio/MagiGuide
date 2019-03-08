import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GlobalObjectService {
	constructor() {}

	public getWindow(): Window {
		return window;
	}
}
