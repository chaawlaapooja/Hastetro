import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import LandingPage from '/imports/ui/LandingPage'
import { Tracker } from 'meteor/tracker';

import {routes, onAuthChange} from '/imports/routes/routes'

Tracker.autorun(()=>{
	const IS_AUTHENTICATED = !!Meteor.userId();
	onAuthChange(IS_AUTHENTICATED);
});

Meteor.startup(() => {
  render(routes, document.getElementById('react-target'));
});
