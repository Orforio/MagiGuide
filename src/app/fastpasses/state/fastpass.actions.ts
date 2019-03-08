import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Fastpass } from '../fastpass.model';

export enum FastpassActionTypes {
	AddFastpass = '[Fastpass] Add One Fastpass',
	ClearFastpasses = '[Fastpass] Delete All Fastpasses',
	DeleteFastpass = '[Fastpass] Delete One Fastpass',
	LoadFastpasses = '[Fastpass] Load All Fastpasses',
	PruneFastpasses = '[Fastpass] Prune Outdated Fastpasses',
	UpdateFastpass = '[Fastpass] Update One Fastpass'
}

export class AddFastpass implements Action {
	readonly type = FastpassActionTypes.AddFastpass;

	constructor(public payload: { fastpass: Fastpass }) {}
}

export class ClearFastpasses implements Action {
	readonly type = FastpassActionTypes.ClearFastpasses;
}

export class DeleteFastpass implements Action {
	readonly type = FastpassActionTypes.DeleteFastpass;

	constructor(public payload: { id: string }) {}
}

export class LoadFastpasses implements Action {
	readonly type = FastpassActionTypes.LoadFastpasses;

	constructor(public payload: { fastpasses: Fastpass[] }) {}
}

export class PruneFastpasses implements Action {
	readonly type = FastpassActionTypes.PruneFastpasses;

	constructor(public payload: { todayCutoff: Date }) {}
}

export class UpdateFastpass implements Action {
	readonly type = FastpassActionTypes.UpdateFastpass;

	constructor(public payload: { fastpass: Update<Fastpass> }) {}
}

export type FastpassActions =
	AddFastpass
	| ClearFastpasses
	| DeleteFastpass
	| LoadFastpasses
	| PruneFastpasses
	| UpdateFastpass;
