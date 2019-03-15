import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Fastpass } from '../fastpass.model';

@Component({
	selector: 'mg-upsert-fastpass',
	styleUrls: ['./upsert-fastpass.component.scss'],
	templateUrl: './upsert-fastpass.component.html'
})
export class UpsertFastpassComponent implements OnInit {
	public upsertFastpassForm = this.formBuilder.group({
		ride: ['', Validators.required],
		startTime: ['', Validators.required],
		endTime: ['', Validators.required],
		nextAvailableTime: ['', Validators.required]
	});
	@Input() public fastpass: Fastpass;
	@Output() public cancelEdit = new EventEmitter<null>();
	@Output() public upsert = new EventEmitter<Fastpass>();

	constructor(private formBuilder: FormBuilder) {}

	public ngOnInit(): void {
		if (this.fastpass) {
			this.upsertFastpassForm.patchValue(this.fastpass);
		}
	}

	public cancelEditFastpass(): void {
		this.cancelEdit.emit(null);
	}

	public upsertFastpass(): void {
		if (this.upsertFastpassForm.valid && this.upsertFastpassForm.dirty) {
			this.upsert.emit(new Fastpass(
				this.upsertFastpassForm.value.ride,
				this.upsertFastpassForm.value.startTime,
				this.upsertFastpassForm.value.endTime,
				this.upsertFastpassForm.value.nextAvailableTime,
				this.fastpass && this.fastpass.id
			));
		}
	}
}
