import { attractionsReducer, AttractionsState, initialAttractionsState } from './attractions.reducer';
import * as attractionActions from './attractions.actions';
import { attractionFixtures } from '../attraction.fixtures';

describe('Attractions Reducer', () => {
	describe('LoadAttractionsFailure', () => {
		it('should set error to the state', () => {
			// Arrange
			const expectedResult: AttractionsState = {
				...initialAttractionsState,
				error: 'Something went wrong'
			};
			const action = new attractionActions.LoadAttractionsFailure({ error: 'Something went wrong' });

			// Act
			const result = attractionsReducer(initialAttractionsState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('LoadAttractionsSuccess', () => {
		it('should add a new Attraction to the state', () => {
			// Arrange
			const previousState = {
				...initialAttractionsState,
				ids: [attractionFixtures.park01Attraction01.id],
				entities: {
					[attractionFixtures.park01Attraction01.id]: attractionFixtures.park01Attraction01
				}
			};
			const expectedResult: AttractionsState = {
				...initialAttractionsState,
				ids: [
					...previousState.ids,
					attractionFixtures.park01Attraction02.id
				],
				entities: {
					...previousState.entities,
					[attractionFixtures.park01Attraction02.id]: attractionFixtures.park01Attraction02
				}
			};
			const action = new attractionActions.LoadAttractionsSuccess({ attractions: [attractionFixtures.park01Attraction02] });

			// Act
			const result = attractionsReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});

		it('should update existing Attractions in the state', () => {
			// Arrange
			const previousState: AttractionsState = {
				...initialAttractionsState,
				ids: [
					attractionFixtures.park01Attraction01.id,
					attractionFixtures.park01Attraction02.id
				],
				entities: {
					[attractionFixtures.park01Attraction01.id]: attractionFixtures.park01Attraction01,
					[attractionFixtures.park01Attraction02.id]: attractionFixtures.park01Attraction02
				}
			};
			const expectedResult: AttractionsState = {
				...initialAttractionsState,
				ids: [
					attractionFixtures.park01Attraction01Updated.id,
					attractionFixtures.park01Attraction02Updated.id
				],
				entities: {
					[attractionFixtures.park01Attraction01Updated.id]: attractionFixtures.park01Attraction01Updated,
					[attractionFixtures.park01Attraction02Updated.id]: attractionFixtures.park01Attraction02Updated
				}
			};
			const action = new attractionActions.LoadAttractionsSuccess({ attractions: [
				attractionFixtures.park01Attraction01Updated,
				attractionFixtures.park01Attraction02Updated
			] });

			// Act
			const result = attractionsReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});

		it('should reset error to an empty string', () => {
			// Arrange
			const previousState: AttractionsState = {
				...initialAttractionsState,
				error: 'Something went wrong'
			};
			const action = new attractionActions.LoadAttractionsSuccess({ attractions: [attractionFixtures.park01Attraction01] });

			// Act
			const result = attractionsReducer(previousState, action);

			// Assert
			expect(result.error).toEqual('');
		});
	});

	describe('default', () => {
		it('should return the previous state', () => {
			// Arrange
			const action = {} as any;

			// Act
			const result = attractionsReducer(initialAttractionsState, action);

			// Assert
			expect(result).toEqual(initialAttractionsState);
		});
	});
});
