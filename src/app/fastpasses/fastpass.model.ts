import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';

export class Fastpass {
	public readonly endTime: Date;
	public readonly id: string;
	public readonly nextAvailableTime: Date;
	public readonly ride: string;
	public readonly startTime: Date;

	constructor(
		ride: string,
		startTime: Date | NgbTimeStruct,
		endTime: Date | NgbTimeStruct,
		nextAvailableTime: Date | NgbTimeStruct) {
			this.id = Guid.create().toString();
			this.ride = ride;

			if (startTime instanceof Date) {
				this.startTime = startTime;
			} else {
				this.startTime = moment(startTime).toDate();
			}

			if (endTime instanceof Date) {
				this.endTime = endTime;
			} else {
				this.endTime = moment(endTime).toDate();
			}

			if (nextAvailableTime instanceof Date) {
				this.nextAvailableTime = nextAvailableTime;
			} else {
				this.nextAvailableTime = moment(nextAvailableTime).toDate();
			}
	}
}
