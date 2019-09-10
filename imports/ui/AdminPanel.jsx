import React, { Component } from 'react';
import {Link} from 'react-router';
import Navbar from './Navbar'
import Report from '/imports/ui/admin/Report';

class AdminPanel extends Component{
	render(){
	return(
		<div>
		<Navbar level='admin'/>
		<Report/>
		</div>
		)
	}
};

export default AdminPanel;