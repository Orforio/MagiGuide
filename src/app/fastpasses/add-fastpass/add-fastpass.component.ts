import { Component, OnInit } from '@angular/core';

@Component({
	templateUrl: './add-fastpass.component.html',
	styleUrls: ['./add-fastpass.component.scss']
})
export class AddFastpassComponent implements OnInit {
	public startTime = {
		hour: 13,
		minute: 20
	};
	public endTime = {
		hour: 13,
		minute: 50
	};
	public nextAvailableTime = {
		hour: 15,
		minute: 20
	};

	constructor() { }

	ngOnInit() {
	}

}
