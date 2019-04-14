import { attractionsReducer, initialAttractionsState } from './attractions.reducer';

describe('Attractions Reducer', () => {
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
