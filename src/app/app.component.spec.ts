import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faTicketAlt, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { settingsReducer } from './settings/state/settings.reducer';
import * as settingsActions from './settings/state/settings.actions';
import { Parks } from './common';

describe('AppComponent', () => {
	let compiled: HTMLElement;
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let store: Store<any>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [
				FontAwesomeModule,
				NgbModule,
				ReactiveFormsModule,
				StoreModule.forRoot({
					'settings': settingsReducer
				}),
				RouterTestingModule
			]
		}).compileComponents();

		library.add(faClock, faFortAwesome, faTicketAlt, faUserCog);
	}));

	beforeEach(() => {
		// Arrange
		fixture = TestBed.createComponent(AppComponent);
		compiled = fixture.debugElement.nativeElement;
		component = fixture.debugElement.componentInstance;
		store = fixture.debugElement.injector.get(Store);

		spyOn(store, 'dispatch').and.callThrough();
	});

	it('should create the app', () => {
		// Assert
		expect(component).toBeTruthy();
	});

	it('should display the navbars', () => {
		// Act
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelectorAll('nav').length).toEqual(2);
	});

	it('should set the activePark select to the state value', () => {
		// Arrange
		const action = new settingsActions.SetActivePark({ activePark: Parks.WaltDisneyStudios });

		// Act
		store.dispatch(action);
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector<HTMLSelectElement>('#active-park').value).toEqual(Parks.WaltDisneyStudios.toString());
	});

	it('should update the state value when activePark is changed', () => {
		// Arrange
		spyOn(component, 'setActivePark');
		const select = compiled.querySelector<HTMLSelectElement>('#active-park');

		// Act
		select.value = Parks.WaltDisneyStudios.toString();
		select.dispatchEvent(new Event('change'));

		// Assert
		expect(component.setActivePark).toHaveBeenCalled();
	});

	describe('setActivePark()', () => {
		it('should dispatch the SetActivePark action with the current activePark value', () => {
			// Arrange
			const action = new settingsActions.SetActivePark({ activePark: Parks.WaltDisneyStudios });
			component.activeParksForm.controls.activePark.setValue(Parks.WaltDisneyStudios);

			// Act
			component.setActivePark();

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});

		it('should convert a string value into a number', () => {
			// Arrange
			const action = new settingsActions.SetActivePark({ activePark: Parks.WaltDisneyStudios });
			component.activeParksForm.controls.activePark.setValue('' + Parks.WaltDisneyStudios);

			// Act
			component.setActivePark();

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});
});
