import { Action } from '@ngrx/store';

export enum SettingsActionTypes {
	SetDebug = '[Settings] Set Debug'
}

export class SetDebug implements Action {
	readonly type = SettingsActionTypes.SetDebug;

	constructor(public payload: { enableDebug: boolean }) {}
}

export type SettingsActions =
	SetDebug;
