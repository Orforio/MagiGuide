import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UpsertFastpassComponent } from './upsert-fastpass.component';
import { attractionFixtures } from '../../attractions/attraction.fixtures';
import { fastpassFixtures } from '../fastpass.fixtures';
import { DisableControlDirective } from '../../common';

describe('UpsertFastpassComponent', () => {
	let compiled: HTMLElement;
	let component: UpsertFastpassComponent;
	let fixture: ComponentFixture<UpsertFastpassComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				DisableControlDirective,
				UpsertFastpassComponent
			],
			imports: [
				ReactiveFormsModule,
				NgbModule
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		// Arrange
		fixture = TestBed.createComponent(UpsertFastpassComponent);
		component = fixture.componentInstance;
		compiled = fixture.debugElement.nativeElement;
	});

	it('should create', () => {
		// Arrange

		// Act
		fixture.detectChanges();

		// Assert
		expect(component).toBeTruthy();
	});

	it('should lock out the attractions select if Attractions are loading', () => {
		// Arrange
		component.attractionsLoading = true;

		// Act
		fixture.detectChanges();
		const options = compiled.querySelectorAll<HTMLOptionElement>('select option');

		// Assert
		expect(component.upsertFastpassForm.controls.ride.disabled).toBe(true);
		expect(options.length).toEqual(1);
		expect(options[0].textContent).toEqual('Loading...');
	});

	it('should set the attraction select options to the input Attractions', () => {
		// Arrange
		component.attractions = [
			attractionFixtures.park01Attraction01,
			attractionFixtures.park01Attraction02
		];

		// Act
		fixture.detectChanges();
		const result = compiled.querySelectorAll<HTMLOptionElement>('select option');

		// Assert
		expect(result.length).toEqual(2);
		expect(result[0].textContent).toEqual(attractionFixtures.park01Attraction01.name);
		expect(result[1].textContent).toEqual(attractionFixtures.park01Attraction02.name);
	});

	it('should set the form elements to the values of the Input Fastpass', () => {
		// Arrange
		component.fastpass = fastpassFixtures.standard1;

		// Act
		fixture.detectChanges();

		// Assert
		expect(component.upsertFastpassForm.controls.ride.value).toEqual(fastpassFixtures.standard1.ride);
		expect(component.upsertFastpassForm.controls.startTime.value).toEqual(fastpassFixtures.standard1.startTime);
		expect(component.upsertFastpassForm.controls.endTime.value).toEqual(fastpassFixtures.standard1.endTime);
		expect(component.upsertFastpassForm.controls.nextAvailableTime.value).toEqual(fastpassFixtures.standard1.nextAvailableTime);
	});

	it('should set the form elements to defaults if there is no Input Fastpass', () => {
		// Arrange

		// Act
		fixture.detectChanges();

		// Assert
		expect(component.upsertFastpassForm.controls.ride.value).toEqual('');
		expect(component.upsertFastpassForm.controls.startTime.value).toEqual('');
		expect(component.upsertFastpassForm.controls.endTime.value).toEqual('');
		expect(component.upsertFastpassForm.controls.nextAvailableTime.value).toEqual('');
	});

	it('should label the submit button "Add Fastpass" if there is no Input Fastpass', () => {
		// Arrange

		// Act
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('button[type="submit"]').textContent).toEqual('Add Fastpass');
	});

	it('should label the submit button "Update Fastpass" if there is an Input Fastpass', () => {
		// Arrange
		component.fastpass = fastpassFixtures.standard1;

		// Act
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('button[type="submit"]').textContent).toEqual('Update Fastpass');
	});

	it('should not show the cancel button if there is no Input Fastpass', () => {
		// Arrange

		// Act
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelectorAll('#cancel-edit-fastpass').length).toEqual(0);
	});

	it('should call cancelEditFastpass() when the cancel button is clicked', () => {
		// Arrange
		component.fastpass = fastpassFixtures.standard1;
		spyOn(component, 'cancelEditFastpass');
		fixture.detectChanges();

		// Act
		compiled.querySelector<HTMLButtonElement>('#cancel-edit-fastpass').click();

		// Assert
		expect(component.cancelEditFastpass).toHaveBeenCalled();
	});

	it('should call upsertFastpass() when the submit button is clicked and form is valid', () => {
		// Arrange
		fixture.detectChanges();
		spyOn(component, 'upsertFastpass');
		component.upsertFastpassForm.controls.ride.setValue('Big Thunder Mountain');
		component.upsertFastpassForm.controls.startTime.setValue(new Date('2018-05-27T12:00:00'));
		component.upsertFastpassForm.controls.endTime.setValue(new Date('2018-05-27T12:30:00'));
		component.upsertFastpassForm.controls.nextAvailableTime.setValue(new Date('2018-05-27T14:00:00'));
		fixture.detectChanges();

		// Act
		compiled.querySelector<HTMLButtonElement>('button[type="submit"]').click();

		// Assert
		expect(component.upsertFastpass).toHaveBeenCalled();
	});

	it('should not call upsertFastpass() when the submit button is clicked and form is invalid', () => {
		// Arrange
		fixture.detectChanges();
		spyOn(component, 'upsertFastpass');

		// Act
		compiled.querySelector<HTMLButtonElement>('button[type="submit"]').click();

		// Assert
		expect(component.upsertFastpass).not.toHaveBeenCalled();
	});

	describe('cancelEditFastpass()', () => {
		it('should output cancelEdit with null', () => {
			// Arrange
			fixture.detectChanges();
			spyOn(component.cancelEdit, 'emit');

			// Act
			component.cancelEditFastpass();

			// Assert
			expect(component.cancelEdit.emit).toHaveBeenCalledWith(null);
		});
	});

	describe('upsertFastpass()',  () => {
		beforeEach(() => {
			// Arrange
			fixture.detectChanges();
			spyOn(component.upsert, 'emit');
		});

		it('should output upsertFastpass if form is valid and dirty', () => {
			// Arrange
			jasmine.clock().install();
			jasmine.clock().mockDate(new Date('2018-04-12'));

			component.upsertFastpassForm.controls.ride.setValue(fastpassFixtures.standard1.ride);
			component.upsertFastpassForm.controls.ride.markAsDirty();
			component.upsertFastpassForm.controls.startTime.setValue(fastpassFixtures.standard1.startTime);
			component.upsertFastpassForm.controls.startTime.markAsDirty();
			component.upsertFastpassForm.controls.endTime.setValue(fastpassFixtures.standard1.endTime);
			component.upsertFastpassForm.controls.endTime.markAsDirty();
			component.upsertFastpassForm.controls.nextAvailableTime.setValue(fastpassFixtures.standard1.nextAvailableTime);
			component.upsertFastpassForm.controls.nextAvailableTime.markAsDirty();
			fixture.detectChanges();

			// Act
			component.upsertFastpass();

			// Assert
			expect(component.upsert.emit).toHaveBeenCalledWith(jasmine.objectContaining({
				ride: fastpassFixtures.standard1.ride,
				startTime: fastpassFixtures.standard1.startTime,
				endTime: fastpassFixtures.standard1.endTime,
				nextAvailableTime: fastpassFixtures.standard1.nextAvailableTime
			}));

			jasmine.clock().uninstall();
		});

		it('should output upsertFastpass with Input Fastpass id if form is valid and dirty', () => {
			// Arrange
			jasmine.clock().install();
			jasmine.clock().mockDate(new Date('2018-04-12'));

			component.fastpass = fastpassFixtures.knownId;
			component.upsertFastpassForm.controls.ride.setValue(fastpassFixtures.knownIdUpdated.ride);
			component.upsertFastpassForm.controls.ride.markAsDirty();
			component.upsertFastpassForm.controls.startTime.setValue(fastpassFixtures.knownIdUpdated.startTime);
			component.upsertFastpassForm.controls.startTime.markAsDirty();
			component.upsertFastpassForm.controls.endTime.setValue(fastpassFixtures.knownIdUpdated.endTime);
			component.upsertFastpassForm.controls.endTime.markAsDirty();
			component.upsertFastpassForm.controls.nextAvailableTime.setValue(fastpassFixtures.knownIdUpdated.nextAvailableTime);
			component.upsertFastpassForm.controls.nextAvailableTime.markAsDirty();
			fixture.detectChanges();

			// Act
			component.upsertFastpass();

			// Assert
			expect(component.upsert.emit).toHaveBeenCalledWith(jasmine.objectContaining({
				ride: fastpassFixtures.knownIdUpdated.ride,
				startTime: fastpassFixtures.knownIdUpdated.startTime,
				endTime: fastpassFixtures.knownIdUpdated.endTime,
				nextAvailableTime: fastpassFixtures.knownIdUpdated.nextAvailableTime,
				id: fastpassFixtures.knownId.id
			}));

			jasmine.clock().uninstall();
		});

		it('should not output upsertFastpass if form is invalid', () => {
			// Arrange

			// Act
			component.upsertFastpass();

			// Assert
			expect(component.upsert.emit).not.toHaveBeenCalled();
		});
	});
});
