import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AttractionsService } from '../attractions.service';
import { AttractionsActions, AttractionsActionTypes, LoadAttractionsFailure, LoadAttractionsSuccess } from './attractions.actions';
import * as fromSettings from '../../settings/state';

@Injectable()
export class AttractionsEffects {
	constructor(
		private actions: Actions<AttractionsActions>,
		private attractionsService: AttractionsService,
		private store: Store<fromSettings.SettingsState>
		) {}

	@Effect()
	loadAttractions = this.actions.pipe(
		ofType(AttractionsActionTypes.LoadAttractions),
		withLatestFrom(this.store.pipe(select(fromSettings.getActivePark))),
		switchMap(([payload, activePark]) => this.attractionsService.getAttractions(activePark)),
		map(attractions => new LoadAttractionsSuccess({ attractions })),
		catchError((error: HttpErrorResponse) => observableOf(new LoadAttractionsFailure({ error: error.message })))
	);
}
