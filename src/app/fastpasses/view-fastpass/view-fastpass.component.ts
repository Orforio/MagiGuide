import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Fastpass } from '../fastpass.model';

@Component({
	selector: 'mg-view-fastpass',
	templateUrl: './view-fastpass.component.html',
	styleUrls: ['./view-fastpass.component.scss']
})
export class ViewFastpassComponent {
	@Input() public fastpass: Fastpass;
	@Output() public remove = new EventEmitter<Fastpass>();

	constructor() {}

	public removeFastpass(): void {
		this.remove.emit(this.fastpass);
	}
}
