import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FastpassesComponent } from './fastpasses.component';
import { AddFastpassComponent } from './add-fastpass/add-fastpass.component';

const routes: Routes = [
	{ path: 'add', component: AddFastpassComponent },
	{ path: '', component: FastpassesComponent }
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forChild(routes) ]
})
export class FastpassesRoutingModule { }
