import React, { Component } from 'react';
import axios from 'axios';
import Endpoint from './Endpoint.js';
import './Endpoints.css';

class Endpoints extends Component {

	state = {
		endpoints: [
			{
				endpointName: 'Get All Homes',
				description: 'Get All Homes that listed on the database.',
				requestType: "get",
				url: '/homes',
				params: []
			},
			{
				endpointName: 'Get Home By ID',
				description: 'Get a single Home by the Home ID.',
				requestType: "get",
				url: '/homes/id',
				params: [{value: 'id', name: 'Home ID'}],

			},
			{
				endpointName: 'Get All Animals',
				description: 'Get all the Animals that listed on the database (by Home ID).',
				requestType: "get",
				url: '/homes/<id>/animals',
				params: [{value: '<id>', name: 'Home ID'}],
			},
			{
				endpointName: 'Get Animal By ID',
				description: 'Get a single Animal by the Animal ID.',
				requestType: "get",
				url: '/homes/<id>/animals/<animal>',
				params: [{value: '<id>', name: 'Home ID'},{value: '<animal>', name: 'Animal'}],

			},
			{
				endpointName: 'Delete Home By ID',
				description: 'Delete a single Home by the Home ID.',
				requestType: "delete",
				url: '/homes/<id>',
				params: [{value: '<id>', name: 'Home ID'}],
			},
			{
				endpointName: 'Delete Animal By Id',
				description: 'Delete a single Animal by the Home ID and the Animal ID.',
				requestType: "delete",
				url: '/homes/<id>/animals/<animal>',
				params: [{value: '<id>', name: 'Home ID'},{value: '<animal>', name: 'Animal ID'}],
			},
			{
				endpointName: 'Edit Animal By Id',
				description: 'Edit a single Animal by the Home ID and the Animal ID.',
				requestType: "put",
				url: '/homes/<id>/animals/<animal>',
				params: [{value: '<id>', name: 'Home ID'},{value: '<animal>', name: 'Animal ID'}],
				model: 'animal',
				fields: ['description','name']
			},
			{
				endpointName: 'Edit Home By Id',
				description: 'Edit a single Home by the Home ID.',
				requestType: "put",
				url: '/homes/<id>/animals/<animal>',
				params: [{value: '<id>', name: 'Home ID'}],
				model: 'home',
				fields: ['description']
			},
		]
	};

	render(props) {
		return (
			<div>
				<div className={"endpoints"}>
					{this.state.endpoints.map(endpoint => <Endpoint key={endpoint.endpointName} endpoint={endpoint} />)}
				</div>
			</div>
		);
	}
}

export default Endpoints;
