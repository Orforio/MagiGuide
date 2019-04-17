import { Attraction } from './attraction.model';
import { Parks } from '../common';

const park01Attraction01: Attraction = {
	id: 'ATT01',
	name: 'Attraction 01',
	park: Parks.DisneylandPark,
	fastpassEnabled: true,
	updated: new Date(),
	schedule: {
		openingTime: new Date(),
		closingTime: new Date()
	}
};

const park01Attraction02: Attraction = {
	id: 'ATT02',
	name: 'Attraction 02',
	park: Parks.DisneylandPark,
	fastpassEnabled: true,
	updated: new Date(),
	schedule: {
		openingTime: new Date(),
		closingTime: new Date()
	}
};

const park01Attraction01Updated: Attraction = {
	id: 'ATT01',
	name: 'Attraction 01',
	park: Parks.DisneylandPark,
	fastpassEnabled: false,
	updated: new Date(),
	schedule: {
		openingTime: new Date(),
		closingTime: new Date()
	}
};

const park01Attraction02Updated: Attraction = {
	id: 'ATT02',
	name: 'Attraction 02',
	park: Parks.DisneylandPark,
	fastpassEnabled: false,
	updated: new Date(),
	schedule: {
		openingTime: new Date(),
		closingTime: new Date()
	}
};

export const attractionFixtures = {
	park01Attraction01,
	park01Attraction02,
	park01Attraction01Updated,
	park01Attraction02Updated
};
