import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FastpassesRoutingModule } from './fastpasses-routing.module';
import { AddFastpassComponent } from './add-fastpass/add-fastpass.component';
import { FastpassComponent } from './fastpass/fastpass.component';
import { FastpassesComponent } from './fastpasses.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [
		AddFastpassComponent,
		FastpassComponent,
		FastpassesComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		FastpassesRoutingModule
	],
	providers: []
})
export class FastpassesModule { }
