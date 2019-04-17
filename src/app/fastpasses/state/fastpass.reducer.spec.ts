import { FastpassState, initialFastpassState, fastpassReducer } from './fastpass.reducer';
import * as fastpassActions from './fastpass.actions';
import { fastpassFixtures } from '../fastpass.fixtures';

describe('Fastpass Reducer', () => {
	describe('AddFastpass', () => {
		it('should add the new Fastpass to the state', () => {
			// Arrange
			const previousState = {
				...initialFastpassState,
				ids: [fastpassFixtures.standard1.id],
				entities: {
					[fastpassFixtures.standard1.id]: fastpassFixtures.standard1
				}
			};
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [
					...previousState.ids,
					fastpassFixtures.standard2.id
				],
				entities: {
					...previousState.entities,
					[fastpassFixtures.standard2.id]: fastpassFixtures.standard2
				}
			};
			const action = new fastpassActions.AddFastpass({ fastpass: fastpassFixtures.standard2 });

			// Act
			const result = fastpassReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('ClearFastpasses', () => {
		it('should remove all Fastpasses from the state', () => {
			// Arrange
			const previousState = {
				...initialFastpassState,
				ids: [fastpassFixtures.standard1.id],
				entities: {
					[fastpassFixtures.standard1.id]: fastpassFixtures.standard1
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
			const previousState: FastpassState = {
				...initialFastpassState,
				ids: [fastpassFixtures.standard1.id, fastpassFixtures.standard2.id],
				entities: {
					[fastpassFixtures.standard1.id]: fastpassFixtures.standard1,
					[fastpassFixtures.standard2.id]: fastpassFixtures.standard2
				}};
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [fastpassFixtures.standard2.id],
				entities: {
					[fastpassFixtures.standard2.id]: fastpassFixtures.standard2
				}
			};
			const action = new fastpassActions.DeleteFastpass({ id: fastpassFixtures.standard1.id });

			// Act
			const result = fastpassReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('EditFastpass', () => {
		it('should set editFastpass to the state', () => {
			// Arrange
			const expectedResult: FastpassState = {
				...initialFastpassState,
				editFastpass: fastpassFixtures.standard1.id
			};
			const action = new fastpassActions.EditFastpass({ id: fastpassFixtures.standard1.id });

			// Act
			const result = fastpassReducer(initialFastpassState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('LoadFastpasses', () => {
		it('should add all fastpasses to the state in chronological order', () => {
			// Arrange
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [
					fastpassFixtures.standard1.id,
					fastpassFixtures.standard2.id,
					fastpassFixtures.standard3.id
				],
				entities: {
					[fastpassFixtures.standard2.id]: fastpassFixtures.standard2,
					[fastpassFixtures.standard3.id]: fastpassFixtures.standard3,
					[fastpassFixtures.standard1.id]: fastpassFixtures.standard1
				}
			};
			const action = new fastpassActions.LoadFastpasses({ fastpasses: [
				fastpassFixtures.standard2,
				fastpassFixtures.standard3,
				fastpassFixtures.standard1
			] });

			// Act
			const result = fastpassReducer(initialFastpassState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('PruneFastpasses', () => {
		it('should delete all Fastpasses earlier than the supplied todayCutoff', () => {
			// Arrange
			const previousState: FastpassState = {
				...initialFastpassState,
				ids: [
					fastpassFixtures.previousDay.id,
					fastpassFixtures.standard1.id,
					fastpassFixtures.standard2.id
				],
				entities: {
					[fastpassFixtures.previousDay.id]: fastpassFixtures.previousDay,
					[fastpassFixtures.standard1.id]: fastpassFixtures.standard1,
					[fastpassFixtures.standard2.id]: fastpassFixtures.standard2
				}};
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [
					fastpassFixtures.standard1.id,
					fastpassFixtures.standard2.id
				],
				entities: {
					[fastpassFixtures.standard1.id]: fastpassFixtures.standard1,
					[fastpassFixtures.standard2.id]: fastpassFixtures.standard2
				}
			};
			const mockTodayCutoff = new Date('2018-04-12T02:00:00');
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
			const previousState = {
				...initialFastpassState,
				ids: [fastpassFixtures.standard1.id],
				entities: {
					[fastpassFixtures.standard1.id]: fastpassFixtures.standard1
				}
			};
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [
					...previousState.ids,
					fastpassFixtures.standard2.id
				],
				entities: {
					...previousState.entities,
					[fastpassFixtures.standard2.id]: fastpassFixtures.standard2
				}
			};
			const action = new fastpassActions.UpsertFastpass({ fastpass: fastpassFixtures.standard2 });

			// Act
			const result = fastpassReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});

		it('should update an existing Fastpass in the state', () => {
			// Arrange
			const previousState = {
				...initialFastpassState,
				ids: [fastpassFixtures.knownId.id],
				entities: {
					[fastpassFixtures.knownId.id]: fastpassFixtures.knownId
				}
			};
			const expectedResult: FastpassState = {
				...initialFastpassState,
				ids: [fastpassFixtures.knownId.id],
				entities: {
					[fastpassFixtures.knownId.id]: {...fastpassFixtures.knownIdUpdated}
				}
			};
			const action = new fastpassActions.UpsertFastpass({ fastpass: fastpassFixtures.knownIdUpdated });

			// Act
			const result = fastpassReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});

		it('should reset editFastpass to null', () => {
			// Arrange
			const previousState = {
				...initialFastpassState,
				editFastpass: '17a5c948-224d-460d-b942-8890f1a573ee'
			};
			const action = new fastpassActions.UpsertFastpass({ fastpass: fastpassFixtures.null });

			// Act
			const result = fastpassReducer(previousState, action);

			// Assert
			expect(result.editFastpass).toBeNull();
		});
	});

	describe('default', () => {
		it('should return the previous state', () => {
			// Arrange
			const action = {} as any;

			// Act
			const result = fastpassReducer(initialFastpassState, action);

			// Assert
			expect(result).toEqual(initialFastpassState);
		});
	});
});
