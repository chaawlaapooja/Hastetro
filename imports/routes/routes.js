import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import LandingPage from '/imports/ui/LandingPage'
import AdminPanel from '/imports/ui/AdminPanel';
import UserPanel from '/imports/ui/UserPanel';
import NotFound from '/imports/ui/NotFound';

import AddUser from '/imports/ui/admin/AddUser';
import EditUser from '/imports/ui/admin/EditUser';
import AllMembers from '/imports/ui/admin/AllMembers'
import PaymentReport from '/imports/ui/admin/PaymentReport'

import SeeDownline from '/imports/ui/user/SeeDownline'
import Profile from '/imports/ui/user/Profile'
import Payment from '/imports/ui/user/Payment'

const unauthenticatedPages = ['/'];
const authenticatedPages=[]

const onEnterPublicpage=()=>{
	if(Meteor.userId()){
		if(Meteor.user().profile)
		if(Meteor.user().profile.designation==='ADMIN')
		{
			browserHistory.replace('/adminPanel');
		}
		else if(Meteor.user().profile.designation==='USER')
		{
			browserHistory.replace('/userPanel');
		}
	}

};
const onEnterPrivatePage=()=>{
	const pathname = browserHistory.getCurrentLocation().pathname;
	if(Meteor.userId()){
		if(Meteor.user()){
			if(Meteor.user().profile.designation==='ADMIN')
			{
				let unauthenticatedPagesLength = unauthenticatedPages.length
				unauthenticatedPages.splice(0,unauthenticatedPagesLength)
				unauthenticatedPages.push('/','/userPanel', '/addDownline', '/seeDownline','/profile', '/payment')
			}
			else if(Meteor.user().profile.designation==='USER')
			{
				let unauthenticatedPagesLength = unauthenticatedPages.length
				unauthenticatedPages.splice(0,unauthenticatedPagesLength)
				unauthenticatedPages.push('/','/adminPanel','/addUser', '/editUser', '/allMembers', '/paymentReport','/dashboard')
	    	}
		 }
		if(unauthenticatedPages.includes(pathname)){
			browserHistory.replace('/')
		}
	
	}
	if(!Meteor.userId()){
		browserHistory.replace('/')
	}
};
export const onAuthChange =(isAuthenticated)=>{
	const pathname = browserHistory.getCurrentLocation().pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
	const isAuthenticatedPage = authenticatedPages.includes(pathname);
	
	if(isUnauthenticatedPage && isAuthenticated){
		if(Meteor.user()){
			if(Meteor.user().profile.designation==='ADMIN')
			{
				browserHistory.replace('/adminPanel');
			}
			else if(Meteor.user().profile.designation==='USER')
			{
				browserHistory.replace('/userPanel');
			}
			
			}
	}
	else if(!isAuthenticatedPage && !isAuthenticated){
		browserHistory.replace('/')
	}
}


export const routes = (
		<Router history={browserHistory}>
		 <Route path="/" component={LandingPage} onEnter={onEnterPublicpage}/>
		 <Route path="/adminPanel" component={AdminPanel} onEnter={onEnterPrivatePage} />
         <Route path="/addUser" component={AddUser} onEnter={onEnterPrivatePage} />
         <Route path="/editUser" component={EditUser} onEnter={onEnterPrivatePage} />
         <Route path="/allMembers" component={AllMembers} onEnter={onEnterPrivatePage} />
         <Route path="/paymentReport" component={PaymentReport} onEnter={onEnterPrivatePage} />
         <Route path="/dashboard" component={AdminPanel} onEnter={onEnterPrivatePage} />
         
         <Route path="/userPanel" component={UserPanel} onEnter={onEnterPrivatePage} />
         <Route path="/addDownline" component={UserPanel} onEnter={onEnterPrivatePage} />
         <Route path="/seeDownline" component={SeeDownline} onEnter={onEnterPrivatePage} />
         <Route path="/profile" component={Profile} onEnter={onEnterPrivatePage} />
         <Route path="/payment" component={Payment} onEnter={onEnterPrivatePage} />
         <Route path="*" component={NotFound} />
</Router>
	);