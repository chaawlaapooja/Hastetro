import React from 'react';
import {Link} from 'react-router'

export default OrganicPower = () =>{
	return(
		<div>
                    <div className="row">
                         <div className="col-lg-12 ">
                            <div className="card" style={{color: 'white', textAlign: 'center'}}>
                                <div className="card-block">
                                  <Link to="/"><button type="submit" name="submit" value="submit" className="btn btn-primary" >Back</button></Link> <Link to="/products" style={{marginLeft: 5+'px'}}><button type="submit" name="submit" value="submit" className="btn btn-primary" >More Products</button></Link>
                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571852890/website%20assets/products/w_ed0cba.jpg" className="img-fluid" />
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	)
}