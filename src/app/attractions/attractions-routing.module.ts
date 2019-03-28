import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttractionsComponent } from './attractions.component';

const routes: Routes = [
	{ path: 'attractions', component: AttractionsComponent }
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)],
})
export class AttractionsRoutingModule {}
