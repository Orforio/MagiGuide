import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Fastpass } from './fastpass/fastpass.model';
import { LoadFastpasses } from './state/fastpass.actions';
import * as fromFastpass from './state';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './fastpasses.component.html',
	styleUrls: ['./fastpasses.component.scss']
})
export class FastpassesComponent implements OnInit {
	public error: Observable<string>;
	public fastpasses: Observable<Fastpass[]>;

	constructor(private store: Store<fromFastpass.State>) { }

	ngOnInit(): void {
		this.store.dispatch(new LoadFastpasses());
		this.error = this.store.pipe(select(fromFastpass.getError));
		this.fastpasses = this.store.pipe(select(fromFastpass.getFastpasses));
	}
}
