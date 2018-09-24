import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AddFastpassComponent } from './add-fastpass.component';

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
});
