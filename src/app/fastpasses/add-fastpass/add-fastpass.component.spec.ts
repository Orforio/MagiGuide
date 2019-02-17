import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AddFastpassComponent } from './add-fastpass.component';
import { Fastpass } from '../fastpass.model';

describe('AddFastpassComponent', () => {
	let component: AddFastpassComponent;
	let fixture: ComponentFixture<AddFastpassComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddFastpassComponent],
			imports: [
				ReactiveFormsModule,
				NgbModule
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddFastpassComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('addFastpass()',  () => {
		beforeEach(() => {
			spyOn(component.add, 'emit');
		});

		it('should output addFastpass if form is valid and dirty', () => {
			// Arrange
			jasmine.clock().install();
			jasmine.clock().mockDate(new Date('2018-05-27'));

			const newFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date('2018-05-27T12:00:00'),
				new Date('2018-05-27T12:30:00'),
				new Date('2018-05-27T14:00:00')
			);
			component.addFastpassForm.controls['ride'].setValue('Big Thunder Mountain');
			component.addFastpassForm.controls['ride'].markAsDirty();
			component.addFastpassForm.controls['startTime'].setValue({ hour: 12, minute: 0, second: 0 });
			component.addFastpassForm.controls['startTime'].markAsDirty();
			component.addFastpassForm.controls['endTime'].setValue({ hour: 12, minute: 30, second: 0 });
			component.addFastpassForm.controls['endTime'].markAsDirty();
			component.addFastpassForm.controls['nextAvailableTime'].setValue({ hour: 14, minute: 0, second: 0 });
			component.addFastpassForm.controls['nextAvailableTime'].markAsDirty();

			// Act
			component.addFastpass();

			// Assert
			expect(component.add.emit).toHaveBeenCalledWith(jasmine.objectContaining({
				ride: newFastpass.ride,
				startTime: newFastpass.startTime,
				endTime: newFastpass.endTime,
				nextAvailableTime: newFastpass.nextAvailableTime
			}));

			jasmine.clock().uninstall();
		});

		it('should not output addFastpass if form is invalid', () => {
			// Arrange

			// Act
			component.addFastpass();

			// Assert
			expect(component.add.emit).not.toHaveBeenCalled();
		});
	});
});
