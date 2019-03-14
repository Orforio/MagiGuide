import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UpsertFastpassComponent } from './upsert-fastpass.component';
import { Fastpass } from '../fastpass.model';

describe('UpsertFastpassComponent', () => {
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
		fixture = TestBed.createComponent(UpsertFastpassComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('upsertFastpass()',  () => {
		beforeEach(() => {
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
			component.upsertFastpassForm.controls.startTime.setValue({ hour: 12, minute: 0, second: 0 });
			component.upsertFastpassForm.controls.startTime.markAsDirty();
			component.upsertFastpassForm.controls.endTime.setValue({ hour: 12, minute: 30, second: 0 });
			component.upsertFastpassForm.controls.endTime.markAsDirty();
			component.upsertFastpassForm.controls.nextAvailableTime.setValue({ hour: 14, minute: 0, second: 0 });
			component.upsertFastpassForm.controls.nextAvailableTime.markAsDirty();

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

		it('should not output upsertFastpass if form is invalid', () => {
			// Arrange

			// Act
			component.upsertFastpass();

			// Assert
			expect(component.upsert.emit).not.toHaveBeenCalled();
		});
	});
});
