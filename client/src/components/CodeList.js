import React from 'react';
import moment from 'moment';

class CodeList extends React.Component {

	constructor(props) {
		super(props);
		this.contentDisplay = this.contentDisplay.bind(this);
		this.formatDate = this.formatDate.bind(this);
		this.state = {
			codes: props.codelist,
			routeToCodeReview: props.route,
		}
	}

	contentDisplay(content) {
		if (content.length <= 20) {
			return content;
		} else {
			return (content.substring(0, 20) + "...");
		}
	}

	componentWillReceiveProps(nextProps) {
		this.state.codes = nextProps.codelist;
	}

	formatDate(jsonDate) {
		var date = new Date(jsonDate);
		return moment(date).format('MM/D/YY, h:mm A');
	}

	render() {
		return (
			<div>
				<h4>You have submitted { this.state.codes.length } files </h4>
				<div className="responsive-table"> 
					<table>
						<thead>
							<tr>
								<th>Time Submitted</th>
								<th>Title</th>
								<th>Language</th>
								<th>Content Preview</th>
 							</tr>
						</thead>
						<tbody>
							{
								this.state.codes.map((code) => {
									return(<tr onClick={() => this.state.routeToCodeReview(code.id)}>
											<td>{ this.formatDate(code.date_added) }</td>
											<td>{ code.title }</td>
											<td>{ code.language }</td>
											<td>{ this.contentDisplay(code.content) }</td>
										</tr>)
									})
							}
						</tbody>
					</table>
				</div>
			</div>);
	}
} 

export default CodeList;