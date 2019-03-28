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
	constructor(private attractions: AttractionsService) {}

	public ngOnInit(): void {}
}
