import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import LandingPage from '/imports/ui/LandingPage'

Meteor.startup(() => {
  render(<LandingPage />, document.getElementById('react-target'));
});
