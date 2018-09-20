import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FastpassRoutingModule } from './fastpass-routing.module';
import { AddFastpassComponent } from './add-fastpass/add-fastpass.component';
import { FastpassComponent } from './fastpass.component';
import { ViewFastpassComponent } from './view-fastpass/view-fastpass.component';
import { FastpassEffects } from './state/fastpass.effects';
import { reducer } from './state/fastpass.reducer';

@NgModule({
	declarations: [
		AddFastpassComponent,
		FastpassComponent,
		ViewFastpassComponent
	],
	imports: [
		CommonModule,
		EffectsModule.forFeature([ FastpassEffects ]),
		FormsModule,
		NgbModule,
		StoreModule.forFeature('fastpasses', reducer),
		FastpassRoutingModule
	]
})
export class FastpassModule { }
