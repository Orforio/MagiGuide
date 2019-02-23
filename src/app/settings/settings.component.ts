import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SetDebug } from './state/settings.actions';
import * as fromRoot from '../state';
import * as fromSettings from './state';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./settings.component.scss'],
	templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {
	public settingsForm = this.formBuilder.group({
		enableDebug: [false]
	});
	private unsubscribe = new Subject<void>();

	constructor(
		private formBuilder: FormBuilder,
		private store: Store<fromRoot.State>) {}

	public ngOnInit(): void {
		this.store.pipe(
			select(fromSettings.getEnableDebug),
			takeUntil(this.unsubscribe))
			.subscribe((enableDebugValue) => {
				this.settingsForm.controls.enableDebug.setValue(enableDebugValue);
			});
	}

	public ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	public setDebug(): void {
		this.store.dispatch(new SetDebug({ enableDebug: this.settingsForm.value.enableDebug }));
	}
}
