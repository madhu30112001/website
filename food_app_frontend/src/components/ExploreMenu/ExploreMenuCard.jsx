import { React, useContext } from "react";
import CustomImages from "./CustomImages";
import {assets} from "../../assets/assets"
import { StoreContext } from "../../context/Contextapi";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ExploreMenuCard = ({
  index,
  id,
  name,
  image,
  description,
  price,
  category,
}) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  return (
    <div className="recipe-card">
      <CustomImages imgSrc={url + "/images/" + image} pt="65%" />

      <div className="recipe-card-info">
        <div>
          {!cartItems[id] ? (
            <FontAwesomeIcon
              id={id}
              className="cart-btn"
              onClick={() => addToCart(id)}
              icon={faAdd}
            />
          ) : (
            <div className="recipe-card-counter">
              <FontAwesomeIcon
                id={id}
                className="card-add-btn"
                onClick={() => addToCart(id)}
                icon={faAdd}
              />
              <p className="cart-text">{cartItems[id]}</p>
              <FontAwesomeIcon
                id={id}
                className="cart-remove-btn"
                onClick={() => removeFromCart(id)}
                icon={faMinus}
              />
            </div>
          )}
        </div>

        <div className="wrap-img-p">
          <p className="recipe-title">{name}</p>
          <img src={assets.rating_starts} alt="ratings-image" className="star-img" />
        </div>
        <p className="recipe-desc">{description}</p>
        <p className="recipe-category">{category}</p>
        <p className="recipe-price">${price}</p>
      </div>
    </div>
  );
};

export default ExploreMenuCard;
