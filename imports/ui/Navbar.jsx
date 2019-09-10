import React, { Component } from 'react';
import {Link} from 'react-router';
import Accounts from './Accounts';

class Navbar extends Component{
	
	render(){
	if(this.props.level==='admin')
	return(
		<nav className="navbar navbar-inverse navbar-fixed-top" style={{backgroundColor:'#5b4681'}}>
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>                        
      </button>
      <Link className="navbar-brand" to="/adminPanel">
                <img src="https://res.cloudinary.com/hastetro/image/upload/v1567510172/Logo-removebg-preview_ffu8is.png" alt="LOGO" height="50" width="50"/>
            </Link>
      <Link className="navbar-brand" to="/adminPanel" style={{fontSize:20+'px', paddingTop:3+'%'}}>HASTETRO TRADE</Link>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav">
        <li><Link to='/dashboard'>Report</Link></li>
        <li><Link to="/allMembers">Members</Link></li>
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="#">User<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><Link to="/addUser">Add User</Link></li>
            <li><Link to='/editUser'>Edit User</Link></li>
          </ul>
        </li>
        <li><Link to='/paymentReport'>Payment Report</Link></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><a> <Accounts/></a></li>
        
      </ul>
    </div>
  </div>
</nav>
		)
	else if(this.props.level==='user')
		return(
	<nav className="navbar navbar-inverse navbar-fixed-top" style={{backgroundColor:'#5b4681'}}>
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>                        
      </button>
      <Link className="navbar-brand" to="/userPanel">
                <img src="https://res.cloudinary.com/hastetro/image/upload/v1567510172/Logo-removebg-preview_ffu8is.png" alt="LOGO" height="50" width="50"/>
            </Link>
      <Link className="navbar-brand" to="/userPanel" style={{fontSize:20+'px', paddingTop:3+'%'}}>HASTETRO TRADE</Link>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav">
        <li><Link to="/addDownline">New Product</Link></li>
        <li><Link to='/seeDownline'>Downline</Link></li>
        <li><Link to='/payment'>Payment</Link></li>
        
        <li><Link to='/profile'>Profile</Link></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><a> <Accounts/></a></li>
        
      </ul>
    </div>
  </div>
</nav>
)
	}
};

export default Navbar;