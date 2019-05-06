import { Action } from '@ngrx/store';

import { Parks } from '../../common';

export enum SettingsActionTypes {
	ResetApp = '[Settings] Reset App',
	SetActivePark = '[Settings] Set Active Park',
	SetDebug = '[Settings] Set Debug'
}

export class ResetApp implements Action {
	readonly type = SettingsActionTypes.ResetApp;
}

export class SetActivePark implements Action {
	readonly type = SettingsActionTypes.SetActivePark;

	constructor(public payload: { activePark: Parks }) {}
}

export class SetDebug implements Action {
	readonly type = SettingsActionTypes.SetDebug;

	constructor(public payload: { enableDebug: boolean }) {}
}

export type SettingsActions =
	ResetApp |
	SetActivePark |
	SetDebug;
