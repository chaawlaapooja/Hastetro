import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import Navbar from '../Navbar';
import Dropzone from 'react-dropzone'
import request from 'superagent'
import print from 'print-js'

const CLOUDINARY_UPLOAD_PRESET = 'nf7bfn7e';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/hastetro/upload';

class EditUser extends Component{
	constructor(props){
		super(props);

    this.state = {
      uploadedFileCloudinaryUrl: '',
      showImageName:'',
      errorAddress :'',
      errorNomineeAddress:'',
      hidePrintForm:true,
      hideInputFields:true,
      image:'',
      user:''
    };
	}

	componentDidMount(){
		this.refs.ID.focus()
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
		if(this.state.hideInputFields){
			this.refs.ID.readOnly=true
		
			let found = false
			let userInfo;
			for(var i=0; i<this.props.userList.length; i++){
				if(this.props.userList[i].emails[0].address===this.refs.ID.value.trim()){
					found = true
					this.setState({user:this.props.userList[i]})
					userInfo= this.props.userList[i]
					break;
				}
			}
			if(found){
				this.setState({hideInputFields:false})
				const {level, name, birthday, mobile, email, address, accountNumber,IFSC,PAN, imageURL, nomineeRelation, nomineeName, nomineeBirthday, nomineeAddress, nomineeMobile } = userInfo.profile
				this.refs.level.value=level;
				this.refs.name.value=name;
				this.refs.birthday.value=birthday;
				this.refs.mobile.value=mobile;
				this.refs.email.value=email;
				this.refs.address.value=address;
				this.refs.accountNumber.value=accountNumber;
				this.refs.IFSC.value=IFSC;
				this.refs.PAN.value=PAN;
				this.setState({uploadedFileCloudinaryUrl:imageURL})
				this.refs.pic.src=imageURL;
				this.refs.nomineeRelation.value=nomineeRelation;
				this.refs.nomineeName.value=nomineeName;
				this.refs.nomineeBirthday.value=nomineeBirthday;
				this.refs.nomineeMobile.value=nomineeMobile;
				this.refs.nomineeAddress.value=nomineeAddress
				
			}
			else{
				alert('No record found with such ID. Please enter valid HTPL ID')
				this.refs.ID.readOnly=false
				this.refs.ID.focus()
			}
		}
		else if(!this.state.hideInputFields){
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
	    else
	    {
	    	let image=''
	    	this.state.uploadedFileCloudinaryUrl===''?image=this.props.userList[0].profile.imageURL:image=this.state.uploadedFileCloudinaryUrl
		
		Meteor.call('user.update',
			this.state.user._id,
			this.refs.level.value,
			this.refs.name.value,
			this.refs.birthday.value,
			this.refs.mobile.value,
			this.refs.email.value,
			this.refs.address.value,
			this.refs.accountNumber.value,
			this.refs.IFSC.value,
			this.refs.PAN.value,
			image,
			this.refs.nomineeRelation.value,
			this.refs.nomineeName.value,
			this.refs.nomineeBirthday.value,
			this.refs.nomineeMobile.value,
			this.refs.nomineeAddress.value,
			this.state.user.profile.sellingDate,
			this.state.user.profile.product,
			this.state.user.profile.productID,
			Meteor.userId(),
			(err,res)=>{
				if(err)
					console.log(err)
				else{
					let answer = confirm('Do you want to print the details?');
					if(answer===true){
						this.setState({hidePrintForm:false})
						this.refs.pic.src=image
						printJS({ printable: 'printJS-form', type: 'html',header: 'HASTETRO TRADE PRIVATE LIMITED - USER DETAILS',modalMessage: 'Retrieving Document...',targetStyles: ['*'] })
						//printJS({ printable: 'printJS-form', type: 'html',  })
						this.refs.level.value='',
						this.refs.ID.value='',
						this.refs.name.value='',
						this.refs.birthday.value='',
						this.refs.mobile.value='',
						this.refs.email.value='',
						this.refs.address.value='',
						this.refs.accountNumber.value='',
						this.refs.IFSC.value='',
						this.refs.PAN.value='',
						this.refs.nomineeRelation.value='',
						this.refs.nomineeName.value='',
						this.refs.nomineeBirthday.value='',
						this.refs.nomineeMobile.value='',
						this.refs.nomineeAddress.value='',
						this.setState({uploadedFileCloudinaryUrl:'', hidePrintForm:true, image:'', hideInputFields:true})
						this.refs.ID.readOnly=false
						this.refs.ID.focus()
					}
					else{
					this.setState({uploadedFileCloudinaryUrl:'', hidePrintForm:true, image:'', hideInputFields:true})
					this.refs.ID.readOnly=false
					this.refs.ID.focus()
					}	
				}
			})
			}
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
		<div id='printJS-form' hidden={this.state.hidePrintForm}>
		
		<table className='table table-striped table-bordered table-hover table-responsive' >
		<tbody>
		<tr>
		<td>Profile picture : </td>
		<td><img ref='pic' src='' height="200" width="200"/></td>
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
		<td>{this.refs.birthday?new Date(this.refs.birthday.value).toLocaleDateString():undefined}</td>
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

		</tbody>
		</table>
		</div>
		<Navbar level='admin'/>
		<div className="newsletter">
		<br/><br/>
		<div className="container">
			<div className="col-md-6 w3agile_newsletter_left">
				<h3>Profile Edit</h3>
			</div>
			<div className="col-md-6 w3agile_newsletter_right">
				<form onSubmit={this.handle_submit.bind(this)}>
					<label>HTPL ID :</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="ID" placeholder="ID" pattern="HTPL[0-9]{5}" title="ID starts with HTPL followed by 5 digits." required/>
					<br/>
					<div hidden={this.state.hideInputFields}>
					<label>User level :</label>
					<input type="number" min="0" style={{marginLeft:2+'%',width:60+'%'}} ref="level" placeholder="Level (e.g, 2)" required={!this.state.hideInputFields}/>
					<br/>
					<label>Name :</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="name" placeholder='Name' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required={!this.state.hideInputFields} readOnly/><br/>
					<label>Birthday :</label>
					<input type="date" style={{marginLeft:2+'%',width:60+'%'}} ref="birthday" required={!this.state.hideInputFields} readOnly/><br/><br/>
					<label>Mobile :</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="mobile" placeholder='Mobile' pattern="[6-9]{1}[0-9]{9}" title="10 digit valid mobile number" required={!this.state.hideInputFields}/><br/>
					<label>Email :</label>
					<input type="email" ref="email" style={{marginLeft:2+'%',width:60+'%'}} placeholder='Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='xxx@xxx.domain' /><br/>
					<label>Address :</label><br/>
					<textarea ref="address" cols="30" rows="4" onKeyUp={this.call_validate_textarea_address.bind(this)} id="textareaid" placeholder='Address...'></textarea>{this.state.errorAddress?<span className="pull-right" style={{color:"red"}}>{this.state.errorAddress}</span>:undefined}<br/>
					<label>Account Number :</label>
					<input type="text" ref="accountNumber" style={{marginLeft:2+'%',width:60+'%'}} placeholder='Bank Account Number' pattern="[0-9]{9,18}" title='Enter valid account number' required={!this.state.hideInputFields} readOnly/><br/>
					<label>IFSC :</label>
					<input type="text" ref="IFSC" style={{marginLeft:2+'%',width:60+'%'}} placeholder='IFSC' pattern="^[A-Z]{4}[0][A-Z0-9]{6}$" title='Enter valid IFSC code(include capital letters. e.g, SBIN012345)' required={!this.state.hideInputFields} readOnly/><br/>
					<label>PAN Card Number :</label>
					<input type="text" ref="PAN" style={{marginLeft:2+'%',width:60+'%'}} placeholder='PAN Card Number' pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}" title='Enter valid PAN card number(5 characters followed by 4 digits and 1 character' /><br/>
					
					
					<label>Photo :</label><br/>
					
					<Dropzone ref="photo" multiple={false} accept="image/*" onDrop={this.on_image_drop.bind(this)} >
					
				        <div>
				          <img src={this.state.uploadedFileCloudinaryUrl} height="200" width="200"/>
				          </div>
				        
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
					 ref="nomineeRelation" pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required={!this.state.hideInputFields}/><br/>
					<label>Name of nominee:</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="nomineeName" placeholder="Nominee's Name" pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required={!this.state.hideInputFields}/><br/>
					<div hidden>
					<label>Birthday of nominee:</label>
					<input type="date" style={{marginLeft:2+'%',width:60+'%'}} ref="nomineeBirthday" /><br/><br/>
					<label>Mobile of nominee:</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="nomineeMobile" placeholder="Nominee's Mobile" pattern="[6-9]{1}[0-9]{9}" title="10 digit mobile number" /><br/>
					<label>Address of nominee:</label><br/>
					<textarea ref="nomineeAddress" cols="30" rows="4" onKeyUp={this.call_validate_textarea_nomineeAddress.bind(this)} id="textareaidNominee" placeholder="Nominees's Address..."></textarea>{this.state.errorNomineeAddress?<span className="pull-right" style={{color:"red"}}>{this.state.errorNomineeAddress}</span>:undefined}<br/>
					</div>
					</div>
					<input type="submit" className="btn btn-success"  value={this.state.hideInputFields?'Search':'Save and Print'} />
				</form>
			</div>
			<div className="clearfix"> </div>

		</div>
		
	</div>
	
		</div>
		)
	}
};

export default createContainer(() => {
  Meteor.subscribe('users');
  return { 
            userList:Meteor.users.find().fetch()
   };
}, EditUser);