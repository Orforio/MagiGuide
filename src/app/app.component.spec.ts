import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faTicketAlt, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let compiled: any;
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [
				FontAwesomeModule,
				NgbModule,
				RouterTestingModule
			]
		}).compileComponents();

		library.add(faClock, faFortAwesome, faTicketAlt, faUserCog);
	}));

	beforeEach(() => {
		// Arrange
		fixture = TestBed.createComponent(AppComponent);
		compiled = fixture.debugElement.nativeElement;
		component = fixture.debugElement.componentInstance;
	});

	it('should create the app', () => {
		// Assert
		expect(component).toBeTruthy();
	});

	it('should display the navbar', () => {
		// Act
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelectorAll('nav').length).toEqual(1);
	});
});
