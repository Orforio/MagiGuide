import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsComponent } from './attractions.component';
import * as fromAttractions from './state/attractions.reducer';
import { AttractionsEffects } from './state/attractions.effects';

@NgModule({
	declarations: [AttractionsComponent],
	imports: [
		CommonModule,
		EffectsModule.forFeature([AttractionsEffects]),
		HttpClientModule,
		StoreModule.forFeature('attractions', fromAttractions.reducer),
		AttractionsRoutingModule
	]
})
export class AttractionsModule {}
