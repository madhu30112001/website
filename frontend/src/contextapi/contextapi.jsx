import { createContext, useEffect, useState } from "react";
import cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [ready,setReady]=useState(false);
  useEffect(() => {
    // Fetch the user profile if the user is not set
    const fetchUser = async () => {
      try {
        const response = await axios.get(url + "/api/profile", {
          withCredentials: true,
        });
        setUser(response.data); // Set user data from response
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        setUser(null); // Handle if user is not logged in or request fails
      } finally {
        setReady(true); // Set ready state to true regardless of success or failure
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, url]);
  return (
    <StoreContext.Provider value={{ url, token, setToken, user, setUser,ready,setReady }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
