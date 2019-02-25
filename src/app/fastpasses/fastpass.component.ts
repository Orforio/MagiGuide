import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Fastpass } from './fastpass.model';
import { DeleteFastpass, AddFastpass } from './state/fastpass.actions';
import * as fromFastpass from './state/fastpass.reducer';
import * as fastpassSelectors from './state/fastpass.selectors';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './fastpass.component.html',
	styleUrls: ['./fastpass.component.scss']
})
export class FastpassComponent implements OnInit {
	public fastpasses: Observable<Fastpass[]>;
	public nextAvailableTime: Observable<Date>;

	constructor(private store: Store<fromFastpass.State>) {}

	public ngOnInit(): void {
		this.fastpasses = this.store.pipe(select(fastpassSelectors.getFastpasses));
		this.nextAvailableTime = this.store.pipe(select(fastpassSelectors.getNextAvailableTime));
	}

	public addFastpass(fastpass: Fastpass): void {
		this.store.dispatch(new AddFastpass({ fastpass }));
	}

	public removeFastpass(fastpass: Fastpass): void {
		this.store.dispatch(new DeleteFastpass({ id: fastpass.id }));
	}
}
