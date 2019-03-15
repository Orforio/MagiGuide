import { Injectable } from '@angular/core';
import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class NgbTimeDateAdapter extends NgbTimeAdapter<Date> {
	constructor() {
		super();
	}

	public fromModel(date: Date): NgbTimeStruct {
		const dateMoment = moment(date);
		return {
			hour: dateMoment.hour(),
			minute: dateMoment.minute(),
			second: dateMoment.second()
		};
	}

	public toModel(timeStruct: NgbTimeStruct): Date {
		return moment(timeStruct).toDate();
	}
}
