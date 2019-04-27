import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsComponent } from './attractions.component';
import { AttractionsService } from './attractions.service';
import * as fromAttractions from './state/attractions.reducer';
import { AttractionsEffects } from './state/attractions.effects';
import { DateTimeService } from '../common';

@NgModule({
	declarations: [AttractionsComponent],
	imports: [
		CommonModule,
		EffectsModule.forFeature([AttractionsEffects]),
		HttpClientModule,
		StoreModule.forFeature('attractions', fromAttractions.attractionsReducer),
		AttractionsRoutingModule
	],
	providers: [
		AttractionsService,
		DateTimeService
	]
})
export class AttractionsModule {}
