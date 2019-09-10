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
    	let dataArray = []
    	dataArray.push({ 'Name': Meteor.userId(),'Content':'ME','Level':'','Mobile':'','fillColor': '#916DAF' })
    	
    	for(var i=0; i<dataArray.length; i++){
        	for(var j=0; j<users.length; j++){
    			if(users[j].profile.parent===dataArray[i].Name){
                    dataArray.push({'Name':users[j]._id,'ps':users[j].profile.parents[0].paymentStatus, 'Content':users[j].profile.name+'( '+users[j].emails[0].address+' )','Mobile':users[j].profile.mobile,'Level':users[j].profile.level, 'ProductID':users[j].profile.productID,'SellingDate':users[j].profile.sellingDate, 'Category':dataArray[i].Name})
    		    }
    		}
    	}
        return dataArray
    }
    renderRows(){
    	let ar = this.props.payout.filter(data=> data.main===Meteor.users.find().fetch()[0].emails[0].address)
    	ar.sort(function(a,b){
            return new Date(a.SellingDate) - new Date(b.SellingDate);
        });
        return ar.map(data=>{
    		const {_id,Category,ps, Content, Level, SellingDate, Mobile, ProductID, Name, chequeNumber, paidOn}=data
    		let payment;
    		if(Level==='2'){
    			payment=60
    		}
    		else if(Level==='3'){
    			payment=50
    		}
    		else if(Level==='4'){
    			payment=40
    		}
    		else if(Level==='5'){
    			payment=30
    		}
    		else if(Level==='6'){
    			payment=20
    		}
    		else if(Level>='7'){
    			payment=10
    		}
    		let sellingDate=new Date(SellingDate).toLocaleDateString()
    		let paymentDate=new Date(SellingDate)
    		let pd = paymentDate.setDate(paymentDate.getDate() + 15);
    		pd=new Date(pd).toLocaleDateString()
    		let paymentMsg=''
            ps==='Paid'?paymentMsg=ps+' on : '+paidOn+' via cheque number '+chequeNumber:paymentMsg=ps
            let cls
    		if(ps==='Pending')
    			cls='bg-warning'
    		else if(ps==='Paid')
    			cls='bg-success'
    		if(this.state.filter==='none'){
    			return(
    			<tr key={_id} className={cls}>
    			<td>{Content}</td>
    			<td>{Mobile}</td>
    			<td>{Level}</td>
    			<td>{ProductID}</td>
    			<td>Rs.{payment}</td>
    			<td>{paymentMsg}</td>
    			<td>{sellingDate}</td>
    			<td>{pd}</td>
    			</tr>
    			)
    		}
    		else if(this.state.filter==='pending'){
    			if(ps==='Pending'){
    				return(
	    			<tr key={_id} className={cls}>
	    			<td>{Content}</td>
	    			<td>{Mobile}</td>
	    			<td>{Level}</td>
	    			<td>{ProductID}</td>
	    			<td>Rs.{payment}</td>
	    			<td>{ps}</td>
	    			<td>{sellingDate}</td>
	    			<td>{pd}</td>
	    			</tr>
	    		)
    			}
    		}
    		else if(this.state.filter==='paid'){
    			if(ps==='Paid'){
    				return(
	    			<tr key={_id} className={cls}>
	    			<td>{Content}</td>
	    			<td>{Mobile}</td>
	    			<td>{Level}</td>
	    			<td>{ProductID}</td>
	    			<td>Rs.{payment}</td>
	    			<td>{ps}</td>
	    			<td>{sellingDate}</td>
	    			<td>{pd}</td>
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
		<Navbar level='user'/><br/><br/>
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
                <th>HTPL ID</th>
                <th>Mobile</th>
                <th>Level</th>
                <th>ProductID</th>
                <th>Payment</th>
                <th>Payment Status</th>
                <th>Selling Date</th>
                <th>Payment Date</th>
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