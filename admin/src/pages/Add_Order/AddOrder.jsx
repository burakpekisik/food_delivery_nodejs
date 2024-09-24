import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from '../../../../frontend/src/context/StoreContext';
import axios from "axios";
import "./AddOrder.css";
import { useNavigate } from "react-router-dom";

const AddOrder = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [availableFoods, setAvailableFoods] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customers, setCustomers] = useState([]); // Customers state
  const [selectedCustomer, setSelectedCustomer] = useState(""); // Selected customer

  // Fetch the food list from the API
  useEffect(() => {
    const fetchFoods = async () => {
      const response = await axios.get("http://localhost:4000/api/food/list");
      if (response.data.success) {
        setAvailableFoods(response.data.data);
      }
    };
    fetchFoods();
  }, []);

  // Fetch customers from the API
  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get("http://localhost:4000/api/user/customers");
      if (response.data.success) {
        setCustomers(response.data.users); // Update customers state
      }
    };
    fetchCustomers();
  }, []);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // Handle adding item to cart
  const addToCart = (foodItem) => {
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === foodItem._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === foodItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...foodItem, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (foodItemId) => {
    setSelectedItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === foodItemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotalCartAmount = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  // Event handler for customer selection
  const handleCustomerSelect = (event) => {
    setSelectedCustomerId(event.target.value);
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!selectedCustomerId) {
      alert("Please select a customer");
      return;
    }

    let orderItems = selectedItems.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));

    let orderData = {
      userId: selectedCustomerId, // Use the selected customer ID
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Delivery fee
    };

    try {
      let response = await axios.post("http://localhost:4000/api/order/place-without-auth", orderData);
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        {/* Dropdown to select a customer */}
        <select value={selectedCustomerId} onChange={handleCustomerSelect}>
          <option value="">Select Customer</option>
          {/* Dynamically render options from customer data */}
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}
            </option>
          ))}
        </select>

        {/* Dropdown to select food items */}
        <select onChange={(e) => addToCart(availableFoods.find(f => f._id === e.target.value))}>
          <option value="" disabled>Select a food item</option>
          {availableFoods.map((food) => (
            <option key={food._id} value={food._id}>
              {food.name} - ${food.price}
            </option>
          ))}
        </select>

        {/* Display selected items with remove button */}
        <div className="selected-items">
          {selectedItems.map((item) => (
            <div key={item._id} className="cart-item">
              <span>{item.name} - ${item.price} x {item.quantity}</span>
              <button type="button" onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
        </div>

        {/* Delivery Information Form */}
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>$2</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default AddOrder;