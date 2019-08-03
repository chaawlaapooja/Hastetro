import React from 'react';

class LandingPage extends React.Component{
	render(){
	return(
  <div>
  <nav className="navbar navbar-inverse" style={{backgroundColor:'#5b4681'}}>
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>                        
      </button>
      <a className="navbar-brand" data-toggle="pill" href="#menuAbout">HASTETRO TRADE</a>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav">
        <li className="active"><a data-toggle="pill" href="#menuAbout">About</a></li>
	    <li><a data-toggle="pill" href="#menuPlan">Business Plan</a></li>
	    <li><a data-toggle="pill" href="#menuRules">Rules and Policy</a></li>
	    <li><a data-toggle="pill" href="#menuLegal">Legal</a></li>
	  	<li><a data-toggle="pill" href="#menuContact">Contact us</a></li>
  	    <li><a data-toggle="pill" href="#menuLogin"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>
    </div>
  </div>
</nav>
  

<div className="tab-content" >
    <div id="menuAbout" className="tab-pane fade in active">
      <h3 className="heading"><img src="https://res.cloudinary.com/luckymobile/image/upload/v1564855977/hastetro/Logo-removebg-preview.png" height="50" width="50"/> ABOUT HASTETRO</h3>
      
  	<div id="myCarousel" className="carousel slide" data-ride="carousel">
	    <ol className="carousel-indicators">
	      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
	      <li data-target="#myCarousel" data-slide-to="1"></li>
	      <li data-target="#myCarousel" data-slide-to="2"></li>
	      <li data-target="#myCarousel" data-slide-to="3"></li>
	      <li data-target="#myCarousel" data-slide-to="4"></li>
	    </ol>

	    <div className="carousel-inner">

	      <div className="item active">
	        <img src="https://res.cloudinary.com/luckymobile/image/upload/c_scale,h_700,w_1200/v1564856267/hastetro/Organic_Powar.jpg" alt="organic Power" style={{width:100+'%'}}/>
	        <div className="carousel-caption">
	          <h3 style={{color:'black'}}>Orgainic Power</h3>
	          <p style={{color:'black'}}>Organic powder for agricultural use!</p>
	        </div>
	      </div>

	      <div className="item">
	        <img src="https://res.cloudinary.com/luckymobile/image/upload/c_scale,h_700,w_1200/v1564856236/hastetro/canegld.jpg" alt="Canegold" style={{width:100+'%'}}/>
	        <div className="carousel-caption">
	          <h3 style={{color:'black'}}>Canegold</h3>
	          <p style={{color:'black'}}>For agricultural use!</p>
	        </div>
	      </div>
	    
	      <div className="item">
	        <img src="https://res.cloudinary.com/luckymobile/image/upload/c_scale,h_700,w_1200/v1564856288/hastetro/Spirulina.jpg" alt="Spirulina" style={{width:100+'%'}}/>
	        <div className="carousel-caption">
	          <h3 style={{color:'black'}}>Spirulina</h3>
	          <p style={{color:'black'}}>Muscle strengthening tablets!</p>
	        </div>
	      </div>

	      <div className="item">
	        <img src="https://res.cloudinary.com/luckymobile/image/upload/c_scale,h_700,w_1200/v1564856248/hastetro/LEDY_SAFE1.jpg" alt="Lady Safe" style={{width:100+'%'}}/>
	        <div className="carousel-caption">
	          <h3 style={{color:'black'}}>Lady Safe</h3>
	          <p style={{color:'black'}}>Sanitary Napkins!</p>
	        </div>
	      </div>

	      <div className="item">
	        <img src="https://res.cloudinary.com/luckymobile/image/upload/c_scale,h_700,w_1200/v1564856254/hastetro/Organic_Powar_Gold.jpg" alt="Organic Power Gold" style={{width:100+'%'}}/>
	        <div className="carousel-caption">
	          <h3 style={{color:'black'}}>Organic Power gold</h3>
	          <p style={{color:'black'}}>Powder for agricultural use!</p>
	        </div>
	      </div>
	  
	    </div>

	    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
	      <span className="glyphicon glyphicon-chevron-left"></span>
	      <span className="sr-only">Previous</span>
	    </a>
	    <a className="right carousel-control" href="#myCarousel" data-slide="next">
	      <span className="glyphicon glyphicon-chevron-right"></span>
	      <span className="sr-only">Next</span>
	    </a>
	  
	</div>
	<h4 className="content">
      <li>Hastetro is a marketing company that considers customer service as God's service.  Because of this, the company has always provided good service and good products for its customers. To increase the number of customers, the company has used various marketing tools such as direct marketing, Telemarketing, online shopping. We are entering in market with a new & unique concept of direct selling. In order to provide better service to the customers, the company has built a good network of distributors in every Taluka and District.</li>  <br/>
      <li>Hastetro is company with a vast experience and resources. Through this company, customers have received a golden opportunity to do their own business. This opportunity allows everyone to start their own business with minimal capital. Everyone who does this business can achieve financial freedom and financial security. By staying with this company, everyone can make their dreams come true. We helps to you fulfill business ambitions in each and every step on the way towards a better tomorrow.
</li><br/>
      <li>We are not only providing the products for direct selling but we ourselves use these products in our day-to-day life. Come, have a look.</li><br/>
      </h4>
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
      	<strong>Beneficiary :</strong>
      	<ul>
      	<li>To become the beneficiary of this company, you have to pay a very low cost, which means you have to buy a product in the product list given by the company. After you buy, make sure you use the product yourself and then you will receive a commission on any other customer company you refer to.</li>
      	</ul>
      	<strong>Business Associate :</strong>
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
    	<img src="https://res.cloudinary.com/hastetro/image/upload/v1564835742/Plan_jligrx.png" className="img-responsive"/>
    	<br/>
    	<h3><a href="tel:+919673267518"><i className="glyphicon glyphicon-earphone" aria-hidden="true"></i>Call now to get richer</a></h3>

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
      	<div id="myCarousel1" className="carousel slide" data-ride="carousel">
	    <ol className="carousel-indicators">
	      <li data-target="#myCarousel1" data-slide-to="0" className="active"></li>
	      <li data-target="#myCarousel1" data-slide-to="1"></li>
	      <li data-target="#myCarousel1" data-slide-to="2"></li>
	    </ol>

	    <div className="carousel-inner">

	      <div className="item active">
	        <img src="https://res.cloudinary.com/hastetro/image/upload/v1564838344/PAN_drmwwk.png" alt="PAN" style={{width:100+'%'}}/>
	        <div className="carousel-caption">
	          <h3 style={{color:'black'}}>PAN CARD</h3>
	        </div>
	      </div>

	      <div className="item">
	        <img src="https://res.cloudinary.com/hastetro/image/upload/v1564838325/MSME_z8tbst.png" alt="MSME CERTIFICATE" style={{width:100+'%'}}/>
	        <div className="carousel-caption">
	          <h3 style={{color:'black'}}>MSME CERTIFICATE</h3>
	        </div>
	      </div>
	    
	      <div className="item">
	        <img src="https://res.cloudinary.com/hastetro/image/upload/v1564838313/Certificate_of_Inc_aokcwa.png" alt="CERTIFICATE OF INCORPORATION" style={{width:100+'%'}}/>
	        <div className="carousel-caption">
	          <h3 style={{color:'black'}}>CERTIFICATE OF INCORPORATION</h3>
	        </div>
	      </div>
	  
	    </div>

	    <a className="left carousel-control" href="#myCarousel1" data-slide="prev">
	      <span style={{color:'black'}} className="glyphicon glyphicon-chevron-left"></span>
	      <span className="sr-only">Previous</span>
	    </a>
	    <a className="right carousel-control" href="#myCarousel1" data-slide="next">
	      <span style={{color:'black'}} className="glyphicon glyphicon-chevron-right"></span>
	      <span className="sr-only">Next</span>
	    </a>
	  
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
						<a href="https://www.google.com/maps/place/Hastetro+Trade+Private+Limited/@16.4952806,74.1262116,17z/data=!3m1!4b1!4m5!3m4!1s0x3bc057ad16afcb17:0x7d6b684e78f95e9b!8m2!3d16.4952806!4d74.1284003" target="_blank" className="google"><span className="glyphicon glyphicon-map-marker" aria-hidden="true"> </span></a>
					</div>
					<div className="col-xs-10 w3ls_about_grid_left2">
						<p>Reach out to us at : <a href="https://www.google.com/maps/place/Hastetro+Trade+Private+Limited/@16.4952806,74.1262116,17z/data=!3m1!4b1!4m5!3m4!1s0x3bc057ad16afcb17:0x7d6b684e78f95e9b!8m2!3d16.4952806!4d74.1284003" target="_blank" className="google"><strong>467,MH KLPRD 09,MAJGAON ROAD, SHELEWADI IN RADHANAGRI ,Kolhapur ,Maharashtra ,India - 416208</strong></a></p>
					</div>
					<div className="clearfix"> </div>

					<div className="col-xs-2 w3ls_about_grid_left1">
						<a href="mailto:hastetro@gmail.com"><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span></a>
					</div>
					<div className="col-xs-10 w3ls_about_grid_left2">
						<p><br/>Mail us on <a href="mailto:hastetro@gmail.com"><strong>hastetro@gmail.com</strong></a></p>
					</div>
					<div className="clearfix"> </div>

					<div className="col-xs-2 w3ls_about_grid_left1">
						<a href="tel:+919673267518"><span className="glyphicon glyphicon-earphone" aria-hidden="true"></span></a>
					</div>
					<div className="col-xs-10 w3ls_about_grid_left2">
						<p><br/>Call us on <a href="tel:+919673267518"><strong>+919673267518</strong>.</a></p>
					</div>
					<div className="clearfix"> </div>
					
				</div>

				<div className="col-md-6 w3ls_about_grid_right">
					<img src="https://res.cloudinary.com/luckymobile/image/upload/v1564855112/hastetro/Logo.png" alt="HASTETRO" className="img-responsive" />
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
		{/*this.state.error?<p>{this.state.error}</p>:undefined*/}
		<form className="boxed-view__form">
			<input type="tel" ref="number" placeholder="Enter your registration ID" pattern="[0-9]{10}" title="10 digit mobile number"/>
			<input type="password" ref="password" placeholder="Enter Password"/>
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
