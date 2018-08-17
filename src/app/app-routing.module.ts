import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FastpassesComponent } from './fastpasses/fastpasses.component';

const routes: Routes = [
	{ path: 'fastpasses', component: FastpassesComponent },
	{ path: '', component: DashboardComponent },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
