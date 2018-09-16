import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment';
import { FastpassesComponent } from './fastpasses/fastpasses.component';
import { FastpassComponent } from './fastpasses/fastpass/fastpass.component';
import { AddFastpassComponent } from './fastpasses/add-fastpass/add-fastpass.component';

@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		FastpassComponent,
		FastpassesComponent,
		AddFastpassComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		NgbModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
