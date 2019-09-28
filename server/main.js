import { Meteor } from 'meteor/meteor';
import Pins from '/imports/api/pins';
import Links from '/imports/api/links';
import Payout from '/imports/api/payout';
import {Accounts} from 'meteor/accounts-base'

Accounts.config({
    loginExpirationInDays: 0.01
})

Meteor.startup(() => {
  Meteor.publish('users', function(){
  		return Meteor.users.find()
  })
  Meteor.publish('pins', function(){
  		return Pins.find({available:true})
  })
  Meteor.publish('payout', function(){
  		return Payout.find({})
  })
  
});
