import React from 'react'
import {Link} from 'react-router'

export default Products = () =>{
	return(
		<div>
		<div className="row" >
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
                            <div className="card">
                                <div className="card-block">
                                <center>
                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571844981/website%20assets/products/b_qiatn7.png" style={{maxHeight: 260+'px', maxWidth: 260+'px'}}/>
                                    <br/>
                                    <br/>
                                    <h4 style={{color: 'green', fontStyle: 'italic'}}>Canegold</h4>
                                    <p><b>MRP Rs. 1020/- (1 Liter)</b></p>
                                    <p>Only for Sugar Cane </p>
                                    <br/>
                                    <Link to="/product/canegold"><button type="button" className="btn btn-primary" style={{alignSelf: 'right'}}>More Info</button></Link>
                                </center>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
                            <div className="card">
                                <div className="card-block">
                                <center>
                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571844883/website%20assets/products/e_mitogh.png" style={{maxHeight: 260+'px', maxWidth: 260+'px'}}/>
                                    <br/>
                                    <br/>
                                    <h4 style={{color: 'green', fontStyle: 'italic'}}>Organic Power Gold</h4>
                                    <p><b>MRP Rs. 1200/- (1 Liter)</b></p>
                                    <p>For all Crops, Grains, fruits and Vagetables.. (For foliar Spray) </p>
                                    <br/>
                                    <Link to="/product/organicPower"><button type="button" className="btn btn-primary" style={{alignSelf: 'right'}}>More Info</button></Link>
                                </center>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
                            <div className="card">
                                <div className="card-block">
                                <center>
                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571845056/website%20assets/products/f_z3jmh5.png" style={{maxHeight: 220+'px', maxWidth: 260+'px'}}/>
                                    <br/>
                                    <br/>
                                    <h4 style={{color: 'green', fontStyle: 'italic'}}>Organic Power</h4>
                                    <p><b>MRP Rs. 999/- (1 Liter)</b></p>
                                    <p>For all Crops, Grains, fruits and Vagetables.. (For Drenching) </p>
                                    <br/>
                                    <Link to="/product/organicPower"><button type="button" className="btn btn-primary" style={{alignSelf: 'right'}}>More Info</button></Link>
                                </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 mb-4">
                            
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
                            <div className="card">
                                <div className="card-block">
                                <center>
                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571845088/website%20assets/products/g_k7wyjv.png" style={{maxHeight: 240+'px', maxWidth: 260+'px'}}/>
                                    <br/>
                                    <br/>
                                    <h4 style={{color: 'blue', fontStyle: 'italic'}}>Spirulina</h4>
                                    <p><b>MRP Rs. 630/- (180 tablets)</b></p>
                                    <p>The Best Superfood in Family for everyone... </p>
                                    <br/>
                                    <Link to="/product/spirulina"><button type="button" className="btn btn-primary" style={{alignSelf: 'right'}}>More Info</button></Link>
                                </center>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
                            <div className="card">
                                <div className="card-block">
                                <center>
                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571845102/website%20assets/products/a_s8ei5a.jpg" style={{maxHeight: 200+'px', maxWidth: 200+'px'}}/>
                                    <br/>
                                    <br/>
                                    <h4 style={{color: 'purple', fontStyle: 'italic'}}>Ladysafe</h4>
                                    <p><b>MRP Rs. 630/- (30 pads)</b></p>
                                    <p>Comfortable and Breathable</p>
                                    <p>Smart Ultra thin Anion Sanitary Napkin</p>
                                    <br/>
                                    <Link to="/product/ladysafe"><button type="button" className="btn btn-primary" style={{alignSelf: 'right'}}>More Info</button></Link>
                                </center>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 mb-4">
                            
                        </div>
                    </div>
		</div>
	)
}