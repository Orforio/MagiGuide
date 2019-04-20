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

const park02Attraction01: Attraction = {
	id: 'ATT03',
	name: 'Attraction 03',
	park: Parks.WaltDisneyStudios,
	fastpassEnabled: true,
	updated: new Date(),
	schedule: {
		openingTime: new Date(),
		closingTime: new Date()
	}
};

const updatedNewer: Attraction = {
	id: 'ATT05',
	name: 'Attraction 05',
	park: Parks.DisneylandPark,
	fastpassEnabled: true,
	updated: new Date('1992-04-12T18:00:00Z'),
	schedule: null
};

const updatedNewest: Attraction = {
	id: 'ATT06',
	name: 'Attraction 06',
	park: Parks.DisneylandPark,
	fastpassEnabled: true,
	updated: new Date('1992-04-12T14:00:00Z'),
	schedule: null
};

const updatedOldest: Attraction = {
	id: 'ATT04',
	name: 'Attraction 04',
	park: Parks.DisneylandPark,
	fastpassEnabled: true,
	updated: new Date('1992-04-12T10:00:00Z'),
	schedule: null
};

export const attractionFixtures = {
	park01Attraction01,
	park01Attraction02,
	park01Attraction01Updated,
	park01Attraction02Updated,
	park02Attraction01,
	updatedNewer,
	updatedNewest,
	updatedOldest
};
