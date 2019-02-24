import { Action } from '@ngrx/store';

export enum SettingsActionTypes {
	ResetApp = '[Settings] Reset App',
	SetDebug = '[Settings] Set Debug'
}

export class ResetApp implements Action {
	readonly type = SettingsActionTypes.ResetApp;
}

export class SetDebug implements Action {
	readonly type = SettingsActionTypes.SetDebug;

	constructor(public payload: { enableDebug: boolean }) {}
}

export type SettingsActions =
	ResetApp
	| SetDebug;
