import React, { Component } from 'react';
import {Link} from 'react-router';
import Accounts from './Accounts';
import '/imports/css/style.css'
import { createContainer } from 'meteor/react-meteor-data';

import Report from '/imports/ui/admin/Report'
import AllMembers from '/imports/ui/admin/AllMembers'
import PaymentReport from '/imports/ui/admin/PaymentReport'
import AddUser from '/imports/ui/admin/AddUser'
import EditUser from '/imports/ui/admin/EditUser'

import AddDownline from '/imports/ui/user/AddUser'
import SeeDownline from '/imports/ui/user/SeeDownline'
import Profile from '/imports/ui/user/Profile'
import Payment from '/imports/ui/user/Payment'

class Navbar extends Component{
	componentDidMount () {
//     (function($) {
//   $(function() {
//     $('#sidebar .nav').perfectScrollbar();
//     $('.container-scroller').perfectScrollbar( {suppressScrollX: true});
//     $('[data-toggle="minimize"]').on("click", function () {
//       $('body').toggleClass('sidebar-icon-only');
//     });
//   });
// })(jQuery);
(function($) {
  $(function() {
    $('[data-toggle="offcanvas"]').on("click", function () {
      $('.row-offcanvas').toggleClass('active')
    });
  });
})(jQuery);
(function($) {
  $(document).on('mouseenter mouseleave', '.sidebar .nav-item', function (ev) {
      var sidebarMini = $('body').hasClass("sidebar-mini");
      var sidebarIconOnly = $('body').hasClass("sidebar-icon-only");
      var horizontalMenu = $('body').hasClass("horizontal-menu");
      var horizontalMenuTop = $('body').hasClass("horizontal-menu-top");
      var boxedLayout = $('body').hasClass("boxed-layout");
      var rtlLayout = $('body').hasClass("rtl");
      if (sidebarMini || sidebarIconOnly || horizontalMenu) {
        var $menuItem = $(this),
        $submenuWrapper = $('> .collapse', $menuItem);
        if(ev.type === 'mouseenter') {
          $submenuWrapper.addClass('show');
          // grab the menu item's position relative to its positioned parent
          var menuItemPos = $menuItem.offset();
          // place the submenu in the correct position relevant to the menu item
          if(horizontalMenu) {
            if(horizontalMenuTop) {
              if(rtlLayout) {
                $submenuWrapper.css({
                    top: menuItemPos.top+$menuItem.height(),
                    left: menuItemPos.left,
                    minWidth: $menuItem.outerWidth()
                });
              }
              else {
                $submenuWrapper.css({
                    top: menuItemPos.top+$menuItem.height(),
                    left: menuItemPos.left - $('.navbar-brand-wrapper').outerWidth(),
                    minWidth: $menuItem.outerWidth()
                });
              }
            }
            else {
              $submenuWrapper.css({
                  top: menuItemPos.top+$menuItem.height(),
                  left: menuItemPos.left,
                  minWidth: $menuItem.outerWidth()
              });
            }
          }
          else {
            if(menuItemPos.top>=$('.sidebar').height()/2){
              $submenuWrapper.css({
                  top: menuItemPos.top+$menuItem.height()- $(window).scrollTop()-$submenuWrapper.height()
              });
            }
            else {
              $submenuWrapper.css({
                  top: menuItemPos.top- $(window).scrollTop()
              });
            }
            if(boxedLayout) {
              if(rtlLayout) {
                $submenuWrapper.css({
                  right: $menuItem.outerWidth() + $('.container-scroller').css('padding-right')
                });
              }
              else {
                $submenuWrapper.css({
                  left: menuItemPos.left + Math.round($menuItem.outerWidth()-$('.container-scroller').css('padding-left'))
                });
              }
            }
            else {
              if(rtlLayout) {
                $submenuWrapper.css({
                  right: $menuItem.outerWidth()
                });
              }
              else {
                $submenuWrapper.css({
                  left: menuItemPos.left + Math.round($menuItem.outerWidth())
                });
              }
            }
          }
        }
        else {
          $submenuWrapper.removeClass('show');
        }
      }
  });
})(jQuery);

}
  renderComponent(){
  if(this.props.route.comp==='report')
    return <Report/>
  else if(this.props.route.comp==='allMembers')
    return <AllMembers />
  else if(this.props.route.comp==='paymentReport')
    return <PaymentReport/>
  else if(this.props.route.comp==='addUser')
    return <AddUser/>
  else if(this.props.route.comp==='editUser')
    return <EditUser/>
  else if(this.props.route.comp==='addDownline')
    return <AddDownline/>
  else if(this.props.route.comp==='seeDownline')
    return <SeeDownline/>
  else if(this.props.route.comp==='payment')
    return <Payment/>
  else if(this.props.route.comp==='profile')
    return <Profile/>
  else
    return undefined
                
  }
	render(){
    let pic, name, id=''
    if(Meteor.user()!==undefined){
      pic = Meteor.user().profile.imageURL;
      name = Meteor.user().profile.name;
      id = Meteor.user().emails[0].address
    }
  if(this.props.route.level==='admin')
	return(
		

  <div className="container-scroller">
        <nav className="navbar bg-primary-gradient col-lg-12 col-12 p-0 fixed-top navbar-inverse d-flex flex-row">
            <div className="bg-white text-center navbar-brand-wrapper">
                <a className="navbar-brand brand-logo" href="#"><img src="https://res.cloudinary.com/luckymobile/image/upload/v1564855977/hastetro/Logo-removebg-preview.png" height="60" /></a>
                <a className="navbar-brand brand-logo-mini" href="#"><img src="https://res.cloudinary.com/luckymobile/image/upload/v1564855977/hastetro/Logo-removebg-preview.png" height="60" /></a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center">
                <button className="navbar-toggler navbar-toggler hidden-md-down align-self-center mr-3" type="button" data-toggle="minimize">
                  <span className="navbar-toggler-icon"></span>
                </button>
                
                <ul className="navbar-nav ml-lg-auto d-flex align-items-center flex-row">
                    <li className="nav-item">
                        <a className="nav-link profile-pic" href="#"><img className="rounded-circle" src={pic} alt="profile-pic"/></a>
                    </li>
                    <li className="nav-item">
                        <Accounts/>
                    </li>
                </ul>
                <button className="navbar-toggler navbar-toggler-right hidden-lg-up align-self-center" type="button" data-toggle="offcanvas">
                  <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
        <div className="container-fluid">
            <div className="row row-offcanvas row-offcanvas-right">
                <nav className="bg-white sidebar sidebar-fixed sidebar-offcanvas" id="sidebar">
                <div className="user-info">
                    <img src={pic} alt=""/>
                    <p className="name">{name}</p>
                    <p className="designation">{id}</p>
                    <span className="online"></span>
                </div>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to='/dashboard' className="nav-link">
                                <i className="fa fa-tachometer" aria-hidden="true"></i>
                                <span className="menu-title">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/allMembers' className="nav-link">
                                <i className="fa fa-users" aria-hidden="true"></i>
                                <span className="menu-title">All Members</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/paymentReport' className="nav-link">
                                <i className="fa fa-wpforms" aria-hidden="true"></i> 
                                <span className="menu-title">Payment Report</span>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                <i className="fa fa-address-book" aria-hidden="true"></i> 
                                <span className="menu-title">User<i className="fa fa-sort-down"></i></span>
                            </a>
                            <div className="collapse" id="collapseExample">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                      <Link to='/addUser' className="nav-link">
                                        <i className="fa fa-plus" aria-hidden="true"></i>Add User
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link to='/editUser' className="nav-link">
                                        <i className="fa fa-pencil" aria-hidden="true"></i>Edit User
                                      </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
                
                
                <div className="content-wrapper">
                {this.renderComponent()}
                </div>
                <footer className="footer">
                    <div className="container-fluid clearfix">
                      <span className="float-right">
                          <a href="">Developed by Growbez Technologies</a> &copy; 2019
                      </span>
                    </div>
                </footer>
            </div>
        </div>

      </div>

		)
	else if(this.props.route.level==='user')
		return(
  <div className="container-scroller">
        <nav className="navbar bg-primary-gradient col-lg-12 col-12 p-0 fixed-top navbar-inverse d-flex flex-row">
            <div className="bg-white text-center navbar-brand-wrapper">
                <a className="navbar-brand brand-logo" href="#"><img src="https://res.cloudinary.com/hastetro/image/upload/v1567510172/Logo-removebg-preview_ffu8is.png" height="60" /></a>
                <a className="navbar-brand brand-logo-mini" href="#"><img src="https://res.cloudinary.com/hastetro/image/upload/v1567510172/Logo-removebg-preview_ffu8is.png" height="60" /></a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center">
                <button className="navbar-toggler navbar-toggler hidden-md-down align-self-center mr-3" type="button" data-toggle="minimize">
                  <span className="navbar-toggler-icon"></span>
                </button>
                
                <ul className="navbar-nav ml-lg-auto d-flex align-items-center flex-row">
                    <li className="nav-item">
                        <Link to='/profile' className="nav-link profile-pic" href="#"><img className="rounded-circle" src={pic} alt="profile-pic"/></Link>
                    </li>
                    <li className="nav-item">
                        <Accounts/>
                    </li>
                </ul>
                <button className="navbar-toggler navbar-toggler-right hidden-lg-up align-self-center" type="button" data-toggle="offcanvas">
                  <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
        <div className="container-fluid">
            <div className="row row-offcanvas row-offcanvas-right">
                <nav className="bg-white sidebar sidebar-fixed sidebar-offcanvas" id="sidebar">
                <div className="user-info">
                    <img src={pic} alt=""/>
                    <p className="name">{name}</p>
                    <p className="designation">{id}</p>
                    <span className="online"></span>
                </div>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to='/addDownline' className="nav-link">
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                <span className="menu-title">Add Downline</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/seeDownline' className="nav-link">
                                <i className="fa fa-level-down" aria-hidden="true"></i>
                                <span className="menu-title">See Downline</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/payment' className="nav-link">
                                <i className="fa fa-money"></i> 
                                <span className="menu-title">Payment</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/profile' className="nav-link">
                                <i className="fa fa-user"></i> 
                                <span className="menu-title">Profile</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                
                
                <div className="content-wrapper">
                {this.renderComponent()}
                </div>
                <footer className="footer">
                    <div className="container-fluid clearfix">
                      <span className="float-right">
                          <a href="">Developed by Growbez Technologies</a> &copy; 2019
                      </span>
                    </div>
                </footer>
            </div>
        </div>

      </div>

	
)
	}
};

export default createContainer(() => {
  Meteor.subscribe('users');
  return { 
            userList:Meteor.users.find().fetch(),
   };
}, Navbar);