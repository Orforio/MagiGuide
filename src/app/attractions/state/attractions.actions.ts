import { Action } from '@ngrx/store';

export enum AttractionActionTypes {
	LoadAttractions = '[Attractions] Load Attractions',
	LoadAttractionsSuccess = '[Attractions] Load Attractions Success',
	LoadAttractionsFailure = '[Attractions] Load Attractions Failure',
}

export class LoadAttractions implements Action {
	readonly type = AttractionActionTypes.LoadAttractions;
}

export class LoadAttractionsSuccess implements Action {
	readonly type = AttractionActionTypes.LoadAttractionsSuccess;

	constructor(public payload: { data: any }) { }
}

export class LoadAttractionsFailure implements Action {
	readonly type = AttractionActionTypes.LoadAttractionsFailure;

	constructor(public payload: { error: any }) { }
}

export type AttractionActions =
	LoadAttractions |
	LoadAttractionsSuccess |
	LoadAttractionsFailure;
