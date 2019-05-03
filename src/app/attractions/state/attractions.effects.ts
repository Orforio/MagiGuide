import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AttractionsService } from '../attractions.service';
import {
	AttractionsActions,
	AttractionsActionTypes,
	CancelLoadAttractions,
	LoadAttractionsFailure,
	LoadAttractionsSuccess
} from './attractions.actions';
import * as fromAttractions from './attractions.selectors';
import * as fromSettings from '../../settings/state';
import { DateTimeService } from '../../common';

@Injectable()
export class AttractionsEffects {
	constructor(
		private actions: Actions<AttractionsActions>,
		private attractionsService: AttractionsService,
		private dateTimeService: DateTimeService,
		private store: Store<fromSettings.SettingsState>
		) {}

	@Effect()
	loadAttractions = this.actions.pipe(
		ofType(AttractionsActionTypes.LoadAttractions),
		withLatestFrom(
			this.store.pipe(select(fromSettings.getActivePark)),
			this.store.pipe(select(fromAttractions.getAttractionsOldestUpdateForPark))
		),
		switchMap(([action, activePark, oldestUpdate]) => (
			!oldestUpdate || (oldestUpdate && this.dateTimeService.isOlderThanHours(oldestUpdate, 12)) ?
				this.attractionsService.getAttractions(activePark).pipe(
					map(attractions => new LoadAttractionsSuccess({ attractions })),
					catchError((error: HttpErrorResponse) => observableOf(new LoadAttractionsFailure({ error: error.message })))
				) : observableOf(new CancelLoadAttractions())
		))
	);
}
