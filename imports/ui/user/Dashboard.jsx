import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Payments from '/imports/api/payment'

class Payment extends Component{
	constructor(){
    	super();
    	this.state={
    		filter:'none'
    	}
    }
    
    renderRows(){
        let dataArray = this.props.payout.filter(data=> data.ID===Meteor.users.find().fetch()[0].emails[0].address)
    	// ar.sort(function(a,b){
     //        return new Date(a.PaymentDate) - new Date(b.PaymentDate);
     //    });
        return dataArray.map(data=>{
            const {_id,ID, name, payment}=data
            return payment.map(payment=>{
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
                if(this.state.filter==='none'){
                if(amount!==0)
                return(
                    <tr key={dt} className={cls}>
                    <td>{dt}</td>
                    <td>{ID}</td>
                    <td>{name}</td>
                    <td>Rs.{amount}</td>
                    <td>Rs.{ Math.round((5/100)*amount * 100) / 100}</td>
                    <td>Rs.{Math.round((4/100)*amount*100)/100}</td>
                    <td>Rs.{Math.round((5/100)*amount * 100) / 100+Math.round((4/100)*amount * 100) / 100}</td>
                    <td>Rs.{amount - (Math.round((5/100)*amount * 100) / 100+Math.round((4/100)*amount * 100) / 100)}</td>
                    <td>{paymentMsg}</td>
                    </tr>
                )
            }
            else if(this.state.filter==='pending'){
                if(paymentStatus==='Pending' && amount!==0)
                    return(
                    <tr key={dt} className={cls}>
                    <td>{dt}</td>
                    <td>{ID}</td>
                    <td>{name}</td>
                    <td>Rs.{amount}</td>
                    <td>Rs.{ Math.round((5/100)*amount * 100) / 100}</td>
                    <td>Rs.{Math.round((4/100)*amount*100)/100}</td>
                    <td>Rs.{Math.round((5/100)*amount * 100) / 100+Math.round((4/100)*amount * 100) / 100}</td>
                    <td>Rs.{amount - (Math.round((5/100)*amount * 100) / 100+Math.round((4/100)*amount * 100) / 100)}</td>
                    <td>{paymentStatus}</td>
                    </tr>
                )
            }
            else if(this.state.filter==='paid'){
                if(paymentStatus==='Paid' && amount!==0)
                    return(
                    <tr key={dt} className={cls}>
                    <td>{dt}</td>
                    <td>{ID}</td>
                    <td>{name}</td>
                    <td>Rs.{amount}</td>
                    <td>Rs.{ Math.round((5/100)*amount * 100) / 100}</td>
                    <td>Rs.{Math.round((4/100)*amount*100)/100}</td>
                    <td>Rs.{Math.round((5/100)*amount * 100) / 100+Math.round((4/100)*amount * 100) / 100}</td>
                    <td>Rs.{amount - (Math.round((5/100)*amount * 100) / 100+Math.round((4/100)*amount * 100) / 100)}</td>
                    <td>{paymentStatus}</td>
                    </tr>
                )
            }
               
            })
      
        })
    }
    onFilterChange(){
    	this.setState({filter:this.refs.filter.value})
    }
    getDownlineCount(){
        let users = this.props.userList.filter(user=>user.profile.designation==='USER')
        let ar = users.filter(user=>user.profile.parent===Meteor.userId())
        let dataArray = []
      dataArray.push({ 'Name': Meteor.userId(),'Content':' (ME)','Product':'','Mobile':'','fillColor': '#916DAF' })
        
        for(var i=0; i<dataArray.length; i++){
        for(var j=0; j<users.length; j++){
                if(users[j].profile.parent===dataArray[i].Name){
                  dataArray.push({'Name':users[j]._id, 'Content':users[j].profile.name+'\n'+'('+users[j].emails[0].address+')','Mobile':users[j].profile.mobile,'Product':users[j].profile.product,'Village':users[j].profile.village,'State':users[j].profile.state, 'Category':dataArray[i].Name})
                }
            }
        }
        return dataArray.length-1
    }
	render(){
	return(
		<div>
        <div id="tableView" style={{margin:3+'%'}}>
		<h3>Total Number of Downlines :{this.getDownlineCount()}</h3>
        <div style={{margin:1+'%'}}>
		<label>Filter by : </label>
		<select style={{marginLeft:2+'%'}} ref='filter' onChange={()=>this.onFilterChange()}>
		<option value='none'>All</option>
		<option value='pending'>Pending</option>
		<option value='paid'>Paid</option>
		</select>
		</div>
		
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
                
              </tr>
            </thead>
            <tbody>
            {this.renderRows()}
            </tbody>
          </table>
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
            payout:Payments.find().fetch(),
   };
}, Payment);