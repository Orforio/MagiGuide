import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { Fastpass } from './fastpass.model';

describe('Fastpass', () => {
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

		it('should convert NgbTimeStruct dates to JavaScript date objects', () => {
			// Arrange
			jasmine.clock().install();
			jasmine.clock().mockDate(new Date('2018-05-27T00:00:00'));

			const ride = 'Star Tours';
			const startTime: NgbTimeStruct = {hour: 15, minute: 15, second: 0};
			const endTime: NgbTimeStruct = {hour: 15, minute: 45, second: 0};
			const nextAvailableTime: NgbTimeStruct = {hour: 17, minute: 15, second: 0};

			// Act
			const model = new Fastpass(
				ride,
				startTime,
				endTime,
				nextAvailableTime
			);

			// Assert
			expect(model.startTime).toEqual(new Date('2018-05-27T15:15:00'));
			expect(model.endTime).toEqual(new Date('2018-05-27T15:45:00'));
			expect(model.nextAvailableTime).toEqual(new Date('2018-05-27T17:15:00'));

			jasmine.clock().uninstall();
		});
	});

	describe('id', () => {
		let model: Fastpass;

		beforeEach(() => {
			const ride = 'Hyperspace Mountain';
			const startTime = new Date('2019-05-27T12:00:00');
			const endTime = new Date('2019-05-27T12:30:00');
			const nextAvailableTime = new Date('2019-05-27T14:00:00');
			model = new Fastpass(
				ride,
				startTime,
				endTime,
				nextAvailableTime
			);
		});

		it('should set the id property if it is null', () => {
			// Arrange

			// Act
			model.id = 42;

			// Assert
			expect(model.id).toEqual(42);
		});

		it('should not set the id property if it already set', () => {
			// Arrange
			model.id = 99;

			// Act
			model.id = 42;

			// Assert
			expect(model.id).not.toEqual(42);
		});
	});
});
