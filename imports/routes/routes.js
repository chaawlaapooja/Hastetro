import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import LandingPage from '/imports/ui/LandingPage'
import NotFound from '/imports/ui/NotFound';
import Navbar from '/imports/ui/Navbar'


const unauthenticatedPages = ['/'];
const authenticatedPages=[]

const onEnterPublicpage=()=>{
	if(Meteor.userId()){
		if(Meteor.user())
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
				//authenticatedPages.push('/adminPanel','/addUser', '/editUser', '/allMembers', '/paymentReport','/dashboard')
	    	
			}
			else if(Meteor.user().profile.designation==='USER')
			{
				let unauthenticatedPagesLength = unauthenticatedPages.length
				unauthenticatedPages.splice(0,unauthenticatedPagesLength)
				unauthenticatedPages.push('/','/adminPanel','/addUser', '/editUser', '/allMembers', '/paymentReport','/dashboard')
	    		//authenticatedPages.push('/userPanel', '/addDownline', '/seeDownline','/profile', '/payment')
				}
		 }
		if(unauthenticatedPages.includes(pathname)){
			console.log('unauthenticatedPages')
			browserHistory.replace('/')
		}
	
	}
	if(!Meteor.userId()){
		console.log('no meteor id')
		browserHistory.replace('/')
	}
};
export const onAuthChange =(isAuthenticated)=>{
	const pathname = browserHistory.getCurrentLocation().pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
	const isAuthenticatedPage = authenticatedPages.includes(pathname);
	console.log('isAuthenticated :',isAuthenticated,'isUnauthenticatedPage :', isUnauthenticatedPage,'isAuthenticatedPage :', isAuthenticatedPage)
	console.log(isUnauthenticatedPage && isAuthenticated)
	console.log(!isAuthenticatedPage && !isAuthenticated)
	//console.log(isAuthenticatedPage, isAuthenticated)
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
	else if(!isAuthenticatedPage && !isAuthenticated ){
		console.log('unauthorised user')
		browserHistory.replace('/')
	}
}


export const routes = (
		<Router history={browserHistory}>
		 <Route path="/" component={LandingPage} onEnter={onEnterPublicpage}/>
		 <Route path="/adminPanel" component={Navbar} level='admin' comp='report' onEnter={onEnterPrivatePage} />
         <Route path="/addUser" component={Navbar} level='admin' comp='addUser' onEnter={onEnterPrivatePage} />
         <Route path="/editUser" component={Navbar} level='admin' comp='editUser' onEnter={onEnterPrivatePage} />
         <Route path="/allMembers" component={Navbar} level='admin' comp='allMembers' onEnter={onEnterPrivatePage} />
         <Route path="/paymentReport" component={Navbar} level='admin' comp='paymentReport' onEnter={onEnterPrivatePage} />
         <Route path="/dashboard" component={Navbar} level='admin' comp='report' onEnter={onEnterPrivatePage} />
         
         <Route path="/userPanel" component={Navbar} level='user' comp='addDownline' onEnter={onEnterPrivatePage} />
         <Route path="/addDownline" component={Navbar} level='user' comp='addDownline' onEnter={onEnterPrivatePage} />
         <Route path="/seeDownline" component={Navbar} level='user' comp='seeDownline' onEnter={onEnterPrivatePage} />
         <Route path="/profile" component={Navbar} level='user' comp='profile' onEnter={onEnterPrivatePage} />
         <Route path="/payment" component={Navbar} level='user' comp='payment' onEnter={onEnterPrivatePage} />
         <Route path="*" component={NotFound} />
</Router>
	);