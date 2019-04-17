import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';

import { DashboardComponent } from './dashboard.component';
import { DateTimeService } from '../common/date-time.service';
import { fastpassFixtures } from '../fastpasses/fastpass.fixtures';
import { fastpassReducer } from '../fastpasses/state/fastpass.reducer';
import * as fastpassActions from '../fastpasses/state/fastpass.actions';

describe('DashboardComponent', () => {
	let compiled: HTMLElement;
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;
	let store: Store<any>;
	const dateTimeServiceMock = jasmine.createSpyObj<DateTimeService>('DateTimeService', ['getCurrentDateTime', 'getTodayCutoff']);

	beforeEach(async(() => {
		@Component({selector: 'mg-view-fastpass', template: ''})
		class ViewFastpassStubComponent {
			@Input() public fastpass: any;
			@Output() public edit = new EventEmitter<any>();
			@Output() public remove = new EventEmitter<any>();
		}

		TestBed.configureTestingModule({
			declarations: [
				DashboardComponent,
				ViewFastpassStubComponent
			],
			imports: [
				RouterTestingModule,
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
		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;
		store = fixture.debugElement.injector.get(Store);

		spyOn(store, 'dispatch').and.callThrough();
		dateTimeServiceMock.getCurrentDateTime.and.returnValue(new Date('2018-04-12T10:00:00'));
		dateTimeServiceMock.getTodayCutoff.and.returnValue(new Date('2018-04-13T02:00:00'));

		// Act
		fixture.detectChanges();
		compiled = fixture.debugElement.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should dispatch the PruneFastpasses action with todayCutoff', () => {
		// Arrange
		const mockAction = new fastpassActions.PruneFastpasses({ todayCutoff: new Date('2018-04-13T02:00:00') });

		// Act

		// Assert
		expect(store.dispatch).toHaveBeenCalledWith(mockAction);
	});

	describe('with no Fastpasses', () => {
		beforeEach(() => {
			// Arrange
			const action = new fastpassActions.LoadFastpasses({ fastpasses: [] });

			// Act
			store.dispatch(action);
			fixture.detectChanges();
		});

		it('should not display a Fastpass', () => {
			// Assert
			expect(compiled.querySelectorAll('mg-view-fastpass').length).toEqual(0);
		});

		it('should say that a Fastpass is now available', () => {
			// Assert
			expect(compiled.querySelector('#next-available-time').textContent).toContain('available now');
		});
	});

	describe('with an active Fastpass', () => {
		beforeEach(() => {
			// Arrange
			dateTimeServiceMock.getCurrentDateTime.and.returnValue(new Date('2018-04-12T10:30:00'));
			const action = new fastpassActions.LoadFastpasses({ fastpasses: [
				fastpassFixtures.standard1,
				fastpassFixtures.standard2
			] });

			// Act
			store.dispatch(action);
			fixture.detectChanges();
		});

		it('should display the active Fastpass', (done: DoneFn) => {
			// Assert
			expect(compiled.querySelectorAll('mg-view-fastpass').length).toBe(1);
			component.nextFastpass.subscribe((fastpass) => {
				expect(fastpass).toEqual(fastpassFixtures.standard1);
				done();
			});
		});

		it('should display the correct next available time', () => {
			// Assert
			expect(compiled.querySelector('#next-available-time').textContent).toContain('17:40');
		});
	});

	describe('with an upcoming Fastpass', () => {
		beforeEach(() => {
			// Arrange
			dateTimeServiceMock.getCurrentDateTime.and.returnValue(new Date('2018-04-12T13:00:00'));
			const action = new fastpassActions.LoadFastpasses({ fastpasses: [
				fastpassFixtures.standard1,
				fastpassFixtures.standard2
			] });

			// Act
			store.dispatch(action);
			fixture.detectChanges();
		});

		it('should display the active Fastpass', (done: DoneFn) => {
			// Assert
			expect(compiled.querySelectorAll('mg-view-fastpass').length).toBe(1);
			component.nextFastpass.subscribe((fastpass) => {
				expect(fastpass).toEqual(fastpassFixtures.standard2);
				done();
			});
		});

		it('should display the correct next available time', () => {
			// Assert
			expect(compiled.querySelector('#next-available-time').textContent).toContain('17:40');
		});
	});

	describe('with expired Fastpasses', () => {
		beforeEach(() => {
			// Arrange
			dateTimeServiceMock.getCurrentDateTime.and.returnValue(new Date('2018-04-12T18:00:00'));
			const action = new fastpassActions.LoadFastpasses({ fastpasses: [
				fastpassFixtures.standard1,
				fastpassFixtures.standard2
			] });

			// Act
			store.dispatch(action);
			fixture.detectChanges();
		});

		it('should not display a Fastpass', () => {
			// Assert
			expect(compiled.querySelectorAll('mg-view-fastpass').length).toBe(0);
		});

		it('should say that a Fastpass is now available', () => {
			// Assert
			expect(compiled.querySelector('#next-available-time').textContent).toContain('available now');
		});
	});
});
