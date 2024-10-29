import React from "react";
import {menu_list} from "../../assets/assets"
export const Exploremenu = ({ category, setCategory }) => {
  
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos fugit
        voluptates, ab enim error nihil dolores sequi totam labore aliquam iste
        beatae aut minima eaque voluptas veritatis quis, ducimus laudantium.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            key={index}
            className="explore-menu-items"
          >
            <img
              src={item.menu_image}
              id="customeimg"
              className={category === item.menu_name ? "active" : ""}
              alt="menu_img"
            />
            <p className="paratext">{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};
