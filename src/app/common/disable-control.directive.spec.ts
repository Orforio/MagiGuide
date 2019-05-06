import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DisableControlDirective } from './disable-control.directive';

@Component({
	template: `<form [formGroup]="testGroup">
		<input type="text" formControlName="testControlEnabled" id="testControlEnabled" [mgDisableControl]="false">
		<input type="text" formControlName="testControlDisabled" id="testControlDisabled" [mgDisableControl]="true">
	</form>`
})
class DisableControlStubComponent {
	public testGroup = new FormGroup({
		testControlEnabled: new FormControl(['']),
		testControlDisabled: new FormControl([''])
	});
}

describe('DisableControlDirective', () => {
	let compiled: HTMLElement;
	let component: DisableControlStubComponent;
	let fixture: ComponentFixture<DisableControlStubComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule
			],
			declarations: [
				DisableControlDirective,
				DisableControlStubComponent
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DisableControlStubComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		compiled = fixture.debugElement.nativeElement;
	});

	it('should set the form element to disabled when condition is true', () => {
		// Assert
		expect(compiled.querySelector<HTMLInputElement>('#testControlDisabled').disabled).toBe(true);
	});

	it('should set the form element to enabled when condition is false', () => {
		// Assert
		expect(compiled.querySelector<HTMLInputElement>('#testControlEnabled').disabled).toBe(false);
	});
});
