import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GlobalObjectService } from '../common/global-object.service';
import { SetDebug, ResetApp } from './state/settings.actions';
import { LoadFastpasses } from '../fastpasses/state/fastpass.actions';
import { Fastpass } from '../fastpasses/fastpass.model';
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
	private window: Window;

	constructor(
		private formBuilder: FormBuilder,
		private globalObjectService: GlobalObjectService,
		private store: Store<fromRoot.State>) {
			this.window = this.globalObjectService.getWindow();
		}

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

	public resetApp(): void {
		if (this.window.confirm('Are you sure you want to reset all app data?')) {
			this.store.dispatch(new ResetApp());
		}
	}

	public setDebug(): void {
		this.store.dispatch(new SetDebug({ enableDebug: this.settingsForm.value.enableDebug }));
	}

	// Temporary function for development only.
	// Requires Fastpass tab to have been loaded beforehand.
	public setFastpassFixtures(): void {
		const fastpasses = [
			new Fastpass(
				'Star Tours',
				new Date('2018-05-27T11:25:00'),
				new Date('2018-05-27T11:55:00'),
				new Date('2018-05-27T13:25:00')
			),
			new Fastpass(
				'Big Thunder Mountain',
				new Date('2018-05-27T20:20:00'),
				new Date('2018-05-27T20:50:00'),
				new Date('2018-05-27T15:30:00')
			),
			new Fastpass(
				'Hyperspace Mountain',
				new Date('2018-05-27T16:05:00'),
				new Date('2018-05-27T16:35:00'),
				new Date('2018-05-27T18:05:00')
			)
		];
		this.store.dispatch(new LoadFastpasses({ fastpasses: fastpasses }));
	}
}
