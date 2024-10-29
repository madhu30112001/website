import React, { useContext } from "react";
import { StoreContext } from "../../context/Contextapi";
import ExploreMenuCard from "../ExploreMenu/ExploreMenuCard";
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2 className="food-display-header">Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((recipe, index) => {
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
