import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, StoreModule } from '@ngrx/store';

import { SettingsComponent } from './settings.component';
import { DateTimeService } from '../common/date-time.service';
import { GlobalObjectService } from '../common/global-object.service';
import { settingsReducer } from './state/settings.reducer';
import * as fastpassActions from '../fastpasses/state';
import * as settingsActions from './state/settings.actions';

describe('SettingsComponent', () => {
	let compiled: any;
	let confirmMock: any;
	let component: SettingsComponent;
	let fixture: ComponentFixture<SettingsComponent>;
	let store: Store<any>;
	const dateTimeServiceMock = jasmine.createSpyObj<DateTimeService>('DateTimeService', ['getTodayCutoff']);
	const globalObjectServiceMock = jasmine.createSpyObj<GlobalObjectService>('GlobalObjectService', ['getWindow']);

	beforeEach(async(() => {
		confirmMock = jasmine.createSpy('confirm');
		dateTimeServiceMock.getTodayCutoff.and.returnValue(new Date());
		globalObjectServiceMock.getWindow.and.returnValue({ confirm: confirmMock });

		TestBed.configureTestingModule({
			declarations: [SettingsComponent],
			imports: [
				NgbModule,
				ReactiveFormsModule,
				StoreModule.forRoot({
					'settings': settingsReducer
				})
			],
			providers: [
				{ provide: DateTimeService, useValue: dateTimeServiceMock },
				{ provide: GlobalObjectService, useValue: globalObjectServiceMock }]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		// Arrange
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

	it('should call pruneFastpasses() when the Remove old Fastpasses button is clicked', () => {
		// Arrange
		spyOn(component, 'pruneFastpasses');

		// Act
		compiled.querySelector('#pruneFastpasses').click();

		// Assert
		expect(component.pruneFastpasses).toHaveBeenCalled();
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

	it('should call resetApp() when the Reset App button is clicked', () => {
		// Arrange
		spyOn(component, 'resetApp');

		// Act
		compiled.querySelector('#resetApp').click();

		// Assert
		expect(component.resetApp).toHaveBeenCalled();
	});

	describe('pruneFastpasses()', () => {
		it('should dispatch the PruneFastpasses action if the user confirms the warning', () => {
			// Arrange
			const mockDate = new Date('2018-05-27T02:00:00');
			const action = new fastpassActions.PruneFastpasses({ todayCutoff: mockDate });
			confirmMock.and.returnValue(true);
			dateTimeServiceMock.getTodayCutoff.and.returnValue(mockDate);

			// Act
			component.pruneFastpasses();

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});

		it('should not dispatch the PruneFastpasses action if the user does not confirm the warning', () => {
			// Arrange
			const mockDate = new Date('2019-05-27T02:00:00');
			const action = new fastpassActions.PruneFastpasses({ todayCutoff: mockDate });
			confirmMock.and.returnValue(false);
			dateTimeServiceMock.getTodayCutoff.and.returnValue(mockDate);

			// Act
			component.pruneFastpasses();

			// Assert
			expect(store.dispatch).not.toHaveBeenCalledWith(action);
		});
	});

	describe('resetApp()', () => {
		it('should dispatch the ResetApp action if the user confirms the warning', () => {
			// Arrange
			const action = new settingsActions.ResetApp();
			confirmMock.and.returnValue(true);

			// Act
			component.resetApp();

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});

		it('should not dispatch the ResetApp action if the user does not confirm the warning', () => {
			// Arrange
			const action = new settingsActions.ResetApp();
			confirmMock.and.returnValue(false);

			// Act
			component.resetApp();

			// Assert
			expect(store.dispatch).not.toHaveBeenCalledWith(action);
		});
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
