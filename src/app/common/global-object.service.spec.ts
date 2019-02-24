import { GlobalObjectService } from './global-object.service';

describe('GlobalObjectService', () => {
	let service: GlobalObjectService;

	beforeEach(() => {
		// Arrange
		service = new GlobalObjectService();
	});

	it('should create', () => {
		// Assert
		expect(service).toBeTruthy();
	});

	describe('getWindow()', () => {
		it('should return the global Window object', () => {
			// Act
			const result = service.getWindow();

			// Assert
			expect(result).toEqual(window);
		});
	});
});
