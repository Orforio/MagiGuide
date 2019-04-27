import { Fastpass } from './fastpass.model';
import { attractionFixtures } from '../attractions/attraction.fixtures';

export const fastpassFixtures = {
	knownId1: new Fastpass(
		attractionFixtures.park01Attraction01,
		new Date('2018-04-12T10:25:00'),
		new Date('2018-04-12T10:55:00'),
		new Date('2018-04-12T12:25:00'),
		'17a5c948-224d-460d-b942-8890f1a573ee'
	),
	knownId1Updated: new Fastpass(
		attractionFixtures.park01Attraction01,
		new Date('2018-04-12T10:30:00'),
		new Date('2018-04-12T11:00:00'),
		new Date('2018-04-12T12:25:00'),
		'17a5c948-224d-460d-b942-8890f1a573ee'
	),
	knownId2: new Fastpass(
		attractionFixtures.park01Attraction02,
		new Date('2018-04-12T13:15:00'),
		new Date('2018-04-12T13:45:00'),
		new Date('2018-04-12T14:00:00'),
		'e4728ccf-9285-406a-9f65-a21a60207804'
	),
	null: new Fastpass(null, null, null, null),
	previousDay: new Fastpass(
		attractionFixtures.park02Attraction01,
		new Date('2018-04-11T21:30:00'),
		new Date('2018-04-11T22:00:00'),
		new Date('2018-04-11T23:30:00')
	),
	standard1: new Fastpass(
		attractionFixtures.park01Attraction01,
		new Date('2018-04-12T10:25:00'),
		new Date('2018-04-12T10:55:00'),
		new Date('2018-04-12T12:25:00')
	),
	standard2: new Fastpass(
		attractionFixtures.park01Attraction02,
		new Date('2018-04-12T15:40:00'),
		new Date('2018-04-12T16:10:00'),
		new Date('2018-04-12T17:40:00')
	),
	standard3: new Fastpass(
		attractionFixtures.park01Attraction03,
		new Date('2018-04-12T18:05:00'),
		new Date('2018-04-12T18:35:00'),
		new Date('2018-04-12T20:05:00')
	)
};
