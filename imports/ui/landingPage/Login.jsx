import React from 'react';
import {Link} from 'react-router';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			error:''
		}
	}
	onIDEnter(){
		this.refs.registrationID.value=this.refs.registrationID.value.toUpperCase()
	}
	handle_submit(event){
		event.preventDefault();
		let email =  this.refs.registrationID.value.trim()
		let password = this.refs.password.value.trim();


		Meteor.loginWithPassword({email}, password, (err)=>{
			if(err){
				this.setState({error: err.reason});
			}
			else
			{
				this.setState({error:''});
				
			}
		});
	}
	render(){
		return(
			<div className="container-scroller">


    <div className="container-fluid" style={{backgroundImage: `url(images/backbg2.jpg)`}}>
      <div className="row" style={{backgroundColor: "pink"}}>
        <div className="content-wrapper full-page-wrapper d-flex align-items-center">
          <div className="card col-lg-4 offset-lg-4">
            <div className="card-block">
              <h3 className="card-title text-primary text-left mb-5 mt-4">HASTETRO LOGIN</h3>
              {this.state.error?<p style={{color:'red'}}>{this.state.error}</p>:undefined}
		
              <form onSubmit={this.handle_submit.bind(this)}>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                    <input type="text" className="form-control p_input" ref="registrationID" placeholder="Enter your registration ID" onKeyUp={()=>this.onIDEnter()} pattern="HT[0-9]{7}" title="ID starts with HTPL followed by 5 digits."/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                    <input type="password" className="form-control p_input" ref="password" placeholder="Enter Password" pattern=".{6,}" title="Enter six or more characters"/>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary" name="login">Login</button> <Link to="/"><button type="button" className="btn btn-danger" name="login" style={{marginLeft: 10+'px'}}>Cancel</button></Link>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
		)
	}
}

export default Login