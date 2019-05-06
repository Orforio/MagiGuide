import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { fastpassFixtures } from '../fastpass.fixtures';
import { ViewFastpassComponent } from './view-fastpass.component';

describe('ViewFastpassComponent', () => {
	let compiled: HTMLElement;
	let component: ViewFastpassComponent;
	let fixture: ComponentFixture<ViewFastpassComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ViewFastpassComponent],
			imports: [FontAwesomeModule]
		})
		.compileComponents();

		library.add(faEdit, faTrashAlt);
	}));

	beforeEach(() => {
		// Arrange
		fixture = TestBed.createComponent(ViewFastpassComponent);
		component = fixture.componentInstance;

		component.fastpass = fastpassFixtures.standard1;

		// Act
		fixture.detectChanges();
		compiled = fixture.debugElement.nativeElement;
	});

	it('should create', () => {
		// Assert
		expect(component).toBeTruthy();
	});

	it('should display the ride name', () => {
		// Assert
		expect(compiled.querySelector('.attraction-name').textContent).toContain('Attraction 01');
	});

	it('should display the start time in 24H format', () => {
		// Assert
		expect(compiled.querySelector('.start-time').textContent).toContain('10:25');
	});

	it('should display the end time in 24H format', () => {
		// Assert
		expect(compiled.querySelector('.end-time').textContent).toContain('10:55');
	});

	it('should call editFastpass() when the Edit button is clicked', () => {
		// Arrange
		component.edit.subscribe();
		spyOn(component, 'editFastpass');
		component.ngOnInit();
		fixture.detectChanges();

		// Act
		compiled.querySelector<HTMLButtonElement>('.edit-fastpass').click();

		// Assert
		expect(component.editFastpass).toHaveBeenCalled();
	});

	it('should not display the Edit button if no edit Output was supplied', () => {
		// Assert
		expect(compiled.querySelectorAll('.edit-fastpass').length).toBe(0);
	});

	it('should call removeFastpass() when the Remove button is clicked', () => {
		// Arrange
		component.remove.subscribe();
		spyOn(component, 'removeFastpass');
		component.ngOnInit();
		fixture.detectChanges();

		// Act
		compiled.querySelector<HTMLButtonElement>('.remove-fastpass').click();

		// Assert
		expect(component.removeFastpass).toHaveBeenCalled();
	});

	it('should not display the Remove button if no remove Output was supplied', () => {
		// Assert
		expect(compiled.querySelectorAll('.remove-fastpass').length).toBe(0);
	});

	describe('editFastpass()', () => {
		it('should emit edit with the fastpass id', () => {
			// Arrange
			spyOn(component.edit, 'emit');

			// Act
			component.editFastpass();

			// Assert
			expect(component.edit.emit).toHaveBeenCalledWith(component.fastpass.id);
		});
	});

	describe('removeFastpass()', () => {
		it('should emit remove with the fastpass', () => {
			// Arrange
			spyOn(component.remove, 'emit');

			// Act
			component.removeFastpass();

			// Assert
			expect(component.remove.emit).toHaveBeenCalledWith(component.fastpass);
		});
	});
});
