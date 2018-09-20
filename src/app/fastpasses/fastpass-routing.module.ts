import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FastpassComponent } from './fastpass.component';
import { AddFastpassComponent } from './add-fastpass/add-fastpass.component';

const routes: Routes = [
	{ path: 'add', component: AddFastpassComponent },
	{ path: '', component: FastpassComponent }
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forChild(routes) ]
})
export class FastpassRoutingModule { }
