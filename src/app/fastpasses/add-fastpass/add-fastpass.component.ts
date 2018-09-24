import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

	constructor(private formBuilder: FormBuilder) { }

	public ngOnInit(): void {
	}

	public onSubmit(): void {
		console.warn(this.addFastpassForm.value);
	}
}
