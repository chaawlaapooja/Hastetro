import { render } from 'react-dom';
import * as React from "react";
import { LayoutAnimation, HierarchicalTree, DataBinding, DiagramComponent, DiagramConstraints, SnapConstraints, Inject } from "@syncfusion/ej2-react-diagrams";
import { createContainer } from 'meteor/react-meteor-data';
import { DataManager } from "@syncfusion/ej2-data";

const SAMPLE_CSS = `.image-pattern-style {
        background-color: white;
        background-size: contain;
        background-repeat: no-repeat;
        height: 75px;
        width: calc((100% - 12px) / 3);
        cursor: pointer;
        border: 1px solid #D5D5D5;
        background-position: center;
        float: left;
    }

    .image-pattern-style:hover {
        border-color: gray;
        border-width: 2px;
    }

    .property-panel-header {
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .row-header {
        font-size: 30px;
        font-weight: 500;
    }

    .e-checkbox-wrapper .e-label {
        font-size: 12px;
    }

    .e-selected-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .diagram-control-pane .col-xs-6 {
        padding-left: 0px;
        padding-right: 0px;
    }`;
let diagramInstance;
let hSpacing;
let vSpacing;
let checkBoxObj;
export class SeeDownline extends React.Component {
    constructor(){
    	super();
    	this.state={
    		filter:'none'
    	}
    }
    getStatus(_id){
    	let users = this.props.userList.filter(user=>user.profile.designation==='USER')
    	let ar = users.filter(user=>user.profile.parent===_id)
		if(ar.length>=5)
			return 'active'
		else if(ar.length===0)
			return 'inactive'
		else
			return 'working'    	
    }
    onFilterChange(){
    	this.setState({filter:this.refs.filter.value})
    }
    render() {
    	let users = this.props.userList.filter(user=>user.profile.designation==='USER')
    	let ar = users.filter(user=>user.profile.parent===Meteor.userId())
    	let dataArray = []
      dataArray.push({ 'Name': Meteor.userId(),'Content':'ADMIN(ME)','Product':'','Mobile':'','fillColor': '#916DAF' })
    	
    	for(var i=0; i<dataArray.length; i++){
        for(var j=0; j<users.length; j++){
    			if(users[j].profile.parent===dataArray[i].Name){
            let parent = this.props.userList.filter(user=>users[j].profile.parent===user._id)
    				parent=parent[0].emails[0].address
            dataArray.push({'Name':users[j]._id, 'Content':users[j].profile.name+'\n'+'('+users[j].emails[0].address+')','Mobile':users[j].profile.mobile,'Product':users[j].profile.product,'Village':users[j].profile.village,'State':users[j].profile.state,'Parent':parent, 'Category':dataArray[i].Name})
    			}
    		}
    	}
      return (
        <div className="control-pane diagram-control-pane">
        <br/><br/><br/><br/>
        <div>
        <ul className="nav nav-pills" role="tablist" style={{display:'flex', justifyContent:'space-around'}}>
	      <li className="nav-item">
          <a className="nav-link active" data-toggle="pill" href="#treeView">Tree View</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="pill" href="#tableView">Table View</a>
        </li></ul>
	    </div>
	    <div className="tab-content" >
		    <div id="treeView" className="container tab-pane active">
		 	
	        <div className="col-lg-12 control-section">
	          <div style={{ width: "100%" }}>
	            <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"499px"} snapSettings={{ constraints: SnapConstraints.None }} //configures data source settings
		          dataSourceSettings={{
		            //sets the fields to bind
		            id: "Name",
		            parentId: "Category",
		            dataSource: new DataManager(dataArray),
		            doBinding: (nodeModel, data, diagram) => {
		                nodeModel.shape = {
		                    type: "Text",
		                    content: data.Content
		                };
		            }
		        }}
             constraints={DiagramConstraints.None} 
              
             layout={{
		            type: "HierarchicalTree",
		            verticalSpacing: 40,
		            horizontalSpacing: 50,
		            enableAnimation: true
		        }} //Defines the default node and connector properties
		         getNodeDefaults={(obj, diagram) => {
		            return nodeDefaults(obj, diagram);
		        }} getConnectorDefaults={(connector, diagram) => {
		            return connectorDefaults(connector, diagram);
		        }}>
		              <Inject services={[DataBinding, HierarchicalTree, LayoutAnimation]}/>
	            </DiagramComponent>
	          </div>
	        </div>
	        </div>

	   
	    <div id="tableView" style={{margin:3+'%'}} className="container tab-pane fade">
		<p className="table-success">Active indicates 5 or more downline</p>
		<p className="table-warning">Working indicates 1 or more downline</p>
		<p className="table-danger">Inactive indicates 0 downline</p>
		<div style={{margin:1+'%'}}>
		<label>Filter by : </label>
		<select style={{marginLeft:2+'%'}} ref='filter' onChange={()=>this.onFilterChange()}>
		<option value='none'></option>
		<option value='active'>Active</option>
		<option value='inactive'>Inactive</option>
		<option value='working'>Working</option>
		</select>
		</div>
		
		<table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Parent ID</th>
                <th>HTPL ID</th>
                <th>Business Associate name</th>
                <th>Mobile</th>
                <th>Village</th>
                <th>State</th>
                <th>Product</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dataArray.map(data=>{
               const {Parent, Village, State, Name, Content, Mobile, Product}=data;
               var n = Content.indexOf("(");
               var end = Content.indexOf(")");
              var name=Content.substring(0,n)
              var id = Content.substring(n+1,end)
              let status = this.getStatus(Name);
               if(this.state.filter==='none'){
               let color=''
               if(status==='active')
                 color='table-success'
               else if(status==='working')
                 color='table-warning'
               else
                 color='table-danger'
               return(
               <tr key={Name} className={color}><td>{Parent}</td><td>{id}</td><td>{name}</td><td>{Mobile}</td><td>{Village}</td><td>{State}</td><td>{Product.substring(4)}</td><td>{status}</td></tr>
               )  
               }
               else if(this.state.filter==='active'){
               if(status==='active')
                 return(
               <tr key={Name} className='table-success'><td>{Parent}</td><td>{id}</td><td>{name}</td><td>{Mobile}</td><td>{Village}</td><td>{State}</td><td>{Product.substring(4)}</td><td>{status}</td></tr>
               )
               }
               else if(this.state.filter==='working'){
               if(status==='working')
                 return(
               <tr key={Name} className='table-warning'><td>{Parent}</td><td>{id}</td><td>{name}</td><td>{Mobile}</td><td>{Village}</td><td>{State}</td><td>{Product.substring(4)}</td><td>{status}</td></tr>
               )
               }
               else if(this.state.filter==='inactive'){
                 if(status==='inactive')
                 return(
               <tr key={Name} className='table-danger'><td>{Parent}</td><td>{id}</td><td>{name}</td><td>{Mobile}</td><td>{Village}</td><td>{State}</td><td>{Product.substring(4)}</td><td>{status}</td></tr>
               )
               }
              })}
            </tbody>
          </table>
		 </div>  
	              
