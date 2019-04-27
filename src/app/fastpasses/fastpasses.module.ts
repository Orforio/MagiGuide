import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { AttractionsModule } from '../attractions/attractions.module';
import { FastpassesRoutingModule } from './fastpasses-routing.module';
import { FastpassesComponent } from './fastpasses.component';
import { UpsertFastpassComponent } from './upsert-fastpass/upsert-fastpass.component';
import { ViewFastpassComponent } from './view-fastpass/view-fastpass.component';
import { fastpassReducer } from './state/fastpass.reducer';
import { DateTimeService, DisableControlDirective } from '../common';

@NgModule({
	declarations: [
		FastpassesComponent,
		UpsertFastpassComponent,
		ViewFastpassComponent,
		DisableControlDirective
	],
	exports: [ViewFastpassComponent],
	imports: [
		AttractionsModule,
		CommonModule,
		FontAwesomeModule,
		NgbModule,
		ReactiveFormsModule,
		StoreModule.forFeature('fastpasses', fastpassReducer),
		FastpassesRoutingModule
	],
	providers: [DateTimeService]
})
export class FastpassesModule {
	constructor() {}
}
