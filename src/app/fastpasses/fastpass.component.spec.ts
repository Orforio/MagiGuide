import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, StoreModule } from '@ngrx/store';

import { Fastpass } from './fastpass.model';
import { FastpassComponent } from './fastpass.component';
import { fastpassReducer } from './state/fastpass.reducer';
import * as fastpassActions from './state/fastpass.actions';

describe('FastpassComponent', () => {
	let compiled: any;
	let component: FastpassComponent;
	let fixture: ComponentFixture<FastpassComponent>;
	let store: Store<any>;

	beforeEach(async(() => {
		@Component({selector: 'mg-add-fastpass', template: ''})
		class AddFastpassStubComponent {
			@Output() public addFastpass = new EventEmitter<any>();
		}

		@Component({selector: 'mg-view-fastpass', template: ''})
		class ViewFastpassStubComponent {
			@Input() public fastpass: any;
		}

		TestBed.configureTestingModule({
			declarations: [
				AddFastpassStubComponent,
				FastpassComponent,
				ViewFastpassStubComponent
			],
			imports: [
				NgbModule,
				StoreModule.forRoot({
					'fastpasses': fastpassReducer
				})
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		// Arrange
		fixture = TestBed.createComponent(FastpassComponent);
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

	it('should display all retrieved Fastpasses', () => {
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
		const action = new fastpassActions.LoadFastpasses({ fastpasses: mockFastpasses });

		// Act
		store.dispatch(action);
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelectorAll('mg-view-fastpass').length).toBe(2);
	});

	describe('addFastpass()', () => {
		it('should dispatch the AddFastpass action with the payload', () => {
			// Arrange
			const mockFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date('May 27, 2018 10:40:00'),
				new Date('May 27, 2018 11:10:00'),
				new Date('May 27, 2018 10:40:00')
			);
			const action = new fastpassActions.AddFastpass({ fastpass: mockFastpass });

			// Act
			component.addFastpass(mockFastpass);

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});

	describe('removeFastpass()', () => {
		it('should dispatch the DeleteFastpass action with the Fastpass.id', () => {
			// Arrange
			const mockFastpass = new Fastpass(null, null, null, null);
			const action = new fastpassActions.DeleteFastpass({ id: mockFastpass.id });

			// Act
			component.removeFastpass(mockFastpass);

			// Assert
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});
});