	     </div>      
            
         
      </div>);
    }
}
//sets node default value
function nodeDefaults(obj, diagram) {
    obj.style = {
        fill: "#659be5",
        strokeColor: "none",
        color: "white",
        strokeWidth: 2,
        fontSize: 15
    };

    obj.borderColor = "#3a6eb5";
    obj.backgroundColor = "#659be5";
    obj.shape.margin = { left: 10, right: 10, bottom: 10, top: 10 };
    obj.expandIcon = {
        height: 10,
        width: 10,
        shape: "None",
        fill: "lightgray",
        offset: { x: 0.5, y: 1 }
    };
    obj.expandIcon.verticalAlignment = "Auto";
    obj.expandIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.offset = { x: 0.5, y: 1 };
    obj.collapseIcon.verticalAlignment = "Auto";
    obj.collapseIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.height = 10;
    obj.collapseIcon.width = 10;
    obj.collapseIcon.padding.top = 5;
    obj.collapseIcon.fill = "lightgray";
    obj.expandIcon = {
    shape: 'ArrowDown',
    width: 10,
    height: 10
  };
  obj.collapseIcon = {
    shape: 'ArrowUp',
    width: 10,
    height: 10
  };
    return obj;
}
//sets connector default value
function connectorDefaults(connector, diagram) {
    connector.targetDecorator.shape = "None";
    connector.type = "Orthogonal";
    connector.style.strokeColor = "#6d6d6d";
    connector.constraints = 0;
    connector.cornerRadius = 5;
    return connector;
}

export default createContainer(() => {
  Meteor.subscribe('users');
  return { 
            userList:Meteor.users.find().fetch(),
   };
}, SeeDownline);
