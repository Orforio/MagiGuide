import { FastpassState } from './fastpass.reducer';
import * as fastpassSelectors from './fastpass.selectors';
import { fastpassFixtures } from '../fastpass.fixtures';

describe('Fastpass Selectors', () => {
	describe('getEditFastpass()', () => {
		it('should return the editFastpass value', () => {
			// Arrange
			const mockState: FastpassState = {
				ids: [fastpassFixtures.knownId1.id],
				entities: {
					[fastpassFixtures.knownId1.id]: fastpassFixtures.knownId1
				},
				editFastpass: fastpassFixtures.knownId1.id
			};

			// Act
			const result = fastpassSelectors.getEditFastpass.projector(mockState);

			// Assert
			expect(result).toEqual(fastpassFixtures.knownId1.id);
		});
	});

	describe('getFastpasses()', () => {
		it('should return all Fastpasses', () => {
			// Arrange
			const mockState: FastpassState = {
				ids: [
					fastpassFixtures.knownId1.id,
					fastpassFixtures.knownId2.id
				],
				entities: {
					[fastpassFixtures.knownId1.id]: fastpassFixtures.knownId1,
					[fastpassFixtures.knownId2.id]: fastpassFixtures.knownId2
				},
				editFastpass: null
			};

			// Act
			const result = fastpassSelectors.getFastpasses.projector(mockState);

			// Assert
			expect(result).toEqual([
				fastpassFixtures.knownId1,
				fastpassFixtures.knownId2
			]);
		});
	});

	describe('nextAvailableTime()', () => {
		it('should return the latest nextAvailableTime from all the Fastpasses', () => {
			// Arrange
			const mockState = [
				fastpassFixtures.knownId2,
				fastpassFixtures.knownId1
			];

			// Act
			const result = fastpassSelectors.getNextAvailableTime.projector(mockState);

			// Assert
			expect(result).toEqual(fastpassFixtures.knownId2.nextAvailableTime);
		});

		it('should return null if there are no Fastpasses', () => {
			// Arrange

			// Act
			const result = fastpassSelectors.getNextAvailableTime.projector([]);

			// Assert
			expect(result).toBeNull();
		});
	});
});
