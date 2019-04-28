import { Action } from '@ngrx/store';

import { Fastpass } from '../fastpass.model';

export enum FastpassesActionTypes {
	AddFastpass = '[Fastpass] Add One Fastpass',
	ClearFastpasses = '[Fastpass] Delete All Fastpasses',
	DeleteFastpass = '[Fastpass] Delete One Fastpass',
	EditFastpass = '[Fastpass] Edit One Fastpass',
	LoadFastpasses = '[Fastpass] Load All Fastpasses',
	PruneFastpasses = '[Fastpass] Prune Outdated Fastpasses',
	UpsertFastpass = '[Fastpass] Upsert One Fastpass'
}

export class AddFastpass implements Action {
	readonly type = FastpassesActionTypes.AddFastpass;

	constructor(public payload: { fastpass: Fastpass }) {}
}

export class ClearFastpasses implements Action {
	readonly type = FastpassesActionTypes.ClearFastpasses;
}

export class DeleteFastpass implements Action {
	readonly type = FastpassesActionTypes.DeleteFastpass;

	constructor(public payload: { id: string }) {}
}

export class EditFastpass implements Action {
	readonly type = FastpassesActionTypes.EditFastpass;

	constructor(public payload: { id: string }) {}
}

export class LoadFastpasses implements Action {
	readonly type = FastpassesActionTypes.LoadFastpasses;

	constructor(public payload: { fastpasses: Fastpass[] }) {}
}

export class PruneFastpasses implements Action {
	readonly type = FastpassesActionTypes.PruneFastpasses;

	constructor(public payload: { todayCutoff: Date }) {}
}

export class UpsertFastpass implements Action {
	readonly type = FastpassesActionTypes.UpsertFastpass;

	constructor(public payload: { fastpass: Fastpass }) {}
}

export type FastpassesActions =
	AddFastpass |
	ClearFastpasses |
	DeleteFastpass |
	EditFastpass |
	LoadFastpasses |
	PruneFastpasses |
	UpsertFastpass;
