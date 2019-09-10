import React, { Component } from 'react';
import {Link} from 'react-router';
import Navbar from '../Navbar';
import Dropzone from 'react-dropzone'
import request from 'superagent'
import print from 'print-js'
import UserList from './UserList'

const CLOUDINARY_UPLOAD_PRESET = 'nf7bfn7e';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/hastetro/upload';

class AddUser extends Component{
	constructor(props){
		super(props);

    this.state = {
      uploadedFileCloudinaryUrl: '',
      showImageName:'',
      errorAddress :'',
      errorNomineeAddress:'',
      showPrintForm:true,
      image:''
    };
	}

	componentDidMount(){
		this.refs.ID.value='HTPL'+Math.random().toString().slice(-5);
		this.refs.ID.readOnly=true
			//printJS({ printable: 'printJS-form', type: 'html', header: 'PrintJS - Form Element Selection' })
					
	}
	//function to handle when image is dropped in dropzone
	on_image_drop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handle_image_upload(files[0]);
  }
  //function to handle image upload
  handle_image_upload(file) {
  	let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        alert(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        this.setState({
        	showImageName: this.state.uploadedFile.name, error:''
        })

      }
    });
  }

	//function that handles submit event from form
	handle_submit(event){
		
		event.preventDefault();
		if(document.getElementById("textareaid").value === ''){
	      this.setState({errorAddress:"Details can't be empty. Please fill this field"})
	      document.getElementById("textareaid").focus()
	    }
	    else if(document.getElementById("textareaid").value.length<5){
	      this.setState({errorAddress:"Please enter at least 5 characters"});
	      document.getElementById("textareaid").focus()
	    }
	    else if((/[a-zA-Z0-9-_!.]+/.test(document.getElementById("textareaid").value))===false)
	    {
	      this.setState({errorAddress:"You can only use characters(a-z or A-Z), digits(0-9), underscore(_) and hyphen(-)"});
	      document.getElementById("textareaid").focus()
	    }
	    else if(document.getElementById("textareaidNominee").value === ''){
	      this.setState({errorNomineeAddress:"Nominee Address can't be empty. Please fill this field"})
	      document.getElementById("textareaidNominee").focus()
	    }
	    else if(document.getElementById("textareaidNominee").value.length<5){
	      this.setState({errorNomineeAddress:"Please enter at least 5 characters"});
	      document.getElementById("textareaidNominee").focus()
	    }
	    else if((/[a-zA-Z0-9-_!.]+/.test(document.getElementById("textareaidNominee").value))===false)
	    {
	      this.setState({errorNomineeAddress:"You can only use characters(a-z or A-Z), digits(0-9), underscore(_) and hyphen(-)"});
	      document.getElementById("textareaidNominee").focus()
	    }
	    else
	    {
		let imageURL='';
		if(this.state.uploadedFileCloudinaryUrl===''){
			this.setState({image:'https://res.cloudinary.com/hastetro/image/upload/v1567596651/jmv1nigeofc2ljcsjrnk.jpg'})
			imageURL='https://res.cloudinary.com/hastetro/image/upload/v1567596651/jmv1nigeofc2ljcsjrnk.jpg'
		}
		else{
			this.setState({image:this.state.uploadedFileCloudinaryUrl})
			imageURL=this.state.uploadedFileCloudinaryUrl
		}
		Meteor.call('user.create',
			'USER',
			this.refs.level.value,
			this.refs.ID.value,
			this.refs.name.value,
			this.refs.birthday.value,
			this.refs.mobile.value,
			this.refs.email.value,
			this.refs.address.value,
			this.refs.accountNumber.value,
			this.refs.IFSC.value,
			this.refs.PAN.value,
			this.refs.password.value,
			imageURL,
			this.refs.nomineeRelation.value,
			this.refs.nomineeName.value,
			this.refs.nomineeBirthday.value,
			this.refs.nomineeMobile.value,
			this.refs.nomineeAddress.value,
			this.refs.nomineeAccountNumber.value,
			this.refs.nomineeIFSC.value,
			Meteor.userId(),
			(err,res)=>{
				if(err)
					alert('Oops! Some error occured. Please try again')
				else{
					let answer = confirm('Do you want to print the details?');
					if(answer===true){
						this.setState({showPrintForm:false})
						printJS({ printable: 'printJS-form', type: 'html',header: 'HASTETRO TRADE PRIVATE LIMITED - USER DETAILS',modalMessage: 'Retrieving Document...',targetStyles: ['*'] })
						//printJS({ printable: 'printJS-form', type: 'html',  })
						this.refs.ID.value='HTPL'+Math.random().toString().slice(-5);
						this.refs.ID.readOnly=true
						this.refs.level.value='',
						this.refs.name.value='',
						this.refs.birthday.value='',
						this.refs.mobile.value='',
						this.refs.email.value='',
						this.refs.address.value='',
						this.refs.accountNumber.value='',
						this.refs.IFSC.value='',
						this.refs.PAN.value='',
						this.refs.password.value='',
						this.refs.nomineeRelation.value='',
						this.refs.nomineeName.value='',
						this.refs.nomineeBirthday.value='',
						this.refs.nomineeMobile.value='',
						this.refs.nomineeAddress.value='',
						this.refs.nomineeAccountNumber.value='',
						this.refs.nomineeIFSC.value='',
						this.setState({uploadedFileCloudinaryUrl:'', showPrintForm:true, image:''})
					}
				}
			})
		}
	
	}
	call_validate_textarea_address(event){
    if(document.getElementById("textareaid").value === ''){
      this.setState({errorAddress:"Details can't be empty. Please fill this field"})
      document.getElementById("textareaid").focus()
    }
    else if(document.getElementById("textareaid").value.length<5){
      this.setState({errorAddress:"Please enter at least 5 characters"});
      document.getElementById("textareaid").focus()
    }
    else if((/[a-zA-Z0-9-_!.]+/.test(document.getElementById("textareaid").value))===false)
    {
      this.setState({errorAddress:"You can only use characters(a-z or A-Z), digits(0-9), underscore(_) and hyphen(-)"});
      document.getElementById("textareaid").focus()
    }
    else{
      this.setState({errorAddress:""})
    }
  }
  call_validate_textarea_nomineeAddress(){
  	if(document.getElementById("textareaidNominee").value === ''){
      this.setState({errorNomineeAddress:"Nominee Address can't be empty. Please fill this field"})
      document.getElementById("textareaidNominee").focus()
    }
    else if(document.getElementById("textareaidNominee").value.length<5){
      this.setState({errorNomineeAddress:"Please enter at least 5 characters"});
      document.getElementById("textareaidNominee").focus()
    }
    else if((/[a-zA-Z0-9-_!.]+/.test(document.getElementById("textareaidNominee").value))===false)
    {
      this.setState({errorNomineeAddress:"You can only use characters(a-z or A-Z), digits(0-9), underscore(_) and hyphen(-)"});
      document.getElementById("textareaidNominee").focus()
    }
    else{
      this.setState({errorNomineeAddress:""})
    }
  }
	render(){
	return(
		<div>
		<div id='printJS-form' hidden={this.state.showPrintForm}>
		<table className='table table-striped table-bordered table-hover table-responsive' >
		<tbody>
		<tr>
		<td>Profile picture : </td>
		<td><img src={this.state.image} height="200" width="200"/></td>
		</tr>	
		<tr>
		<td>HTPL ID :</td>
		<td>{this.refs.ID?this.refs.ID.value:undefined}</td>
		</tr>
		<tr>
		<td>Name :</td>
		<td>{this.refs.name?this.refs.name.value:undefined}</td>
		</tr>
		<tr>
		<td>Birthday :</td>
		<td>{this.refs.birthday?this.refs.birthday.value:undefined}</td>
		</tr>
		<tr>
		<td>Mobile :</td>
		<td>{this.refs.mobile?this.refs.mobile.value:undefined}</td>
		</tr>
		<tr>
		<td>Email :</td>
		<td>{this.refs.email?this.refs.email.value:undefined}</td>
		</tr>
		<tr>
		<td>Address :</td>
		<td>{this.refs.address?this.refs.address.value:undefined}</td>
		</tr>
		<tr>
		<td>Bank Account Number :</td>
		<td>{this.refs.accountNumber?this.refs.accountNumber.value:undefined}</td>
		</tr>
		<tr>
		<td>IFSC :</td>
		<td>{this.refs.IFSC?this.refs.IFSC.value:undefined}</td>
		</tr>
		<tr>
		<td>PAN Card Number :</td>
		<td>{this.refs.PAN?this.refs.PAN.value:undefined}</td>
		</tr>
		<tr><td><strong>Nominee Details :</strong></td></tr>
		<tr>
		<td>Relation with the Nominee :</td>
		<td>{this.refs.nomineeRelation?this.refs.nomineeRelation.value:undefined}</td>
		</tr>
		<tr>
		<td>Name of the Nominee :</td>
		<td>{this.refs.nomineeName?this.refs.nomineeName.value:undefined}</td>
		</tr>
		<tr>
		<td>Birthday of the Nominee :</td>
		<td>{this.refs.nomineeBirthday?this.refs.nomineeBirthday.value:undefined}</td>
		</tr>
		<tr>
		<td>Mobile Number of Nominee:</td>
		<td>{this.refs.nomineeMobile?this.refs.nomineeMobile.value:undefined}</td>
		</tr>
		<tr>
		<td>Address of the Nominee :</td>
		<td>{this.refs.nomineeAddress?this.refs.nomineeAddress.value:undefined}</td>
		</tr>
		<tr>
		<td>Account Number of the Nominee:</td>
		<td>{this.refs.nomineeAccountNumber?this.refs.nomineeAccountNumber.value:undefined}</td>
		</tr>
		<tr>
		<td>IFSC of the Nominee:</td>
		<td>{this.refs.nomineeIFSC?this.refs.nomineeIFSC.value:undefined}</td>
		</tr>

		</tbody>
		</table>
		</div>
		<Navbar level='admin'/>
		<div className="newsletter">
		<div className="container">
			<div className="col-md-6 w3agile_newsletter_left">
				<h3>Add User</h3>
			</div>
			<div className="col-md-6 w3agile_newsletter_right">
				<form onSubmit={this.handle_submit.bind(this)}>
					<label>User level :</label>
					<input type="number" min="0" style={{marginLeft:2+'%',width:60+'%'}} ref="level" placeholder="Level (e.g, 2)" required/>
					<br/>
					<label>HTPL ID :</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="ID" placeholder="ID" required/>
					<br/>
					<label>Name :</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="name" placeholder='Name' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required/><br/>
					<label>Birthday :</label>
					<input type="date" style={{marginLeft:2+'%',width:60+'%'}} ref="birthday" required/><br/><br/>
					<label>Mobile :</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="mobile" placeholder='Mobile' pattern="[6-9]{1}[0-9]{9}" title="10 digit valid mobile number" required/><br/>
					<label>Email :</label>
					<input type="email" ref="email" style={{marginLeft:2+'%',width:60+'%'}} placeholder='Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='xxx@xxx.domain' required/><br/>
					<label>Address :</label><br/>
					<textarea ref="address" cols="30" rows="4" onKeyUp={this.call_validate_textarea_address.bind(this)} id="textareaid" placeholder='Address...'></textarea>{this.state.errorAddress?<span className="pull-right" style={{color:"red"}}>{this.state.errorAddress}</span>:undefined}<br/>
					<label>Account Number :</label>
					<input type="text" ref="accountNumber" style={{marginLeft:2+'%',width:60+'%'}} placeholder='Bank Account Number' pattern="[0-9]{9,18}" title='Enter valid account number' required/><br/>
					<label>IFSC :</label>
					<input type="text" ref="IFSC" style={{marginLeft:2+'%',width:60+'%'}} placeholder='IFSC' pattern="^[A-Z]{4}[0][A-Z0-9]{6}$" title='Enter valid IFSC code(include capital letters. e.g, SBIN012345)' required/><br/>
					<label>PAN Card Number :</label>
					<input type="text" ref="PAN" style={{marginLeft:2+'%',width:60+'%'}} placeholder='PAN Card Number' pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}" title='Enter valid PAN card number(5 characters followed by 4 digits and 1 character' /><br/>
					
					<label>Password :</label>
					<input type="password" ref="password" style={{marginLeft:2+'%',width:60+'%'}} placeholder='Password' pattern=".{6,}" title="Enter six or more characters" required/><br/>
					
					<label>Photo :</label><br/>
					
					<Dropzone ref="photo" multiple={false} accept="image/*" onDrop={this.on_image_drop.bind(this)} >
					{this.state.uploadedFileCloudinaryUrl === '' ?
      					 <p style={{ paddingLeft:2+'%'}}>Drop an image for profile picture or click to select a file to upload</p>
      					 :
				        <div>
				          <img src={this.state.uploadedFileCloudinaryUrl} height="200" width="200"/>
				          </div>
				        }
				    </Dropzone>{this.state.error?<span className="pull-right" style={{color:"red"}}>{this.state.error}</span>:undefined}
    				<div>
        			{this.state.uploadedFileCloudinaryUrl === '' ? null :
   						<div>
   						<p>{this.state.showImageName}</p>
			        	</div>
			        }
			      </div><br/>
			      	<label>Nominee Details:</label><br/>
			      	<label>Relation with nominee:</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} placeholder="Relation with Nominee" 
					 ref="nomineeRelation" pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required/><br/><br/>
					<label>Name of nominee:</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="nomineeName" placeholder="Nominee's Name" pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required/><br/>
					<label>Birthday of nominee:</label>
					<input type="date" style={{marginLeft:2+'%',width:60+'%'}} ref="nomineeBirthday"  required/><br/><br/>
					<label>Mobile of nominee:</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="nomineeMobile" placeholder="Nominee's Mobile" pattern="[6-9]{1}[0-9]{9}" title="10 digit mobile number" required/><br/>
					<label>Address of nominee:</label><br/>
					<textarea ref="nomineeAddress" cols="30" rows="4" onKeyUp={this.call_validate_textarea_nomineeAddress.bind(this)} id="textareaidNominee" placeholder="Nominees's Address..."></textarea>{this.state.errorNomineeAddress?<span className="pull-right" style={{color:"red"}}>{this.state.errorNomineeAddress}</span>:undefined}<br/>
					<label>Account Number of nominee :</label>
					<input type="number" ref="nomineeAccountNumber" style={{marginLeft:2+'%',width:60+'%'}} placeholder="Nominee's account number" pattern="[0-9]{9,18}" title='Enter valid account number' required/><br/>
					<label>IFSC of nominee :</label>
					<input type="text" ref="nomineeIFSC" style={{marginLeft:2+'%',width:60+'%'}} placeholder="Nominee's IFSC" pattern="^[A-Z]{4}[0][A-Z0-9]{6}$" title='Enter valid IFSC code(include capital letters. e.g, SBIN012345)' required/><br/>
					
					<input type="submit" className="btn btn-success"  value='Add' />
				</form>
			</div>
			<div className="clearfix"> </div>

		</div>
		
	</div>
	<UserList />
		</div>
		)
	}
};

export default AddUser;