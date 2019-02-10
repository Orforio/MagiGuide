import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of as observableOf, ReplaySubject, Subject, throwError } from 'rxjs';

import { FastpassService } from '../fastpass.service';
import { FastpassEffects } from './fastpass.effects';
import * as fastpassActions from './fastpass.actions';
import { Fastpass } from '../fastpass.model';

describe('FastpassEffects', () => {
	let actions: Subject<any>;
	let effects: FastpassEffects;
	let mockFastpassService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				FastpassEffects,
				provideMockActions(() => actions),
				{
					provide: FastpassService,
					useValue: jasmine.createSpyObj('FastpassService', ['delete', 'get', 'save'])
				}
			]
		});

		effects = TestBed.get(FastpassEffects);
		mockFastpassService = TestBed.get(FastpassService);

		// Arrange
		mockFastpassService.delete.and.returnValue(observableOf(0));
		mockFastpassService.get.and.returnValue(observableOf([]));
		mockFastpassService.save.and.returnValue(observableOf({}));
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});

	describe('deleteFastpass()', () => {
		it('should dispatch DeleteFastpassSuccess with the deleted ID on success', () => {
			// Arrange
			mockFastpassService.delete.and.returnValue(observableOf(2));
			const action = new fastpassActions.DeleteFastpass(2);
			const expectedAction = new fastpassActions.DeleteFastpassSuccess(2);

			// Act
			actions = new ReplaySubject(1);
			actions.next(action);

			// Assert
			effects.deleteFastpass.subscribe(result => {
				expect(result).toEqual(expectedAction);
			});
		});

		it('should dispatch DeleteFastpassFail with an error message on failure', () => {
			// Arrange
			mockFastpassService.delete.and.returnValue(throwError('Something went wrong'));
			const action = new fastpassActions.DeleteFastpass(42);
			const expectedAction = new fastpassActions.DeleteFastpassFail('Something went wrong');

			// Act
			actions = new ReplaySubject(1);
			actions.next(action);

			// Assert
			effects.deleteFastpass.subscribe(result => {
				expect(result).toEqual(expectedAction);
			});
		});
	});

	describe('loadFastpasses()', () => {
		it('should dispatch LoadFastpassesSuccess with Fastpass data on success', () => {
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
			mockFastpassService.get.and.returnValue(observableOf(mockFastpasses));
			const action = new fastpassActions.LoadFastpasses();
			const expectedAction = new fastpassActions.LoadFastpassesSuccess(mockFastpasses);

			// Act
			actions = new ReplaySubject(1);
			actions.next(action);

			// Assert
			effects.loadFastpasses.subscribe(result => {
				expect(result).toEqual(expectedAction);
			});
		});

		it('should dispatch LoadFastpassesFail with an error message on failure', () => {
			// Arrange
			mockFastpassService.get.and.returnValue(throwError('Something went wrong'));
			const action = new fastpassActions.LoadFastpasses();
			const expectedAction = new fastpassActions.LoadFastpassesFail('Something went wrong');

			// Act
			actions = new ReplaySubject(1);
			actions.next(action);

			// Assert
			effects.loadFastpasses.subscribe(result => {
				expect(result).toEqual(expectedAction);
			});
		});
	});

	describe('saveFastpass()', () => {
		it('should dispatch SaveFastpassSuccess with Fastpass data on success', () => {
			// Arrange
			const mockNewFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date('May 27, 2018 10:40:00'),
				new Date('May 27, 2018 11:10:00'),
				new Date('May 27, 2018 10:40:00')
			);
			mockFastpassService.save.and.returnValue(observableOf(mockNewFastpass));
			const action = new fastpassActions.SaveFastpass(mockNewFastpass);
			const expectedAction = new fastpassActions.SaveFastpassSuccess(mockNewFastpass);

			// Act
			actions = new ReplaySubject(1);
			actions.next(action);

			// Assert
			effects.saveFastpass.subscribe(result => {
				expect(result).toEqual(expectedAction);
			});
		});

		it('should dispatch LoadFastpassesFail with an error message on failure', () => {
			// Arrange
			const mockNewFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date('May 27, 2018 10:40:00'),
				new Date('May 27, 2018 11:10:00'),
				new Date('May 27, 2018 10:40:00')
			);
			mockFastpassService.save.and.returnValue(throwError('Something went wrong'));
			const action = new fastpassActions.SaveFastpass(mockNewFastpass);
			const expectedAction = new fastpassActions.SaveFastpassFail('Something went wrong');

			// Act
			actions = new ReplaySubject(1);
			actions.next(action);

			// Assert
			effects.saveFastpass.subscribe(result => {
				expect(result).toEqual(expectedAction);
			});
		});
	});
});
