import React, { Component } from 'react';
import {Link} from 'react-router';
import Navbar from '../Navbar'
import { createContainer } from 'meteor/react-meteor-data';
import Payments from '/imports/api/payment'

class Payment extends Component{
	constructor(){
    	super();
    	this.state={
    		filter:'none',
    		userfilter:'none'
    	}
    }
    updatePayment(_id,chequeNumber,date){
    	Meteor.call('payment.updatePayment', _id,chequeNumber,date)
    }
    renderRows(id){
        let dataArray=this.props.payout.filter(data=>data.ID===id)
        // dataArray.sort(function(a,b){
        //     return new Date(a.PaymentDate) - new Date(b.PaymentDate);
        // });
        return dataArray.map(data=>{
            const {_id,ID, name, address, payment}=data
            return payment
                .filter(payment=>{
                    if(this.state.filter==='none')
                        return payment
                    else if(this.state.filter==='Pending'){
                        if(payment.paymentStatus==='Pending'){
                            return payment
                        }
                    }
                    else if(this.state.filter==='Paid'){
                        if(payment.paymentStatus==='Paid'){
                            return payment
                        }
                    }
                })
                .map(payment=>{
                const {amount, date, chequeNumber,paidOn, paymentStatus}=payment;
                let paymentMsg=''
                paymentStatus==='Paid'?paymentMsg=paymentStatus+' on : '+new Date(paidOn).toLocaleDateString()+' via cheque number '+chequeNumber:paymentMsg=paymentStatus
                let cls, btnCls
                if(paymentStatus==='Pending')
                    cls='table-danger'
                else if(paymentStatus==='Paid')
                    cls='table-success'
                paymentStatus==='Paid'?btnCls='btn btn-success disabled':btnCls='btn btn-success'
                let dt = new Date(date).toLocaleDateString()
                if(amount!==0)
                return(
                    <tr key={dt} className={cls}>
                    <td>{dt}</td>
                    <td>{ID}</td>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>Rs.{amount}</td>
                    <td>Rs.{ Math.round((5/100)*amount * 100) / 100}</td>
                    <td>Rs.{Math.round((4/100)*amount*100)/100}</td>
                    <td>Rs.{Math.round((5/100)*amount * 100) / 100+Math.round((4/100)*amount * 100) / 100}</td>
                    <td>Rs.{amount - (Math.round((5/100)*amount * 100) / 100+Math.round((4/100)*amount * 100) / 100)}</td>
                    <td>{paymentMsg}</td>
                    <td>{btnCls==='btn btn-success'?<button className={btnCls} onClick={()=>{
                         var ans = prompt('Enter cheque number')
                         if((/^[0-9]{12}$/.test(ans))===true)
                         this.updatePayment(_id, ans, date)
                         else(alert('Please enter valid cheque number. A valid cheque number is 12 digits long.'))
                     }}>Pay Now</button>:<button className={btnCls}>Pay Now</button>}
                    </td>
                    </tr>
                )
                })
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
		<div id="tableView" style={{margin:3+'%'}}>
		<div style={{margin:1+'%'}}>
		<label>Filter by : </label>
		<select style={{marginLeft:2+'%'}} ref='filter' onChange={()=>this.onFilterChange()}>
		<option value='none'>All</option>
		<option value='Pending'>Pending</option>
		<option value='Paid'>Paid</option>
		</select>
		<label style={{marginLeft:3+'%'}}>Filter by : </label>
		<select style={{marginLeft:2+'%'}} ref='userfilter' onChange={()=>this.onUserFilterChange()}>
		<option value='none'>All</option>
		{this.getOptions()}
		</select>
        </div>

        <form className="form-inline" onSubmit={this.onSearchUser.bind(this)}>
        <div className="form-group">
            <input type="text" style={{margin:0+'px'}} ref="registrationID" placeholder="Enter registration ID" pattern="HT[0-9]{7}" title="ID starts with HT followed by 7 digits." />
        </div>
        <button type="submit" className="btn btn-success" style={{marginLeft:2+'%'}}>Search</button>
        </form>
        <br/>
		<div id="allUsers">
		{users.map(user=>{
            	const id = user.emails[0].address
            	const uid = user._id
                let dataArray=this.props.payout.filter(data=>data.ID===id)
            	
                if(dataArray.length>0)
            	return (this.renderRows(id)[0][0]!==undefined?<div key={uid}>

		<table className="table table-bordered table-hover table-responsive">
            <thead>
              <tr>
              	<th>Payout Date</th>
                <th>HTPL ID</th>
                <th>BA Name</th>
                <th>BA Address</th>
                <th>Commission</th>
                <th>TDS(5%)</th>
                <th>BDF(4%)</th>
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
		 </div>:undefined)  
	          })}
	         </div>
	         <div id="filteredUser" hidden>
	         <div key={this.state.userfilter} className='table-warning'>
	         <table className="table table-bordered table-hover table-responsive">
	            <thead>
	              <tr>
	              	<th>Payout Date</th>
                    <th>HTPL ID</th>
                    <th>BA Name</th>
                    <th>BA Address</th>
                
                    <th>Commission</th>
                    <th>TDS(5%)</th>
                    <th>BDF(4%)</th>
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
            payout:Payments.find().fetch()
   };
}, Payment);