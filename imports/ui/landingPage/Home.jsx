import React from 'react';
import {Link} from 'react-router'
const Home = () =>{
	return(
		<div>
                    <div className="row">
                         <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
                            
                                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                            <ol className="carousel-indicators">
                                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="1" ></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="2" ></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="3" ></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="4" ></li>
                                            </ol>
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571837150/website%20assets/home-carousel/5_pbskg6.jpg" className="d-block w-100" alt=" " />
                                                    <div className="carousel-caption">
                                                   
                                                    </div>
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571837322/website%20assets/home-carousel/1_schtwx.jpg" className="d-block w-100" alt=" " />
                                                    <div className="carousel-caption">
                                                    <Link to="/product/canegold"><button type="button" className="btn btn-primary" style={{alignSelf: 'right'}}>More Info</button></Link>
                                                    </div>
                                                    
                                                </div>

                                                <div className="carousel-item">
                                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571837566/website%20assets/home-carousel/2_dnsqxx.jpg" className="d-block w-100" alt=" " />
                                                    <div className="carousel-caption">
                                                    <Link to="/product/organicPower"><button type="button" className="btn btn-primary" style={{alignSelf: 'right'}}>More Info</button></Link>
                                                    </div>
                                                </div>

                                                <div className="carousel-item">
                                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571837678/website%20assets/home-carousel/3_euts4q.jpg" className="d-block w-100" alt=" " />
                                                    <div className="carousel-caption">
                                                    <Link to="/product/ladysafe"><button type="button" className="btn btn-primary" style={{alignSelf: 'right'}}>More Info</button></Link>
                                                    </div>
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571837822/website%20assets/home-carousel/4_hnix9r.jpg" className="d-block w-100" alt="" />
                                                    <div className="carousel-caption">
                                                    <Link to="/product/spirulina"><button type="button" className="btn btn-primary" style={{alignSelf: 'right'}}>More Info</button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </div>
                                    </div>
                                
                    </div>

                    <div className="row" >

                        <div className="col-lg-12 col-md-12 col-sm-12 mb-4">

                            <div className="card d-block w-100" style={{backgroundImage: `url('images/about-us-01.jpg')`}}>
                                <div className="card-block" style={{}}>
                                        <center><h3>Business Opportunity </h3></center>
                                        <div className="row">
                                            <div className="col-lg-12 mb-4">
                                                <p className="font-italic" style={{fontSize: 15+'px', textAlign: 'justify'}}>
                                                    There are two main parts of this business. Through this you were the beneficiary of the company and then the Business Associate (BA) of company. That is, to become the beneficiary of this company, you have to pay a very low cost, which means you have to buy a product in the product list given by the company. We launched a sales & service of unique products dedicated to the improvement of economic and ecology of this globe. All products are exclusive and all of them are with a trademark. <Link to="/businessplan"> <b>Continue..</b></Link>
                                                </p>
                                              
                                            </div>
                                            
                                        </div>
                                    <hr/>
                                    <h4 className="card-title mb-4 " style={{textAlign: 'center'}}>About us</h4>
                                        <div className="row">
                                            <div className="col-lg-12 mb-4">
                                                <p className="font-italic" style={{fontSize: 15+'px', textAlign: 'justify'}}>
                                                    Hastetro is a marketing company that considers customer service as God's service.  Because of this, the company has always provided good service and good products for its customers. To increase the number of customers, the company has used various marketing tools such as direct marketing, Telemarketing, online shopping. We are entering in market with a new & unique concept of direct selling. This concept helps to each and every person to get a financial Freedom & Income Security.  <Link to='/about'><b>Continue..</b></Link></p>
                                            </div>
                                            
                                        </div>
                                       
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gutter"></div>
                   
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="card" style={{backgroundImage: `url('images/default.jpg')`, color: 'white', textAlign: 'center'}}>
                                <div className="card-block">
                                    <h3 className="card-title mb-4">Testimonial</h3>
                                    <div className="text-center">
                                        <img src="https://res.cloudinary.com/hastetro/image/upload/v1571838263/website%20assets/home-carousel/profile_gi3c8p.png" className="rounded-circle" width="100" height="100" />
                                    </div>
                                    <div className="text-center mt-3">
                                        <i className="fa fa-quote-right icon-grey-big"></i>
                                    </div>
                                    <p className="font-italic text-muted mt-3">
                                        "The products of Hastetro has really proven useful to me and my family. Thanks Hastetro for awesome products!!"
                                    </p>
                                    <h5 className="text-center font-weight-bold txt-brand-color">Anonymous</h5>
                                    <h6 className="text-center text-muted">---</h6>
                                        
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-4">
                            <div className="card" style={{backgroundImage: `url('images/default.jpg')`, color: 'white', textAlign: 'center'}}>
                                <div className="card-block">
                                    <h3 className="card-title mb-4">Get In-Touch</h3>
                                    <form name="sentMessage" id="contactForm"  noValidate>
										<div className="control-group">
											<div className="controls">
											  <input type="text" className="form-control" placeholder="Full Name" id="name" required data-validation-required-message="Please enter your name" />
											 <p className="help-block"></p>
											</div>
										  </div> 
                                          <div className="control-group">
                                            <div className="controls">
                                              <input type="text" className="form-control" placeholder="Mobile Number" id="mobile" required data-validation-required-message="Please enter your number" />
                                             <p className="help-block"></p>
                                            </div>
                                          </div>  
										  <div className="control-group">
											<div className="controls">
											  <input type="email" className="form-control" placeholder="Email" id="email" required
												data-validation-required-message="Please enter your email" />
											</div>
										  </div>  
										  <br/>
										  <div className="control-group">
										   <div className="controls">
											<textarea rows="3" cols="100" className="form-control" 
											   placeholder="Message" id="message" required data-validation-required-message="Please enter your message" minLength="5" data-validation-minlength-message="Min 5 characters" maxLength="999" style={{resize:"none"}}>
											</textarea>
										 </div>
									   </div> 
									   <br/>     
									   <div id="success"> </div> 
										  <button type="submit" className="btn btn-danger pull-right">Send</button><br />
									</form>
                                        
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
	)
}

export default Home