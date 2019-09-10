import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'payout.insert':function(obj, main){
		let forUser = main+obj.Name
		obj.main=main
		obj.forUser=forUser
		let found = (Payout.find({forUser}).fetch())
		if(found.length==0)
		Payout.insert(obj)
	},
	'payout.updatePayment':function(_id,payment, chequeNumber){
		Payout.update({_id},{$set:{ps:'Paid', payment, paidOn:new Date().toLocaleDateString(), chequeNumber}})
	}
})
export default Payout = new Mongo.Collection('payout');
