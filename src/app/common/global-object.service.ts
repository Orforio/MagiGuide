import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GlobalObjectService {
	public getWindow(): Window {
		return window;
	}
}
