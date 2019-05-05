import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Attraction } from '../attractions/attraction.model';
import { Fastpass } from './fastpass.model';
import * as fromAttractions from '../attractions/state';
import * as fromFastpasses from './state';
import * as fromRoot from '../state';
import { DateTimeService } from '../common';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './fastpasses.component.html',
	styleUrls: ['./fastpasses.component.scss']
})
export class FastpassesComponent implements OnInit {
	public attractions: Observable<Attraction[]>;
	public attractionsError: Observable<string>;
	public attractionsLoading: Observable<boolean>;
	public editFastpassId: Observable<string | null>;
	public fastpasses: Observable<Fastpass[]>;
	public nextAvailableTime: Observable<Date>;

	constructor(
		private dateTimeService: DateTimeService,
		private store: Store<fromRoot.State>
	) {}

	public ngOnInit(): void {
		this.attractions = this.store.pipe(select(fromAttractions.getFastpassAttractionsForPark));
		this.attractionsError = this.store.pipe(select(fromAttractions.getAttractionsError));
		this.attractionsLoading = this.store.pipe(select(fromAttractions.getAttractionsLoading));
		this.editFastpassId = this.store.pipe(select(fromFastpasses.getEditFastpass));
		this.fastpasses = this.store.pipe(select(fromFastpasses.getFastpasses));
		this.nextAvailableTime = this.store.pipe(
			select(fromFastpasses.getNextAvailableTime),
			map(nextAvailableTime => nextAvailableTime && nextAvailableTime.getTime() > this.dateTimeService.getCurrentDateTime().getTime() ?
				nextAvailableTime : null)
		);
		this.store.dispatch(new fromAttractions.LoadAttractions());
		this.store.dispatch(new fromFastpasses.PruneFastpasses({ todayCutoff: this.dateTimeService.getTodayCutoff() }));
	}

	public editFastpass(id: string | null): void {
		this.store.dispatch(new fromFastpasses.EditFastpass({ id }));
	}

	public removeFastpass(fastpass: Fastpass): void {
		this.store.dispatch(new fromFastpasses.DeleteFastpass({ id: fastpass.id }));
	}

	public upsertFastpass(fastpass: Fastpass): void {
		this.store.dispatch(new fromFastpasses.UpsertFastpass({ fastpass }));
	}
}
