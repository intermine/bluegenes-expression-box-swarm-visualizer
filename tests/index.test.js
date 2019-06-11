const main = require('../src').main;

// Example
describe('main', () => {
	test('should throw error when called with wrong signature', () => {
		expect(() => {
			// testing with all falsy values
			main('', 0, null, undefined, []);
		}).toThrowError('Call main with correct signature');
	});

	test('should render something (atleast a div) when initialsied', () => {
		const mockData = {
			el: document.createElement('div'),
			service: { root: 'http://www.humanmine.org/human' },
			entity: { value: 1257384 },
			state: { testing: true }
		};
		main(mockData.el, mockData.service, mockData.entity, mockData.state, {});
		expect(mockData.el.innerHTML).toContain('div');
	});
});
