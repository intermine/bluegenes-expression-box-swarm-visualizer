import React from 'react';
import queryData from './query';

class RootContainer extends React.Component {
	componentDidMount() {
		const {
			entity: { value: geneId },
			serviceUrl
		} = this.props;
		queryData(geneId, serviceUrl).then(() => {
			// console.log(res);
		});
	}

	render() {
		return (
			<div className="rootContainer">
				<h1>Your Data Viz Here</h1>
			</div>
		);
	}
}

export default RootContainer;
