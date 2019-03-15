import { Guid } from 'guid-typescript';

export class Fastpass {
	public readonly endTime: Date;
	public readonly id: string;
	public readonly nextAvailableTime: Date;
	public readonly ride: string;
	public readonly startTime: Date;

	constructor(
		ride: string,
		startTime: Date,
		endTime: Date,
		nextAvailableTime: Date,
		id?: string) {
			this.id = id || Guid.create().toString();
			this.ride = ride;
			this.startTime = startTime;
			this.endTime = endTime;
			this.nextAvailableTime = nextAvailableTime;
	}
}
