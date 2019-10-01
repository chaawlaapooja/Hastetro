import React from 'react';
import {Link} from 'react-router';
//import '/imports/css/LandingPage.css'
class LandingPage extends React.Component{

	constructor(props){
		super(props);
		this.state={
			error:'',
			component:'about'
		}
	}
	componentDidMount(){
	
		var message="Right-click has been disabled";
function clickIE() {
    if (document.all) {
        (message);
        return false;
    }
}
function clickNS(e) {
    if (document.layers || (document.getElementById && !document.all)) {
        if (e.which == 2||e.which == 3) {
            (message);
            return false;
        }
    }
}
if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = clickNS;
} else {
    document.onmouseup = clickNS;
    document.oncontextmenu = clickIE;
}
document.oncontextmenu = new Function("return false");
document.getElementsByClassName('my-img').ondragstart = function() { return false; };

		
	}
	onIDEnter(){
		this.refs.registrationID.value=this.refs.registrationID.value.toUpperCase()
	}
	handle_submit(event){
		event.preventDefault();
		let email =  this.refs.registrationID.value.trim()
		let password = this.refs.password.value.trim();


		Meteor.loginWithPassword({email}, password, (err)=>{
			if(err){
				this.setState({error: err.reason});
			}
			else
			{
				this.setState({error:''});
				
			}
		});
	}
	changeComponent(component){
		this.setState({component})
	}
	
	render(){
	return(
  <div style={{backgroundColor: '#dcdcdc'}}>
  
  <nav className="navbar navbar-expand-md navbar-dark" style={{backgroundColor:'rgb(145, 147, 149)'}}>
  <a className="navbar-brand" href="#"><img src="https://res.cloudinary.com/hastetro/image/upload/v1567510172/Logo-removebg-preview_ffu8is.png" height="50" width="50"/>HASTETRO</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="nav nav-tabs" role="tablist">
      <li className="nav-item">
        <a className="nav-link active" style={{color:'black'}} href="#menuAbout" role="tab" data-toggle="tab">ABOUT</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" style={{color:'black'}} href="#menuPlan" role="tab" data-toggle="tab">BUSINESS PLAN</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" style={{color:'black'}} href="#menuProducts" role="tab" data-toggle="tab">PRODUCTS</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" style={{color:'black'}} href="#menuRules" role="tab" data-toggle="tab">RULES AND POLICIES</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" style={{color:'black'}} href="#menuLegal" role="tab" data-toggle="tab">LEGAL</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" style={{color:'black'}} href="#menuContact" role="tab" data-toggle="tab">CONTACT US</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" style={{color:'black'}} href="#menuLogin" role="tab" data-toggle="tab">LOGIN</a>
      </li>    
    </ul>
  </div>  
</nav>
  

<div className="tab-content">
    <div id="menuAbout" role="tabpanel" className="tab-pane active">
      <h3 className="heading"><img src="https://res.cloudinary.com/hastetro/image/upload/v1567510172/Logo-removebg-preview_ffu8is.png" height="50" width="50"/> ABOUT HASTETRO</h3>
    <h4 className="content">
      <li>Hastetro is a marketing company that considers customer service as God's service.  Because of this, the company has always provided good service and good products for its customers. To increase the number of customers, the company has used various marketing tools such as direct marketing, Telemarketing, online shopping. We are entering in market with a new & unique concept of direct selling. In order to provide better service to the customers, the company has built a good network of distributors in every Taluka and District.</li>  <br/>
      <li>Hastetro is company with a vast experience and resources. Through this company, customers have received a golden opportunity to do their own business. This opportunity allows everyone to start their own business with minimal capital. Everyone who does this business can achieve financial freedom and financial security. By staying with this company, everyone can make their dreams come true. We helps to you fulfill business ambitions in each and every step on the way towards a better tomorrow.
</li><br/>
      <li>We are not only providing the products for direct selling but we ourselves use these products in our day-to-day life. Come, have a look.</li><br/>
      </h4>
      <h3 className="heading">BOARD OF DIRECTORS</h3>
      <div className="content">
      	<div className="cardContainer">
      	<div className="card bg-primary" style={{width:60+"%", padding:6+'%'}}>
		  <img className="card-img-top" src="https://res.cloudinary.com/hastetro/image/upload/v1567510220/Ashokrao_Khot_ehubbc.jpg" className="img-thumbnail" alt="Ashokrao_Khot" height="200" width="200"/>
		  <div className="card-body">
		    <h4 className="card-title" style={{color:'red', fontSize:20+'px'}}>Ashokrao Khot, CMD</h4>
		    <p className="card-text">The man of dreams, Mr. Ashokrao Khot realized that working for any other organization could be a barrier to achieving big dreams. So he decided to start his own business. Mr. Khot is always looking for perfection in everything he or his company does. For more than 10 years, the leader of the direct sells industry, Shri. Ashokrao Khot helped thousands of people to realize their dreams.</p>
    	  </div>
    	</div>
    	<div className="card bg-primary" style={{width:60+"%", padding:6+'%'}}>
		  <img className="card-img-top" src="https://res.cloudinary.com/hastetro/image/upload/v1567510250/Santosh_Jadhav_evpph2.jpg" className="img-thumbnail" alt="Santosh_Jadhav" height="200" width="200"/>
		  <div className="card-body">
		    <h4 className="card-title" style={{color:'red', fontSize:20+'px'}}>Santosh Jadhav, Vice President</h4>
		    <p className="card-text">A Visionary Man with the outstanding experience in marketing company.</p>
    	  </div>
    	</div>
    	<div className="card bg-primary" style={{width:60+"%", padding:6+'%'}}>
		  <img className="card-img-top" src="https://res.cloudinary.com/hastetro/image/upload/v1567510276/2_dldawf.jpg" className="img-thumbnail" alt="Akshay_Mugalkhod" height="200" width="200"/>
		  <div className="card-body">
		    <h4 className="card-title" style={{color:'red', fontSize:20+'px'}}>Akshay Mugalkhod, Director</h4>
		    <p className="card-text">A man with the dream of empowering the people of India with the vision of making everyone financially independent. </p>
    	  </div>
    	</div>
    	<div className="card bg-primary" style={{width:60+"%", padding:6+'%'}}>
		  <img className="card-img-top" src="https://res.cloudinary.com/hastetro/image/upload/v1567510299/Suraj_Sagare_pz2dcb.jpg" className="img-thumbnail" alt="Suraj_Sagare" height="200" width="200"/>
		  <div className="card-body">
		    <h4 className="card-title" style={{color:'red', fontSize:20+'px'}}>Suraj Sagare, Development Director (Technical)</h4>
		    <p className="card-text">A person with the amazing experience in technical Development and product enhancement has always made his efforts upto the mark to raise the company in all fields.</p>
    	  </div>
    	</div>
    	</div>
      </div>

      
    </div>
    <div id="menuPlan" className="tab-pane fade">
      <h3 className="heading">BUSINESS PLAN</h3>
      	<h4 className="content">
      	Change the trend of business with <strong>Hastetro Trade.</strong><br/>
      	Cut down the traditional market chain with the business plan of Hastetro, which is designed for maximum profit after tremendous research. <br/>
      	You can build your network and gain the maximum profit by gaining commissions on the products that your network sells.<br/>
      	Build more levels to get greater profit.<br/><br/>
      	<strong>Let's get started to help you get richer. Follow these steps :</strong>
      	<ol>
      	<li>Become <strong>Business Associate</strong></li>
      	<li>Become beneficiary</li>
      	</ol>
      	<p className="subtitle">Beneficiary :</p>
      	<ul>
      	<li>To become the beneficiary of this company, you have to pay a very low cost, which means you have to buy a product in the product list given by the company. After you buy, make sure you use the product yourself and then you will receive a commission on any other customer company you refer to.</li>
      	</ul>
      	<p className="subtitle">Business Associate :</p>
      	<ul>
      	<li>After you join the company, business starts after you have made at least one person a Business Associate (BA) of the company.  This is a unique opportunity which benefits you with an unlimited lifetime earnings.</li>
      	<li>You can add up to five direct Business Associate (BA). Because your business is based on commissions, your income is dependent on the number of Business Associates (BA’s) you associate with the company.</li>
      	<li>The company has different levels of commissions for each level you add. Each & Every Business Associate (BA) is eligible for income form every set of joining up to seventh level.</li>
      	<li>This means you can earn income up to the seventh level after you have joined the company. If you work according to company rules, you can earn up to Rs. Ten lakhs for seven levels without any conditions.</li>
      	<li>You have to grow your network to 5 members that will work as your downline.</li>
      	<li>Make those 5 downline members to grow their network to have their 5 downline members. </li>
      	<li>Each time a level1 user sells a product, you'll earn Rs.60 as commission (Total : Rs.60)</li>
    	<li>Each time a level2 user sells a product, you'll earn Rs.60 as commission for level1 user and Rs.50 as commission for level2 user (Total : Rs.110)</li>
    	<li>Each time a level3 user sells a product, you'll earn Rs.60 as commission for level1 user and Rs.50 as commission for level2 user and Rs.40 as commission for level3 user (Total : Rs.150)</li>
    	<li>The more levels you create, the more is your profit</li>
    	</ul>
    	
    	<br/><br/><br/>
    	<strong>Have a look at how much you can earn after building 7 level network.</strong>
    	</h4>
    	<img style={{paddingLeft:7+'%', paddingRight:7+'%'}} src="https://res.cloudinary.com/hastetro/image/upload/v1567510336/Plan_jligrx_dhmmau.png"  className="img-responsive" />
    	<br/>
    	<h3 style={{paddingLeft:7+'%', paddingRight:7+'%'}}><i className="glyphicon glyphicon-earphone" aria-hidden="true"></i>Call now to get richer <a href="tel:+919156827889"><strong>+91-9156827889</strong></a> or <a href="tel:+919156764599"><strong>+91-9156764599</strong>.</a></h3>

    </div>
    <div id="menuProducts" className="tab-pane fade">
      <h3 className="heading">OUR PRODUCTS</h3>
        <div style={{paddingLeft:2+"%", paddingRight:2+'%', marginLeft:10+'%', marginRight:10+'%', display: 'flex',
    justifyContent: 'center'}}>
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
      <ul className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
        <li data-target="#myCarousel" data-slide-to="3"></li>
        <li data-target="#myCarousel" data-slide-to="4"></li>
      </ul>

      <div className="carousel-inner">

        <div className="carousel-item active">
          <img src="https://res.cloudinary.com/hastetro/image/upload/v1567510403/products/Organic_Powar_qjruxu.jpg" alt="organic Power" style={{width:100+'%'}}/>
          <div className="carousel-caption">
            <h3 style={{color:'black'}}>Orgainic Power</h3>
            <p style={{color:'black'}}>Organic powder for agricultural use!</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src="https://res.cloudinary.com/hastetro/image/upload/v1567510461/products/canegld_tfydlj.jpg" alt="Canegold" style={{width:100+'%'}}/>
          <div className="carousel-caption">
            <h3 style={{color:'black'}}>Canegold</h3>
            <p style={{color:'black'}}>For agricultural use!</p>
          </div>
        </div>
      
        <div className="carousel-item">
          <img src="https://res.cloudinary.com/hastetro/image/upload/v1567510517/products/Spirulina_e6seeu.jpg" alt="Spirulina" style={{width:100+'%'}}/>
          <div className="carousel-caption">
            <h3 style={{color:'black'}}>Spirulina</h3>
            <p style={{color:'black'}}>Muscle strengthening tablets!</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src="https://res.cloudinary.com/hastetro/image/upload/v1567510553/products/LEDY_SAFE1_l25nkw.jpg" alt="Lady Safe" style={{width:100+'%'}}/>
          <div className="carousel-caption">
            <h3 style={{color:'black'}}>Lady Safe</h3>
            <p style={{color:'black'}}>Sanitary Napkins!</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src="https://res.cloudinary.com/hastetro/image/upload/v1567510604/products/Organic_Powar_Gold_zt7e1b.jpg" alt="Organic Power Gold" style={{width:100+'%'}}/>
          <div className="carousel-caption">
            <h3 style={{color:'black'}}>Organic Power gold</h3>
            <p style={{color:'black'}}>Powder for agricultural use!</p>
          </div>
        </div>
    
      </div>

      <a style={{color:'black'}} className="carousel-control-prev" href="#myCarousel" data-slide="prev">
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
      </a>
      <a style={{color:'black'}} className="carousel-control-next" href="#myCarousel" data-slide="next">
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
      </a>
  </div>
  </div>
    </div>
    <div id="menuRules" className="tab-pane fade">
      <h3 className="heading">RULES AND POLICIES</h3>
    	<h4 className="content">
    	We stick to our rules and policies firmly.<br/>
    	All the sales, transactions and other operations of the company are subject to legal jurisdiction.<br/>
    	As long as you're not violating any terms and conditions, no one can stop you to get richer and richer.<br/>
    	Can't wait to see you as part of HASTETRO.
    	</h4>
    </div>
    <div id="menuLegal" className="tab-pane fade">
      <h3 className="heading">LEGAL</h3>
      <h4 className="content">
      Hastetro Trade Private Limited is goverment issued MSME.<br/>
      We ensure consumer safety and unlike other companies, we have all legal documents from income tax department to keep your returns and profits safe.<br/>
      Have a look at all our legal documents and join us to have your safe and secure financial future.</h4>
        <div style={{display:'flex', justifyContent:'center'}}>
        <div id="myCarousel1" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#myCarousel1" data-slide-to="0" className="active"></li>
        <li data-target="#myCarousel1" data-slide-to="1"></li>
        <li data-target="#myCarousel1" data-slide-to="2"></li>
      </ol>

      <div className="carousel-inner">

        <div className="carousel-item active">
          <img src="https://res.cloudinary.com/hastetro/image/upload/c_fill,g_auto,h_500,w_800/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:d9d9d9,fl_relative,l_text:montserrat_25_style_light_align_center:HASTETRO,w_0.5,y_0.18/v1564838344/PAN_drmwwk.png" alt="PAN" style={{width:100+'%'}}/>
          <div className="carousel-caption">
            <h3>PAN CARD</h3>
          </div>
        </div>

        <div className="carousel-item" >
          <img className='msme' src="https://res.cloudinary.com/hastetro/image/upload/c_fill,g_auto,h_500,w_800/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:d9d9d9,fl_relative,l_text:montserrat_25_style_light_align_center:HASTETRO,w_0.5,y_0.18/v1564838325/MSME_z8tbst.png" alt="MSME CERTIFICATE" style={{width:100+'%'}}/>
          <div className="carousel-caption">
            <h3>MSME CERTIFICATE</h3>
          </div>
        </div>

        <div className="carousel-item">
          <img src="https://res.cloudinary.com/hastetro/image/upload/c_fill,g_auto,h_500,w_800/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:d9d9d9,fl_relative,l_text:montserrat_25_style_light_align_center:HASTETRO,w_0.5,y_0.18/v1564838313/Certificate_of_Inc_aokcwa.png" alt="CERTIFICATE OF INCORPORATION" style={{width:100+'%'}}/>
          <div className="carousel-caption">
            <h3>CERTIFICATE OF INCORPORATION</h3>
          </div>
        </div>
    
      </div>

      <a style={{color:'black'}} className="carousel-control-prev" href="#myCarousel1" data-slide="prev">
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
      </a>
      <a style={{color:'black'}} className="carousel-control-next" href="#myCarousel1" data-slide="next">
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
      </a>
  </div>
  </div>
    </div>
    <div id="menuContact" className="tab-pane fade">
      <h3 className="heading">CONTACT US</h3>
      <div className="about">
		<div className="container">	
			<div className="w3ls_about_grids">
				<div className="col-md-6 w3ls_about_grid_left">
					<h3>Welcome to the HASTETRO TRADE PRIVATE LIMITED!</h3><hr/><br/>
					<p>It is our soulful responsibilty to deliver the best quality products at the most premium range with the adds on of our best high end services. We ensure that our by joining with us, you create enermous wealth plus deliver high quality products. Come, join the network of fastest growing commuity at <strong>HASTETRO</strong></p>

					<div className="col-xs-2 w3ls_about_grid_left1">
						<a href="https://goo.gl/maps/ipnt8pvZGR1FmDhS8" target="_blank" className="google"><span className="glyphicon glyphicon-map-marker" aria-hidden="true"> </span></a>
					</div>
					<div className="col-xs-10 w3ls_about_grid_left2">
						<p>Reach out to us at : <a href="https://goo.gl/maps/ipnt8pvZGR1FmDhS8" target="_blank" className="google"><strong>21/420, Panchganga Factory Road, Near Deccan Mill,  Next Gokul Bekari, Ichalkaranji, Kolhapur, Maharashtra, India - 416115</strong></a></p>
					</div>
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.350963293388!2d74.21720261486702!3d16.70933128848826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc101aa611a15e1%3A0xcdd94132d18d500c!2sHastetro+Trade+Corporate+Office!5e0!3m2!1sen!2sin!4v1564921311020!5m2!1sen!2sin" width="500" height="200" frameBorder="0" style={{border:0+'px', float:'right'}} allowFullScreen></iframe>
					<div className="clearfix"> </div>

					<div className="col-xs-2 w3ls_about_grid_left1">
						<a href="mailto:hastetro@gmail.com"><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span></a>
					</div>
					<div className="col-xs-10 w3ls_about_grid_left2">
						<p><br/>Mail us on <a href="mailto:hastetro@gmail.com"><strong>hastetro@gmail.com</strong></a></p>
					</div>
					<div className="clearfix"> </div>

					<div className="col-xs-2 w3ls_about_grid_left1">
						<a href="tel:+919156827889"><span className="glyphicon glyphicon-earphone" aria-hidden="true"></span></a>
					</div>
					<div className="col-xs-10 w3ls_about_grid_left2">
						<p><br/>Call us on <a href="tel:+919156827889"><strong>+91-9156827889</strong></a> or <a href="tel:+919156764599"><strong>+91-9156764599</strong>.</a></p>
					</div>
					<div className="clearfix"> </div>
					
				</div>

				<div className="col-md-6 w3ls_about_grid_right">
					<img src="https://res.cloudinary.com/hastetro/image/upload/v1567510727/Logo_oj8kk9.png" alt="HASTETRO" className="img-responsive" />
				</div>
				<div className="clearfix"> </div>
			</div>
		</div>
	</div>
	</div>
    <div id="menuLogin" className="tab-pane fade">
    	<div className="boxed-view">
		<div className="boxed-view__box">
		<h1>Login!</h1>
		{this.state.error?<p style={{color:'red'}}>{this.state.error}</p>:undefined}
		<form className="boxed-view__form" onSubmit={this.handle_submit.bind(this)}>
			<input type="text" ref="registrationID" placeholder="Enter your registration ID" onKeyUp={()=>this.onIDEnter()} pattern="HTPL[0-9]{5}" title="ID starts with HTPL followed by 5 digits." />
			<input type="password" ref="password" placeholder="Enter Password" pattern=".{6,}" title="Enter six or more characters"/>
			<button className="button">Login</button>
		</form>
		
		</div>
		</div>  
    </div>
  </div>
    
  </div>
);
}
}

export default LandingPage;
