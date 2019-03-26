import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, StoreModule } from '@ngrx/store';

import { DateTimeService } from '../common/date-time.service';
import { fastpassFixtures } from './fastpass.model.fixtures';
import { FastpassesComponent } from './fastpasses.component';
import { fastpassReducer } from './state/fastpass.reducer';
import * as fastpassActions from './state/fastpass.actions';

describe('FastpassesComponent', () => {
	let compiled: HTMLElement;
	let component: FastpassesComponent;
	let fixture: ComponentFixture<FastpassesComponent>;
	let store: Store<any>;
	const dateTimeServiceMock = jasmine.createSpyObj<DateTimeService>('DateTimeService', ['getCurrentDateTime', 'getTodayCutoff']);

	beforeEach(async(() => {
		@Component({selector: 'mg-view-fastpass', template: ''})
		class ViewFastpassStubComponent {
			@Input() public fastpass: any;
			@Output() public edit = new EventEmitter<any>();
			@Output() public remove = new EventEmitter<any>();
		}

		@Component({selector: 'mg-upsert-fastpass', template: ''})
		class UpsertFastpassStubComponent {
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
					'fastpasses': fastpassReducer
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

		spyOn(store, 'dispatch').and.callThrough();
		dateTimeServiceMock.getCurrentDateTime.and.returnValue(new Date('2018-04-12T10:00:00'));
		dateTimeServiceMock.getTodayCutoff.and.returnValue(new Date('2018-04-12T02:00:00'));

		// Act
		fixture.detectChanges();
		compiled = fixture.debugElement.nativeElement;
	});

	it('should create', () => {
		// Assert
		expect(component).toBeTruthy();
	});

	it('should dispatch the PruneFastpasses action with todayCutoff', () => {
		// Arrange
		const mockAction = new fastpassActions.PruneFastpasses({ todayCutoff: new Date('2018-04-12T02:00:00') });

		// Act

		// Assert
		expect(store.dispatch).toHaveBeenCalledWith(mockAction);
	});

	it('should display next available Fastpass if Fastpasses are set', () => {
		// Arrange
		const action = new fastpassActions.LoadFastpasses({ fastpasses: [fastpassFixtures.standard1] });

		// Act
		store.dispatch(action);
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('ngb-alert').textContent).toContain('12:25 PM');
	});

	it('should display "available now" message if Fastpasses are not set', () => {
		// Arrange
		const action = new fastpassActions.LoadFastpasses({ fastpasses: [] });

		// Act
		store.dispatch(action);
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('ngb-alert').textContent).toContain('available now');
	});

	it('should display "available now" message if Fastpasses are expired', () => {
		// Arrange
		dateTimeServiceMock.getCurrentDateTime.and.returnValue(new Date('2018-04-12T19:00:00'));
		const action = new fastpassActions.LoadFastpasses({ fastpasses: [fastpassFixtures.standard1] });

		// Act
		store.dispatch(action);
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('ngb-alert').textContent).toContain('available now');
	});

	it('should display all retrieved Fastpasses', () => {
		// Arrange
		const action = new fastpassActions.LoadFastpasses({ fastpasses: [
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
		const loadAction = new fastpassActions.LoadFastpasses({ fastpasses: [
			fastpassFixtures.knownId,
			fastpassFixtures.standard1
		] });
		const editAction = new fastpassActions.EditFastpass({ id: '17a5c948-224d-460d-b942-8890f1a573ee' });

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
			const action = new fastpassActions.EditFastpass({ id: mockId });

			// Act
			component.editFastpass(mockId);

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});

	describe('removeFastpass()', () => {
		it('should dispatch the DeleteFastpass action with the Fastpass.id', () => {
			// Arrange
			const action = new fastpassActions.DeleteFastpass({ id: fastpassFixtures.null.id });

			// Act
			component.removeFastpass(fastpassFixtures.null);

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});

	describe('upsertFastpass()', () => {
		it('should dispatch the UpsertFastpass action with the payload', () => {
			// Arrange
			const action = new fastpassActions.UpsertFastpass({ fastpass: fastpassFixtures.standard1 });

			// Act
			component.upsertFastpass(fastpassFixtures.standard1);

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});
});
