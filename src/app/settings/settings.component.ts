import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Fastpass } from '../fastpasses/fastpass.model';
import { attractionFixtures } from '../attractions/attraction.fixtures';
import * as fromFastpasses from '../fastpasses/state';
import * as fromRoot from '../state';
import * as fromSettings from './state';
import { DateTimeService, GlobalObjectService } from '../common';

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
		private dateTimeService: DateTimeService,
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

	public pruneFastpasses(): void {
		if (this.window.confirm(`Are you sure you want to remove old Fastpasses?`)) {
			this.store.dispatch(new fromFastpasses.PruneFastpasses({ todayCutoff: this.dateTimeService.getTodayCutoff() }));
		}
	}

	public resetApp(): void {
		if (this.window.confirm('Are you sure you want to reset all app data?')) {
			this.store.dispatch(new fromSettings.ResetApp());
		}
	}

	public setDebug(): void {
		this.store.dispatch(new fromSettings.SetDebug({ enableDebug: this.settingsForm.value.enableDebug }));
	}

	// Temporary function for development only.
	// Requires Fastpass tab to have been loaded beforehand.
	public setFastpassFixtures(): void {
		const fastpasses = [
			new Fastpass(
				attractionFixtures.park01Attraction01,
				moment().hours(11).minutes(25).seconds(0).toDate(),
				moment().hours(11).minutes(55).seconds(0).toDate(),
				moment().hours(13).minutes(25).seconds(0).toDate()
			),
			new Fastpass(
				attractionFixtures.park01Attraction02,
				moment().hours(20).minutes(20).seconds(0).toDate(),
				moment().hours(20).minutes(50).seconds(0).toDate(),
				moment().hours(15).minutes(30).seconds(0).toDate()
			),
			new Fastpass(
				attractionFixtures.park01Attraction03,
				moment().hours(16).minutes(5).seconds(0).toDate(),
				moment().hours(16).minutes(35).seconds(0).toDate(),
				moment().hours(18).minutes(5).seconds(0).toDate()
			)
		];
		this.store.dispatch(new fromFastpasses.LoadFastpasses({ fastpasses: fastpasses }));
	}
}
