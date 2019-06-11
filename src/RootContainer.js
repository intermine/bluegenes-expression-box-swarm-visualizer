import React from 'react';
import queryData from './query';
import Plotly from './Chart';

class RootContainer extends React.Component {
	componentDidMount() {
		const {
			entity: { value: geneId },
			serviceUrl
		} = this.props;

		queryData(geneId, serviceUrl).then(res => {
			const { atlasExpression } = res;
			const expressions = atlasExpression.map(r => Number(r.expression));
			expressions.sort();
			const data = [
				{
					y: expressions,
					type: 'box',
					name: res.name,
					jitter: 0.3,
					pointpos: -1.8,
					marker: {
						color: 'rgb(7,40,89)'
					},
					boxpoints: 'all'
				}
			];

			Plotly.newPlot('viz', data, {}, { displayModeBar: false });
		});
	}

	render() {
		return (
			<div className="rootContainer">
				<div id="viz"></div>
				<h1>Your Data Viz Here</h1>
			</div>
		);
	}
}

export default RootContainer;
