import Navbar from '../Navbar';
import { render } from 'react-dom';
import * as React from "react";
import { LayoutAnimation, HierarchicalTree, DataBinding, DiagramComponent, SnapConstraints, Inject, DiagramTools } from "@syncfusion/ej2-react-diagrams";
import { createContainer } from 'meteor/react-meteor-data';
import { DataManager } from "@syncfusion/ej2-data";

const hierarchicalTree = [
    { 'Name': 'Diagram','fillColor': '#916DAF' },
    { 'Name': 'Layout', 'Category': 'Diagram' },
    { 'Name': 'Tree Layout', 'Category': 'Layout' },
    { 'Name': 'Organizational Chart', 'Category': 'Layout' },
    { 'Name': 'Hierarchical Tree', 'Category': 'Tree Layout' },
    { 'Name': 'Radial Tree', 'Category': 'Tree Layout' },
    { 'Name': 'Mind Map', 'Category': 'Hierarchical Tree' },
    { 'Name': 'Family Tree', 'Category': 'Hierarchical Tree' },
    { 'Name': 'Management', 'Category': 'Organizational Chart' },
    { 'Name': 'Human Resources', 'Category': 'Management' },
    { 'Name': 'University', 'Category': 'Management' },
    { 'Name': 'Business', 'Category': 'Management' },
];
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
        font-size: 13px;
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
    	dataArray.push({ 'Name': Meteor.userId(),'Content':'ME','Level':'','Mobile':'','fillColor': '#916DAF' })
    	
    	for(var i=0; i<dataArray.length; i++){
        for(var j=0; j<users.length; j++){
    			if(users[j].profile.parent===dataArray[i].Name){
    				dataArray.push({'Name':users[j]._id, 'Content':users[j].profile.name+'( '+users[j].emails[0].address+' )','Mobile':users[j].profile.mobile,'Level':users[j].profile.level, 'Category':dataArray[i].Name})
    			}
    		}
    	}
    	return (
        <div className="control-pane diagram-control-pane">
        <Navbar level='user'/><style>{SAMPLE_CSS}</style>
        <br/><br/><br/><br/>
        <div style={{display:'flex', justifyContent:'center'}}>
        <ul className="nav nav-pills">
	        <li className="active"><a data-toggle="pill" href="#treeView">Tree View</a></li>
		    <li><a data-toggle="pill" href="#tableView">Table View</a></li>
		</ul>
	    </div>
	    <div className="tab-content" >
		    <div id="treeView" className="tab-pane fade in active">
		 	
	        <div className="col-lg-12 control-section">
	          <div className="content-wrapper" style={{ width: "100%" }}>
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
		        }} //Disables all interactions except zoom/pan
		         tool={DiagramTools.ZoomPan} //Configures automatic layout
		         layout={{
		            type: "HierarchicalTree",
		            verticalSpacing: 30,
		            horizontalSpacing: 40,
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

	   
	 <div id="tableView" style={{margin:3+'%'}} className="tab-pane fade">
		<p className="bg-success">Active indicates 5 or more downline</p>
		<p className="bg-warning">Working indicates 1 or more downline</p>
		<p className="bg-danger">Inactive indicates 0 downline</p>
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
                <th>HTPL ID</th>
                <th>Mobile</th>
                <th>Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dataArray.map(data=>{
               const {Name, Content, Mobile, Level}=data;
               let status = this.getStatus(Name);
               if(this.state.filter==='none'){
               let color=''
               if(status==='active')
                 color='success'
               else if(status==='working')
                 color='warning'
               else
                 color='danger'
               return(
               <tr key={Name} className={color}><td>{Content}</td><td>{Mobile}</td><td>{Level}</td><td>{status}</td></tr>
               )  
               }
               else if(this.state.filter==='active'){
               if(status==='active')
                 return(
               <tr key={Name} className='success'><td>{Content}</td><td>{Mobile}</td><td>{Level}</td><td>{status}</td></tr>
               )
               }
               else if(this.state.filter==='working'){
               if(status==='working')
                 return(
               <tr key={Name} className='warning'><td>{Content}</td><td>{Mobile}</td><td>{Level}</td><td>{status}</td></tr>
               )
               }
               else if(this.state.filter==='inactive'){
                 if(status==='inactive')
                 return(
               <tr key={Name} className='danger'><td>{Content}</td><td>{Mobile}</td><td>{Level}</td><td>{status}</td></tr>
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
        strokeWidth: 2
    };
    obj.borderColor = "#3a6eb5";
    obj.backgroundColor = "#659be5";
    obj.shape.margin = { left: 5, right: 5, bottom: 5, top: 5 };
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
    obj.collapseIcon.shape = "None";
    obj.collapseIcon.fill = "lightgray";
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
//update the orientation of the Layout.
function updatelayout(target, orientation) {
    diagramInstance.layout.orientation = orientation;
    diagramInstance.dataBind();
    diagramInstance.doLayout();
}

export default createContainer(() => {
  Meteor.subscribe('users');
  return { 
            userList:Meteor.users.find().fetch()
   };
}, SeeDownline);
