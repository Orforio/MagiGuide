import { AttractionSchedule } from './attraction-schedule.model';
import { Parks } from '../common';

export class Attraction {
	public fastpassEnabled: boolean;
	public id: string;
	public name: string;
	public park: Parks;
	public schedule: AttractionSchedule;
	public updated: Date;
}
