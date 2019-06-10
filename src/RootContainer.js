import React from 'react';
import queryData from './query';
import Plotly from './Chart';

class RootContainer extends React.Component {
	componentDidMount() {
		const {
			entity: { value: geneId },
			serviceUrl
		} = this.props;

		var y0 = [],
			y1 = [];
		for (var i = 0; i < 50; i++) {
			y0[i] = Math.random();
			y1[i] = Math.random();
		}

		var trace1 = {
			y: y0,
			type: 'box',
			boxpoints: 'all'
		};
		var data = [trace1];

		Plotly.newPlot('viz', data, {}, { displayModeBar: false });

		queryData(geneId, serviceUrl).then(() => {
			// const { atlasExpression } = res;
			// console.log(atlasExpression);
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
