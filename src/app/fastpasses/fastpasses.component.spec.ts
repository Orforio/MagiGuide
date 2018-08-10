import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastpassesComponent } from './fastpasses.component';

describe('FastpassesComponent', () => {
	let component: FastpassesComponent;
	let fixture: ComponentFixture<FastpassesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FastpassesComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FastpassesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
