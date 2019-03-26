import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DateTimeService } from '../common/date-time.service';
import { Fastpass } from './fastpass.model';
import { DeleteFastpass, PruneFastpasses, UpsertFastpass, EditFastpass } from './state/fastpass.actions';
import * as fromRoot from '../state';
import * as fastpassSelectors from './state/fastpass.selectors';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './fastpasses.component.html',
	styleUrls: ['./fastpasses.component.scss']
})
export class FastpassesComponent implements OnInit {
	public editFastpassId: Observable<string | null>;
	public fastpasses: Observable<Fastpass[]>;
	public nextAvailableTime: Observable<Date>;

	constructor(
		private dateTimeService: DateTimeService,
		private store: Store<fromRoot.State>
		) {}

	public ngOnInit(): void {
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
