import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { of as observableOf, ReplaySubject, throwError as observableThrowError } from 'rxjs';

import { AttractionsEffects } from './attractions.effects';
import * as attractionActions from './attractions.actions';
import { AttractionsService } from '../attractions.service';
import { attractionFixtures } from '../attraction.fixtures';
import * as settingsActions from '../../settings/state/settings.actions';
import { settingsReducer } from '../../settings/state/settings.reducer';
import { Parks } from '../../common';

describe('AttractionsEffects', () => {
	let actions: ReplaySubject<any>;
	let effects: AttractionsEffects;
	let mockAttractionsService: jasmine.SpyObj<AttractionsService>;
	let store: Store<any>;

	beforeEach(() => {
		mockAttractionsService = jasmine.createSpyObj<AttractionsService>('AttractionsService', ['getAttractions']);

		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot({
					'settings': settingsReducer
				})
			],
			providers: [
				AttractionsEffects,
				provideMockActions(() => actions),
				{
					provide: AttractionsService,
					useValue: mockAttractionsService
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
			mockAttractionsService.getAttractions.and.returnValue(observableOf([]));
		});

		it('should call AttractionsService.getAttractions with the activePark', (done: DoneFn) => {
			// Arrange
			store.dispatch(new settingsActions.SetActivePark({ activePark: Parks.WaltDisneyStudios }));
			const action = new attractionActions.LoadAttractions();

			// Arrange
			actions = new ReplaySubject(1);
			actions.next(action);

			// Assert
			effects.loadAttractions.subscribe(() => {
				expect(mockAttractionsService.getAttractions).toHaveBeenCalledWith(Parks.WaltDisneyStudios);
				done();
			});
		});

		it('should dispatch LoadAttractionsSuccess with Attractions data on success', (done: DoneFn) => {
			// Arrange
			const mockAttractions = [attractionFixtures.park01Attraction01];
			mockAttractionsService.getAttractions.and.returnValue(observableOf(mockAttractions));
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
			mockAttractionsService.getAttractions.and.returnValue(observableThrowError(mockError));
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
	});
});
