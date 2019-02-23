import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { FastpassRoutingModule } from './fastpass-routing.module';
import { AddFastpassComponent } from './add-fastpass/add-fastpass.component';
import { FastpassComponent } from './fastpass.component';
import { ViewFastpassComponent } from './view-fastpass/view-fastpass.component';
import { fastpassReducer } from './state/fastpass.reducer';

@NgModule({
	declarations: [
		AddFastpassComponent,
		FastpassComponent,
		ViewFastpassComponent
	],
	imports: [
		CommonModule,
		FastpassRoutingModule,
		FontAwesomeModule,
		NgbModule,
		ReactiveFormsModule,
		StoreModule.forFeature('fastpasses', fastpassReducer),
	]
})
export class FastpassModule {
	constructor() {}
}
