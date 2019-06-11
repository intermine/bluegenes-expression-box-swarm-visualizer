const imjs = require('imjs');
const queryData = require('../src/query').default;

describe('query', () => {
	describe('geneToExpression', () => {
		const mockData = {
			geneId: 1257384,
			wrongGeneId: 1231231,
			serviceUrl: 'http://www.humanmine.org/human'
		};

		test('should return atlasExpression array when given correct geneId', () => {
			const promise = queryData(mockData.geneId, mockData.serviceUrl, imjs);
			expect(promise).resolves.not.toBeFalsy();

			return promise.then(res => {
				expect(res).toHaveProperty('atlasExpression');
				expect(res.atlasExpression).toBeInstanceOf(Array);
				expect(res.atlasExpression.length).toBeGreaterThanOrEqual(1);
			});
		});

		test('should return rejected promise when data does not exist', () => {
			const promise = queryData(
				mockData.wrongGeneId,
				mockData.serviceUrl,
				imjs
			);
			return promise.catch(er => expect(er).toBe('No data found!'));
		});
	});
});
