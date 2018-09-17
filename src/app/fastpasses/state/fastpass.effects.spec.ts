import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FastpassEffects } from './fastpass.effects';

describe('FastpassEffects', () => {
	let actions: Observable<any>;
	let effects: FastpassEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				FastpassEffects,
				provideMockActions(() => actions)
			]
		});

		effects = TestBed.get(FastpassEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
