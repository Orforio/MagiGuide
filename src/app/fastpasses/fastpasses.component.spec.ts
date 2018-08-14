import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Fastpass } from './fastpass/fastpass.model';
import { FastpassComponent } from './fastpass/fastpass.component';
import { FastpassesComponent } from './fastpasses.component';
import { FastpassesService } from './fastpasses.service';

describe('FastpassesComponent', () => {
	let component: FastpassesComponent;
	let fixture: ComponentFixture<FastpassesComponent>;
	const fastpassesService = jasmine.createSpyObj('FastpassesService', ['get']);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FastpassComponent, FastpassesComponent ],
			providers: [{ provide: FastpassesService, useValue: fastpassesService }]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		// Arrange
		fixture = TestBed.createComponent(FastpassesComponent);
		component = fixture.componentInstance;

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
		fastpassesService.get.and.returnValue(of(mockFastpasses));

		// Act
		fixture.detectChanges();
		this.compiled = fixture.debugElement.nativeElement;
	});

	it('should create', () => {
		// Assert
		expect(component).toBeTruthy();
	});

	it('should display all retrieved Fastpasses', () => {
		// Assert
		expect(this.compiled.querySelectorAll('mg-fastpass').length).toBe(2);
	});
});
