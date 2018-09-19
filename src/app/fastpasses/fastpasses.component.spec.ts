import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { Fastpass } from './fastpass/fastpass.model';
import { FastpassComponent } from './fastpass/fastpass.component';
import { FastpassesComponent } from './fastpasses.component';
import { reducer } from './state/fastpass.reducer';
import * as fastpassActions from './state/fastpass.actions';
import * as fromFastpass from './state';

describe('FastpassesComponent', () => {
	let component: FastpassesComponent;
	let fixture: ComponentFixture<FastpassesComponent>;
	let store: Store<any>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FastpassComponent, FastpassesComponent ],
			imports: [ StoreModule.forRoot({
				'fastpasses': reducer
			}) ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		// Arrange
		fixture = TestBed.createComponent(FastpassesComponent);
		component = fixture.componentInstance;
		store = fixture.debugElement.injector.get(Store);

		spyOn(store, 'dispatch').and.callThrough();

		// Act
		fixture.detectChanges();
		this.compiled = fixture.debugElement.nativeElement;
	});

	it('should create', () => {
		// Assert
		expect(component).toBeTruthy();
	});

	it('should dispatch the LoadFastpasses action', () => {
		// Arrange
		const action = new fastpassActions.LoadFastpasses();

		// Assert
		expect(store.dispatch).toHaveBeenCalledWith(action);
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
		const action = new fastpassActions.LoadFastpassesSuccess(mockFastpasses);

		// Act
		store.dispatch(action);
		fixture.detectChanges();

		// Assert
		expect(this.compiled.querySelectorAll('mg-fastpass').length).toBe(2);
	});
});
