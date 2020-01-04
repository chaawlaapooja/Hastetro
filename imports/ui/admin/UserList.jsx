import React, { Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class UserList extends Component{
//function to remove training
  on_user_remove(user){
    let n = this.props.userList.filter(user=>user.profile.designation==='USER')
    let level = (user.profile.level)
    if(level>=7)
      level=7
    else level++
    let parents = []
    parents.push(user.profile.parent)
    for(var i=0; parents.length<level; i++){
      let lastIndex = parents.length-1
      let p = (n.filter(user=>user.profile.designation==='USER' && user._id===parents[lastIndex]))
      parents.push(p[0].profile.parent)
    }
    let p = parents.filter(parent=>parent!=='8XxCNeLhEPgSPtort')
    p.forEach(parent=>{
      let u = this.props.userList.filter(user=>user._id===parent)
      let id=u[0].emails[0].address
      let l=parents.indexOf(parent)
      let payment
      if(l===0)
        payment=60
      else if(l===1)
        payment=50
      else if(l===2)
        payment=40
      else if(l===3)
        payment=30
      else if(l===4)
        payment=20
      else if(l===5)
        payment=10
      else if(l===6)
        payment=10
      Meteor.call('payment.deductAmountWhenUserDeleted',id,payment, user.profile.sellingDate)
    })
    Meteor.call('pin.update', user.profile.productID, true)
    Meteor.call('payment.remove', user.emails[0].address)
    Meteor.call('user.remove', user);
  }
  //function to list all trainings
	render_rows() {
	const arr = this.props.userList.filter(user=>user.profile.designation==='USER')
    return arr.map(user => {
      let { _id } = user;
      let id = user.emails[0].address;
      let name = user.profile.name;
      let mobile = user.profile.mobile
      let village = user.profile.village
      let state = user.profile.state
      let product = user.profile.product
      let btnCls=''
      let usersArr = this.props.userList.filter(user=>user.profile.designation==='USER')
      let ar = usersArr.filter(u=>u.profile.parent===user._id)
    if(ar.length===0)
      btnCls = 'btn btn-danger'
    else
      btnCls = 'btn btn-danger disabled'
    
      return (
        <tr key={_id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{mobile}</td>
          <td>{village}</td>
          <td>{state}</td>
          <td>Rs.{product}
          
          <span className="pull-right">
          {btnCls==='btn btn-danger'?<button className={btnCls} style={{width : 100 +"%"}}
          onClick={()=>{
            let confirmRemove = confirm('Do you really want to remove this user?');
            if(confirmRemove===true){
              this.on_user_remove(user);
            }
          }}>Remove</button>:<button className={btnCls} style={{width : 100 +"%"}}>Remove</button>}
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
            <th>Village</th>
            <th>State</th>
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




