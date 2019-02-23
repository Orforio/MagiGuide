import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, StoreModule } from '@ngrx/store';

import { SettingsComponent } from './settings.component';
import { settingsReducer } from './state/settings.reducer';
import * as settingsActions from './state/settings.actions';

describe('SettingsComponent', () => {
	let compiled: any;
	let component: SettingsComponent;
	let fixture: ComponentFixture<SettingsComponent>;
	let store: Store<any>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SettingsComponent],
			imports: [
				NgbModule,
				ReactiveFormsModule,
				StoreModule.forRoot({
					'settings': settingsReducer
				})
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SettingsComponent);
		component = fixture.componentInstance;
		store = fixture.debugElement.injector.get(Store);

		spyOn(store, 'dispatch').and.callThrough();

		// Act
		fixture.detectChanges();
		compiled = fixture.debugElement.nativeElement;
	});

	it('should create', () => {
		// Assert
		expect(component).toBeTruthy();
	});

	it('should set the enableDebug checkbox to the state value', () => {
		// Arrange
		const action = new settingsActions.SetDebug({ enableDebug: true });

		// Act
		store.dispatch(action);
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('#enableDebug').checked).toBe(true);
	});

	it('should update the state value when enableDebug is changed', () => {
		// Arrange
		spyOn(component, 'setDebug');

		// Act
		compiled.querySelector('#enableDebug').click();

		// Assert
		expect(component.setDebug).toHaveBeenCalled();
	});

	describe('setDebug()', () => {
		it('should dispatch the SetDebug action with the current enableDebug value', () => {
			// Arrange
			const action = new settingsActions.SetDebug({ enableDebug: true });
			component.settingsForm.controls.enableDebug.setValue(true);

			// Act
			component.setDebug();

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});
});
