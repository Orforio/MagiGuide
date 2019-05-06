import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { of as observableOf, ReplaySubject, throwError as observableThrowError } from 'rxjs';

import { AttractionsEffects } from './attractions.effects';
import * as attractionActions from './attractions.actions';
import * as settingsActions from '../../settings/state/settings.actions';
import { attractionsReducer } from './attractions.reducer';
import { settingsReducer } from '../../settings/state/settings.reducer';
import { AttractionsService } from '../attractions.service';
import { attractionFixtures } from '../attraction.fixtures';
import { DateTimeService, Parks } from '../../common';

describe('AttractionsEffects', () => {
	let actions: ReplaySubject<any>;
	let attractionsServiceMock: jasmine.SpyObj<AttractionsService>;
	let dateTimeServiceMock: jasmine.SpyObj<DateTimeService>;
	let effects: AttractionsEffects;
	let store: Store<any>;

	beforeEach(() => {
		attractionsServiceMock = jasmine.createSpyObj<AttractionsService>('AttractionsService', ['getAttractions']);
		dateTimeServiceMock = jasmine.createSpyObj<DateTimeService>('DateTimeService', ['isOlderThanHours']);

		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot({
					'attractions': attractionsReducer,
					'settings': settingsReducer
				})
			],
			providers: [
				AttractionsEffects,
				provideMockActions(() => actions),
				{
					provide: AttractionsService,
					useValue: attractionsServiceMock
				},
				{
					provide: DateTimeService,
					useValue: dateTimeServiceMock
				}
			]
		});

		effects = TestBed.get(AttractionsEffects);
		store = TestBed.get(Store);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});

	describe('loadAttractions()', () => {
		beforeEach(() => {
			attractionsServiceMock.getAttractions.and.returnValue(observableOf([]));
			dateTimeServiceMock.isOlderThanHours.and.returnValue(false);
		});

		describe('with no Attractions in the store', () => {
			it('should call AttractionsService.getAttractions with the activePark', (done: DoneFn) => {
				// Arrange
				store.dispatch(new settingsActions.SetActivePark({ activePark: Parks.WaltDisneyStudios }));
				const action = new attractionActions.LoadAttractions();

				// Arrange
				actions = new ReplaySubject(1);
				actions.next(action);

				// Assert
				effects.loadAttractions.subscribe(() => {
					expect(attractionsServiceMock.getAttractions).toHaveBeenCalledWith(Parks.WaltDisneyStudios);
					done();
				});
			});
		});

		describe('with Attractions older than 12 hours in the store', () => {
			beforeEach(() => {
				// Arrange
				const mockAttractions = [
					attractionFixtures.updatedOldest,
					attractionFixtures.updatedNewer
				];
				dateTimeServiceMock.isOlderThanHours.and.returnValue(true);
				store.dispatch(new attractionActions.LoadAttractionsSuccess({ attractions: mockAttractions }));
			});

			it('should call AttractionsService.getAttractions with the activePark', (done: DoneFn) => {
				// Arrange
				store.dispatch(new settingsActions.SetActivePark({ activePark: Parks.DisneylandPark }));
				const action = new attractionActions.LoadAttractions();

				// Arrange
				actions = new ReplaySubject(1);
				actions.next(action);

				// Assert
				effects.loadAttractions.subscribe(() => {
					expect(attractionsServiceMock.getAttractions).toHaveBeenCalledWith(Parks.DisneylandPark);
					done();
				});
			});
		});

		describe('with Attractions newer than 12 hours in the store', () => {
			beforeEach(() => {
				// Arrange
				const mockAttractions = [
					attractionFixtures.updatedOldest,
					attractionFixtures.updatedNewer
				];
				dateTimeServiceMock.isOlderThanHours.and.returnValue(false);
				store.dispatch(new attractionActions.LoadAttractionsSuccess({ attractions: mockAttractions }));
			});

			it('should not call AttractionsService.getAttractions', (done: DoneFn) => {
				// Arrange
				const action = new attractionActions.LoadAttractions();

				// Arrange
				actions = new ReplaySubject(1);
				actions.next(action);

				// Assert
				effects.loadAttractions.subscribe(() => {
					expect(attractionsServiceMock.getAttractions).not.toHaveBeenCalled();
					done();
				});
			});

			it('should dispatch CancelLoadAttractions', (done: DoneFn) => {
				// Arrange
				const action = new attractionActions.LoadAttractions();
				const expectedAction = new attractionActions.CancelLoadAttractions();

				// Act
				actions = new ReplaySubject(1);
				actions.next(action);

				// Assert
				effects.loadAttractions.subscribe(result => {
					expect(result).toEqual(expectedAction);
					done();
				});
			});
		});

		it('should dispatch LoadAttractionsSuccess with Attractions data on success', (done: DoneFn) => {
			// Arrange
			const mockAttractions = [attractionFixtures.park01Attraction01];
			attractionsServiceMock.getAttractions.and.returnValue(observableOf(mockAttractions));
			const action = new attractionActions.LoadAttractions();
			const expectedAction = new attractionActions.LoadAttractionsSuccess({ attractions: mockAttractions });

			// Act
			actions = new ReplaySubject(1);
			actions.next(action);

			// Assert
			effects.loadAttractions.subscribe(result => {
				expect(result).toEqual(expectedAction);
				done();
			});
		});

		it('should dispatch LoadAttractionsFailure with error on failure', (done: DoneFn) => {
			// Arrange
			const mockError = { message: 'Something went wrong' };
			attractionsServiceMock.getAttractions.and.returnValue(observableThrowError(mockError));
			const action = new attractionActions.LoadAttractions();
			const expectedAction = new attractionActions.LoadAttractionsFailure({ error: mockError.message });

			// Act
			actions = new ReplaySubject(1);
			actions.next(action);

			// Assert
			effects.loadAttractions.subscribe(result => {
				expect(result).toEqual(expectedAction);
				done();
			});
		});

		it('should also activate on the "[Settings] Set Active Park" action', (done: DoneFn) => {
			// Arrange
			const action = new settingsActions.SetActivePark({ activePark: Parks.DisneylandPark });

			// Arrange
			actions = new ReplaySubject(1);
			actions.next(action);

			// Assert
			effects.loadAttractions.subscribe(() => {
				expect(true).toBeTruthy('Did not respond to "[Settings] Set Active Park"');
				done();
			});
		});
	});
});
