import React, { Component } from 'react';
import {Link} from 'react-router';
import Accounts from './Accounts';
import Navbar from './Navbar'
import UserList from '/imports/ui/user/UserList'
class UserPanel extends Component{
	onlogout(){
		console.log('logout')
		Accounts.logout();
	}
	render(){
	return(
		<div>
		<Navbar level='user'/>
		<UserList />
		</div>
		)
	}
};

export default UserPanel;