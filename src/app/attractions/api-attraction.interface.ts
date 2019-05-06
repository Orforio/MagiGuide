export interface APIAttraction {
	fastpassEnabled: boolean;
	id: string;
	name: string;
	schedule: APIAttractionSchedule;
	updated: string;
}

export interface APIAttractionSchedule {
	closingTime: string;
	openingTime: string;
}
