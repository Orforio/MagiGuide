import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment';

@NgModule({
	bootstrap: [ AppComponent ],
	declarations: [
		AppComponent,
		DashboardComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		NgbModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
	],
	providers: []
})
export class AppModule { }
