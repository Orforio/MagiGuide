import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DateTimeService } from '../common/date-time.service';
import { Fastpass } from './fastpass.model';
import { DeleteFastpass, PruneFastpasses, UpsertFastpass, EditFastpass } from './state/fastpass.actions';
import * as fromFastpass from './state/fastpass.reducer';
import * as fastpassSelectors from './state/fastpass.selectors';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './fastpass.component.html',
	styleUrls: ['./fastpass.component.scss']
})
export class FastpassComponent implements OnInit {
	public editFastpassId: Observable<string | null>;
	public fastpasses: Observable<Fastpass[]>;
	public nextAvailableTime: Observable<Date>;

	constructor(
		private dateTimeService: DateTimeService,
		private store: Store<fromFastpass.State>
		) {}

	public ngOnInit(): void {
		this.editFastpassId = this.store.pipe(select(fastpassSelectors.getEditFastpass));
		this.fastpasses = this.store.pipe(select(fastpassSelectors.getFastpasses));
		this.nextAvailableTime = this.store.pipe(select(fastpassSelectors.getNextAvailableTime));
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
