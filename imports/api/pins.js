import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'pin.update':function(pin){
		Pins.update({pin},{$set:{available:false}})
	}
})
export default Pins = new Mongo.Collection('epin');
