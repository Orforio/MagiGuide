export class Fastpass {
	constructor(
		readonly ride: string,
		readonly startTime: Date,
		readonly endTime: Date,
		readonly unlockTime: Date) {
	}
}
