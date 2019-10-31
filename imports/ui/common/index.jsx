import React from 'react';
import {Link} from 'react-router'
import Home from '/imports/ui/landingPage/Home'
import About from '/imports/ui/landingPage/About'
import BusinessPlan from '/imports/ui/landingPage/BusinessPlan'
import Products from '/imports/ui/landingPage/Products'
import Rules from '/imports/ui/landingPage/Rules'
import Legal from '/imports/ui/landingPage/Legal'
import Contact from '/imports/ui/landingPage/Contact'
import Login from '/imports/ui/landingPage/Login'

import Canegold from '/imports/ui/landingPage/Products/Canegold'
import Ladysafe from '/imports/ui/landingPage/Products/Ladysafe'
import OrganicPower from '/imports/ui/landingPage/Products/OrganicPower'
import Spirulina from '/imports/ui/landingPage/Products/Spirulina'

class Index extends React.Component{
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
  if(this.props.route.comp==='home')
    return <Home/>
  else if(this.props.route.comp==='about')
    return <About />
  else if(this.props.route.comp==='businessplan')
    return <BusinessPlan/>
  else if(this.props.route.comp==='products')
    return <Products/>
  else if(this.props.route.comp==='rules')
    return <Rules/>
  else if(this.props.route.comp==='legal')
    return <Legal/>
  else if(this.props.route.comp==='contact')
    return <Contact/>
  else if(this.props.route.comp==='login')
    return <Login/>
  else if(this.props.route.comp==='product-spirulina')
    return <Spirulina/>
  else if(this.props.route.comp==='product-canegold')
    return <Canegold/>
  else if(this.props.route.comp==='product-ladysafe')
    return <Ladysafe/>
  else if(this.props.route.comp==='product-organicPower')
    return <OrganicPower/>

  else
    return undefined
                
  }
	render(){
		return(
			<div className="container-scroller ps ps--theme_default ps--active-y" data-ps-id="c9936192-5b8b-770a-fb02-f1244bede77e">
        <nav className="navbar bg-primary-gradient col-lg-12 col-12 p-0 fixed-top navbar-inverse d-flex flex-row">
           {/*<div className="bg-white text-center navbar-brand-wrapper">
                <a className="navbar-brand brand-logo" href="#"><img src="images/logo_star_black.png" /></a>
                <a className="navbar-brand brand-logo-mini" href="#"><img src="images/logo_star_mini.jpg" alt=""></a>
            </div> */}
            <div className="navbar-menu-wrapper d-flex align-items-center">
                <button className="navbar-toggler navbar-toggler hidden-md-down align-self-center mr-3" type="button" data-toggle="minimize">
                  <span className="navbar-toggler-icon"></span>
                </button>
                
                <ul className="navbar-nav ml-lg-auto d-flex align-items-center flex-row">
                    <li className="nav-item">
                        
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login"><button type="button" className="btn btn-outline-info" style={{borderColor: 'white', color: 'white'}}>Login</button></Link>
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

                    <ul className="nav ps ps--theme_default" data-ps-id="09e9dda5-79d2-0f27-084e-e8794bd4e98d">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                <img src="https://res.cloudinary.com/hastetro/image/upload/v1571822280/website%20assets/icons/1_dlzpn7.png" alt=""/>
                                <span className="menu-title">Home</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                <img src="https://res.cloudinary.com/hastetro/image/upload/v1571822317/website%20assets/icons/2_vtsjb1.png" alt=""/>
                                <span className="menu-title">About</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/businessplan">
                                <img src="https://res.cloudinary.com/hastetro/image/upload/v1571822360/website%20assets/icons/4_mqo2yt.png" alt=""/>
                                <span className="menu-title">Business Opportunity</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="products">
                                <img src="https://res.cloudinary.com/hastetro/image/upload/v1571822413/website%20assets/icons/3_bulv85.png" alt=""/>
                                <span className="menu-title">Products</span>
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/rules">
                                <img src="https://res.cloudinary.com/hastetro/image/upload/v1571822453/website%20assets/icons/5_ij2pms.png" alt=""/>
                                <span className="menu-title">Rules</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/legal">
                                <img src="https://res.cloudinary.com/hastetro/image/upload/v1571822482/website%20assets/icons/6_gjkhjz.png" alt=""/>
                                <span className="menu-title">Legal</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                <img src="https://res.cloudinary.com/hastetro/image/upload/v1571822514/website%20assets/icons/7_epycmb.png" alt=""/>
                                <span className="menu-title">Contact Us</span>
                            </Link>
                        </li>
                        
                    <div className="ps__scrollbar-x-rail" style={{left: 0+'px', bottom: 0+'px'}}><div className="ps__scrollbar-x" tabIndex="0" style={{left: 0+'px', width: 0+'px'}}></div></div><div className="ps__scrollbar-y-rail" style={{top: 0+'px', right: 0+'px'}}><div className="ps__scrollbar-y" tabIndex="0" style={{top: 0+'px',height: 0+'px'}}></div></div></ul>
                </nav>
                
                
                <div className="content-wrapper">
                {this.renderComponent()}
                </div>
                <footer className="footer sunil img-responsive" style={{backgroundImage:`url(https://res.cloudinary.com/hastetro/image/upload/v1571823292/website%20assets/page-header-bg_ux5ill.jpg)`}}>
                    <div className="container-fluid clearfix">
                        <ul>
                        <li><i className="fa fa-facebook" aria-hidden="true"> </i></li>
                        <li><i className="fa fa-twitter" aria-hidden="true"> </i></li>
                        <li><i className="fa fa-linkedin" aria-hidden="true"> </i></li>
                        <li><i className="fa fa-instagram" aria-hidden="true"> </i></li>
                    </ul>
                      <span style={{color: 'white'}}>
                          All Rights Reserved @ Hastetro Trade Private Limited, 2019
                        <br/>Developed and maintained by <a href="">Growbez Technologies</a>
                      </span>
                    </div>
                </footer>
            </div>
        </div>

      <div className="ps__scrollbar-x-rail" style={{left: 0+'px', bottom: 0+'px'}}><div className="ps__scrollbar-x" tabIndex="0" style={{left: 0+'px', width: 0+'px'}}></div></div><div className="ps__scrollbar-y-rail" style={{top: 0+'px', height: 699+'px', right: 0+'px'}}><div className="ps__scrollbar-y" tabIndex="0" style={{top: 0+'px', height: 311+'px'}}></div></div></div>
		)
	}
}

export default Index