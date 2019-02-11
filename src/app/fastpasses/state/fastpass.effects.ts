import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { FastpassService } from '../fastpass.service';
import {
	DeleteFastpass,
	DeleteFastpassSuccess,
	DeleteFastpassFail,
	FastpassActionTypes,
	LoadFastpassesSuccess,
	LoadFastpassesFail,
	SaveFastpass,
	SaveFastpassSuccess,
	SaveFastpassFail
} from './fastpass.actions';
import { Fastpass } from '../fastpass.model';

@Injectable()
export class FastpassEffects {
	constructor(
		private actions: Actions,
		private fastpassService: FastpassService) {}

	@Effect()
	public deleteFastpass: Observable<Action> = this.actions.pipe(
		ofType(FastpassActionTypes.DeleteFastpass),
		map((action: DeleteFastpass) => action.payload),
		mergeMap((id: number) => this.fastpassService.delete(id).pipe(
			map(deletedId => new DeleteFastpassSuccess(deletedId)),
			catchError(error => observableOf(new DeleteFastpassFail(error)))
		))
	);

	@Effect()
	public loadFastpasses: Observable<Action> = this.actions.pipe(
		ofType(FastpassActionTypes.LoadFastpasses),
		mergeMap(() => this.fastpassService.get().pipe(
			map(fastpasses => new LoadFastpassesSuccess(fastpasses)),
			catchError(error => observableOf(new LoadFastpassesFail(error)))
		))
	);

	@Effect()
	public saveFastpass: Observable<Action> = this.actions.pipe(
		ofType(FastpassActionTypes.SaveFastpass),
		map((action: SaveFastpass) => action.payload),
		mergeMap((fastpass: Fastpass) => this.fastpassService.save(fastpass).pipe(
			map(newFastpass => new SaveFastpassSuccess(newFastpass)),
			catchError(error => observableOf(new SaveFastpassFail(error)))
		))
	);
}
