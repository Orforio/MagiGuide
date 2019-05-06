import { FastpassesState, initialFastpassesState, fastpassesReducer } from './fastpasses.reducer';
import * as fastpassActions from './fastpasses.actions';
import { fastpassFixtures } from '../fastpass.fixtures';

describe('Fastpass Reducer', () => {
	describe('AddFastpass', () => {
		it('should add the new Fastpass to the state', () => {
			// Arrange
			const previousState = {
				...initialFastpassesState,
				ids: [fastpassFixtures.standard1.id],
				entities: {
					[fastpassFixtures.standard1.id]: fastpassFixtures.standard1
				}
			};
			const expectedResult: FastpassesState = {
				...initialFastpassesState,
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
			const result = fastpassesReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('ClearFastpasses', () => {
		it('should remove all Fastpasses from the state', () => {
			// Arrange
			const previousState = {
				...initialFastpassesState,
				ids: [fastpassFixtures.standard1.id],
				entities: {
					[fastpassFixtures.standard1.id]: fastpassFixtures.standard1
				}
			};
			const expectedResult: FastpassesState = {
				...initialFastpassesState,
				ids: [],
				entities: {}
			};
			const action = new fastpassActions.ClearFastpasses();

			// Act
			const result = fastpassesReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('DeleteFastpass', () => {
		it('should remove the given Fastpass from the state', () => {
			// Arrange
			const previousState: FastpassesState = {
				...initialFastpassesState,
				ids: [fastpassFixtures.standard1.id, fastpassFixtures.standard2.id],
				entities: {
					[fastpassFixtures.standard1.id]: fastpassFixtures.standard1,
					[fastpassFixtures.standard2.id]: fastpassFixtures.standard2
				}};
			const expectedResult: FastpassesState = {
				...initialFastpassesState,
				ids: [fastpassFixtures.standard2.id],
				entities: {
					[fastpassFixtures.standard2.id]: fastpassFixtures.standard2
				}
			};
			const action = new fastpassActions.DeleteFastpass({ id: fastpassFixtures.standard1.id });

			// Act
			const result = fastpassesReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('EditFastpass', () => {
		it('should set editFastpass to the state', () => {
			// Arrange
			const expectedResult: FastpassesState = {
				...initialFastpassesState,
				editFastpass: fastpassFixtures.standard1.id
			};
			const action = new fastpassActions.EditFastpass({ id: fastpassFixtures.standard1.id });

			// Act
			const result = fastpassesReducer(initialFastpassesState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('LoadFastpasses', () => {
		it('should add all fastpasses to the state in chronological order', () => {
			// Arrange
			const expectedResult: FastpassesState = {
				...initialFastpassesState,
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
			const result = fastpassesReducer(initialFastpassesState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('PruneFastpasses', () => {
		it('should delete all Fastpasses earlier than the supplied todayCutoff', () => {
			// Arrange
			const previousState: FastpassesState = {
				...initialFastpassesState,
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
			const expectedResult: FastpassesState = {
				...initialFastpassesState,
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
			const result = fastpassesReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe('UpsertFastpass', () => {
		it('should add a new Fastpass to the state', () => {
			// Arrange
			const previousState = {
				...initialFastpassesState,
				ids: [fastpassFixtures.standard1.id],
				entities: {
					[fastpassFixtures.standard1.id]: fastpassFixtures.standard1
				}
			};
			const expectedResult: FastpassesState = {
				...initialFastpassesState,
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
			const result = fastpassesReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});

		it('should update an existing Fastpass in the state', () => {
			// Arrange
			const previousState = {
				...initialFastpassesState,
				ids: [fastpassFixtures.knownId1.id],
				entities: {
					[fastpassFixtures.knownId1.id]: fastpassFixtures.knownId1
				}
			};
			const expectedResult: FastpassesState = {
				...initialFastpassesState,
				ids: [fastpassFixtures.knownId1.id],
				entities: {
					[fastpassFixtures.knownId1.id]: {...fastpassFixtures.knownId1Updated}
				}
			};
			const action = new fastpassActions.UpsertFastpass({ fastpass: fastpassFixtures.knownId1Updated });

			// Act
			const result = fastpassesReducer(previousState, action);

			// Assert
			expect(result).toEqual(expectedResult);
		});

		it('should reset editFastpass to null', () => {
			// Arrange
			const previousState = {
				...initialFastpassesState,
				editFastpass: '17a5c948-224d-460d-b942-8890f1a573ee'
			};
			const action = new fastpassActions.UpsertFastpass({ fastpass: fastpassFixtures.null });

			// Act
			const result = fastpassesReducer(previousState, action);

			// Assert
			expect(result.editFastpass).toBeNull();
		});
	});

	describe('default', () => {
		it('should return the previous state', () => {
			// Arrange
			const action = {} as any;

			// Act
			const result = fastpassesReducer(initialFastpassesState, action);

			// Assert
			expect(result).toEqual(initialFastpassesState);
		});
	});
});
