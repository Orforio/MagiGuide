import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsComponent } from './attractions.component';

@NgModule({
	declarations: [AttractionsComponent],
	imports: [
		CommonModule,
		AttractionsRoutingModule
	]
})
export class AttractionsModule {}
