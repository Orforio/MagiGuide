import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class DateTimeService {
	constructor() {}

	public getCurrentDateTime(): Date {
		return moment().toDate();
	}

	public getTodayCutoff(): Date {
		return moment().isBetween({ hours: 0, minutes: 0, seconds: 0 }, { hours: 2, minutes: 0, seconds: 0 }) ?
			moment().subtract(1, 'day').hours(2).minutes(0).seconds(0).toDate() :
			moment().hours(2).minutes(0).seconds(0).toDate();
	}
}
