import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of as observableOf } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { LoadAttractionsFailure, LoadAttractionsSuccess, AttractionActionTypes, AttractionActions } from './attractions.actions';

@Injectable()
export class AttractionsEffects {
	@Effect()
	loadAttractionss = this.actions.pipe(
		ofType(AttractionActionTypes.LoadAttractions),
		concatMap(() =>
			/** An EMPTY observable only emits completion. Replace with your own observable API request */
			EMPTY.pipe(
				map(data => new LoadAttractionsSuccess({ data })),
				catchError(error => observableOf(new LoadAttractionsFailure({ error }))))
		)
	);

	constructor(private actions: Actions<AttractionActions>) {}
}
