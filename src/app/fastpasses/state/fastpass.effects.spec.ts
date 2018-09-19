import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject, Subject } from 'rxjs';

import { FastpassesService } from '../fastpasses.service';
import { FastpassEffects } from './fastpass.effects';
import * as fastpassActions from './fastpass.actions';
import { Fastpass } from '../fastpass/fastpass.model';

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
					provide: FastpassesService,
					useValue: jasmine.createSpyObj('FastpassService', ['get'])
				}
			]
		});

		effects = TestBed.get(FastpassEffects);
		mockFastpassService = TestBed.get(FastpassesService);

		// Arrange
		mockFastpassService.get.and.returnValue(of([]));
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});

	describe('loadFastpasses', () => {
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
			mockFastpassService.get.and.returnValue(of(mockFastpasses));
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
	});
});
