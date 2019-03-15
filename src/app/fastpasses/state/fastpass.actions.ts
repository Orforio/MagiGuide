import { Action } from '@ngrx/store';

import { Fastpass } from '../fastpass.model';

export enum FastpassActionTypes {
	AddFastpass = '[Fastpass] Add One Fastpass',
	ClearFastpasses = '[Fastpass] Delete All Fastpasses',
	DeleteFastpass = '[Fastpass] Delete One Fastpass',
	EditFastpass = '[Fastpass] Edit One Fastpass',
	LoadFastpasses = '[Fastpass] Load All Fastpasses',
	PruneFastpasses = '[Fastpass] Prune Outdated Fastpasses',
	UpsertFastpass = '[Fastpass] Upsert One Fastpass'
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

export class EditFastpass implements Action {
	readonly type = FastpassActionTypes.EditFastpass;

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

export class UpsertFastpass implements Action {
	readonly type = FastpassActionTypes.UpsertFastpass;

	constructor(public payload: { fastpass: Fastpass }) {}
}

export type FastpassActions =
	AddFastpass
	| ClearFastpasses
	| DeleteFastpass
	| EditFastpass
	| LoadFastpasses
	| PruneFastpasses
	| UpsertFastpass;
