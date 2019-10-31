import { Meteor } from 'meteor/meteor';
import Pins from '/imports/api/pins';
import Links from '/imports/api/links';
import Payment from '/imports/api/payment';

Meteor.startup(() => {
  Meteor.publish('users', function(){
  		return Meteor.users.find()
  })
  Meteor.publish('pins', function(){
  		return Pins.find({available:true})
  })
  Meteor.publish('payout', function(){
  		return Payment.find({})
  })
  
});
