import { HttpClient } from '@angular/common/http';
import { of as observableOf } from 'rxjs';

import { AttractionsService } from './attractions.service';
import { APIAttraction } from './api-attraction.interface';
import { Attraction } from './attraction.model';
import { Parks } from '../common';

describe('AttractionsService', () => {
	let httpMock: jasmine.SpyObj<HttpClient>;
	let service: AttractionsService;

	beforeEach(() => {
		httpMock = jasmine.createSpyObj('HttpClient', ['get']);
		service = new AttractionsService(httpMock);
	});

	it('should be created', () => {
		// Assert
		expect(service).toBeTruthy();
	});

	describe('getAttractions()', () => {
		it('should retrieve an array of attractions for the requested park', () => {
			// Arrange
			const mockAttractions: APIAttraction[] = [
				{
					id: 'TEST01',
					name: 'Test Attraction 01',
					fastpassEnabled: true,
					schedule: {
						openingTime: new Date(),
						closingTime: new Date()
					},
					updated: new Date()
				},
				{
					id: 'TEST02',
					name: 'Test Attraction 02',
					fastpassEnabled: false,
					schedule: {
						openingTime: new Date(),
						closingTime: new Date()
					},
					updated: new Date()
				}
			];
			const expectedAttractions: Attraction[] = [
				{
					...mockAttractions[0],
					park: Parks.WaltDisneyStudios
				},
				{
					...mockAttractions[1],
					park: Parks.WaltDisneyStudios
				}
			];
			httpMock.get.and.returnValue(observableOf(mockAttractions));

			// Act
			// Assert
			service.getAttractions(Parks.WaltDisneyStudios).subscribe(
				result => {
					expect(httpMock.get).toHaveBeenCalledWith('/api/parks/dlp-wds/attractions');
					expect(result).toEqual(expectedAttractions);
				},
				() => fail('Expected success')
			);
		});
	});
});
