import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { FastpassesRoutingModule } from './fastpasses-routing.module';
import { FastpassesComponent } from './fastpasses.component';
import { UpsertFastpassComponent } from './upsert-fastpass/upsert-fastpass.component';
import { ViewFastpassComponent } from './view-fastpass/view-fastpass.component';
import { DateTimeService } from '../common/date-time.service';
import { fastpassReducer } from './state/fastpass.reducer';

@NgModule({
	declarations: [
		FastpassesComponent,
		UpsertFastpassComponent,
		ViewFastpassComponent
	],
	exports: [ViewFastpassComponent],
	imports: [
		CommonModule,
		FastpassesRoutingModule,
		FontAwesomeModule,
		NgbModule,
		ReactiveFormsModule,
		StoreModule.forFeature('fastpasses', fastpassReducer),
	],
	providers: [DateTimeService]
})
export class FastpassesModule {
	constructor() {}
}
