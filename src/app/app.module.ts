import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FastpassesComponent } from './fastpasses/fastpasses.component';
import { FastpassComponent } from './fastpasses/fastpass/fastpass.component';

@NgModule({
	declarations: [
		AppComponent,
		FastpassesComponent,
		FastpassComponent
	],
	imports: [
		BrowserModule,
		NgbModule.forRoot(),
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
