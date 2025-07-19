import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosSetup";
const initialState = {
  foodList: [],
  cartItems: {},
  userOrders: [],
  token: localStorage.getItem("token") || "",
  loading: false,
  error: null,
};


export const fetchFoodList = createAsyncThunk(
  "global/fetchFoodList",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/food/list");

      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "global/loginUser",
  async ({ data, currentState }, thunkAPI) => {
    try {
      const endpoint =
        currentState === "Login" ? "/user/login" : "/user/register";
      const response = await axiosInstance.post(endpoint, data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        return response.data.token;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


export const loadCartData = createAsyncThunk(
  "global/loadCartData",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().global.token;
    try {
      const response = await axiosInstance.post(
        "/cart/get",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.cartData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const addToCart = createAsyncThunk(
  "global/addToCart",
  async (itemId, thunkAPI) => {
    const token = thunkAPI.getState().global.token;
    const cartItems = thunkAPI.getState().global.cartItems;
    try {
      if (token) {
        await axiosInstance.post(
          "/cart/add",
          { itemId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      return itemId;
    } catch (error) {
      console.error("Failed to update cart on server:", error);
      return thunkAPI.rejectWithValue("Cart update failed");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "global/removeFromCart",
  async (itemId, thunkAPI) => {
    const token = thunkAPI.getState().global.token;
    try {
      if (token) {
        await axiosInstance.post(
          "/cart/remove",
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // or `token` if your backend uses plain `token`
            },
          }
        );
      }
      return itemId;
    } catch (error) {
      console.error("Failed to remove item:", error);
      return thunkAPI.rejectWithValue("Unable to remove item");
    }
  }
);

export const orderPlace = createAsyncThunk(
  "global/orderPlace",
  async (orderData, thunkAPI) => {
    const token = thunkAPI.getState().global.token;

    try {
      const response = await axiosInstance.post("/order/place", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(
          "Error placing order. Please try again."
        );
      }
    } catch (error) {
      console.error("Error placing order:", error);
      return thunkAPI.rejectWithValue("Error placing your order.");
    }
  }
);
export const fetchOrders = createAsyncThunk(
  "global/fetchOrders",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().global.token;
    try {
      const response = await axiosInstance.post(
        "/order/userorders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data || [];
    } catch (error) {
      console.error("Failed to show orders:", error);

      return thunkAPI.rejectWithValue("Error showing your order.");
    }
  }
);
export const verifyPayment = createAsyncThunk(
  "global/verifyPayment",
  async ({ success, orderId, paymentId, payerId }, thunkAPI) => {
    const token = thunkAPI.getState().global.token;

    try {
      const response = await axiosInstance.post(
        "/order/verify",
        { success, orderId, paymentId, payerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return { success: true };
      } else {
        return thunkAPI.rejectWithValue("Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      return thunkAPI.rejectWithValue("Payment verification failed");
    }
  }
);
export const selectTotalCartAmount = (state) => {
  const cartItems = state.global.cartItems;
  const foodList = state.global.foodList;
  let total = 0;
  for (let id in cartItems) {
    const foodItem = foodList.find((item) => item._id === id);
    if (foodItem) {
      total += foodItem.price * cartItems[id];
    }
  }
  return total;
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodList.fulfilled, (state, action) => {
        state.foodList = action.payload;
      })
      .addCase(loadCartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCartData.fulfilled, (state, action) => {
        state.cartItems = action.payload || {};
        state.loading = false;
      })
      .addCase(loadCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load cart";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const itemId = action.payload;
        state.cartItems[itemId] = (state.cartItems[itemId] || 0) + 1;
      })
      .addCase(removeFromCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const itemId = action.payload;
        if (state.cartItems[itemId] > 1) {
          state.cartItems[itemId] -= 1;
        } else {
          delete state.cartItems[itemId];
        }
      })
      .addCase(orderPlace.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.userOrders = action.payload;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Verification error";
      });
  },
});

export const { setToken, clearToken, addToCartLocal, removeFromCartLocal } =
  globalSlice.actions;

export const selectFoodList = (state) => state.global.foodList;
export const selectCartItems = (state) => state.global.cartItems;
export const selectToken = (state) => state.global.token;
export const selectUserOrders = (state) => state.global.userOrders;
export const selectOrdersLoading = (state) => state.global.loading;
export default globalSlice.reducer;
