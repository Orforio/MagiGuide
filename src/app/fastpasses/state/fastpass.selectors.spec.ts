import { FastpassState } from './fastpass.reducer';
import * as fastpassSelectors from './fastpass.selectors';

describe('Fastpass Selectors', () => {
	describe('getFastpasses()', () => {
		it('should return all Fastpasses', () => {
			// Arrange
			const mockState: FastpassState = {
				ids: ['abcd', 'efgh'],
				entities: {
					abcd: {
						id: 'abcd',
						ride: 'Star Tours',
						startTime: new Date('2018-05-27T10:00:00'),
						endTime: new Date('2018-05-27T10:30:00'),
						nextAvailableTime: new Date('2018-05-27T12:00:00')
					},
					efgh: {
						id: 'efgh',
						ride: 'Big Thunder Mountain',
						startTime: new Date('2018-05-27T13:00:00'),
						endTime: new Date('2018-05-27T13:30:00'),
						nextAvailableTime: new Date('2018-05-27T15:00:00')
					}
				}
			};

			// Act
			const result = fastpassSelectors.getFastpasses.projector(mockState);

			// Assert
			expect(result).toEqual([mockState.entities.abcd, mockState.entities.efgh]);
		});
	});

	describe('nextAvailableTime()', () => {
		it('should return the latest nextAvailableTime from all the Fastpasses', () => {
			// Arrange
			const mockState: FastpassState = {
				ids: ['abcd', 'efgh', 'ijkl'],
				entities: {
					abcd: {
						id: 'abcd',
						ride: 'Star Tours',
						startTime: new Date(),
						endTime: new Date(),
						nextAvailableTime: new Date('2018-05-27T12:00:00')
					},
					efgh: {
						id: 'efgh',
						ride: 'Big Thunder Mountain',
						startTime: new Date(),
						endTime: new Date(),
						nextAvailableTime: new Date('2018-05-27T19:48:00')
					},
					ijkl: {
						id: 'ijkl',
						ride: 'Hyperspace Mountain',
						startTime: new Date(),
						endTime: new Date(),
						nextAvailableTime: new Date('2018-05-27T15:36:00')
					}
				}
			};

			// Act
			const result = fastpassSelectors.getNextAvailableTime.projector([
				mockState.entities.abcd,
				mockState.entities.efgh,
				mockState.entities.ijkl
			]);

			// Assert
			expect(result).toEqual(new Date('2018-05-27T19:48:00'));
		});
	});
});
