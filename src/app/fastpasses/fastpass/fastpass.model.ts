export class Fastpass {
	constructor(
		public readonly ride: string,
		public readonly startTime: Date,
		public readonly endTime: Date,
		public readonly nextAvailableTime: Date) {
	}
}
