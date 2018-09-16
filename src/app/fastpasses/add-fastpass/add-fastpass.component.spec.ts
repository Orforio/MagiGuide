import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AddFastpassComponent } from './add-fastpass.component';

describe('AddFastpassComponent', () => {
	let component: AddFastpassComponent;
	let fixture: ComponentFixture<AddFastpassComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddFastpassComponent],
			imports: [FormsModule, NgbModule]
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
});
