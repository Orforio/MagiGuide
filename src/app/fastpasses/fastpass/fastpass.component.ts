import { Component, Input, OnInit } from '@angular/core';

import { Fastpass } from './fastpass.model';

@Component({
	selector: 'mg-fastpass',
	templateUrl: './fastpass.component.html',
	styleUrls: ['./fastpass.component.scss']
})
export class FastpassComponent implements OnInit {
	@Input() public fastpass: Fastpass;

	constructor() { }

	ngOnInit() {
	}
}
