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
});
