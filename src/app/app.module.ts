import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment';
import { metaReducers, reducers } from './state';

@NgModule({
	bootstrap: [ AppComponent ],
	declarations: [
		AppComponent,
		DashboardComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		EffectsModule.forRoot([]),
		NgbModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
		StoreModule.forRoot(reducers, { metaReducers }),
		!environment.production ? StoreDevtoolsModule.instrument({
			name: 'MagiGuide'
		}) : []
	],
	providers: []
})
export class AppModule { }
