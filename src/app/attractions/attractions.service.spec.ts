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
						openingTime: '1992-04-12T10:00:00Z',
						closingTime: '1992-04-12T22:00:00Z'
					},
					updated: '1992-04-12T14:30:00Z'
				},
				{
					id: 'TEST02',
					name: 'Test Attraction 02',
					fastpassEnabled: false,
					schedule: {
						openingTime: '1992-04-12T09:00:00Z',
						closingTime: '1992-04-12T21:00:00Z'
					},
					updated: '1992-04-12T14:30:00Z'
				}
			];
			const expectedAttractions: Attraction[] = [
				{
					id: 'TEST01',
					name: 'Test Attraction 01',
					fastpassEnabled: true,
					schedule: {
						openingTime: new Date('1992-04-12T10:00:00Z'),
						closingTime: new Date('1992-04-12T22:00:00Z')
					},
					updated: new Date('1992-04-12T14:30:00Z'),
					park: Parks.WaltDisneyStudios
				},
				{
					id: 'TEST02',
					name: 'Test Attraction 02',
					fastpassEnabled: false,
					schedule: {
						openingTime: new Date('1992-04-12T09:00:00Z'),
						closingTime: new Date('1992-04-12T21:00:00Z')
					},
					updated: new Date('1992-04-12T14:30:00Z'),
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
