import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Fastpass } from './fastpass.model';
import { LoadFastpasses, SaveFastpass } from './state/fastpass.actions';
import * as fromFastpass from './state';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './fastpass.component.html',
	styleUrls: ['./fastpass.component.scss']
})
export class FastpassComponent implements OnInit {
	public error: Observable<string>;
	public fastpasses: Observable<Fastpass[]>;

	constructor(private store: Store<fromFastpass.State>) { }

	public ngOnInit(): void {
		this.store.dispatch(new LoadFastpasses());
		this.error = this.store.pipe(select(fromFastpass.getError));
		this.fastpasses = this.store.pipe(select(fromFastpass.getFastpasses));
	}

	public saveFastpass(fastpass: Fastpass): void {
		this.store.dispatch(new SaveFastpass(fastpass));
	}
}
