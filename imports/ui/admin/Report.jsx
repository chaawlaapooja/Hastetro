import React, { Component } from 'react';
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

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) ;
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
		

		let users = this.props.userList.filter(user=>user.profile.designation==='USER')
    	let dataArray = []
    	dataArray.push({ 'Name': Meteor.userId(),'Content':'ME','Level':'','Mobile':'','fillColor': '#916DAF' })
    	
    	for(var i=0; i<dataArray.length; i++){
        for(var j=0; j<users.length; j++){
    			if(users[j].profile.parent===dataArray[i].Name){
    				dataArray.push({'Name':users[j]._id,'SoldBy':users[i].emails[0].address,'ProductID':users[j].profile.productID,'Product':users[j].profile.product, 'Content':users[j].profile.name+'( '+users[j].emails[0].address+' )','Mobile':users[j].profile.mobile,'Level':users[j].profile.level,'SellingDate':users[j].profile.sellingDate, 'Category':dataArray[i].Name})
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
	              	<th>Sponsor Id</th>
	                <th>Business Associate Name</th>
	                <th>Business Associate ID</th>
	                <th>Product Name</th>
	                <th>Selling Date</th>
	            </tr>
	        </thead>
	        <tbody>
	        {d.map(data=>{
	        	const {SoldBy, Content, Level, Mobile, ProductID, SellingDate, Product}=data;
	        	var n = Content.indexOf("(");
	        	var end = Content.indexOf(")");
	        	var name=Content.substring(0,n)
	        	var id = Content.substring(n+1,end)
	        	var product=Product.substring(4)
	        	var sd = new Date(SellingDate).toLocaleDateString()
	        	return(
	        		<tr key={Content}>
	        		<td>{SoldBy}</td>
	        		<td>{name}</td>
	        		<td>{id}</td>
	        		<td>{product}</td>
	        		<td>{sd}</td>
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
	              	<th>Sponsor Id</th>
	                <th>Business Associate Name</th>
	                <th>Business Associate ID</th>
	                <th>Product Name</th>
	                <th>Selling Date</th>
	            </tr>
	        </thead>
	        <tbody>
	        {d.map(data=>{
	        	const {SoldBy, Content, Level, Mobile, ProductID, SellingDate, Product}=data;
	        	var n = Content.indexOf("(");
	        	var end = Content.indexOf(")");
	        	var name=Content.substring(0,n)
	        	var id = Content.substring(n+1, end)
	        	var product=Product.substring(4)
	        	var sd = new Date(SellingDate).toLocaleDateString()
	        	return(
	        		<tr key={Content}>
	        		<td>{SoldBy}</td>
	        		<td>{name}</td>
	        		<td>{id}</td>
	        		<td>{product}</td>
	        		<td>{sd}</td>
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
	              	<th>Sponsor Id</th>
	                <th>Business Associate Name</th>
	                <th>Business Associate ID</th>
	                <th>Product Name</th>
	                <th>Selling Date</th>
	            </tr>
	        </thead>
	        <tbody>
	        {d.map(data=>{
	        	const {SoldBy, Content, Level, Mobile, ProductID, SellingDate, Product}=data;
	        	var n = Content.indexOf("(");
	        	var end = Content.indexOf(")");
	        	var name=Content.substring(0,n)
	        	var id = Content.substring(n+1,end)
	        	var product=Product.substring(4)
	        	var sd = new Date(SellingDate).toLocaleDateString()
	        	return(
	        		<tr key={Content}>
	        		<td>{SoldBy}</td>
	        		<td>{name}</td>
	        		<td>{id}</td>
	        		<td>{product}</td>
	        		<td>{sd}</td>
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
		<ul className="nav nav-tabs" style={{display:'flex', justifyContent:'space-around'}}>
    <li className="nav-item">
    <a className="nav-link active" href="#today" role="tab" data-toggle="tab">Today</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#week" role="tab" data-toggle="tab">Week</a>
  </li>  
  <li className="nav-item">
    <a className="nav-link" href="#month" role="tab" data-toggle="tab">Month</a>
  </li>  </ul>
  
  	<div className="tab-content">
    <div id="today" role="tabpanel" className="container tab-pane active">
    <br/>
    {this.renderInfo('today')}
	</div>
	<div id="week" role="tabpanel" className="container tab-pane fade">
    <br/>
    <input ref="weekPicker" type="week" onChange={()=>this.onWeekPickerChange()}/>
	{this.renderInfo('week')}
	</div>
	<div id="month" role="tabpanel" className="container tab-pane fade">
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
