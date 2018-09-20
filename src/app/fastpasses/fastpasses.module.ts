import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FastpassesRoutingModule } from './fastpasses-routing.module';
import { AddFastpassComponent } from './add-fastpass/add-fastpass.component';
import { FastpassComponent } from './fastpass/fastpass.component';
import { FastpassesComponent } from './fastpasses.component';
import { FastpassEffects } from './state/fastpass.effects';
import { reducer } from './state/fastpass.reducer';

@NgModule({
	declarations: [
		AddFastpassComponent,
		FastpassComponent,
		FastpassesComponent
	],
	imports: [
		CommonModule,
		EffectsModule.forFeature([ FastpassEffects ]),
		FormsModule,
		NgbModule,
		StoreModule.forFeature('fastpasses', reducer),
		FastpassesRoutingModule
	]
})
export class FastpassesModule { }
