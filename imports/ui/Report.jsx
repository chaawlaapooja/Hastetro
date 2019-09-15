import React, { Component } from 'react';
import {Link} from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

class Report extends Component{
	constructor(){
		super();
		this.state={
			weekPickerValue:'',
			monthPickerValue:''
		}
	}
	
	renderInfo(param){
		Date.prototype.getWeek = function (dowOffset) {
/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};
		function convert(dt) {
              var date = new Date(dt),
              month = ("0" + (date.getMonth()+1)).slice(-2),
              day  = ("0" + date.getDate()).slice(-2);
              return [ date.getFullYear(), month, day ].join("-");
    	}

		let users = this.props.userList.filter(user=>user.profile.designation==='USER')
    	let dataArray = []
    	dataArray.push({ 'Name': Meteor.userId(),'Content':'ME','Level':'','Mobile':'','fillColor': '#916DAF' })
    	
    	for(var i=0; i<dataArray.length; i++){
        for(var j=0; j<users.length; j++){
    			if(users[j].profile.parent===dataArray[i].Name){
    				dataArray.push({'Name':users[j]._id,'SoldBy':users[i].emails[0].address,'ProductID':users[j].profile.productID, 'Content':users[j].profile.name+'( '+users[j].emails[0].address+' )','Mobile':users[j].profile.mobile,'Level':users[j].profile.level,'SellingDate':users[j].profile.sellingDate, 'Category':dataArray[i].Name})
    			}
    		}
    	}
    	dataArray.shift()
		
		if(param==='today'){
			let d = dataArray.filter(data=>{
				let dt = new Date(data.SellingDate).toLocaleDateString()
				let tdy = new Date().toLocaleDateString()
				if(dt===tdy)
					return data
			})
			return(
			<div>
			<label>Total Products sold today : {d.length}</label>
			{d.length>0?<table className="table table-bordered table-stripped table-hover table-responsive">
			<thead>
				<tr>
	              	<th>Sold by</th>
	                <th>Sold to</th>
	                <th>Mobile</th>
	                <th>Level</th>
	                <th>ProductID</th>
	                <th>Selling Date</th>
	            </tr>
	        </thead>
	        <tbody>
	        {d.map(data=>{
	        	const {SoldBy, Content, Level, Mobile, ProductID, SellingDate}=data;
	        	return(
	        		<tr key={Content}>
	        		<td>{SoldBy}</td>
	        		<td>{Content}</td>
	        		<td>{Mobile}</td>
	        		<td>{Level}</td>
	        		<td>{ProductID}</td>
	        		<td>{SellingDate}</td>
	        		</tr>
	        	)
	        })}
	        </tbody>
			</table>:<div style={{backgroundColor:'#dcdcdc'}}><em>No products sold</em></div>}
			</div>
			)
		}
		else if(param==='week'){
			let weekNumber=''
			if(this.state.weekPickerValue==='')
				weekNumber=new Date().getFullYear()+'-W'+new Date().getWeek()
			else
				weekNumber=this.state.weekPickerValue
			let d = dataArray.filter(data=>{
				let week = new Date(data.SellingDate).getFullYear()+'-W'+(new Date(data.SellingDate).getWeek())
				if(week===weekNumber){
					return data
				}
			})
			return(
			<div>
			<label>Total Products sold : {d.length}</label>
			{d.length>0?<table className="table table-bordered table-stripped table-hover table-responsive">
			<thead>
				<tr>
	              	<th>Sold by</th>
	                <th>Sold to</th>
	                <th>Mobile</th>
	                <th>Level</th>
	                <th>ProductID</th>
	                <th>Selling Date</th>
	            </tr>
	        </thead>
	        <tbody>
	        {d.map(data=>{
	        	const {SoldBy, Content, Level, Mobile, ProductID, SellingDate}=data;
	        	return(
	        		<tr key={Content}>
	        		<td>{SoldBy}</td>
	        		<td>{Content}</td>
	        		<td>{Mobile}</td>
	        		<td>{Level}</td>
	        		<td>{ProductID}</td>
	        		<td>{SellingDate}</td>
	        		</tr>
	        	)
	        })}
	        </tbody>
			</table>:<div style={{backgroundColor:'#dcdcdc'}}><em>No products sold</em></div>}
			</div>
			)
		}
		else if(param==='month'){
			let monthNumber=''
			if(this.state.monthPickerValue==='')
				monthNumber = new Date().getFullYear()+'-'+(('0'+(new Date().getMonth()+1)).slice(-2))
    		else
				monthNumber=this.state.monthPickerValue
			let d = dataArray.filter(data=>{
				let month = new Date(data.SellingDate).getFullYear()+'-'+(('0'+(new Date(data.SellingDate).getMonth()+1)).slice(-2))
				if(month===monthNumber){
					return data
				}
			})
			return(
			<div>
			<label>Total Products sold : {d.length}</label>
			{d.length>0?<table className="table table-bordered table-stripped table-hover table-responsive">
			<thead>
				<tr>
	              	<th>Sold by</th>
	                <th>Sold to</th>
	                <th>Mobile</th>
	                <th>Level</th>
	                <th>ProductID</th>
	                <th>Selling Date</th>
	            </tr>
	        </thead>
	        <tbody>
	        {d.map(data=>{
	        	const {SoldBy, Content, Level, Mobile, ProductID, SellingDate}=data;
	        	return(
	        		<tr key={Content}>
	        		<td>{SoldBy}</td>
	        		<td>{Content}</td>
	        		<td>{Mobile}</td>
	        		<td>{Level}</td>
	        		<td>{ProductID}</td>
	        		<td>{SellingDate}</td>
	        		</tr>
	        	)
	        })}
	        </tbody>
			</table>:<div style={{backgroundColor:'#dcdcdc'}}><em>No products sold</em></div>}
			</div>
			)
		}
	}
	onWeekPickerChange(){
		this.setState({weekPickerValue:this.refs.weekPicker.value})
	}
    onMonthPickerChange(){
    	console.log(this.refs.monthPicker.value)
    	this.setState({monthPickerValue:this.refs.monthPicker.value})
    }
	render(){
	return(
		<div style={{marginTop:7+'%', padding:2+'%'}}>
		<ul className="nav nav-tabs nav-justified">
    <li className="active"><a data-toggle="pill" href="#today">TODAY</a></li>
    <li><a data-toggle="pill" href="#home">WEEK</a></li>
    <li><a data-toggle="pill" href="#menu1">MONTH</a></li>
    </ul>
  
  	<div className="tab-content">
    <div id="today" className="tab-pane fade in active">
    <br/>
    {this.renderInfo('today')}
	</div>
	<div id="home" className="tab-pane fade">
    <br/>
    <input ref="weekPicker" type="week" onChange={()=>this.onWeekPickerChange()}/>
	{this.renderInfo('week')}
	</div>
	<div id="menu1" className="tab-pane fade">
    <br/>
    <input ref="monthPicker" type="month" onChange={()=>this.onMonthPickerChange()}/>
	{this.renderInfo('month')}
	</div>
	</div>
		</div>
		)
	}
};

export default createContainer(() => {
  Meteor.subscribe('users');
  return { 
            userList:Meteor.users.find().fetch(),
   };
}, Report);
