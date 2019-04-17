import { Fastpass } from './fastpass.model';

export const fastpassFixtures = {
	knownId: new Fastpass(
		'Big Thunder Mountain',
		new Date('2018-04-12T10:25:00'),
		new Date('2018-04-12T10:55:00'),
		new Date('2018-04-12T12:25:00'),
		'17a5c948-224d-460d-b942-8890f1a573ee'
	),
	knownIdUpdated: new Fastpass(
		'Big Thunder Mountain',
		new Date('2018-04-12T10:30:00'),
		new Date('2018-04-12T11:00:00'),
		new Date('2018-04-12T12:25:00'),
		'17a5c948-224d-460d-b942-8890f1a573ee'
	),
	null: new Fastpass(null, null, null, null),
	previousDay: new Fastpass(
		'Ratatouille: The Adventure',
		new Date('2018-04-11T21:30:00'),
		new Date('2018-04-11T22:00:00'),
		new Date('2018-04-11T23:30:00')
	),
	standard1: new Fastpass(
		'Big Thunder Mountain',
		new Date('2018-04-12T10:25:00'),
		new Date('2018-04-12T10:55:00'),
		new Date('2018-04-12T12:25:00')
	),
	standard2: new Fastpass(
		'Star Tours',
		new Date('2018-04-12T15:40:00'),
		new Date('2018-04-12T16:10:00'),
		new Date('2018-04-12T17:40:00')
	),
	standard3: new Fastpass(
		'Star Wars: Hyperspace Mountain',
		new Date('2018-04-12T18:05:00'),
		new Date('2018-04-12T18:35:00'),
		new Date('2018-04-12T20:05:00')
	)
};
