import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, StoreModule } from '@ngrx/store';

import { attractionFixtures } from '../attractions/attraction.fixtures';
import { fastpassFixtures } from './fastpass.fixtures';
import { FastpassesComponent } from './fastpasses.component';
import { attractionsReducer } from '../attractions/state/attractions.reducer';
import * as attractionActions from '../attractions/state/attractions.actions';
import * as fromFastpasses from './state';
import * as fromSettings from '../settings/state';
import { DateTimeService } from '../common';

describe('FastpassesComponent', () => {
	let compiled: HTMLElement;
	let component: FastpassesComponent;
	let fixture: ComponentFixture<FastpassesComponent>;
	let store: Store<any>;
	let storeSpy: jasmine.Spy;
	const dateTimeServiceMock = jasmine.createSpyObj<DateTimeService>('DateTimeService', [
		'getCurrentDateTime',
		'getTodayCutoff',
		'isOlderThanHours'
	]);

	beforeEach(async(() => {
		@Component({selector: 'mg-view-fastpass', template: ''})
		class ViewFastpassStubComponent {
			@Input() public fastpass: any;
			@Output() public edit = new EventEmitter<any>();
			@Output() public remove = new EventEmitter<any>();
		}

		@Component({selector: 'mg-upsert-fastpass', template: ''})
		class UpsertFastpassStubComponent {
			@Input() public attractions: any;
			@Input() public attractionsLoading: any;
			@Input() public fastpass: any;
			@Output() public cancelEdit = new EventEmitter<any>();
			@Output() public upsert = new EventEmitter<any>();
		}

		TestBed.configureTestingModule({
			declarations: [
				FastpassesComponent,
				UpsertFastpassStubComponent,
				ViewFastpassStubComponent
			],
			imports: [
				NgbModule,
				StoreModule.forRoot({
					'attractions': attractionsReducer,
					'fastpasses': fromFastpasses.fastpassesReducer,
					'settings': fromSettings.settingsReducer
				})
			],
			providers: [
				{ provide: DateTimeService, useValue: dateTimeServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		// Arrange
		fixture = TestBed.createComponent(FastpassesComponent);
		component = fixture.componentInstance;
		store = fixture.debugElement.injector.get(Store);

		storeSpy = spyOn(store, 'dispatch').and.callThrough();
		dateTimeServiceMock.getCurrentDateTime.and.returnValue(new Date('2018-04-12T10:00:00'));
		dateTimeServiceMock.getTodayCutoff.and.returnValue(new Date('2018-04-12T02:00:00'));
		dateTimeServiceMock.isOlderThanHours.and.returnValue(false);

		// Act
		fixture.detectChanges();
		compiled = fixture.debugElement.nativeElement;
	});

	it('should create', () => {
		// Assert
		expect(component).toBeTruthy();
	});

	it('should dispatch the LoadAttractions action if the state contains no Attractions', (done: DoneFn) => {
		// Arrange
		const mockAction = new attractionActions.LoadAttractions();

		// Act
		// Assert
		component.attractions.subscribe(() => {
			expect(store.dispatch).toHaveBeenCalledWith(mockAction);
			done();
		});
	});

	it('should dispatch the LoadAttractions action if state contains Attractions older than 12 hours', (done: DoneFn) => {
		// Arrange
		const mockAction = new attractionActions.LoadAttractions();
		const mockAttractions = [
			attractionFixtures.updatedOldest,
			attractionFixtures.updatedNewer
		];
		dateTimeServiceMock.isOlderThanHours.and.returnValue(true);
		store.dispatch(new attractionActions.LoadAttractionsSuccess({ attractions: mockAttractions }));
		storeSpy.calls.reset();
		fixture.detectChanges();

		// Act
		// Assert
		component.attractions.subscribe(() => {
			expect(storeSpy).toHaveBeenCalledWith(mockAction);
			done();
		});
	});

	it('should not dispatch the LoadAttractions action if state contains Attractions newer than 12 hours', (done: DoneFn) => {
		// Arrange
		const mockAction = new attractionActions.LoadAttractions();
		const mockAttractions = [
			attractionFixtures.updatedOldest,
			attractionFixtures.updatedNewer
		];
		dateTimeServiceMock.isOlderThanHours.and.returnValue(false);
		store.dispatch(new attractionActions.LoadAttractionsSuccess({ attractions: mockAttractions }));
		storeSpy.calls.reset();
		fixture.detectChanges();

		// Act
		// Assert
		component.attractions.subscribe(() => {
			expect(storeSpy).not.toHaveBeenCalledWith(mockAction);
			done();
		});
	});

	it('should retrieve the Attractions data for Fastpass attractions', (done: DoneFn) => {
		// Arrange
		const mockAttractions = [
			attractionFixtures.park01Attraction01,
			attractionFixtures.park01Attraction02,
			attractionFixtures.park01Attraction03NoFastpass
		];
		const expectedAttractions = [
			attractionFixtures.park01Attraction01,
			attractionFixtures.park01Attraction02
		];

		// Act
		store.dispatch(new attractionActions.LoadAttractionsSuccess({ attractions: mockAttractions }));
		fixture.detectChanges();

		// Assert
		component.attractions.subscribe(result => {
			expect(result).toEqual(expectedAttractions);
			done();
		});
	});

	it('should retrieve the Attractions loading status', () => {
		// Arrange

		// Act
		// Assert
		component.attractionsLoading.subscribe(result => {
			expect(result).toEqual(jasmine.any(Boolean));
		});
	});

	it('should dispatch the PruneFastpasses action with todayCutoff', () => {
		// Arrange
		const mockAction = new fromFastpasses.PruneFastpasses({ todayCutoff: new Date('2018-04-12T02:00:00') });

		// Act

		// Assert
		expect(store.dispatch).toHaveBeenCalledWith(mockAction);
	});

	it('should display next available Fastpass if Fastpasses are set', () => {
		// Arrange
		const action = new fromFastpasses.LoadFastpasses({ fastpasses: [fastpassFixtures.standard1] });

		// Act
		store.dispatch(action);
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('#next-available-time-alert').textContent).toContain('12:25 PM');
	});

	it('should display "available now" message if Fastpasses are not set', () => {
		// Arrange
		const action = new fromFastpasses.LoadFastpasses({ fastpasses: [] });

		// Act
		store.dispatch(action);
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('#next-available-time-alert').textContent).toContain('available now');
	});

	it('should display "available now" message if Fastpasses are expired', () => {
		// Arrange
		dateTimeServiceMock.getCurrentDateTime.and.returnValue(new Date('2018-04-12T19:00:00'));
		const action = new fromFastpasses.LoadFastpasses({ fastpasses: [fastpassFixtures.standard1] });

		// Act
		store.dispatch(action);
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('#next-available-time-alert').textContent).toContain('available now');
	});

	it('should display error message if Attractions failed to load', () => {
		// Arrange
		const errorMessage = 'Failed to load Attractions';

		// Act
		store.dispatch(new attractionActions.LoadAttractionsFailure({ error: errorMessage }));
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('#attractions-error-alert').textContent).toContain(errorMessage);
	});

	it('should display all retrieved Fastpasses', () => {
		// Arrange
		const action = new fromFastpasses.LoadFastpasses({ fastpasses: [
			fastpassFixtures.standard1,
			fastpassFixtures.standard2
		] });

		// Act
		store.dispatch(action);
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelectorAll('mg-view-fastpass').length).toEqual(2);
	});

	it('should display currently editing Fastpasses', () => {
		// Arrange
		const loadAction = new fromFastpasses.LoadFastpasses({ fastpasses: [
			fastpassFixtures.knownId1,
			fastpassFixtures.standard1
		] });
		const editAction = new fromFastpasses.EditFastpass({ id: '17a5c948-224d-460d-b942-8890f1a573ee' });

		// Act
		store.dispatch(loadAction);
		store.dispatch(editAction);
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelectorAll('mg-view-fastpass').length).toEqual(1);
		expect(compiled.querySelectorAll('mg-upsert-fastpass').length).toEqual(2);
	});

	describe('editFastpass()', () => {
		it('should dispatch the EditFastpass action with the payload', () => {
			// Arrange
			const mockId = '17a5c948-224d-460d-b942-8890f1a573ee';
			const action = new fromFastpasses.EditFastpass({ id: mockId });

			// Act
			component.editFastpass(mockId);

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});

	describe('removeFastpass()', () => {
		it('should dispatch the DeleteFastpass action with the Fastpass.id', () => {
			// Arrange
			const action = new fromFastpasses.DeleteFastpass({ id: fastpassFixtures.null.id });

			// Act
			component.removeFastpass(fastpassFixtures.null);

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});

	describe('upsertFastpass()', () => {
		it('should dispatch the UpsertFastpass action with the payload', () => {
			// Arrange
			const action = new fromFastpasses.UpsertFastpass({ fastpass: fastpassFixtures.standard1 });

			// Act
			component.upsertFastpass(fastpassFixtures.standard1);

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});
});
