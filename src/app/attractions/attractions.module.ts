import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsComponent } from './attractions.component';

@NgModule({
	declarations: [AttractionsComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		AttractionsRoutingModule
	]
})
export class AttractionsModule {}
