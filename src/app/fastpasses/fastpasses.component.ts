import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Attraction } from '../attractions/attraction.model';
import { Fastpass } from './fastpass.model';
import { LoadAttractions } from '../attractions/state/attractions.actions';
import { DeleteFastpass, PruneFastpasses, UpsertFastpass, EditFastpass } from './state/fastpass.actions';
import * as fromRoot from '../state';
import * as attractionSelectors from '../attractions/state/attractions.selectors';
import * as fastpassSelectors from './state/fastpass.selectors';
import { DateTimeService } from '../common';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './fastpasses.component.html',
	styleUrls: ['./fastpasses.component.scss']
})
export class FastpassesComponent implements OnInit {
	public attractions: Observable<Attraction[]>;
	public editFastpassId: Observable<string | null>;
	public fastpasses: Observable<Fastpass[]>;
	public nextAvailableTime: Observable<Date>;

	constructor(
		private dateTimeService: DateTimeService,
		private store: Store<fromRoot.State>
	) {}

	public ngOnInit(): void {
		this.attractions = combineLatest(
			this.store.pipe(select(attractionSelectors.getAttractionsForPark)),
			this.store.pipe(select(attractionSelectors.getAttractionsOldestUpdateForPark))
		).pipe(
			tap(([attractions, oldestUpdate]) => {
				if (attractions.length === 0 || (attractions.length > 0 && this.dateTimeService.isOlderThanHours(oldestUpdate, 12))) {
					this.store.dispatch(new LoadAttractions());
				}
			}),
			map(([attractions]) => attractions)
		);
		this.editFastpassId = this.store.pipe(select(fastpassSelectors.getEditFastpass));
		this.fastpasses = this.store.pipe(select(fastpassSelectors.getFastpasses));
		this.nextAvailableTime = this.store.pipe(
			select(fastpassSelectors.getNextAvailableTime),
			map(nextAvailableTime => nextAvailableTime && nextAvailableTime.getTime() > this.dateTimeService.getCurrentDateTime().getTime() ?
				nextAvailableTime : null)
		);
		this.store.dispatch(new PruneFastpasses({ todayCutoff: this.dateTimeService.getTodayCutoff() }));
	}

	public editFastpass(id: string | null): void {
		this.store.dispatch(new EditFastpass({ id }));
	}

	public removeFastpass(fastpass: Fastpass): void {
		this.store.dispatch(new DeleteFastpass({ id: fastpass.id }));
	}

	public upsertFastpass(fastpass: Fastpass): void {
		this.store.dispatch(new UpsertFastpass({ fastpass }));
	}
}
