import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons';
import { faClock, faEdit, faTicketAlt, faTrashAlt, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { NgbModule, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AttractionsModule } from './attractions/attractions.module';
import { FastpassesModule } from './fastpasses/fastpasses.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { DateTimeService, GlobalObjectService, NgbTimeDateAdapter } from './common';
import { environment } from '../environments/environment';
import { metaReducers, reducers } from './state';

@NgModule({
	bootstrap: [ AppComponent ],
	declarations: [
		AppComponent,
		DashboardComponent,
		SettingsComponent
	],
	imports: [
		AttractionsModule,
		FastpassesModule,
		BrowserModule,
		EffectsModule.forRoot([]),
		FontAwesomeModule,
		NgbModule,
		ReactiveFormsModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
		StoreModule.forRoot(reducers, { metaReducers }),
		!environment.production ? StoreDevtoolsModule.instrument({
			name: 'MagiGuide'
		}) : [],
		AppRoutingModule
	],
	providers: [
		DateTimeService,
		GlobalObjectService,
		{ provide: NgbTimeAdapter, useClass: NgbTimeDateAdapter }
	]
})
export class AppModule {
	constructor() {
		library.add(faClock, faEdit, faFortAwesome, faTicketAlt, faTrashAlt, faUserCog);
	}
}
