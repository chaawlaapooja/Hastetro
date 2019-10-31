import { Mongo } from 'meteor/mongo';
Meteor.methods({
	'user.create':function(designation, level, ID,name,birthday,mobile,email,village,tahsil,district,pincode,state,bank,accountNumber,IFSC,aadhar,PAN,password,imageURL,nomineeRelation,nomineeName,nomineeBirthday,nomineeMobile, nomineeVillage, nomineeTahsil, nomineeDistrict, nomineePincode, nomineeState,product,productID,parent){
		Accounts.createUser({
			email :ID,
			password : password,
			profile: {
            designation, level,name,birthday,mobile,email,village,tahsil,district,pincode,state,bank,accountNumber,IFSC,aadhar,PAN,imageURL,nomineeRelation,nomineeName,nomineeBirthday,nomineeMobile, nomineeVillage, nomineeTahsil, nomineeDistrict, nomineePincode, nomineeState,product,productID,parent,
            sellingDate:new Date().toLocaleDateString()
            }
		})
	},
	'user.update':function(_id, level,name,birthday,mobile,email,village,tahsil,district,pincode,state,bank,accountNumber,IFSC, aadhar, PAN,imageURL,nomineeRelation,nomineeName,nomineeBirthday,nomineeMobile, nomineeVillage, nomineeTahsil, nomineeDistrict, nomineePincode, nomineeState, sellingDate,product, productID, parent){
     Meteor.users.update({_id},{$set:{
			profile: {
            designation:'USER',
            level,
            name,
            birthday,
            mobile,
            email,
            village,tahsil,district,pincode,state,bank,
            accountNumber,
            IFSC,
            aadhar,PAN,
            imageURL,
            nomineeRelation,
            nomineeName,
            nomineeBirthday,
            nomineeMobile,
            nomineeVillage, nomineeTahsil, nomineeDistrict, nomineePincode, nomineeState,
            parent,
            sellingDate,
            product,
            productID
           	}
		}}
			
		)
	},
	'user.remove' : function(user){
		Meteor.users.remove(user);
	}
})
export default Links = new Mongo.Collection('links');
