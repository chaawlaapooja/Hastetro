import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'payment.insert':function(ID,name,amount){
		let sellingDate=new Date().toLocaleDateString()
		let dateValue
        new Date(sellingDate).getDate()<15?dateValue=15:dateValue=30
        let dt = new Date(sellingDate).getFullYear() +'-'+ parseInt(new Date(sellingDate).getMonth()+1)+'-'+dateValue
        dt=new Date(dt)  
        Payment.insert({
			ID,
			name,
			payment:[
				{
					 date:dt,
					 amount,
					'paymentStatus':'Pending'
				}
			]
		})
	},
	'payment.update':function(ID, amount){
		console.log(ID, amount)
		let sellingDate=new Date().toLocaleDateString()
		let dateValue
        new Date(sellingDate).getDate()<15?dateValue=15:dateValue=30
        let dt = new Date(sellingDate).getFullYear() +'-'+ parseInt(new Date(sellingDate).getMonth()+1)+'-'+dateValue
        dt=new Date(dt)
        let checkPaymentDate= (Payment.find({ID, 'payment.date':dt}).fetch())
        if(checkPaymentDate.length!==0){
        	Payment.update( {ID , "payment.date" : (dt) } , 
                {$inc : {"payment.$.amount" : parseInt(amount)} } , 
                false , 
                true);
        }
        else{
        	Payment.update({ID,'payment.date':{$nin: [dt]}}, {$push:{payment:{
					 date:dt,
					 amount,
					'paymentStatus':'Pending'
				}}})
        }
	},
	'payment.updatePayment':function(_id,chequeNumber,date){
		Payment.update( {_id , "payment.date" : date } , 
                {$set : {"payment.$.paymentStatus" :'Paid',"payment.$.paidOn":new Date(), 'payment.$.chequeNumber':chequeNumber} } , 
                false , 
                true);
	}
})

export default Payment = new Mongo.Collection('payment');
