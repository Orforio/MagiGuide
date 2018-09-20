import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fastpass } from '../fastpass.model';
import { ViewFastpassComponent } from './view-fastpass.component';

describe('FastpassComponent', () => {
	let component: ViewFastpassComponent;
	let fixture: ComponentFixture<ViewFastpassComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ViewFastpassComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		// Arrange
		fixture = TestBed.createComponent(ViewFastpassComponent);
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
		expect(this.compiled.querySelector('.ride-name').textContent).toContain('Hyperspace Mountain');
	});

	it('should display the start time in 24H format', () => {
		// Assert
		expect(this.compiled.querySelector('.start-time').textContent).toContain('15:20');
	});

	it('should display the end time in 24H format', () => {
		// Assert
		expect(this.compiled.querySelector('.end-time').textContent).toContain('15:50');
	});
});
