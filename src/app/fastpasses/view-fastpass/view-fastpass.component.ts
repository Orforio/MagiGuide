import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Fastpass } from '../fastpass.model';

@Component({
	selector: 'mg-view-fastpass',
	templateUrl: './view-fastpass.component.html',
	styleUrls: ['./view-fastpass.component.scss']
})
export class ViewFastpassComponent {
	@Input() public fastpass: Fastpass;
	@Output() public edit = new EventEmitter<string>();
	@Output() public remove = new EventEmitter<Fastpass>();

	constructor() {}

	public editFastpass(): void {
		this.edit.emit(this.fastpass.id);
	}

	public removeFastpass(): void {
		this.remove.emit(this.fastpass);
	}
}
