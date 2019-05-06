import { Guid } from 'guid-typescript';

import { Fastpass } from './fastpass.model';
import { attractionFixtures } from '../attractions/attraction.fixtures';

describe('Fastpass', () => {
	describe('constructor()', () => {
		beforeEach(() => {
			spyOn(Guid, 'create').and.returnValue(<Guid><unknown>'ABCD-1234');
		});

		it('should set passed in values to internal properties', () => {
			// Arrange
			const attraction = attractionFixtures.park01Attraction01;
			const startTime = new Date('2018-05-27T12:00:00');
			const endTime = new Date('2018-05-27T12:30:00');
			const nextAvailableTime = new Date('2018-05-27T14:00:00');
			const id = 'EFGH-5678';

			// Act
			const model = new Fastpass(
				attraction,
				startTime,
				endTime,
				nextAvailableTime,
				id
			);

			// Assert
			expect(model.attraction).toEqual(attraction);
			expect(model.startTime).toEqual(startTime);
			expect(model.endTime).toEqual(endTime);
			expect(model.nextAvailableTime).toEqual(nextAvailableTime);
			expect(model.id).toEqual(id);
		});

		it('should set the id property to a new GUID if it is not supplied', () => {
			// Arrange

			// Act
			const model = new Fastpass(null, null, null, null);

			// Assert
			expect(model.id).toEqual('ABCD-1234');
		});
	});
});
