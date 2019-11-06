import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import NotFound from '/imports/ui/NotFound';
import Navbar from '/imports/ui/Navbar'
import Index from '/imports/ui/common/index'

const unauthenticatedPages = ['/','/about','/businessplan','/products','/rules','/legal','/contact','/product/canegold','/product/spirulina','/product/ladysafe','/product/organicPower', '/login'];
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
				unauthenticatedPages.push('/','/login','/about','/businessplan','/products','/rules','/legal','/contact','/product/canegold','/product/spirulina','/product/ladysafe','/product/organicPower','/userPanel', '/addDownline', '/seeDownline','/profile', '/payment')
				authenticatedPages.push('/adminPanel','/addUser', '/editUser', '/allMembers', '/paymentReport','/dashboard')
	    	
			}
			else if(Meteor.user().profile.designation==='USER')
			{
				let unauthenticatedPagesLength = unauthenticatedPages.length
				unauthenticatedPages.splice(0,unauthenticatedPagesLength)
				unauthenticatedPages.push('/','/login','/about','/businessplan','/products','/rules','/legal','/contact','/product/canegold','/product/spirulina','/product/ladysafe','/product/organicPower','/adminPanel','/addUser', '/editUser', '/allMembers', '/paymentReport','/dashboard')
	    		authenticatedPages.push('/userPanel', '/addDownline', '/seeDownline','/profile', '/payment')
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
	else if(!isAuthenticatedPage && !isAuthenticated ){
		browserHistory.replace('/')
	}
}


export const routes = (
		<Router history={browserHistory}>
		 <Route path="/" component={Index} comp='home' onEnter={onEnterPublicpage}/>
		 <Route path="/about" component={Index} comp='about' onEnter={onEnterPublicpage}/>
		 <Route path="/businessplan" component={Index} comp='businessplan' onEnter={onEnterPublicpage}/>
		 <Route path="/products" component={Index} comp='products' onEnter={onEnterPublicpage}/>
		 <Route path="/product/canegold" component={Index} comp='product-canegold' onEnter={onEnterPublicpage}/>
		 <Route path="/product/ladysafe" component={Index} comp='product-ladysafe' onEnter={onEnterPublicpage}/>
		 <Route path="/product/organicPower" component={Index} comp='product-organicPower' onEnter={onEnterPublicpage}/>
		 <Route path="/product/spirulina" component={Index} comp='product-spirulina' onEnter={onEnterPublicpage}/>
		 <Route path="/rules" component={Index} comp='rules' onEnter={onEnterPublicpage}/>
		 <Route path="/legal" component={Index} comp='legal' onEnter={onEnterPublicpage}/>
		 <Route path="/contact" component={Index} comp='contact' onEnter={onEnterPublicpage}/>
		 <Route path="/login" component={Index} comp='login' onEnter={onEnterPublicpage}/>
		 
		 <Route path="/adminPanel" component={Navbar} level='admin' comp='report' onEnter={onEnterPrivatePage} />
         <Route path="/addUser" component={Navbar} level='admin' comp='addUser' onEnter={onEnterPrivatePage} />
         <Route path="/editUser" component={Navbar} level='admin' comp='editUser' onEnter={onEnterPrivatePage} />
         <Route path="/allMembers" component={Navbar} level='admin' comp='allMembers' onEnter={onEnterPrivatePage} />
         <Route path="/paymentReport" component={Navbar} level='admin' comp='paymentReport' onEnter={onEnterPrivatePage} />
         <Route path="/dashboard" component={Navbar} level='admin' comp='report' onEnter={onEnterPrivatePage} />
         
         <Route path="/userPanel" component={Navbar} level='user' comp='dashboard' onEnter={onEnterPrivatePage} />
         <Route path="/addDownline" component={Navbar} level='user' comp='addDownline' onEnter={onEnterPrivatePage} />
         <Route path="/seeDownline" component={Navbar} level='user' comp='seeDownline' onEnter={onEnterPrivatePage} />
         <Route path="/profile" component={Navbar} level='user' comp='profile' onEnter={onEnterPrivatePage} />
         <Route path="/payment" component={Navbar} level='user' comp='payment' onEnter={onEnterPrivatePage} />
         <Route path="/userdashboard" component={Navbar} level='user' comp='dashboard' onEnter={onEnterPrivatePage} />
         <Route path="*" component={NotFound} />
		</Router>
	);