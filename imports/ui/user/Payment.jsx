import React, { Component } from 'react';
import {Link} from 'react-router';
import Navbar from '../Navbar'
import { createContainer } from 'meteor/react-meteor-data';
import Payout from '/imports/api/payout'

class Payment extends Component{
	constructor(){
    	super();
    	this.state={
    		filter:'none'
    	}
    }
    componentDidMount(){
        let a  = (this.getData())
        a.shift()
        for(var i=0; i<a.length; i++){
            Meteor.call('payout.insert', a[i], Meteor.users.find().fetch()[0].emails[0].address)
        }
    }
    getData(){
    	let users = this.props.userList.filter(user=>user.profile.designation==='USER')
    	let ar = users.filter(user=>user.profile.parent===Meteor.userId())
    	let user = this.props.userList.filter(user=>user._id===Meteor.userId())[0]
        let userid, username=''
        if(user!==undefined)
             userid = user.emails[0].address, username = user.profile.name
        let dataArray = []
    	dataArray.push({ 'Name': Meteor.userId(),'Content':'ME' })
    	
    	for(var i=0; i<dataArray.length; i++){
        	for(var j=0; j<users.length; j++){
                let payment
                let Level = users[j].profile.level;
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
                let dateValue
                new Date(users[j].profile.sellingDate).getDate()<15?dateValue=15:dateValue=30
                let dt = new Date(users[j].profile.sellingDate).getFullYear() +'-'+ parseInt(new Date(users[j].profile.sellingDate).getMonth()+1)+'-'+dateValue
                if(users[j].profile.parent===dataArray[i].Name){
                    dataArray.push({'Name':users[j]._id,'id':userid,'username':username,'ps':users[j].profile.paymentStatus,'Commission':payment, 'PaymentDate':new Date(dt),'Category':dataArray[i].Name})
    		    }
    		}
    	}
        let result=[]
        let arr = dataArray
        arr.forEach(function (a) {
    if (!this[a.PaymentDate]) {
        this[a.PaymentDate] = { name: a.username, id:a.id, Commission: 0, PaymentDate:a.PaymentDate, paymentStatus:'Pending' };
        result.push(this[a.PaymentDate]);
    }
    this[a.PaymentDate].Commission += a.Commission;
}, Object.create(null));

        return result
    }
    renderRows(){
        let ar = this.props.payout.filter(data=> data.id===Meteor.users.find().fetch()[0].emails[0].address)
    	ar.sort(function(a,b){
            return new Date(a.PaymentDate) - new Date(b.PaymentDate);
        });
        return ar.map(data=>{
    		const {_id,Category,id, name,Commission, PaymentDate, Name, chequeNumber, paidOn, paymentStatus}=data
    		let paymentMsg=''
            paymentStatus==='Paid'?paymentMsg=paymentStatus+' on : '+paidOn+' via cheque number '+chequeNumber:paymentMsg=paymentStatus
            let cls
    		if(paymentStatus==='Pending')
    			cls='bg-warning'
    		else if(paymentStatus==='Paid')
    			cls='bg-success'
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
    			</tr>
    			)
    		}
    		else if(this.state.filter==='pending'){
    			if(ps==='Pending'){
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
                    </tr>
	    		)
    			}
    		}
    		else if(this.state.filter==='paid'){
    			if(ps==='Paid'){
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
                    </tr>
	    		)
    			}
    		}
    		
    	})
    }
    onFilterChange(){
    	this.setState({filter:this.refs.filter.value})
    }

	render(){
	return(
		<div>
		<div id="tableView" style={{margin:3+'%'}}>
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
            payout:Payout.find().fetch(),
   };
}, Payment);