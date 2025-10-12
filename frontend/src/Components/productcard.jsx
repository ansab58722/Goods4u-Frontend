

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productselectedfeature } from "../features/CartSlice";
//function Updatevalue({name,id,price,imageURL}){
    

//}

const Productcard = ({product}) => {   

const dispatch = useDispatch();
  const navigate = useNavigate();
  
    const percent = Math.round(
            ((product.old_price - product.new_price) / product.old_price) * 100
          );
          
          const hasDiscount = product.old_price > product.new_price;
          const saveAmount = (product.old_price - product.new_price).toFixed(2);

    return (


          <>
          <div
                          className="pc-featuredcard-productcard"
                          onClick={() => {
                            dispatch(productselectedfeature(product));
                            navigate("/product");
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {hasDiscount && (
                            <div className="pc-featuredcard-productbadge">{percent}% OFF</div>
                          )}
                          <div className="pc-featuredcard-productimage">
                            <img src={product.imageURL} alt={product.name} />
                          </div>
                          <div className="pc-featuredcard-productcategory">
                            {product.category}
                          </div>
                          <div className="pc-featuredcard-producttitle">{product.name}</div>
                          <div className="pc-featuredcard-productdescription">
                            Premium quality {product.category} for {product.gender}
                          </div>
                          <div className="pc-featuredcard-productfeatures">
                            <span className="pc-featuredcard-feature">Premium Quality</span>
                            <span className="pc-featuredcard-feature">Comfortable</span>
                            <span className="pc-featuredcard-feature">Durable</span>
                          </div>
                          <div className="pc-featuredcard-productbottom">
                            <div className="pc-featuredcard-productprice">
                              {hasDiscount && (
                                <span className="pc-featuredcard-pricewas">
                                  ${product.old_price}
                                </span>
                              )}
                              <div className="pc-featuredcard-pricecontainer">
                                <span className="pc-featuredcard-pricenow">
                                  ${product.new_price}
                                </span>
                                {hasDiscount && (
                                  <span className="pc-featuredcard-pricesave">
                                    Save ${saveAmount}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="pc-featuredcard-productmeta">
                              <div className="pc-featuredcard-productrating">
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                                <i className="bx bx-star"></i>
                                <span className="pc-featuredcard-ratingcount">128 Reviews</span>
                              </div>
                              <span className="pc-featuredcard-productstock">In Stock</span>
                            </div>
                          </div>
                        </div>
          







          
          
          </>



            )
            
}

            export default Productcard