import React from 'react';
import {Link} from 'react-router';

export default Canegold = () =>{
	return(
		<div>
                    <div className="row">
                         <div className="col-lg-12 ">
                            <div className="card" style={{color: 'white', textAlign: 'center'}}>
                                <div className="card-block">
                                  <Link to="/"><button type="submit" name="submit" value="submit" className="btn btn-primary" >Back</button></Link><Link href="/products" style={{marginLeft: 5+'px'}}><button type="submit" name="submit" value="submit" className="btn btn-primary" >More Products</button></Link>
                                    <img src="https://res.cloudinary.com/hastetro/image/upload/v1571852650/website%20assets/products/y_i9lxu2.jpg" className="img-fluid"/>
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	)
}