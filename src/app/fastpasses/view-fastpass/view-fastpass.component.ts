import { Component, Input, OnInit } from '@angular/core';

import { Fastpass } from '../fastpass.model';

@Component({
	selector: 'mg-view-fastpass',
	templateUrl: './view-fastpass.component.html',
	styleUrls: ['./view-fastpass.component.scss']
})
export class ViewFastpassComponent implements OnInit {
	@Input() public fastpass: Fastpass;

	constructor() { }

	ngOnInit() {
	}
}
