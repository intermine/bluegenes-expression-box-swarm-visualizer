import React from 'react';
import queryData from './query';
import Loading from './loading';
import Plotly from './Chart';

class RootContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	componentDidMount() {
		const {
			entity: { value: geneId },
			serviceUrl
		} = this.props;

		// return immediately if we're at testing mode
		if (this.props.testing) return;

		queryData(geneId, serviceUrl).then(res => {
			this.setState({ loading: false });
			const { atlasExpression } = res;
			const GetValues = ar =>
				ar.map(r => ({
					value: Number(r.tStatistic),
					name: r.condition
				}));
			const orgs_values = GetValues(
				atlasExpression.filter(r => r.type == 'organism_part')
			);
			const dis_values = GetValues(
				atlasExpression.filter(r => r.type == 'disease_state')
			);

			const data = [
				{
					y: orgs_values.map(r => r.value),
					type: 'box',
					name: 'Organism Part',
					marker: {
						color: 'rgb(7,40,89)'
					},
					boxpoints: 'all',
					text: orgs_values.map(r => r.name)
				},
				{
					y: dis_values.map(r => r.value),
					type: 'box',
					name: 'Disease State',
					marker: {
						color: 'rgb(7,123,56)'
					},
					boxpoints: 'all',
					text: dis_values.map(r => r.name),
					textinfo: 'text'
				}
			];

			Plotly.newPlot(
				'viz',
				data,
				{ title: 'Expression Value Visualizer' },
				{ displayModeBar: false }
			);
		});
	}

	render() {
		return (
			<div className="rootContainer">
				{this.state.loading ? <Loading /> : <div id="viz"></div>}
			</div>
		);
	}
}

export default RootContainer;
