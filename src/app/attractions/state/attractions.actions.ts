import { Action } from '@ngrx/store';

import { Attraction } from '../attraction.model';

export enum AttractionsActionTypes {
	CancelLoadAttractions = '[Attractions] Cancel Load Attractions',
	LoadAttractions = '[Attractions] Load Attractions',
	LoadAttractionsFailure = '[Attractions] Load Attractions Failure',
	LoadAttractionsSuccess = '[Attractions] Load Attractions Success'
}

export class CancelLoadAttractions implements Action {
	readonly type = AttractionsActionTypes.CancelLoadAttractions;
}

export class LoadAttractions implements Action {
	readonly type = AttractionsActionTypes.LoadAttractions;
}

export class LoadAttractionsFailure implements Action {
	readonly type = AttractionsActionTypes.LoadAttractionsFailure;

	constructor(public payload: { error: string }) {}
}

export class LoadAttractionsSuccess implements Action {
	readonly type = AttractionsActionTypes.LoadAttractionsSuccess;

	constructor(public payload: { attractions: Attraction[] }) {}
}

export type AttractionsActions =
	CancelLoadAttractions |
	LoadAttractions |
	LoadAttractionsFailure |
	LoadAttractionsSuccess;
