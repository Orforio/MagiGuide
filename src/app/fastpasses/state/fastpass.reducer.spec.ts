import { FastpassState, initialFastpassState, fastpassReducer } from './fastpass.reducer';
import * as fastpassActions from './fastpass.actions';
import { Fastpass } from '../fastpass.model';

describe('Fastpass Reducer', () => {
	describe('AddFastpass', () => {
		it('should add the new Fastpass to the state', () => {
			// Arrange
			const mockFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date('May 27, 2018 10:40:00'),
				new Date('May 27, 2018 11:10:00'),
				new Date('May 27, 2018 10:40:00')
			);
			const mockNewFastpass = new Fastpass(
				'Star Tours',
				new Date('May 27, 2018 17:05:00'),
				new Date('May 27, 2018 17:35:00'),
				new Date('May 27, 2018 19:05:00')
			);
			const previousState = {
				...initialFastpassState,
				ids: [mockFastpass.id],
				entities: {
					[mockFastpass.id]: mockFastpass
				}
			};
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [
					...previousState.ids,
					mockNewFastpass.id
				],
				entities: {
					...previousState.entities,
					[mockNewFastpass.id]: mockNewFastpass
				}
			};
			const action = new fastpassActions.AddFastpass({ fastpass: mockNewFastpass });

			// Act
			const result = fastpassReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('ClearFastpasses', () => {
		it('should remove all Fastpasses from the state', () => {
			// Arrange
			const mockFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date('May 27, 2018 10:40:00'),
				new Date('May 27, 2018 11:10:00'),
				new Date('May 27, 2018 10:40:00')
			);
			const previousState = {
				...initialFastpassState,
				ids: [mockFastpass.id],
				entities: {
					[mockFastpass.id]: mockFastpass
				}
			};
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [],
				entities: {}
			};
			const action = new fastpassActions.ClearFastpasses();

			// Act
			const result = fastpassReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('DeleteFastpass', () => {
		it('should remove the given Fastpass from the state', () => {
			// Arrange
			const fastpassToKeep = new Fastpass(
				'Star Tours',
				new Date('May 27, 2018 17:05:00'),
				new Date('May 27, 2018 17:35:00'),
				new Date('May 27, 2018 19:05:00')
			);
			const fastpassToDelete = new Fastpass(
				'Big Thunder Mountain',
				new Date('May 27, 2018 10:40:00'),
				new Date('May 27, 2018 11:10:00'),
				new Date('May 27, 2018 10:40:00')
			);
			const previousState: FastpassState = {
				...initialFastpassState,
				ids: [fastpassToDelete.id, fastpassToKeep.id],
				entities: {
					[fastpassToDelete.id]: fastpassToDelete,
					[fastpassToKeep.id]: fastpassToKeep
				}};
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [fastpassToKeep.id],
				entities: {
					[fastpassToKeep.id]: fastpassToKeep
				}
			};
			const action = new fastpassActions.DeleteFastpass({ id: fastpassToDelete.id });

			// Act
			const result = fastpassReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('LoadFastpasses', () => {
		it('should add all fastpasses to the state in chronological order', () => {
			// Arrange
			const mockFastpass1 = new Fastpass(
				'Big Thunder Mountain',
				new Date('May 27, 2018 10:40:00'),
				new Date('May 27, 2018 11:10:00'),
				new Date('May 27, 2018 10:40:00')
			);
			const mockFastpass2 = new Fastpass(
				'Hyperspace Mountain',
				new Date('May 27, 2018 15:20:00'),
				new Date('May 27, 2018 15:50:00'),
				new Date('May 27, 2018 12:40:00')
			);
			const mockFastpass3 = new Fastpass(
				'Star Tours',
				new Date('May 27, 2018 13:05:00'),
				new Date('May 27, 2018 13:35:00'),
				new Date('May 27, 2018 15:05:00')
			);
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [mockFastpass1.id, mockFastpass3.id, mockFastpass2.id],
				entities: {
					[mockFastpass1.id]: mockFastpass1,
					[mockFastpass2.id]: mockFastpass2,
					[mockFastpass3.id]: mockFastpass3
				}
			};
			const action = new fastpassActions.LoadFastpasses({ fastpasses: [mockFastpass1, mockFastpass2, mockFastpass3] });

			// Act
			const result = fastpassReducer(initialFastpassState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('PruneFastpasses', () => {
		it('should delete all Fastpasses earlier than the supplied todayCutoff', () => {
			// Arrange
			const fastpassToKeep1 = new Fastpass(
				'Hyperspace Mountain',
				new Date('May 27, 2018 08:05:00'),
				new Date('May 27, 2018 08:35:00'),
				new Date('May 27, 2018 10:05:00')
			);
			const fastpassToKeep2 = new Fastpass(
				'Star Tours',
				new Date('May 27, 2018 17:05:00'),
				new Date('May 27, 2018 17:35:00'),
				new Date('May 27, 2018 19:05:00')
			);
			const fastpassToDelete = new Fastpass(
				'Big Thunder Mountain',
				new Date('May 26, 2018 21:40:00'),
				new Date('May 26, 2018 22:10:00'),
				new Date('May 26, 2018 23:40:00')
			);
			const previousState: FastpassState = {
				...initialFastpassState,
				ids: [fastpassToDelete.id, fastpassToKeep1.id, fastpassToKeep2.id],
				entities: {
					[fastpassToDelete.id]: fastpassToDelete,
					[fastpassToKeep1.id]: fastpassToKeep1,
					[fastpassToKeep2.id]: fastpassToKeep2
				}};
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [fastpassToKeep1.id, fastpassToKeep2.id],
				entities: {
					[fastpassToKeep1.id]: fastpassToKeep1,
					[fastpassToKeep2.id]: fastpassToKeep2
				}
			};
			const mockTodayCutoff = new Date('May 27, 2018 02:00:00');
			const action = new fastpassActions.PruneFastpasses({ todayCutoff: mockTodayCutoff });

			// Act
			const result = fastpassReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('UpsertFastpass', () => {
		it('should add a new Fastpass to the state', () => {
			// Arrange
			const mockFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date('May 27, 2018 10:40:00'),
				new Date('May 27, 2018 11:10:00'),
				new Date('May 27, 2018 10:40:00')
			);
			const mockNewFastpass = new Fastpass(
				'Star Tours',
				new Date('May 27, 2018 17:05:00'),
				new Date('May 27, 2018 17:35:00'),
				new Date('May 27, 2018 19:05:00')
			);
			const previousState = {
				...initialFastpassState,
				ids: [mockFastpass.id],
				entities: {
					[mockFastpass.id]: mockFastpass
				}
			};
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [
					...previousState.ids,
					mockNewFastpass.id
				],
				entities: {
					...previousState.entities,
					[mockNewFastpass.id]: mockNewFastpass
				}
			};
			const action = new fastpassActions.UpsertFastpass({ fastpass: mockNewFastpass });

			// Act
			const result = fastpassReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});

		it('should update an existing Fastpass in the state', () => {
			// Arrange
			const mockFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date('May 27, 2018 10:40:00'),
				new Date('May 27, 2018 11:10:00'),
				new Date('May 27, 2018 10:40:00')
			);
			const mockUpdatedFastpass = {
				...mockFastpass,
				startTime: new Date('May 27, 2018 10:30:00'),
				endTime: new Date('May 27, 2018 11:00:00')
			};
			const previousState = {
				...initialFastpassState,
				ids: [mockFastpass.id],
				entities: {
					[mockFastpass.id]: mockFastpass
				}
			};
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [mockFastpass.id],
				entities: {
					[mockFastpass.id]: mockUpdatedFastpass
				}
			};
			const action = new fastpassActions.UpsertFastpass({ fastpass: mockUpdatedFastpass });

			// Act
			const result = fastpassReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('default', () => {
		it('should return the initial state', () => {
			// Arrange
			const action = {} as any;

			// Act
			const result = fastpassReducer(initialFastpassState, action);

			// Assert
			expect(result).toEqual(initialFastpassState);
		});
	});
});
