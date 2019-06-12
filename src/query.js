const geneToExpressionQuery = ({ geneId }) => ({
	from: 'Gene',
	select: [
		'symbol',
		'name',
		'primaryIdentifier',
		'secondaryIdentifier',
		'organism.name',
		'atlasExpression.tStatistic',
		'atlasExpression.type',
		'atlasExpression.condition',
		'atlasExpression.expression',
		'atlasExpression.pValue'
	],
	orderBy: [
		{
			path: 'symbol',
			direction: 'ASC'
		}
	],
	where: [
		{
			path: 'Gene.id',
			op: '=',
			value: geneId
		},
		{
			path: 'atlasExpression.expression',
			op: '!=',
			value: 'NONDE'
		}
	]
});

// eslint-disable-next-line
function queryData(geneId, serviceUrl, imjsClient = imjs) {
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line
		const service = new imjsClient.Service({ root: serviceUrl });
		service
			.records(geneToExpressionQuery({ geneId }))
			.then(data => {
				if (data && data.length) resolve(data[0]);
				else reject('No data found!');
			})
			.catch(() => reject('No data found!'));
	});
}

export default queryData;
