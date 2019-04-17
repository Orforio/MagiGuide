import { Action } from '@ngrx/store';

import { Attraction } from '../attraction.model';

export enum AttractionActionTypes {
	LoadAttractions = '[Attractions] Load Attractions',
	LoadAttractionsFailure = '[Attractions] Load Attractions Failure',
	LoadAttractionsSuccess = '[Attractions] Load Attractions Success',
}

export class LoadAttractions implements Action {
	readonly type = AttractionActionTypes.LoadAttractions;
}

export class LoadAttractionsFailure implements Action {
	readonly type = AttractionActionTypes.LoadAttractionsFailure;

	constructor(public payload: { error: string }) {}
}

export class LoadAttractionsSuccess implements Action {
	readonly type = AttractionActionTypes.LoadAttractionsSuccess;

	constructor(public payload: { attractions: Attraction[] }) {}
}

export type AttractionActions =
	LoadAttractions |
	LoadAttractionsFailure |
	LoadAttractionsSuccess;
