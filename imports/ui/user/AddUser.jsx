import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import request from 'superagent'
import print from 'print-js'
import { createContainer } from 'meteor/react-meteor-data';
import Pins from '/imports/api/pins'
import UserList from './UserList'

const CLOUDINARY_UPLOAD_PRESET = 'nf7bfn7e';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/hastetro/upload';

class AddUser extends Component{
	constructor(props){
		super(props);

    this.state = {
      uploadedFileCloudinaryUrl: '',
      showImageName:'',
      showPrintForm:true,
      image:'',
      errorProductID:'',
      errorRelation:'',
      errorNomineeDetails:'',
      errorDate:'',
      errorNomineeDate:''
    };
	}

	componentDidMount(){
		this.refs.ID.value='HT'+Math.random().toString().slice(-7);
		this.refs.ID.readOnly=true
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
  	onProductChange(){
  		this.refs.price.value=this.refs.product.value.substring(0,3)
  	}
	//function that handles submit event from form
	handle_submit(event){
		
		event.preventDefault();
		const arr = this.props.userList.filter(user=>user.profile.parent===Meteor.userId())
    	if(arr.length>=5)
    		alert('You can have maximum five downlines')
		else if(this.refs.checkTerms.checked===false)
			alert('Please accept terms and conditions')
		else if(this.refs.product.value===''){
	    	this.setState({errorProduct:'Please select a product'})
	    }
	    else if(this.state.errorProductID!==''){
	    	this.setState({errorProductID:'Enter valid product ID'})
	    }
	    else if(this.refs.nomineeRelation.value===''){
	    	this.setState({errorRelation:'Please select a relation'})
	    }
	    else if(this.state.errorDate!==''){
	    	this.setState({errorDate:'Enter valid date'})
	    }
	    else if(this.state.errorNomineeDate!==''){
	    	this.setState({errorNomineeDate:'Enter valid date'})
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
			this.refs.mobile.value,
			imageURL,
			this.refs.nomineeRelation.value,
			this.refs.nomineeName.value,
			this.refs.nomineeBirthday.value,
			this.refs.nomineeMobile.value,
			this.refs.nomineeVillage.value,
			this.refs.nomineeTahsil.value,
			this.refs.nomineeDistrict.value,
			this.refs.nomineePincode.value,
			this.refs.nomineeState.value,
			this.refs.product.value,
			this.refs.productID.value,
			Meteor.userId(),
			(error,result)=>{
				console.log(error,result)
				if(error)
					alert('Oops! Some error occured. Please try again')
				else{
					let address = this.refs.village.value+' , '+this.refs.tahsil.value+' , '+this.refs.district.value+' , '+this.refs.state.value+' - '+this.refs.pincode.value
			
		Meteor.call('payment.insert', this.refs.ID.value, this.refs.name.value, address, 0)
		let n = this.props.userList.filter(user=>user.profile.designation==='USER')
		let level = (Meteor.users.find().fetch()[0].profile.level)
		if(level>=7)
			level=7
		else level++
		let parents = []
		parents.push(Meteor.userId())
		for(var i=0; parents.length<level; i++){
			let lastIndex = parents.length-1
		 	let p = (n.filter(user=>user.profile.designation==='USER' && user._id===parents[lastIndex]))
			parents.push(p[0].profile.parent)
		}
		parents.forEach(parent=>{
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
			
			Meteor.call('payment.update',id,payment)
		})
					Meteor.call('pin.update',this.refs.productID.value,false,(err,res)=>{
						if(err)
							alert('Oops! Some error occured. Please try again')
						else{
							let answer = confirm('Do you want to print the details?');
					if(answer===true){
						this.setState({showPrintForm:false})
						printJS({ printable: 'printJS-form', type: 'html',header: 'HASTETRO TRADE PRIVATE LIMITED - USER DETAILS',modalMessage: 'Retrieving Document...',targetStyles: ['*'] })
						//printJS({ printable: 'printJS-form', type: 'html',  })
						this.refs.ID.value='HT'+Math.random().toString().slice(-7);
						this.refs.level.value='',
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
						this.refs.aadhar.value='',
						this.refs.PAN.value='',
						this.refs.nomineeRelation.value='',
						this.refs.nomineeName.value='',
						this.refs.nomineeBirthday.value='',
						this.refs.nomineeMobile.value='',
						this.refs.nomineeVillage.value='',
						this.refs.nomineeTahsil.value='',
						this.refs.nomineeDistrict.value='',
						this.refs.nomineePincode.value='',
						this.refs.nomineeState.value='',
						
						this.refs.product.value='',
						this.refs.productID.value='',
						this.setState({uploadedFileCloudinaryUrl:'', showPrintForm:true, image:'',  errorProduct:'', errorProductID:'', errorRelation:'', errorNomineeDetails:''})
					}
						}
					})
					
				}
			})
		}
		
	
	}
	
  
  	checkProductID(){
  		this.setState({errorProductID:''})
  		if(this.refs.productID.value.length===10){
  			let pins = this.props.pins;
  			let found = false
			for(var i=0; i<pins.length; i++){
				if(this.refs.productID.value===pins[i].pin){
					found = true
					break;
				}
			}
			if(found)
				this.setState({errorProductID:''})
			else
				this.setState({errorProductID:'Enter a valid Product ID'})
					
  		}
  	}
  	capitaliseIFSC(){
  		this.refs.IFSC.value=this.refs.IFSC.value.toUpperCase()
  	}
  	capitalisePAN(){
  		this.refs.PAN.value=this.refs.PAN.value.toUpperCase()
  	}
  	onConfirmationChange(){
  		if(this.refs.confirmNominee.value===''){
  			this.setState({errorNomineeDetails:'Please select an answer'})
  			document.querySelector('#accDetails').hidden=true
  			document.querySelector('#nomineeDetails').hidden=true
  		}
  		else if(this.refs.confirmNominee.value==='yes'){
  			this.setState({errorNomineeDetails:''})
  			document.querySelector('#accDetails').hidden=false
  			document.querySelector('#nomineeDetails').hidden=false
  			document.querySelector('#acc').innerHTML="Nominee's Account Number :"
  			document.querySelector('#ifsc').innerHTML="Nominee's IFSC :"
  			document.querySelector('#tableAcc').innerHTML="Nominee's Account Number :"
  			document.querySelector('#tableIFSC').innerHTML="Nominee's IFSC :"
  			
  			this.refs.nomineeBirthday.required=true
  			this.refs.nomineeMobile.required=true
  			this.refs.nomineeVillage.required=true
  			this.refs.nomineeTahsil.required=true
  			this.refs.nomineeDistrict.required=true
  			this.refs.nomineePincode.required=true
  			this.refs.nomineeState.required=true
  		}
  		else if(this.refs.confirmNominee.value==='no'){
  			this.setState({errorNomineeDetails:''})
  			document.querySelector('#accDetails').hidden=false
  			document.querySelector('#nomineeDetails').hidden=true
  			document.querySelector('#acc').innerHTML="Your Account Number :"
  			document.querySelector('#ifsc').innerHTML="Your IFSC :"
  			document.querySelector('#tableAcc').innerHTML="Your Account Number :"
  			document.querySelector('#tableIFSC').innerHTML="Your IFSC :"
  			
  			this.refs.nomineeBirthday.required=false
  			this.refs.nomineeMobile.required=false
  			this.refs.nomineeVillage.required=false
  			this.refs.nomineeTahsil.required=false
  			this.refs.nomineeDistrict.required=false
  			this.refs.nomineePincode.required=false
  			this.refs.nomineeState.required=false
  		}

  	}
  	validate_date(){
  		var val = this.refs.birthday.value.split('-');
  		  if (val[0] < new Date().getFullYear() && val[0]>1800) {
		    this.setState({errorDate:''})
		  } else {
		    this.setState({errorDate:'Enter a valid date'})
		  }
  	}  	
  	validate_nominee_date(){
  		var val = this.refs.nomineeBirthday.value.split('-');
  		  if (val[0] < new Date().getFullYear() && val[0]>1800) {
		    this.setState({errorNomineeDate:''})
		  } else {
		    this.setState({errorNomineeDate:'Enter a valid date'})
		  }
  	}  	
	render(){
		let level = 0;
		Meteor.users.find().fetch().length!==0?level=parseInt(Meteor.users.find().fetch()[0].profile.level)+1:undefined
		this.refs.level?this.refs.level.value=level:undefined
		
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
		<td id='tableAcc'>Bank Account Number :</td>
		<td>{this.refs.accountNumber?this.refs.accountNumber.value:undefined}</td>
		</tr>
		<tr>
		<td id='tableIFSC'>IFSC :</td>
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
		{this.refs.confirmNominee?this.refs.confirmNominee.value==='yes'?
		<tr>
		<tr>
		<td>Birthday of the Nominee :</td>
		<td>{this.refs.nomineeBirthday?new Date(this.refs.nomineeBirthday.value).toLocaleDateString():undefined}</td>
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
		</tr></tr>:undefined:undefined}
		
		<tr>
		<td>Product Name:</td>
		<td>{this.refs.product?this.refs.product.value.substring(4):undefined}</td>
		</tr>
		<tr>
		<td>Product Price:</td>
		<td>{this.refs.product?this.refs.product.value.substring(0,3):undefined}</td>
		</tr>
		<tr>
		<td>Product ID:</td>
		<td>{this.refs.productID?this.refs.productID.value:undefined}</td>
		</tr>
		</tbody>
		</table>
		</div>
		<div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>You are 30 seconds away from earning your own money!</p>
                        
                    </div>
                    <div className="col-md-9 register-right">
                        
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <form onSubmit={this.handle_submit.bind(this)}>
                                <h3 className="register-heading">Add New Downline Member</h3>
                                
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
	                                        <input type="number" min="0" style={{marginLeft:2+'%',width:60+'%'}} ref="level" placeholder="Level (e.g, 2)" readOnly hidden required/>
		
										</div>
                                        <div className="form-group">
					                        <label>Name :</label>
											<input type="text"  ref="name" placeholder='Name' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required/>
										</div>
                                        <div className="form-group">
                                        	<label>Birthday :</label><br/>
											<input type="date"  ref="birthday" onChange={()=>this.validate_date()} required/>
											{this.state.errorDate?<p style={{color:'red'}}>{this.state.errorDate}</p>:undefined}
										</div>
                                        <div className="form-group">
						                    <label>Mobile :</label>
											<input type="text"  ref="mobile" placeholder='Mobile' pattern="[6-9]{1}[0-9]{9}" title="10 digit valid mobile number" required/>
										</div>
										<div className="form-group">
							                <label>Village :</label>
											<input type="text" ref="village" placeholder='Village' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required/>
										</div>
										<div className="form-group">
							                <label>Tahsil :</label>
											<input type="text" ref="tahsil" placeholder='Tahsil' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required/><br/>
										</div>
										<div className="form-group">
							                <label>District :</label>
											<input type="text"  ref="district" placeholder='District' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' />
										</div>
										<div className="form-group">
						                	<label>Pin Code :</label>
											<input type="text" ref="pincode" placeholder='PinCode' pattern="^[1-9][0-9]{5}$" title='Enter three or more characters' /><br/>
										</div>
										<div className="form-group">
						                	<label>State :</label>
											<select ref="state" className="form-control" style={{marginLeft:2+'%'}} required>
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
										<div className="form-group">
                                            <label>Email :</label>
											<input type="email" ref="email" placeholder='Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='xxx@xxx.domain' /><br/>
										</div>
                                        <div className="form-group">
                                        	<label>Aadhar Card Number :</label>
											<input type="text" ref="aadhar"  placeholder='Aadhar Card Number' pattern="[0-9]{12}" title='Enter valid Aadhar card number(12 digits)'/><br/>
										</div>
										<div className="form-group">
                    						<label>PAN Card Number :</label>
											<input type="text" ref="PAN"  placeholder='PAN Card Number' pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}" title='Enter valid PAN card number(5 characters followed by 4 digits and 1 character' onKeyUp={()=>this.capitalisePAN()}/><br/>
										</div>
										<div className="form-group">
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
									    </div>
					                </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        	<label>HTPL ID :</label>
											<input type="text" style={{marginLeft:2+'%'}} ref="ID" placeholder="ID" style={{width:60+'%'}} required/>
										</div>
                                        
