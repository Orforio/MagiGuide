import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { FastpassRoutingModule } from './fastpass-routing.module';
import { FastpassComponent } from './fastpass.component';
import { UpsertFastpassComponent } from './upsert-fastpass/upsert-fastpass.component';
import { ViewFastpassComponent } from './view-fastpass/view-fastpass.component';
import { DateTimeService } from '../common/date-time.service';
import { fastpassReducer } from './state/fastpass.reducer';

@NgModule({
	declarations: [
		FastpassComponent,
		UpsertFastpassComponent,
		ViewFastpassComponent
	],
	imports: [
		CommonModule,
		FastpassRoutingModule,
		FontAwesomeModule,
		NgbModule,
		ReactiveFormsModule,
		StoreModule.forFeature('fastpasses', fastpassReducer),
	],
	providers: [DateTimeService]
})
export class FastpassModule {
	constructor() {}
}
