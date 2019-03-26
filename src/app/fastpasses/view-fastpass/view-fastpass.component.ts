import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Fastpass } from '../fastpass.model';

@Component({
	selector: 'mg-view-fastpass',
	templateUrl: './view-fastpass.component.html',
	styleUrls: ['./view-fastpass.component.scss']
})
export class ViewFastpassComponent implements OnInit {
	public showEdit = false;
	public showRemove = false;
	@Input() public fastpass: Fastpass;
	@Output() public edit = new EventEmitter<string>();
	@Output() public remove = new EventEmitter<Fastpass>();

	constructor() {}

	public ngOnInit(): void {
		this.showEdit = this.edit.observers.length > 0;
		this.showRemove = this.remove.observers.length > 0;
	}

	public editFastpass(): void {
		this.edit.emit(this.fastpass.id);
	}

	public removeFastpass(): void {
		this.remove.emit(this.fastpass);
	}
}
