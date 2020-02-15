import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Attraction } from './attraction.model';
import * as fromAttractions from './state';
import * as fromRoot from '../state';
import { DateTimeService } from '../common';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./attractions.component.scss'],
	templateUrl: './attractions.component.html'
})
export class AttractionsComponent implements OnInit {
	public attractions: Observable<Attraction[]>;

	constructor(
		private dateTimeService: DateTimeService,
		private store: Store<fromRoot.State>,
	) {}

	public ngOnInit(): void {
		this.attractions = combineLatest([
			this.store.pipe(select(fromAttractions.getAttractionsForPark)),
			this.store.pipe(select(fromAttractions.getAttractionsOldestUpdateForPark))
		]).pipe(
			tap(([attractions, oldestUpdate]) => {
				if (attractions.length === 0 || (attractions.length > 0 && this.dateTimeService.isOlderThanHours(oldestUpdate, 12))) {
					this.store.dispatch(new fromAttractions.LoadAttractions());
				}
			}),
			map(([attractions]) => attractions)
		);
	}
}