			      						<div className="form-group">
			      							<label>Nominee Details:</label><br/>
			      							<label>Relation with nominee:</label>
									      	<select className="form-control" ref="nomineeRelation" required>
									     	<option value=''>Relation with nominee</option>
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
											<input type="text" style={{marginLeft:2+'%'}} ref="nomineeName" placeholder="Nominee's Name" pattern="[a-zA-Z].{2,}" title='Enter three or more characters' required/><br/>
											<label>Do you want to deposit credits in your nominee's account?</label>
									      	<select ref='confirmNominee' className="form-control" onChange={()=>this.onConfirmationChange()} required>
									      	<option value='no'>No</option>
									      	<option value='yes'>Yes</option>
									      	</select><br/>
			      						</div>
			      						<div className="form-group">
			      							<div id='accDetails'>
			      							<label id='bank'>Bank Name :</label>
											<input type="text" ref="bank"  placeholder='Bank Name' pattern="[a-zA-Z].{4,}" title='Enter valid bank name'/><br/>
											<label id='acc'>Account Number :</label>
											<input type="text" ref="accountNumber" placeholder='Bank Account Number' pattern="[0-9]{9,18}" title='Enter valid account number'/><br/>
											<label id='ifsc'>IFSC :</label>
											<input type="text" ref="IFSC"  placeholder='IFSC' pattern="^[A-Z]{4}[0][A-Z0-9]{6}$" title='Enter valid IFSC code(include capital letters. e.g, SBIN012345)' onKeyUp={()=>this.capitaliseIFSC()}/><br/>
											</div>
										</div>
										<div id='nomineeDetails' hidden>
									      	
