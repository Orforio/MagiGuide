import { FastpassState, initialState, reducer } from './fastpass.reducer';
import * as fastpassActions from './fastpass.actions';
import { Fastpass } from '../fastpass.model';

describe('Fastpass Reducer', () => {
	describe('LoadFastpassesSuccess', () => {
		it('should set error to an empty string and set fastpasses to the payload', () => {
			// Arrange
			const mockFastpasses = [
				new Fastpass(
					'Big Thunder Mountain',
					new Date('May 27, 2018 10:40:00'),
					new Date('May 27, 2018 11:10:00'),
					new Date('May 27, 2018 10:40:00')
				),
				new Fastpass(
					'Hyperspace Mountain',
					new Date('May 27, 2018 15:20:00'),
					new Date('May 27, 2018 15:50:00'),
					new Date('May 27, 2018 12:40:00')
				)
			];
			const expectedResult: FastpassState = {
				...initialState,
				error: '',
				fastpasses: mockFastpasses
			};
			const action = new fastpassActions.LoadFastpassesSuccess(mockFastpasses);

			// Act
			const result = reducer(initialState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('LoadFastpassesFail', () => {
		it('should set error to the payload and set fastpasses to an empty array', () => {
			// Arrange
			const mockError = 'Could not load Fastpasses';
			const expectedResult: FastpassState = {
				...initialState,
				error: mockError,
				fastpasses: []
			};
			const action = new fastpassActions.LoadFastpassesFail(mockError);

			// Act
			const result = reducer(initialState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('default', () => {
		it('should return the initial state', () => {
			// Arrange
			const action = {} as any;

			// Act
			const result = reducer(initialState, action);

			// Assert
			expect(result).toBe(initialState);
		});
	});
});