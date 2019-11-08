import React, { Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import AddUser from './AddUser'

class UserList extends Component{
  constructor() {
        super(...arguments);
        
        this.state = {
            visibleGrey : false,
        };
    }
    
	render_rows() {
	const arr = this.props.userList.filter(user=>user.profile.parent===Meteor.userId())
    return arr.map(user => {
      let { _id } = user;
      let id = user.emails[0].address;
      const {name, mobile, village, state, product, sellingDate}=user.profile
      let sd = new Date(sellingDate).toLocaleDateString()
      return (
        <tr key={_id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{mobile}</td>
          <td>{village}</td>
          <td>{state}</td>
          <td>{product.substring(4)}</td>
          <td>{sd}         
          {/*<span className="pull-right">
          <input type="submit"  className="btn btn-danger" style={{width : 100 +"%"}} value='Remove'
          onClick={()=>{
            let confirmRemove = confirm('Do you really want to remove this user?');
            if(confirmRemove===true){
              this.on_user_remove(user);
            }
          }} />
          </span>*/}
          </td>
        </tr>
      );
    });
  }

	render() {
		const arr = this.props.userList.filter(user=>user.profile.parent===Meteor.userId())
    return (
      <div>
      <div style={{padding:2+'%'}}>

      <h4>Total number of downline : {arr.length}</h4>
      <hr/>
      <h3 className='heading'>Downline List</h3><br/>
        
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>HTPL ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Village</th>
            <th>State</th>
            <th>Product</th>
            <th>Selling date</th>
            
          </tr>
        </thead>
        <tbody>
          {this.render_rows()}
        </tbody>
      </table>
      </div>
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




