import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

export class Fastpass {
	public readonly endTime: Date;
	public readonly nextAvailableTime: Date;
	public readonly ride: string;
	public readonly startTime: Date;
	private internalId: number | null;

	constructor(
		ride: string,
		startTime: Date | NgbTimeStruct,
		endTime: Date | NgbTimeStruct,
		nextAvailableTime: Date | NgbTimeStruct) {
			this.internalId = null;
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

	get id(): number {
		return this.internalId;
	}

	set id(id: number) {
		if (this.internalId === null) {
			this.internalId = id;
		}
	}
}
