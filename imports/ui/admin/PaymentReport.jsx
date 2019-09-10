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
            return new Date(a.SellingDate) - new Date(b.SellingDate);
        });
        return dataArray.map(data=>{
    		const {_id,Category,ps,paidOn,Content, Level, PaymentStatus, SellingDate, Mobile, ProductID, Name, chequeNumber}=data
    		let parent=this.props.userList.filter(user=>user._id===Category)
    		parent = (parent[0].emails[0].address)
    		let payment;
    		if(Level==='1'){
    			payment=60
    		}
    		else if(Level==='2'){
    			payment=50
    		}
    		else if(Level==='3'){
    			payment=40
    		}
    		else if(Level==='4'){
    			payment=30
    		}
    		else if(Level==='5'){
    			payment=20
    		}
    		else if(Level>='6'){
    			payment=10
    		}
    		let sellingDate=new Date(SellingDate).toLocaleDateString()
    		let paymentDate=new Date(SellingDate)
    		let pd = paymentDate.setDate(paymentDate.getDate() + 15);
    		pd=new Date(pd).toLocaleDateString()
    		let cls
    		if(ps==='Pending')
    			cls='bg-warning'
    		else if(ps==='Paid')
    			cls='bg-success'
    		let paymentMsg=''
    		ps==='Paid'?paymentMsg=ps+' on : '+paidOn+' via cheque number '+chequeNumber:paymentMsg=ps
    		let btnCls=''
    		ps==='Paid'?btnCls='btn btn-success disabled':btnCls='btn btn-success'
    		if(this.state.filter==='none'){
    			if(Level>1)
    			return(
    			<tr key={Name} className={cls}>
    			<td>{parent}</td>
    			<td>{Content}</td>
    			<td>{Mobile}</td>
    			<td>{Level}</td>
    			<td>{ProductID}</td>
    			<td>Rs.{payment}</td>
    			<td>{paymentMsg}</td>
    			<td>{sellingDate}</td>
    			<td>{pd}</td>
    			<td><button className={btnCls} onClick={()=>{
    				var ans = prompt('Enter cheque number')
    				if((/^[0-9]{23}$/.test(ans))===true)
    				this.updatePayment(_id, payment, ans)
    				else(alert('Please enter valid cheque number. A valid cheque number is 23 digits long.'))
    			}}>Pay Now</button></td>
    			</tr>
    			)
    		}
    		else if(this.state.filter==='pending'){
    			if(ps==='Pending'){
    				return(
	    			<tr key={Name} className={cls}>
	    			<td>{parent}</td>
    				<td>{Content}</td>
	    			<td>{Mobile}</td>
	    			<td>{Level}</td>
	    			<td>{ProductID}</td>
	    			<td>Rs.{payment}</td>
	    			<td>{paymentMsg}</td>
	    			<td>{sellingDate}</td>
	    			<td>{pd}</td>
	    			<td><button className={btnCls} onClick={()=>{
    				var ans = prompt('Enter cheque number')
    				if((/^[0-9]{23}$/.test(ans))===true)
    				this.updatePayment(_id, payment, ans)
    				else(alert('Please enter valid cheque number. A valid cheque number is 23 digits long.'))
    			}}>Pay Now</button></td>
	    			</tr>
	    		)
    			}
    		}
    		else if(this.state.filter==='paid'){
    			if(ps==='Paid'){
    				return(
	    			<tr key={Name} className={cls}>
	    			<td>{parent}</td>
    				<td>{Content}</td>
	    			<td>{Mobile}</td>
	    			<td>{Level}</td>
	    			<td>{ProductID}</td>
	    			<td>Rs.{payment}</td>
	    			<td>{paymentMsg}</td>
	    			<td>{sellingDate}</td>
	    			<td>{pd}</td>
	    			<td><button className={btnCls} onClick={()=>{
    				var ans = prompt('Enter cheque number')
    				if((/^[0-9]{23}$/.test(ans))===true)
    				this.updatePayment(_id, payment, ans)
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
		<div id="allUsers">
		{users.map(user=>{
            	const id = user.emails[0].address
            	const name = user.profile.name
            	const uid = user._id
            	let dataArray=this.props.payout.filter(data=>data.main===id)
            	dataArray.shift()
            	if(dataArray.length>0)
            	return (<div key={uid}><div className='bg-info'>{name} - {id}</div>
		<table className="table table-bordered table-hover table-responsive">
            <thead>
              <tr>
              	<th>Sold by</th>
                <th>Sold to</th>
                <th>Mobile</th>
                <th>Level</th>
                <th>ProductID</th>
                <th>Payment</th>
                <th>Payment Status</th>
                <th>Selling Date</th>
                <th>Payment Date</th>
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
	              	<th>Sold by</th>
	                <th>Sold to</th>
	                <th>Mobile</th>
	                <th>Level</th>
	                <th>ProductID</th>
	                <th>Payment</th>
	                <th>Payment Status</th>
	                <th>Selling Date</th>
	                <th>Payment Date</th>
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