import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Utils from '../../utils/utils.js';

class Endpoint extends Component {

	state = {
		fields: {}
	};

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.hiddenResponseToggle = this.hiddenResponseToggle.bind(this);
		this.handleFieldsChange = this.handleFieldsChange.bind(this);
	}

	componentDidMount() {
		const fields = this.state.fields;
		if(this.props.endpoint.model) {
			fields[this.props.endpoint.model] = {};
		}
	}

	handleChange(event) {
		this.setState({[event.target.id]: event.target.value});
	}

	handleFieldsChange(event) {
		const home = this.state.fields[this.props.endpoint.model];

		home[event.target.id] = event.target.value;
		this.setState({home});
	}

	handleSubmit(event) {
		const endpoint = this.props.endpoint;
		const url = Utils.generateUrlByParams(endpoint, this.state);
		axios[endpoint.requestType](document['location'].href + url,this.state.fields)
			.then(response => {
				if (response.data !== null) {
					this.setState({data: response.data});
				} else {

					this.setState({data: null, error: "Cannot find the requested data"});
				}
			}, error => {
				this.setState({error: "Missing some parameters"});
			});
		event.preventDefault();
	}

	hiddenResponseToggle() {
		const isHidden = this.state.isHidden;
		this.setState({isHidden: !isHidden});
	}

	renderResponseBox() {
		let responseBox;
		let responseContent;
		if(this.state.data) {
			let hiddenToggle;
			if(this.state.isHidden) {
				hiddenToggle = ( <p className={"content-btn"} onClick={this.hiddenResponseToggle}>Show</p> );
				responseContent = null;
			} else {
				hiddenToggle = ( <p className={"content-btn"} onClick={this.hiddenResponseToggle}>Hide</p> );
				responseContent = JSON.stringify(this.state.data, null, 4);
			}
			responseBox = (
				<div className={"endpoint-response"}>
					{hiddenToggle}
					{responseContent}
				</div>
			);
		}
		else if(this.state.error) {
			responseBox = <div className="error">{this.state.error}</div>;
		} else if(this.state.success) {
			responseBox = <div className="success"> {this.state.success}</div>;
		}
		return responseBox;
	}

	render() {
		const submitButton = <Button variant="contained" type="submit" color="secondary">Send</Button>;
		const responseBox = this.renderResponseBox();
		const fields = this.props.endpoint.fields ? (this.props.endpoint.fields.map(field =>
				<TextField
					className={"param-input"}
					onChange={this.handleFieldsChange}
					name={field}
					id={field}
					key={field}
					label={field}
					margin="normal"/>)) : null;

		const fieldsTitle = this.props.endpoint.fields ? <h4>Additional Fields</h4> : null;

		return (
			<div className={"endpoint-card"}>
				<form onSubmit={this.handleSubmit}>
					<h3>{this.props.endpoint.endpointName}</h3>
					<p>{this.props.endpoint.description}</p>
					<h4>Params</h4>
				{this.props.endpoint.params.map(param => <Button variant="outlined" color="primary"
				 key={param.value}
					 size={"small"}
					 className={"param-btn"}>
						{param.name}
					</Button>)}

					<h4>API Request Example </h4>

				{this.props.endpoint.params.map(param =>
					<TextField
					className={"param-input"}
					onChange={this.handleChange}
					name={param.name}
					id={param.value}
					key={param.value}
					label={param.name}
					margin="normal"/>)}

					{fieldsTitle}
					{fields}
					{submitButton}
					{responseBox}

				</form>
			</div>
		)
	}
}

export default Endpoint;
