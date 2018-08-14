import { Component, OnInit } from '@angular/core';

import { Fastpass } from './fastpass/fastpass.model';
import { FastpassesService } from './fastpasses.service';

@Component({
	selector: 'mg-fastpasses',
	templateUrl: './fastpasses.component.html',
	styleUrls: ['./fastpasses.component.scss']
})
export class FastpassesComponent implements OnInit {
	public fastpasses: Fastpass[];

	constructor(private fastpassesService: FastpassesService) { }

	ngOnInit() {
		this.fastpassesService.get()
			.subscribe((fastpasses) => {
				this.fastpasses = fastpasses;
			});
	}

}
