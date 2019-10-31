import React from 'react';

export default Contact = () => {
	return(
		<div>
                    <div className="row" >

                        <div className="col-lg-12 col-md-12 col-sm-12 mb-4">

                            <div className="card d-block w-100" >
                                <div className="card-block">
                                    <h4 className="card-title mb-4 " style={{textAlign: 'center'}}></h4>
                                        <div className="row">
                                            <div className="col-lg-1 mb-4" >
                                               
                                            </div>
                                            <div className="col-lg-2 mb-4" >
                                                <center><img src="https://res.cloudinary.com/hastetro/image/upload/v1571841600/website%20assets/about/Logo_zbcz5x.png" style={{maxHeight: 180+'px', maxWidth: 180+'px'}}/></center>
                                                
                                            </div>
                                             <div className="col-lg-1 mb-4" >
                                               
                                            </div>
                                            <div className="col-lg-8 mb-4" style={{textAlign: 'justify'}}>
                                                <h3>Welcome to the HASTETRO TRADE PRIVATE LIMITED!</h3>
                                                <p className="font-italic mt-3" style={{fontSize: 16+'px'}}>
                                                It is our soulful responsibilty to deliver the best quality products at the most premium range with the adds on of our best high end services. We ensure that our by joining with us, you create enermous wealth plus deliver high quality products. Come, join the network of fastest growing commuity at HASTETRO
                                                </p>
                                               
                                            
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row" >
                        <div className="col-lg-6 mb-4">
                            <div className="card" style={{backgroundImage: `url('https://res.cloudinary.com/hastetro/image/upload/v1572009798/website%20assets/default_hqglvm.jpg')`, color: 'white', textAlign: 'center'}}>
                                <div className="card-block">
                                    <h3 className="card-title mb-4">Map</h3>
                                    <div className="text-center">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3867250.9297520183!2d76.7751435!3d18.8154265!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc11d4231126db7%3A0x804c61952e0d00bf!2sHastetro%20Trade%20Private%20Limited!5e0!3m2!1sen!2sin!4v1569531876175!5m2!1sen!2sin" width="500" height="300" frameBorder="0" style={{border:0}} allowFullScreen=""></iframe>
                                    </div>
                                  
                                   
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-4">
                            <div className="card" style={{backgroundImage: `url('https://res.cloudinary.com/hastetro/image/upload/v1572009798/website%20assets/default_hqglvm.jpg')`, color: 'white', textAlign: 'center'}}>
                                <div className="card-block">
                                    
                                    <h3 className="card-title mb-4">Address</h3>
                                    <form name="sentMessage" id="contactForm"  noValidate>
										<div className="control-group">
											<div className="controls">
											  
											 <p className="help-block" style={{fontSize: 15+'px', textAlign: 'justify'}}>Reach out to us at : 21/420, Panchganga Factory Road, Near Deccan Mill, Next Gokul Bekari, Ichalkaranji, Kolhapur, Maharashtra, India - 416115</p>
											</div>
										  </div>   
                                          <br/>
										  <div className="control-group">
                                            <h4 className="card-title mb-4">Email</h4>
											<div className="controls" style={{fontSize: 15+'px', textAlign: 'center'}}>
                                                Mail us on hastetro@gmail.com / info@hastetro.com
											</div>
										  </div>  
										  <br/>
                                          <br/>
										  <div className="control-group">
                                            <h4 className="card-title mb-4">Contact Details</h4>
										   <div className="controls" style={{fontSize: 15+'px', textAlign: 'center'}}>
											Call us on +91-9156827889 or +91-9156764599.
										 </div>
									   </div> 
									   <br/>     
									   
									</form>
                                        
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
	)
}