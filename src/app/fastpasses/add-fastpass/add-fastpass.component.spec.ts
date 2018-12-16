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

	describe('submitAddFastpass()',  () => {
		beforeEach(() => {
			spyOn(component, 'addFastpass');
		});

		it('should output addFastpass if form is valid and dirty', () => {
			// Arrange
			const newFastpass = new Fastpass(
				'Big Thunder Mountain',
				new Date(null, null, null, 12, 0, 0, 0),
				new Date(null, null, null, 12, 30, 0, 0),
				new Date(null, null, null, 13, 0, 0)
			);
			component.addFastpassForm.controls['ride'].setValue('Big Thunder Mountain');
			component.addFastpassForm.controls['startTime'].setValue({ hour: 12, minute: 0, second: 0 });
			component.addFastpassForm.controls['endTime'].setValue({ hour: 12, minute: 30, second: 0 });
			component.addFastpassForm.controls['nextAvailableTime'].setValue({ hour: 14, minute: 0, second: 0 });

			// Act
			component.submitAddFastpass();

			// Assert
			expect(component.addFastpass).toHaveBeenCalledWith(newFastpass);
		});

		it('should not output addFastpass if form is invalid', () => {
			// Arrange

			// Act
			component.submitAddFastpass();

			// Assert
			expect(component.addFastpass).not.toHaveBeenCalled();
		});
	});
});