										<div className="form-group">
											<label>Birthday of nominee:</label>
											<input type="date" ref="nomineeBirthday" onChange={()=>this.validate_nominee_date()}/>
											{this.state.errorNomineeDate?<p style={{color:'red'}}>{this.state.errorNomineeDate}</p>:undefined}
											<label>Mobile of nominee:</label>
											<input type="text" ref="nomineeMobile" placeholder="Nominee's Mobile" pattern="[6-9]{1}[0-9]{9}" title="10 digit mobile number"/>
											<label>Village :</label>
											<input type="text" ref="nomineeVillage" placeholder='Village' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' />
											<label>Tahsil :</label>
											<input type="text" ref="nomineeTahsil" placeholder='Tahsil' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' />
											<label>District :</label>
											<input type="text" ref="nomineeDistrict" placeholder='District' pattern="[a-zA-Z].{2,}" title='Enter three or more characters' />
											<label>Pin Code :</label>
											<input type="text" ref="nomineePincode" placeholder='PinCode' pattern="^[1-9][0-9]{5}$" title='Enter three or more characters' />
											
										</div>
										<div className="form-group">
                  							<div className="input-group">
											<label>Nominee's State :</label>
											<select ref="nomineeState" className="form-control">
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
										<div className="form-group">
											<label>Product:</label>
											<select className="form-control" ref="product" onChange={()=>this.onProductChange()} required>
									     	<option value=''></option>
									      	<option value='920-OrganicPowerGold'>Organic Power Gold</option>
									      	<option value='700-OrganicPower'>Organic Power</option>
									      	<option value='630-Canegold'>Canegold</option>
									      	<option value='630-Spirulina'>Spirulina</option>
									      	<option value='630-Ladysafe'>Ladysafe</option>
									      	</select>
									      	{this.state.errorProduct?<p style={{color:'red'}}>{this.state.errorProduct}</p>:undefined}
									      	<br/><br/>
									      	<label>Price (INR) :</label>
									      	<input type="text" ref="price" readOnly/>
									    </div>
									    <div className="form-group">
											<label>Product ID :</label>
											<input type="text" ref="productID" onKeyUp={()=>this.checkProductID()} placeholder="10 character product ID" pattern="[a-zA-Z0-9]{10}" title='10 character long product ID' required/><br/>
											{this.state.errorProductID?<p style={{color:'red'}}>{this.state.errorProductID}</p>:undefined}
										</div>
										<input type="checkbox" ref="checkTerms" style={{marginRight:2+'%'}}/>I accept terms and conditions
					<br/><br/>
                                        <input type="submit" className="btnRegister"  value="Register"/>
                                    </div>
                                </div>
                                </form>
                            </div>
      
                        </div>
                    </div>
                </div>

        </div>
	<UserList/>
	</div>
		)
	}
};

export default createContainer(() => {
  Meteor.subscribe('users');
  Meteor.subscribe('pins');
  return { 
            userList:Meteor.users.find().fetch(),
            pins:Pins.find().fetch()
   };
}, AddUser);