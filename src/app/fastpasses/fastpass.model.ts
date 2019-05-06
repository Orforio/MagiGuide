import { Guid } from 'guid-typescript';

import { Attraction } from '../attractions/attraction.model';

export class Fastpass {
	constructor(
		public readonly attraction: Attraction,
		public readonly startTime: Date,
		public readonly endTime: Date,
		public readonly nextAvailableTime: Date,
		public readonly id?: string
	) {
		this.id = id || Guid.create().toString();
	}
}
