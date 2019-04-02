import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AttractionsService {
	constructor(private http: HttpClient) {}

	testApi() {
		return this.http.get('/api/attractions/waittimes/dlp');
	}
}
