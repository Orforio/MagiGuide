import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Fastpass } from '../fastpass.model';

@Component({
	selector: 'mg-add-fastpass',
	styleUrls: ['./add-fastpass.component.scss'],
	templateUrl: './add-fastpass.component.html'
})
export class AddFastpassComponent implements OnInit {
	public addFastpassForm = this.formBuilder.group({
		ride: ['', Validators.required],
		startTime: ['', Validators.required],
		endTime: ['', Validators.required],
		nextAvailableTime: ['', Validators.required]
	});
	@Output() public add = new EventEmitter<Fastpass>();

	constructor(private formBuilder: FormBuilder) {}

	public ngOnInit(): void {
	}

	public addFastpass(): void {
		if (this.addFastpassForm.valid && this.addFastpassForm.dirty) {
			this.add.emit(new Fastpass(
				this.addFastpassForm.value.ride,
				this.addFastpassForm.value.startTime,
				this.addFastpassForm.value.endTime,
				this.addFastpassForm.value.nextAvailableTime
			));
		}
	}
}
