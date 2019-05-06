import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SetActivePark } from './settings/state/settings.actions';
import * as fromRoot from './state';
import * as fromSettings from './settings/state';
import { Parks } from './common';

@Component({
	selector: 'mg-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	public activeParksForm = this.formBuilder.group({
		activePark: [Parks.DisneylandPark]
	});
	public parks = [
		{ name: 'Disneyland Park', value: Parks.DisneylandPark },
		{ name: 'Walt Disney Studios', value: Parks.WaltDisneyStudios }
	];
	private unsubscribe = new Subject<void>();

	constructor(
		private formBuilder: FormBuilder,
		private store: Store<fromRoot.State>) {}

	public ngOnInit(): void {
		this.store.pipe(
			select(fromSettings.getActivePark),
			takeUntil(this.unsubscribe))
			.subscribe(activePark => this.activeParksForm.controls.activePark.setValue(activePark));
	}

	public ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	public setActivePark(): void {
		this.store.dispatch(new SetActivePark({ activePark: +this.activeParksForm.value.activePark }));
	}
}
