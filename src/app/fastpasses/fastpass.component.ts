import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Fastpass } from './fastpass.model';
import { DeleteFastpass, AddFastpass } from './state/fastpass.actions';
import * as fromFastpass from './state';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './fastpass.component.html',
	styleUrls: ['./fastpass.component.scss']
})
export class FastpassComponent implements OnInit {
	public fastpasses: Observable<Fastpass[]>;

	constructor(private store: Store<fromFastpass.State>) {}

	public ngOnInit(): void {
		this.fastpasses = this.store.pipe(select(fromFastpass.getFastpasses));
	}

	public addFastpass(fastpass: Fastpass): void {
		this.store.dispatch(new AddFastpass({ fastpass }));
	}

	public removeFastpass(fastpass: Fastpass): void {
		this.store.dispatch(new DeleteFastpass({ id: fastpass.id }));
	}
}
