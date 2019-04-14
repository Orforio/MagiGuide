import { inject, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AttractionsEffects } from './attractions.effects';

describe('AttractionsEffects', () => {
	let actions: Observable<any>;
	let effects: AttractionsEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AttractionsEffects,
				provideMockActions(() => actions)
			]
		});

		effects = TestBed.get(AttractionsEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
