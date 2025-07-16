import React, { useContext, useEffect, useState } from "react";
import ExploreMenuCard from "../ExploreMenu/ExploreMenuCard";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFoodList,
  loadCartData,
  selectFoodList,
  setToken,
} from "../../redux/slice/globalSlice.jsx";
const FoodDisplay = ({ category }) => {
  const reduxFoodList = useSelector(selectFoodList);
  const [foodList, setFoodList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoodList());
    if (localStorage.getItem("token")) {
      dispatch(setToken(localStorage.getItem("token")));
      dispatch(loadCartData());
    }
  }, []);
  useEffect(() => {
    setFoodList(reduxFoodList);
  }, [category, reduxFoodList]);

  return (
    <div className="food-display" id="food-display">
      <h2 className="food-display-header">Top dishes near you</h2>
      <div className="food-display-list">
        {foodList?.map((recipe, index) => {
          if (category === "All" || category === recipe.category) {
            return (
              <ExploreMenuCard
                key={index}
                id={recipe._id}
                name={recipe.name}
                description={recipe.description}
                price={recipe.price}
                category={recipe.category}
                image={recipe.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
