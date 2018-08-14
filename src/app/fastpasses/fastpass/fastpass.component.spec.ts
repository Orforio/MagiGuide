import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fastpass } from './fastpass.model';
import { FastpassComponent } from './fastpass.component';

describe('FastpassComponent', () => {
	let component: FastpassComponent;
	let fixture: ComponentFixture<FastpassComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FastpassComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		// Arrange
		fixture = TestBed.createComponent(FastpassComponent);
		component = fixture.componentInstance;

		const inputFastpass = new Fastpass(
			'Hyperspace Mountain',
			new Date('May 27, 2018 15:20:00'),
			new Date('May 27, 2018 15:50:00'),
			new Date('May 27, 2018 12:40:00')
		);
		component.fastpass = inputFastpass;

		// Act
		fixture.detectChanges();
		this.compiled = fixture.debugElement.nativeElement;
	});

	it('should create', () => {
		// Assert
		expect(component).toBeTruthy();
	});

	it('should display the ride name', () => {
		// Assert
		expect(this.compiled.querySelector('h5').textContent).toContain('Hyperspace Mountain');
	});

	it('should display the start time in 24H format', () => {
		// Assert
		expect(this.compiled.querySelector('p').textContent).toContain('15:20');
	});

	it('should display the end time in 24H format', () => {
		// Assert
		expect(this.compiled.querySelector('p').textContent).toContain('15:50');
	});
});
