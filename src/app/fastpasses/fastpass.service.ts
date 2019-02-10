import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Fastpass } from './fastpass.model';

@Injectable({
	providedIn: 'root'
})
export class FastpassService {
	private mockFastpasses: Fastpass[];
	private nextId = 3;

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

		this.mockFastpasses[0].id = 1;
		this.mockFastpasses[1].id = 2;
	}

	public delete(id: number): Observable<number> {
		const deletionIndex = this.mockFastpasses.findIndex(fastpass => fastpass.id === id);
		if (deletionIndex >= 0) {
			this.mockFastpasses = [...this.mockFastpasses.filter(x => x.id !== id)];
			return observableOf(id);
		} else {
			return throwError('No such ID');
		}
	}

	public get(): Observable<Fastpass[]> {
		return observableOf(this.mockFastpasses);
	}

	public save(fastpass: Fastpass): Observable<Fastpass> {
		const newFastpass = new Fastpass(
			fastpass.ride,
			fastpass.startTime,
			fastpass.endTime,
			fastpass.nextAvailableTime
		);
		newFastpass.id = this.nextId;
		this.nextId++;
		this.mockFastpasses = [...this.mockFastpasses, newFastpass];

		return observableOf(newFastpass);
	}
}
