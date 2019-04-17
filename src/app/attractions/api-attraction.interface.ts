export interface APIAttraction {
	fastpassEnabled: boolean;
	id: string;
	name: string;
	schedule: APIAttractionSchedule;
	updated: Date;
}

export interface APIAttractionSchedule {
	closingTime: Date;
	openingTime: Date;
}
