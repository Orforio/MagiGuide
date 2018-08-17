import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment';
import { FastpassesComponent } from './fastpasses/fastpasses.component';
import { FastpassComponent } from './fastpasses/fastpass/fastpass.component';

@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		FastpassComponent,
		FastpassesComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		NgbModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
