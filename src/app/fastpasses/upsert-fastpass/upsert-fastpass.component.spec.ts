import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UpsertFastpassComponent } from './upsert-fastpass.component';
import { Fastpass } from '../fastpass.model';

describe('UpsertFastpassComponent', () => {
	let compiled: HTMLElement;
	let component: UpsertFastpassComponent;
	let fixture: ComponentFixture<UpsertFastpassComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UpsertFastpassComponent],
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

	it('should set the form elements to the values of the Input Fastpass', () => {
		// Arrange
		const inputFastpass = new Fastpass(
			'Star Tours',
			new Date('2018-05-27T11:25:00'),
			new Date('2018-05-27T11:55:00'),
			new Date('2018-05-27T13:10:00')
		);
		component.fastpass = inputFastpass;

		// Act
		fixture.detectChanges();

		// Assert
		expect(component.upsertFastpassForm.controls.ride.value).toEqual('Star Tours');
		expect(component.upsertFastpassForm.controls.startTime.value).toEqual(new Date('2018-05-27T11:25:00'));
		expect(component.upsertFastpassForm.controls.endTime.value).toEqual(new Date('2018-05-27T11:55:00'));
		expect(component.upsertFastpassForm.controls.nextAvailableTime.value).toEqual(new Date('2018-05-27T13:10:00'));
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

	it('should label the submit button "Add FastPass" if there is no Input Fastpass', () => {
		// Arrange

		// Act
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('#submitUpsertFastpass').textContent).toEqual('Add FastPass');
	});

	it('should label the submit button "Update FastPass" if there is an Input Fastpass', () => {
		// Arrange
		const inputFastpass = new Fastpass(
			'Star Tours',
			new Date('2018-05-27T11:25:00'),
			new Date('2018-05-27T11:55:00'),
			new Date('2018-05-27T13:10:00')
		);
		component.fastpass = inputFastpass;

		// Act
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelector('#submitUpsertFastpass').textContent).toEqual('Update FastPass');
	});

	it('should not show the cancel button if there is no Input Fastpass', () => {
		// Arrange

		// Act
		fixture.detectChanges();

		// Assert
		expect(compiled.querySelectorAll('#cancelEditFastpass').length).toEqual(0);
	});

	it('should call cancelEditFastpass() when the cancel button is clicked', () => {
		// Arrange
		const inputFastpass = new Fastpass(
			'Star Tours',
			new Date('2018-05-27T11:25:00'),
			new Date('2018-05-27T11:55:00'),
			new Date('2018-05-27T13:10:00')
		);
		component.fastpass = inputFastpass;
		spyOn(component, 'cancelEditFastpass');
		fixture.detectChanges();

		// Act
		compiled.querySelector<HTMLButtonElement>('#cancelEditFastpass').click();

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
		compiled.querySelector<HTMLButtonElement>('#submitUpsertFastpass').click();

		// Assert
		expect(component.upsertFastpass).toHaveBeenCalled();
	});

	it('should not call upsertFastpass() when the submit button is clicked and form is invalid', () => {
		// Arrange
		fixture.detectChanges();
		spyOn(component, 'upsertFastpass');

		// Act
		compiled.querySelector<HTMLButtonElement>('#submitUpsertFastpass').click();

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
			jasmine.clock().mockDate(new Date('2018-05-27'));

			const newFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date('2018-05-27T12:00:00'),
				new Date('2018-05-27T12:30:00'),
				new Date('2018-05-27T14:00:00')
			);
			component.upsertFastpassForm.controls.ride.setValue('Big Thunder Mountain');
			component.upsertFastpassForm.controls.ride.markAsDirty();
			component.upsertFastpassForm.controls.startTime.setValue(new Date('2018-05-27T12:00:00'));
			component.upsertFastpassForm.controls.startTime.markAsDirty();
			component.upsertFastpassForm.controls.endTime.setValue(new Date('2018-05-27T12:30:00'));
			component.upsertFastpassForm.controls.endTime.markAsDirty();
			component.upsertFastpassForm.controls.nextAvailableTime.setValue(new Date('2018-05-27T14:00:00'));
			component.upsertFastpassForm.controls.nextAvailableTime.markAsDirty();
			fixture.detectChanges();

			// Act
			component.upsertFastpass();

			// Assert
			expect(component.upsert.emit).toHaveBeenCalledWith(jasmine.objectContaining({
				ride: newFastpass.ride,
				startTime: newFastpass.startTime,
				endTime: newFastpass.endTime,
				nextAvailableTime: newFastpass.nextAvailableTime
			}));

			jasmine.clock().uninstall();
		});

		it('should output upsertFastpass with Input Fastpass id if form is valid and dirty', () => {
			// Arrange
			jasmine.clock().install();
			jasmine.clock().mockDate(new Date('2018-05-27'));

			const inputFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date('2018-05-27T12:00:00'),
				new Date('2018-05-27T12:30:00'),
				new Date('2018-05-27T14:00:00')
			);
			const modifiedFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date('2018-05-27T13:00:00'),
				new Date('2018-05-27T13:30:00'),
				new Date('2018-05-27T14:00:00'),
				inputFastpass.id
			);
			component.fastpass = inputFastpass;
			component.upsertFastpassForm.controls.ride.setValue('Big Thunder Mountain');
			component.upsertFastpassForm.controls.ride.markAsDirty();
			component.upsertFastpassForm.controls.startTime.setValue(new Date('2018-05-27T13:00:00'));
			component.upsertFastpassForm.controls.startTime.markAsDirty();
			component.upsertFastpassForm.controls.endTime.setValue(new Date('2018-05-27T13:30:00'));
			component.upsertFastpassForm.controls.endTime.markAsDirty();
			component.upsertFastpassForm.controls.nextAvailableTime.setValue(new Date('2018-05-27T14:00:00'));
			component.upsertFastpassForm.controls.nextAvailableTime.markAsDirty();
			fixture.detectChanges();

			// Act
			component.upsertFastpass();

			// Assert
			expect(component.upsert.emit).toHaveBeenCalledWith(jasmine.objectContaining({
				ride: modifiedFastpass.ride,
				startTime: modifiedFastpass.startTime,
				endTime: modifiedFastpass.endTime,
				nextAvailableTime: modifiedFastpass.nextAvailableTime,
				id: inputFastpass.id
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
