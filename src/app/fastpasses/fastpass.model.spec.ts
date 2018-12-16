import { Fastpass } from './fastpass.model';

fdescribe('Fastpass', () => {
	describe('constructor()', () => {
		it('should set passed in values to internal properties', () => {
			// Arrange
			const ride = 'Big Thunder Mountain';
			const startTime = new Date('2018-05-27T12:00:00');
			const endTime = new Date('2018-05-27T12:30:00');
			const nextAvailableTime = new Date('2018-05-27T14:00:00');

			// Act
			const model = new Fastpass(
				ride,
				startTime,
				endTime,
				nextAvailableTime
			);

			// Assert
			expect(model.ride).toEqual(ride);
			expect(model.startTime).toEqual(startTime);
			expect(model.endTime).toEqual(endTime);
			expect(model.nextAvailableTime).toEqual(nextAvailableTime);
		});
	});
});
