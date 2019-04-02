import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AttractionsService } from './attractions.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AttractionsService],
	selector: 'mg-attractions',
	styleUrls: ['./attractions.component.scss'],
	templateUrl: './attractions.component.html'
})
export class AttractionsComponent implements OnInit {
	public attractions;

	constructor(private attractionsService: AttractionsService) {}

	public ngOnInit(): void {
		this.attractions = this.attractionsService.testApi();
	}
}
