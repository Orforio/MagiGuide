import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { FastpassesService } from '../fastpasses.service';
import { FastpassActionTypes, LoadFastpassesSuccess, LoadFastpassesFail } from './fastpass.actions';

@Injectable()
export class FastpassEffects {
	constructor(
		private actions: Actions,
		private fastpassService: FastpassesService) { }

	@Effect()
	public loadFastpasses: Observable<Action> = this.actions.pipe(
		ofType(FastpassActionTypes.LoadFastpasses),
		mergeMap(() => this.fastpassService.get().pipe(
			map(fastpasses => (new LoadFastpassesSuccess(fastpasses))),
			catchError(error => of(new LoadFastpassesFail(error)))
		))
	);
}
