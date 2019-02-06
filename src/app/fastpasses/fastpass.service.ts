import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { Fastpass } from './fastpass.model';

@Injectable({
	providedIn: 'root'
})
export class FastpassService {
	private mockFastpasses: Fastpass[];

	constructor() {
		this.mockFastpasses = [
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
	}

	public get(): Observable<Fastpass[]> {
		return observableOf(this.mockFastpasses);
	}

	public save(newFastpass: Fastpass): Observable<Fastpass> {
		this.mockFastpasses = [...this.mockFastpasses, newFastpass];

		return observableOf(newFastpass);
	}
}
