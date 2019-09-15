import React, { Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

class UserList extends Component{
  constructor() {
        super(...arguments);
        
        this.state = {
            visibleGrey : false,
        };
    }
    
//function to remove training
  on_user_remove(user){
    Meteor.call('user.remove', user)
  }
  //function to handle edit submit event
  
  //function to list all trainings
	render_rows() {
	const arr = this.props.userList.filter(user=>user.profile.designation==='USER')
    return arr.map(user => {
      let { _id } = user;
      let id = user.emails[0].address;
      let name = user.profile.name;
      let mobile = user.profile.mobile
      let level = user.profile.level
      let product = user.profile.product
      return (
        <tr key={_id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{mobile}</td>
          <td>{level}</td>
          <td>Rs.{product}
          
          <span className="pull-right">
          <input type="submit"  className="btn btn-danger" style={{width : 100 +"%"}} value='Remove'
          onClick={()=>{
            let confirmRemove = confirm('Do you really want to remove this user?');
            if(confirmRemove===true){
              this.on_user_remove(user);
            }
          }} />
          </span>
          </td>
        </tr>
      );
    });
  }

	render() {
		const arr = this.props.userList.filter(user=>user.profile.designation==='USER')
    
    return (
      <div style={{padding:2+'%'}}>
      <h4>Total number of users : {arr.length}</h4>
      <hr/>
      <h3 className='heading'>User List</h3><br/>
        
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>HTPL ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Level</th>
            <th>Price-Product</th>
          </tr>
        </thead>
        <tbody>
          {this.render_rows()}
        </tbody>
      </table>
      </div>
    );
  }
}
   


export default createContainer(() => {
  Meteor.subscribe('users');
  return { 
            userList:Meteor.users.find().fetch(),
   };
}, UserList);




