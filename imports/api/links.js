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
	'user.remove' : function(user){
		Meteor.users.remove(user);
	}
})
export default Links = new Mongo.Collection('links');
