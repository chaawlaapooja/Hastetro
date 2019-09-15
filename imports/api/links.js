import { Mongo } from 'meteor/mongo';
Meteor.methods({
	'user.create':function(designation, level, ID,name,birthday,mobile,email,address,accountNumber,IFSC,PAN,password,imageURL,nomineeRelation,nomineeName,nomineeBirthday,nomineeMobile, nomineeAddress,product,productID,parent){
		Accounts.createUser({
			email :ID,
			password : password,
			profile: {
            designation,
            level,
            name,
            birthday,
            mobile,
            email,
            address,
            accountNumber,
            IFSC,
            PAN,
            imageURL,
            nomineeRelation,
            nomineeName,
            nomineeBirthday,
            nomineeMobile,
            nomineeAddress,
            product,
            productID,
            parent,
            paymentStatus:'Pending',
            sellingDate:new Date().toLocaleDateString()
            
           	}
		})
	},
	'user.update':function(_id, level,name,birthday,mobile,email,address,accountNumber,IFSC,PAN,imageURL,nomineeRelation,nomineeName,nomineeBirthday,nomineeMobile, nomineeAddress, sellingDate,product, productID, parent){
		// let user = Meteor.users.find({_id}).fetch()[0];
  //       console.log(user)
  //       const nomineeBirthday = user.profile.nomineeBirthday;
  //       const nomineeMobile = user.profile.nomineeMobile;
  //       const nomineeAddress = user.profile.nomineeAddress
  //       const nomineeAccountNumber = user.profile.nomineeAccountNumber;
  //       const nomineeIFSC = user.profile.nomineeIFSC
        Meteor.users.update({_id},{$set:{
			profile: {
            designation:'USER',
            level,
            name,
            birthday,
            mobile,
            email,
            address,
            accountNumber,
            IFSC,
            PAN,
            imageURL,
            nomineeRelation,
            nomineeName,
            nomineeBirthday,
            nomineeMobile,
            nomineeAddress,
            parent,
            paymentStatus:'Pending',
            sellingDate,
            product,
            productID
           	}
		}}
			
		)
	},
      
      'user.updatePayment':function(_id, parent){
            console.log(_id, parent)
            Meteor.users.update( {_id , "profile.parents.id" : parent } , 
                {$set : {"profile.parents.$.paymentStatus" : 'Done'} } , 
                false , 
                true);

      },
	'user.remove' : function(user){
		Meteor.users.remove(user);
	}
})
export default Links = new Mongo.Collection('links');
