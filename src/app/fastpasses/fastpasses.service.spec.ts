import { FastpassesService } from './fastpasses.service';

describe('FastpassesService', () => {
	let service: FastpassesService;

	beforeEach(() => {
		service = new FastpassesService();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
