import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

export class Fastpass {
	public readonly endTime: Date;
	public readonly nextAvailableTime: Date;
	public readonly ride: string;
	public readonly startTime: Date;

	constructor(
		ride: string,
		startTime: Date | NgbTimeStruct,
		endTime: Date | NgbTimeStruct,
		nextAvailableTime: Date | NgbTimeStruct) {
			this.ride = ride;

			if (startTime instanceof Date) {
				this.startTime = startTime;
			}

			if (endTime instanceof Date) {
				this.endTime = endTime;
			}

			if (nextAvailableTime instanceof Date) {
				this.nextAvailableTime = nextAvailableTime;
			}
	}
}
