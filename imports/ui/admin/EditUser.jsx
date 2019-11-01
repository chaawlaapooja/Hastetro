import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
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
				const {level, name, birthday, mobile, email, village, tahsil, district, pincode, state,bank, accountNumber,IFSC,aadhar, PAN, imageURL, nomineeRelation, nomineeName, nomineeBirthday, nomineeVillage, nomineeTahsil, nomineeDistrict, nomineePincode, nomineeState, nomineeMobile } = userInfo.profile
				this.refs.level.value=level;
				this.refs.name.value=name;
				this.refs.birthday.value=birthday;
				this.refs.mobile.value=mobile;
				this.refs.email.value=email;
				this.refs.village.value=village;
				this.refs.tahsil.value=tahsil;
				this.refs.district.value=district;
				this.refs.pincode.value=pincode;
				this.refs.state.value=state;
				this.refs.aadhar.value=aadhar
				this.refs.bank.value=bank;
				this.refs.accountNumber.value=accountNumber;
				this.refs.IFSC.value=IFSC;
				this.refs.PAN.value=PAN;
				this.setState({uploadedFileCloudinaryUrl:imageURL})
				this.refs.pic.src=imageURL;
				this.refs.nomineeRelation.value=nomineeRelation;
				this.refs.nomineeName.value=nomineeName;
				this.refs.nomineeBirthday.value=nomineeBirthday;
				this.refs.nomineeMobile.value=nomineeMobile;
				this.refs.nomineeVillage.value=nomineeVillage;
				this.refs.nomineeTahsil.value=nomineeTahsil;
				this.refs.nomineeDistrict.value=nomineeDistrict;
				this.refs.nomineePincode.value=nomineePincode;
				this.refs.nomineeState.value=nomineeState;
				
			}
			else{
				alert('No record found with such ID. Please enter valid HTPL ID')
				this.refs.ID.readOnly=false
				this.refs.ID.focus()
			}
		}
		else if(!this.state.hideInputFields){
		
	    	let image=''
	    	this.state.uploadedFileCloudinaryUrl===''?image=this.props.userList[0].profile.imageURL:image=this.state.uploadedFileCloudinaryUrl
		
		Meteor.call('user.update',
			this.state.user._id,
			this.refs.level.value,
			this.refs.name.value,
			this.refs.birthday.value,
			this.refs.mobile.value,
			this.refs.email.value,
			this.refs.village.value,
			this.refs.tahsil.value,
			this.refs.district.value,
			this.refs.pincode.value,
			this.refs.state.value,
			this.refs.bank.value,
			this.refs.accountNumber.value,
			this.refs.IFSC.value,
			this.refs.aadhar.value,
			this.refs.PAN.value,
			image,
			this.refs.nomineeRelation.value,
			this.refs.nomineeName.value,
			this.refs.nomineeBirthday.value,
			this.refs.nomineeMobile.value,
			this.refs.nomineeVillage.value,
			this.refs.nomineeTahsil.value,
			this.refs.nomineeDistrict.value,
			this.refs.nomineePincode.value,
			this.refs.nomineeState.value,
			this.state.user.profile.sellingDate,
			this.state.user.profile.product,
			this.state.user.profile.productID,
			this.state.user.profile.parent,
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
						this.refs.village.value='',
						this.refs.tahsil.value='',
						this.refs.district.value='',
						this.refs.pincode.value='',
						this.refs.state.value='',
						this.refs.bank.value='',
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
	
  	capitalisePAN(){
  		this.refs.PAN.value=this.refs.PAN.value.toUpperCase()
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
		<td>Village :</td>
		<td>{this.refs.village?this.refs.village.value:undefined}</td>
		</tr>
		<tr>
		<td>Tahsil :</td>
		<td>{this.refs.tahsil?this.refs.tahsil.value:undefined}</td>
		</tr>
		<tr>
		<td>District :</td>
		<td>{this.refs.district?this.refs.district.value:undefined}</td>
		</tr>
		<tr>
		<td>Pin Code :</td>
		<td>{this.refs.pincode?this.refs.pincode.value:undefined}</td>
		</tr>
		<tr>
		<td>State :</td>
		<td>{this.refs.state?this.refs.state.value:undefined}</td>
		</tr>
		<tr>
		<td>Bank :</td>
		<td>{this.refs.bank?this.refs.bank.value:undefined}</td>
		</tr>
		<tr>
		<tr>
		<td>Bank Account Number :</td>
		<td>{this.refs.accountNumber?this.refs.accountNumber.value:undefined}</td>
		</tr>

		<tr>
		<td>IFSC :</td>
		<td>{this.refs.IFSC?this.refs.IFSC.value:undefined}</td>
		</tr>
		<tr>
		<td>Aadhar Card Number :</td>
		<td>{this.refs.aadhar?this.refs.aadhar.value:undefined}</td>
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
		<td>Village of the Nominee :</td>
		<td>{this.refs.nomineeVillage?this.refs.nomineeVillage.value:undefined}</td>
		</tr>
		<tr>
		<td>Tahsil of the Nominee :</td>
		<td>{this.refs.nomineeTahsil?this.refs.nomineeTahsil.value:undefined}</td>
		</tr>
		<tr>
		<td>District of the Nominee :</td>
		<td>{this.refs.nomineeDistrict?this.refs.nomineeDistrict.value:undefined}</td>
		</tr>
		<tr>
		<td>PinCode of the Nominee :</td>
		<td>{this.refs.nomineePincode?this.refs.nomineePincode.value:undefined}</td>
		</tr>
		<tr>
		<td>State of the Nominee :</td>
		<td>{this.refs.nomineeState?this.refs.nomineeState.value:undefined}</td>
		</tr>
		</tr>

		</tbody>
		</table>
		</div>
		<div className="newsletter">
		<br/><br/>
		<div className="container">
			<div className="col-md-6 w3agile_newsletter_left">
				<h3>Profile Edit</h3>
			</div>
			<div className="col-md-6 w3agile_newsletter_right">
				<form onSubmit={this.handle_submit.bind(this)}>
					<label>HTPL ID :</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="ID" placeholder="ID" pattern="HT[0-9]{7}" title="ID starts with HTPL followed by 5 digits." required/>
					<br/>
					<div hidden={this.state.hideInputFields}>
					<input type="number" min="0" style={{marginLeft:2+'%',width:60+'%'}} ref="level" placeholder="Level (e.g, 2)" required={!this.state.hideInputFields} hidden/>
					
					<label>Name :</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="name" placeholder='Name' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required={!this.state.hideInputFields} readOnly/><br/>
					<label>Birthday :</label>
					<input type="date" style={{marginLeft:2+'%',width:60+'%'}} ref="birthday" required={!this.state.hideInputFields} readOnly/><br/><br/>
					<label>Mobile :</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="mobile" placeholder='Mobile' pattern="[6-9]{1}[0-9]{9}" title="10 digit valid mobile number" required={!this.state.hideInputFields}/><br/>
					<div>
					<span className="pull-left">
					<label>Village :</label>
					<input type="text" style={{marginLeft:2+'%'}} ref="village" placeholder='Village' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required={!this.state.hideInputFields}/>
					</span>
					<span className="pull-right">
					<label style={{marginLeft:2+'%'}}>Tahsil :</label>
					<input type="text" style={{marginLeft:2+'%'}} ref="tahsil" placeholder='Tahsil' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required={!this.state.hideInputFields}/><br/>
					</span>
					</div>
					<div>
					<span className="pull-left">
					<label>District :</label>
					<input type="text" style={{marginLeft:2+'%'}} ref="district" placeholder='District' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required={!this.state.hideInputFields}/>
					</span>
					<span className="pull-right">
					<label style={{marginLeft:2+'%'}}>Pin Code :</label>
					<input type="text" style={{marginLeft:2+'%'}} ref="pincode" placeholder='PinCode' pattern="^[1-9][0-9]{5}$" title='Enter three or more characters' required={!this.state.hideInputFields}/><br/>
					</span>
					</div><br/><br/><br/><br/><br/><br/>
					<div>
					<div className="form-group">
                  <div className="input-group">
					<label>State :</label>
					<select ref="state" style={{marginLeft:2+'%'}} required={!this.state.hideInputFields}>
						<option></option>
						<option value="Andaman/Nicobar">Andaman/Nicobar Islands</option>
						<option value="Andhra Pradesh">Andhra Pradesh</option>
						<option value="Arunachal Pradesh">Arunachal Pradesh</option>
						<option value="Assam">Assam</option>
						<option value="Bihar">Bihar</option>
						<option value="Chandigarh">Chandigarh</option>
						<option value="Chhattisgarh">Chhattisgarh</option>
						<option value="Dadra/Nagar Haveli">Dadra/Nagar Haveli</option>
						<option value="Daman/Diu">Daman/Diu</option>
						<option value="Goa">Goa</option>
						<option value="Gujarat">Gujarat</option>
						<option value="Haryana">Haryana</option>
						<option value="Himachal Pradesh">Himachal Pradesh</option>
						<option value="Jammu/Kashmir">Jammu/Kashmir</option>
						<option value="Jharkhand">Jharkhand</option>
						<option value="Karnataka">Karnataka</option>
						<option value="Kerala">Kerala</option>
						<option value="Lakshadweep">Lakshadweep</option>
						<option value="Madhya Pradesh">Madhya Pradesh</option>
						<option value="Maharashtra">Maharashtra</option>
						<option value="Manipur">Manipur</option>
						<option value="Meghalaya">Meghalaya</option>
						<option value="Mizoram">Mizoram</option>
						<option value="Nagaland">Nagaland</option>
						<option value="New Delhi">New Delhi</option>
						<option value="Orissa">Orissa</option>
						<option value="Pondicherry">Pondicherry</option>
						<option value="Punjab">Punjab</option>
						<option value="Rajasthan">Rajasthan</option>
						<option value="Sikkim">Sikkim</option>
						<option value="Tamil Nadu">Tamil Nadu</option>
						<option value="Telangana">Telangana</option>
						<option value="Tripura">Tripura</option>
						<option value="Uttaranchal">Uttaranchal</option>
						<option value="Uttar Pradesh">Uttar Pradesh</option>
						<option value="West Bengal">West Bengal</option>
					</select>
					</div>
					</div>
					</div>
					<label>Email :</label>
					<input type="email" ref="email" style={{marginLeft:2+'%',width:60+'%'}} placeholder='Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='xxx@xxx.domain' /><br/>
					<label>Aadhar Card Number :</label>
					<input type="text" ref="aadhar" style={{marginLeft:2+'%',width:60+'%'}} placeholder='Aadhar Card Number' pattern="[0-9]{12}" title='Enter valid Aadhar card number(12 digits)'/><br/>
					<label>PAN Card Number :</label>
					<input type="text" ref="PAN" style={{marginLeft:2+'%',width:60+'%'}} placeholder='PAN Card Number' pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}" title='Enter valid PAN card number(5 characters followed by 4 digits and 1 character' onKeyUp={()=>this.capitalisePAN}/><br/>
					<label id='bank'>Bank Name :</label>
					<input type="text" ref="bank" style={{marginLeft:2+'%',width:60+'%'}} placeholder='Bank Name' pattern="[a-zA-Z].{4,}" title='Enter valid bank name'/><br/>
					<label>Account Number :</label>
					<input type="text" ref="accountNumber" style={{marginLeft:2+'%',width:60+'%'}} placeholder='Bank Account Number' pattern="[0-9]{9,18}" title='Enter valid account number' required={!this.state.hideInputFields} readOnly/><br/>
					<label>IFSC :</label>
					<input type="text" ref="IFSC" style={{marginLeft:2+'%',width:60+'%'}} placeholder='IFSC' pattern="^[A-Z]{4}[0][A-Z0-9]{6}$" title='Enter valid IFSC code(include capital letters. e.g, SBIN012345)' required={!this.state.hideInputFields} readOnly/><br/>
					
					
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
					<select style={{marginLeft:2+'%',width:60+'%'}} ref="nomineeRelation" required={!this.state.hideInputFields}>
			     	<option value=''></option>
			      	<option value='Brother'>Brother</option>
			      	<option value='Daughter'>Daughter</option>
			      	<option value='Father'>Father</option>
			      	<option value='Husband'>Husband</option>
			      	<option value='Mother'>Mother</option>
			      	<option value='Son'>Son</option>
			      	<option value='Sister'>Sister</option>
			      	<option value='Wife'>Wife</option>
			      	</select>
			      	{this.state.errorRelation?<p style={{color:'red'}}>{this.state.errorRelation}</p>:undefined}
			      	<br/>
			      	<label>Name of nominee:</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="nomineeName" placeholder="Nominee's Name" pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required={!this.state.hideInputFields}/><br/>
					<div hidden>
					<label>Birthday of nominee:</label>
					<input type="date" style={{marginLeft:2+'%',width:60+'%'}} ref="nomineeBirthday" /><br/><br/>
					<label>Mobile of nominee:</label>
					<input type="text" style={{marginLeft:2+'%',width:60+'%'}} ref="nomineeMobile" placeholder="Nominee's Mobile" pattern="[6-9]{1}[0-9]{9}" title="10 digit mobile number" /><br/>
					<div>
					<span className="pull-left">
					<label>Village :</label>
					<input type="text" style={{marginLeft:2+'%'}} ref="nomineeVillage" placeholder='Village' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' />
					</span>
					<span className="pull-right">
					<label style={{marginLeft:2+'%'}}>Tahsil :</label>
					<input type="text" style={{marginLeft:2+'%'}} ref="nomineeTahsil" placeholder='Tahsil' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' /><br/>
					</span>
					</div>
					<div>
					<span className="pull-left">
					<label>District :</label>
					<input type="text" style={{marginLeft:2+'%'}} ref="nomineeDistrict" placeholder='District' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' />
					</span>
					<span className="pull-right">
					<label style={{marginLeft:2+'%'}}>Pin Code :</label>
					<input type="text" style={{marginLeft:2+'%'}} ref="nomineePincode" placeholder='PinCode' pattern="^[1-9][0-9]{5}$" title='Enter three or more characters' /><br/>
					</span>
					</div><br/><br/><br/><br/><br/><br/>
					<div>
					<div className="form-group">
                  <div className="input-group">
					<label>Nominee's State :</label>
					<select ref="nomineeState" style={{marginLeft:2+'%'}} >
						<option></option>
						<option value="Andaman/Nicobar">Andaman/Nicobar Islands</option>
						<option value="Andhra Pradesh">Andhra Pradesh</option>
						<option value="Arunachal Pradesh">Arunachal Pradesh</option>
						<option value="Assam">Assam</option>
						<option value="Bihar">Bihar</option>
						<option value="Chandigarh">Chandigarh</option>
						<option value="Chhattisgarh">Chhattisgarh</option>
						<option value="Dadra/Nagar Haveli">Dadra/Nagar Haveli</option>
						<option value="Daman/Diu">Daman/Diu</option>
						<option value="Goa">Goa</option>
						<option value="Gujarat">Gujarat</option>
						<option value="Haryana">Haryana</option>
						<option value="Himachal Pradesh">Himachal Pradesh</option>
						<option value="Jammu/Kashmir">Jammu/Kashmir</option>
						<option value="Jharkhand">Jharkhand</option>
						<option value="Karnataka">Karnataka</option>
						<option value="Kerala">Kerala</option>
						<option value="Lakshadweep">Lakshadweep</option>
						<option value="Madhya Pradesh">Madhya Pradesh</option>
						<option value="Maharashtra">Maharashtra</option>
						<option value="Manipur">Manipur</option>
						<option value="Meghalaya">Meghalaya</option>
						<option value="Mizoram">Mizoram</option>
						<option value="Nagaland">Nagaland</option>
						<option value="New Delhi">New Delhi</option>
						<option value="Orissa">Orissa</option>
						<option value="Pondicherry">Pondicherry</option>
						<option value="Punjab">Punjab</option>
						<option value="Rajasthan">Rajasthan</option>
						<option value="Sikkim">Sikkim</option>
						<option value="Tamil Nadu">Tamil Nadu</option>
						<option value="Telangana">Telangana</option>
						<option value="Tripura">Tripura</option>
						<option value="Uttaranchal">Uttaranchal</option>
						<option value="Uttar Pradesh">Uttar Pradesh</option>
						<option value="West Bengal">West Bengal</option>
					</select>
					</div>
					</div>
					</div>
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