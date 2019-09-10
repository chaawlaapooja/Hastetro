import { Mongo } from 'meteor/mongo';
Meteor.methods({
	'user.create':function(designation, level, ID,name,birthday,mobile,email,address,accountNumber,IFSC,PAN,password,imageURL,nomineeRelation,nomineeName,nomineeBirthday,nomineeMobile, nomineeAddress,nomineeAccountNumber, nomineeIFSC,parent, productID,parents){
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
            nomineeAccountNumber,
            nomineeIFSC,
            parent,
            productID,
            parents,
            paymentStatus:'Pending',
            sellingDate:new Date().toLocaleDateString()
            
           	}
		})
	},
	'user.update':function(_id, level,name,birthday,mobile,email,address,accountNumber,IFSC,PAN,imageURL,nomineeRelation,nomineeName,nomineeBirthday,nomineeMobile, nomineeAddress,nomineeAccountNumber, nomineeIFSC, parent){
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
            nomineeAccountNumber,
            nomineeIFSC,
            parent
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
