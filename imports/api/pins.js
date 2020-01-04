import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'pin.update':function(pin, availabilility){
		Pins.update({pin},{$set:{available:availabilility}})
	}
})
export default Pins = new Mongo.Collection('epin');
