import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Fastpass } from '../fastpasses/fastpass.model';
import * as fromFastpasses from '../fastpasses/state';
import * as fromRoot from '../state';
import { DateTimeService } from '../common';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	public nextAvailableTime: Observable<Date | null>;
	public nextFastpass: Observable<Fastpass | null>;

	constructor(
		private dateTimeService: DateTimeService,
		private store: Store<fromRoot.State>
		) {}

	public ngOnInit(): void {
		this.store.dispatch(new fromFastpasses.PruneFastpasses({ todayCutoff: this.dateTimeService.getTodayCutoff() }));
		this.nextAvailableTime = this.store.pipe(
			select(fromFastpasses.getNextAvailableTime),
			map(nextAvailableTime => nextAvailableTime && nextAvailableTime.getTime() > this.dateTimeService.getCurrentDateTime().getTime() ?
				nextAvailableTime : null)
			);
		this.nextFastpass = this.store.pipe(
			select(fromFastpasses.getFastpasses),
			map(fastpasses => fastpasses.reduce((accumulator, currentValue) => {
				const currentDateTime = this.dateTimeService.getCurrentDateTime().getTime();
				return (currentValue.startTime.getTime() < currentDateTime && currentValue.endTime.getTime() > currentDateTime) ? currentValue :
						(currentValue.startTime.getTime() < currentDateTime) ||
						(accumulator && currentValue.startTime.getTime() > accumulator.startTime.getTime()) ? accumulator : currentValue;
				}, null))
			);
	}
}
