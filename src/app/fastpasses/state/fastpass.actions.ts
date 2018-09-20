import { Action } from '@ngrx/store';

import { Fastpass } from '../fastpass/fastpass.model';

export enum FastpassActionTypes {
	LoadFastpasses = '[Fastpass] Load Fastpasses',
	LoadFastpassesSuccess = '[Fastpass] Load Fastpasses Success',
	LoadFastpassesFail = '[Fastpass] Load Fastpasses Fail'
}

export class LoadFastpasses implements Action {
	readonly type = FastpassActionTypes.LoadFastpasses;
}

export class LoadFastpassesSuccess implements Action {
	readonly type = FastpassActionTypes.LoadFastpassesSuccess;

	constructor(public payload: Fastpass[]) { }
}

export class LoadFastpassesFail implements Action {
	readonly type = FastpassActionTypes.LoadFastpassesFail;

	constructor(public payload: string) {}
}

export type FastpassActions = LoadFastpasses
	| LoadFastpassesSuccess
	| LoadFastpassesFail;
