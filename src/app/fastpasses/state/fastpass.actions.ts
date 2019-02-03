import { Action } from '@ngrx/store';

import { Fastpass } from '../fastpass.model';

export enum FastpassActionTypes {
	LoadFastpasses = '[Fastpass] Load Fastpasses',
	LoadFastpassesSuccess = '[Fastpass] Load Fastpasses Success',
	LoadFastpassesFail = '[Fastpass] Load Fastpasses Fail',
	SaveFastpass = '[Fastpass] Save Fastpass',
	SaveFastpassSuccess = '[Fastpass] Save Fastpass Success',
	SaveFastpassFail = '[Fastpass] Save Fastpass Fail'
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

	constructor(public payload: string) { }
}

export class SaveFastpass implements Action {
	readonly type = FastpassActionTypes.SaveFastpass;

	constructor(public payload: Fastpass) { }
}

export class SaveFastpassSuccess implements Action {
	readonly type = FastpassActionTypes.SaveFastpassSuccess;

	constructor(public payload: Fastpass) { }
}

export class SaveFastpassFail implements Action {
	readonly type = FastpassActionTypes.SaveFastpassFail;

	constructor(public payload: string) { }
}

export type FastpassActions = LoadFastpasses
	| LoadFastpassesSuccess
	| LoadFastpassesFail
	| SaveFastpass
	| SaveFastpassSuccess
	| SaveFastpassFail;