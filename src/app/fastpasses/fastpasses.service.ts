import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Fastpass } from './fastpass.model';

@Injectable({
	providedIn: 'root'
})
export class FastpassesService {
	constructor() { }

	public get(): Observable<Fastpass[]> {
		const mockFastpasses = [
			new Fastpass(
				'Big Thunder Mountain',
				new Date('May 27, 2018 10:40:00'),
				new Date('May 27, 2018 11:10:00'),
				new Date('May 27, 2018 10:40:00')
			),
			new Fastpass(
				'Hyperspace Mountain',
				new Date('May 27, 2018 15:20:00'),
				new Date('May 27, 2018 15:50:00'),
				new Date('May 27, 2018 12:40:00')
			)
		];

		return of(mockFastpasses);
	}
}
