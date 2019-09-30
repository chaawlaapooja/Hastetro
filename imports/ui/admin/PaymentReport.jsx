import React, { Component } from 'react';
import {Link} from 'react-router';
import Navbar from '../Navbar'
import { createContainer } from 'meteor/react-meteor-data';
import Payout from '/imports/api/payout'

class Payment extends Component{
	constructor(){
    	super();
    	this.state={
    		filter:'none',
    		userfilter:'none'
    	}
    }
    updatePayment(_id,payment,chequeNumber){
    	Meteor.call('payout.updatePayment', _id,payment,chequeNumber)
    }
    renderRows(id){
        let dataArray=this.props.payout.filter(data=>data.main===id)
        dataArray.sort(function(a,b){
            return new Date(a.PaymentDate) - new Date(b.PaymentDate);
        });
        return dataArray.map(data=>{
    		const {_id,Category,id, name,Commission, PaymentDate, Name, chequeNumber, paidOn, paymentStatus}=data
            let paymentMsg=''
            paymentStatus==='Paid'?paymentMsg=paymentStatus+' on : '+paidOn+' via cheque number '+chequeNumber:paymentMsg=paymentStatus
            let cls, btnCls
            if(paymentStatus==='Pending')
                cls='bg-warning'
            else if(paymentStatus==='Paid')
                cls='bg-success'
            paymentStatus==='Paid'?btnCls='btn btn-success disabled':btnCls='btn btn-success'
    		if(this.state.filter==='none'){
    			return(
    			<tr key={_id} className={cls}>
    			<td>{PaymentDate.toLocaleDateString()}</td>
                <td>{id}</td>
                <td>{name}</td>
                <td>Rs.{Commission}</td>
                <td>Rs.{(5/100)*Commission}</td>
                <td>Rs.{(2/100)*Commission}</td>
                <td>Rs.{(5/100)*Commission+(2/100)*Commission}</td>
                <td>Rs.{Commission - (5/100)*Commission+(2/100)*Commission}</td>
                <td>{paymentStatus}</td>
    			<td><button className={btnCls} onClick={()=>{
    				var ans = prompt('Enter cheque number')
    				if((/^[0-9]{23}$/.test(ans))===true)
    				this.updatePayment(_id, ans)
    				else(alert('Please enter valid cheque number. A valid cheque number is 23 digits long.'))
    			}}>Pay Now</button></td>
    			</tr>
    			)
    		}
    		else if(this.state.filter==='pending'){
    			if(paymentStatus==='Pending'){
    				return(
	    			<tr key={_id} className={cls}>
	    			<td>{PaymentDate.toLocaleDateString()}</td>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>Rs.{Commission}</td>
                    <td>Rs.{(5/100)*Commission}</td>
                    <td>Rs.{(2/100)*Commission}</td>
                    <td>Rs.{(5/100)*Commission+(2/100)*Commission}</td>
                    <td>Rs.{Commission - (5/100)*Commission+(2/100)*Commission}</td>
                    <td>{paymentStatus}</td>
	    			<td><button className={btnCls} onClick={()=>{
    				var ans = prompt('Enter cheque number')
    				if((/^[0-9]{23}$/.test(ans))===true)
    				this.updatePayment(_id, ans)
    				else(alert('Please enter valid cheque number. A valid cheque number is 23 digits long.'))
    			}}>Pay Now</button></td>
	    			</tr>
	    		)
    			}
    		}
    		else if(this.state.filter==='paid'){
    			if(paymentStatus==='Paid'){
    				return(
	    			<tr key={_id} className={cls}>
	    			<td>{PaymentDate.toLocaleDateString()}</td>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>Rs.{Commission}</td>
                    <td>Rs.{(5/100)*Commission}</td>
                    <td>Rs.{(2/100)*Commission}</td>
                    <td>Rs.{(5/100)*Commission+(2/100)*Commission}</td>
                    <td>Rs.{Commission - (5/100)*Commission+(2/100)*Commission}</td>
                    <td>{paymentStatus}</td>
	    			<td><button className={btnCls} onClick={()=>{
    				var ans = prompt('Enter cheque number')
    				if((/^[0-9]{23}$/.test(ans))===true)
    				this.updatePayment(_id, ans)
    				else(alert('Please enter valid cheque number. A valid cheque number is 23 digits long.'))
    			}}>Pay Now</button></td>
	    			</tr>
	    		)
    			}
    		}
    		
    	})
    }
    onFilterChange(){
    	this.setState({filter:this.refs.filter.value})
    }
    onUserFilterChange(){
    	if(this.refs.userfilter.value==='none'){
    	document.querySelector('#allUsers').hidden=false
    	document.querySelector('#filteredUser').hidden=true	
    	}
    	else{
    	document.querySelector('#allUsers').hidden=true
    	document.querySelector('#filteredUser').hidden=false
    	this.setState({userfilter:this.refs.userfilter.value})	
	    }
	}
    onSearchUser(event){
            event.preventDefault()
            let found = false
            let userInfo;
            for(var i=0; i<this.props.userList.length; i++){
                if(this.props.userList[i].emails[0].address===this.refs.registrationID.value.trim()){
                    found = true
                    this.setState({userfilter:this.props.userList[i].emails[0].address})
                    userInfo= this.props.userList[i]
                    break;
                }
            }
            if(!found){
                document.querySelector('#allUsers').hidden=false
                document.querySelector('#filteredUser').hidden=true 
                alert('no user found with this id')
            }
            else{
                document.querySelector('#allUsers').hidden=true
                document.querySelector('#filteredUser').hidden=false
        
            }
    }
    getOptions(){
    	return this.props.userList
    	.filter(user=>user.profile.designation==='USER')
    	.map(user=>{
    		const id = user.emails[0].address;
    		return(
    			<option key={id} value={id}>{id}</option>
    		)
    	})
    }
	render(){
		let users = this.props.userList.filter(user=>user.profile.designation==='USER')
    	
	return(
		<div>
		<Navbar level='admin'/><br/><br/>
		<div id="tableView" style={{margin:3+'%'}}>
		<div style={{margin:1+'%'}}>
		<label>Filter by : </label>
		<select style={{marginLeft:2+'%'}} ref='filter' onChange={()=>this.onFilterChange()}>
		<option value='none'>All</option>
		<option value='pending'>Pending</option>
		<option value='paid'>Paid</option>
		</select>
		<label style={{marginLeft:3+'%'}}>Filter by : </label>
		<select style={{marginLeft:2+'%'}} ref='userfilter' onChange={()=>this.onUserFilterChange()}>
		<option value='none'>All</option>
		{this.getOptions()}
		</select>
        </div>

        <form className="form-inline" onSubmit={this.onSearchUser.bind(this)}>
        <div className="form-group">
            <input type="text" style={{margin:0+'px'}} ref="registrationID" placeholder="Enter your registration ID" pattern="HTPL[0-9]{5}" title="ID starts with HTPL followed by 5 digits." />
        </div>
        <button type="submit" className="btn btn-success">Search</button>
        </form>
        <br/>
		<div id="allUsers">
		{users.map(user=>{
            	const id = user.emails[0].address
            	const name = user.profile.name
            	const uid = user._id
                let dataArray=this.props.payout.filter(data=>data.main===id)
            	if(dataArray.length>0)
            	return (<div key={uid}><div className='bg-info'>{name} - {id}</div>
		<table className="table table-bordered table-hover table-responsive">
            <thead>
              <tr>
              	<th>Payout Date</th>
                <th>HTPL ID</th>
                <th>BA Name</th>
                <th>Commission</th>
                <th>TDS</th>
                <th>BDF</th>
                <th>Total Deduction</th>
                <th>Net Payment</th>
                <th>Payment Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            
            {this.renderRows(id)}
            </tbody>
          </table>
		 </div>)  
	          })}
	         </div>
	         <div id="filteredUser" hidden>
	         <div key={this.state.userfilter}>
	         <div className='bg-info'>{this.state.userfilter}</div>
			 <table className="table table-bordered table-hover table-responsive">
	            <thead>
	              <tr>
	              	<th>Payout Date</th>
                    <th>HTPL ID</th>
                    <th>BA Name</th>
                    <th>Commission</th>
                    <th>TDS</th>
                    <th>BDF</th>
                    <th>Total Deduction</th>
                    <th>Net Payment</th>
                    <th>Payment Status</th>
	                <th></th>
	              </tr>
	            </thead>
	            <tbody>
	            
	            {this.renderRows(this.state.userfilter)}
	            </tbody>
	          </table>
			 </div>
	         </div>
	         </div>    
		</div>
		)
	}
};

export default createContainer(() => {
  Meteor.subscribe('users');
  Meteor.subscribe('payout')
  return { 
            userList:Meteor.users.find().fetch(),
            payout:Payout.find().fetch()
   };
}, Payment);