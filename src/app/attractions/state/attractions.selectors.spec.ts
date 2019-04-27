import { AttractionsState, initialAttractionsState } from './attractions.reducer';
import { initialSettingsState, SettingsState } from '../../settings/state/settings.reducer';
import * as attractionsSelectors from './attractions.selectors';
import { attractionFixtures } from '../attraction.fixtures';
import { Parks } from '../../common';

describe('Attractions Selectors', () => {
	describe('getAttractions()', () => {
		it('should return all Attractions', () => {
			// Arrange
			const mockState: AttractionsState = {
				...initialAttractionsState,
				ids: [
					attractionFixtures.park01Attraction01.id,
					attractionFixtures.park01Attraction02.id,
					attractionFixtures.park02Attraction01.id
				],
				entities: {
					[attractionFixtures.park01Attraction01.id]: attractionFixtures.park01Attraction01,
					[attractionFixtures.park01Attraction02.id]: attractionFixtures.park01Attraction02,
					[attractionFixtures.park02Attraction01.id]: attractionFixtures.park02Attraction01
				}
			};

			// Act
			const result = attractionsSelectors.getAttractions.projector(mockState);

			// Assert
			expect(result).toEqual([
				attractionFixtures.park01Attraction01,
				attractionFixtures.park01Attraction02,
				attractionFixtures.park02Attraction01
			]);
		});
	});

	describe('getAttractionsError()', () => {
		it('should return the error message', () => {
			// Arrange
			const errorMessage = 'Something went wrong';
			const mockState: AttractionsState = {
				...initialAttractionsState,
				error: errorMessage
			};

			// Act
			const result = attractionsSelectors.getAttractionsError.projector(mockState);

			// Assert
			expect(result).toEqual(errorMessage);
		});
	});

	describe('getAttractionsForPark()', () => {
		it('should return all Attractions for activePark', () => {
			// Arrange
			const mockState = [
				attractionFixtures.park01Attraction01,
				attractionFixtures.park01Attraction02,
				attractionFixtures.park02Attraction01
			];
			const mockActivePark = Parks.DisneylandPark;

			// Act
			const result = attractionsSelectors.getAttractionsForPark.projector(mockState, mockActivePark);

			// Assert
			expect(result).toEqual([
				attractionFixtures.park01Attraction01,
				attractionFixtures.park01Attraction02
			]);
		});
	});

	describe('getAttractionsLoading()', () => {
		it('should return the loading status', () => {
			// Arrange
			const mockState: AttractionsState = {
				...initialAttractionsState,
				loading: true
			};

			// Act
			const result = attractionsSelectors.getAttractionsLoading.projector(mockState);

			// Assert
			expect(result).toEqual(true);
		});
	});

	describe('getAttractionsOldestUpdateForPark()', () => {
		it('should return the oldest updated Date', () => {
			// Arrange
			const mockState = [
				attractionFixtures.updatedNewer,
				attractionFixtures.updatedNewest,
				attractionFixtures.updatedOldest
			];

			// Act
			const result = attractionsSelectors.getAttractionsOldestUpdateForPark.projector(mockState);

			// Assert
			expect(result).toEqual(attractionFixtures.updatedOldest.updated);
		});

		it('should return null if there are no Attractions', () => {
			// Arrange
			const mockState = [];

			// Act
			const result = attractionsSelectors.getAttractionsOldestUpdateForPark.projector(mockState);

			// Assert
			expect(result).toBeNull();
		});
	});
});
