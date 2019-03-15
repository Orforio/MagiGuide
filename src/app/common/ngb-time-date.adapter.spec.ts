import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { NgbTimeDateAdapter } from './ngb-time-date.adapter';

describe('NgbTimeDateAdapter', () => {
	let adapter: NgbTimeDateAdapter;

	beforeEach(() => {
		adapter = new NgbTimeDateAdapter();
	});

	describe('fromModel()', () => {
		beforeEach(() => {
			jasmine.clock().install();
		});

		afterEach(() => {
			jasmine.clock().uninstall();
		});

		it('should convert Date to NgbTimeStruct', () => {
			// Arrange
			const mockDate = new Date('2019-03-10T09:10:52');
			const expectedTimeStruct: NgbTimeStruct = {
				hour: 9,
				minute: 10,
				second: 52
			};
			jasmine.clock().mockDate(new Date('2019-03-10T00:00:00'));

			// Act
			const result = adapter.fromModel(mockDate);

			// Assert
			expect(result).toEqual(expectedTimeStruct);
		});
	});

	describe('toModel()', () => {
		beforeEach(() => {
			jasmine.clock().install();
		});

		afterEach(() => {
			jasmine.clock().uninstall();
		});

		it('should convert NgbTimeStruct to Date', () => {
			// Arrange
			const mockTimeStruct: NgbTimeStruct = {
				hour: 15,
				minute: 42,
				second: 2
			};
			const expectedDate = new Date('2019-03-11T15:42:02');
			jasmine.clock().mockDate(new Date('2019-03-11T00:00:00'));

			// Act
			const result = adapter.toModel(mockTimeStruct);

			// Assert
			expect(result).toEqual(expectedDate);
		});
	});
});
