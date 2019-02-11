import { FastpassService } from './fastpass.service';

describe('FastpassService', () => {
	let service: FastpassService;

	beforeEach(() => {
		service = new FastpassService();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
