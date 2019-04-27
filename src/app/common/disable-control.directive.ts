import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
	selector: '[mgDisableControl]'
})
export class DisableControlDirective {
	@Input() set mgDisableControl(condition: boolean) {
		const action = condition ? 'disable' : 'enable';
		this.ngControl.control[action]();
	}

	constructor(private ngControl: NgControl) {}
}
