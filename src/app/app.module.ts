import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons';
import { faClock, faTicketAlt, faTrashAlt, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { GlobalObjectService } from './common/global-object.service';
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
		AppRoutingModule,
		BrowserModule,
		EffectsModule.forRoot([]),
		FontAwesomeModule,
		NgbModule,
		ReactiveFormsModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
		StoreModule.forRoot(reducers, { metaReducers }),
		!environment.production ? StoreDevtoolsModule.instrument({
			name: 'MagiGuide'
		}) : []
	],
	providers: [GlobalObjectService]
})
export class AppModule {
	constructor() {
		library.add(faClock, faFortAwesome, faTicketAlt, faTrashAlt, faUserCog);
	}
}
