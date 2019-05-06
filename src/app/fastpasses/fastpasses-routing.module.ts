import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FastpassesComponent } from './fastpasses.component';

const routes: Routes = [
	{ path: 'fastpasses', component: FastpassesComponent }
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class FastpassesRoutingModule {}
