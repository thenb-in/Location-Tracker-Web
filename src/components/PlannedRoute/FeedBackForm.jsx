import React, { useState } from "react";
import { FaTimes, FaStar } from "react-icons/fa";
import FeedbackValidator from "../../validators/FeedbackFormValidator";
import { useNavigate, useLocation } from "react-router-dom";
import {getBattery, getLocation} from '../../imports/import'
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function FeedBackForm() {
  const [formData, setFormData] = useState({
    dealerName: "",
    competitors: "" ,
    existingDealer: "",
    orderSize: "",
    expectedOrderTime: "",
    perMonthSales: "",
    capacityToBuy: "",
    paymentTerms: "",
    comments: "",
    rating: 0,
  });
  
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const routeId = queryParams.get("id");
  const locationId = queryParams.get("locationId");
  const fetchBattery = async () =>{ 
    const batteryLevel = await getBattery()
    if(batteryLevel){
      return batteryLevel.level*100
    }
  }

  const fetchLocation = async () => {
    try {
      const location = await getLocation();
      if(location){
        return location
      };
    } catch (error) {
      console.error("Could not get location:", error);
    }
  };
  const addOrder = () => {
    setOrders([...orders, { brand: "", quantity: "" }]);
  };

  const removeOrder = (index) => {
    setOrders(orders.filter((_, i) => i !== index));
  };

  const updateOrder = (index, key, value) => {
    const updatedOrders = [...orders];
    updatedOrders[index][key] = value;
    setOrders(updatedOrders);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validator = new FeedbackValidator();
    const validationErrors = validator.validate({ ...formData, orders });
  
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const batteryLevel = await fetchBattery();
        const currentGeoPoint = await fetchLocation();
  
        const payload = {
          id: locationId ,
          dealerName: formData.dealerName,
          existingDealer: formData.existingDealer,
          orderSize: formData.orderSize,
          expectedOrderTime: formData.expectedOrderTime,
          perMonthSale: formData.perMonthSales,
          capacityToBuy: formData.capacityToBuy,
          paymentTerms: formData.paymentTerms,
          comment: formData.comments,
          rating: formData.rating,
          competitors: formData.competitors, 
          dealerInterest: "", 
          otherTerms: "", 
          orders: orders.map((order) => ({
            brand: order.brand,
            quantity: order.quantity,
          })),
          route_id: routeId, 
          currentGeoPoint,
          batteryLevel,
          timestamp: new Date().toISOString(),
        };
  
        const response = await fetch(`${BASE_URL}/complete_milestone`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Feedback submitted successfully!");
        } else {
          alert(result.message || "Failed to submit feedback.");
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };
  
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border">
      <h2 className="text-xl font-bold mb-4">Dealer Feedback Form</h2>

      <input
        type="text"
        name="dealerName"
        placeholder="Dealer Name"
        value={formData.dealerName}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2 text-sm"
      />
      {errors.dealerName && <p className="text-red-500 text-sm">{errors.dealerName}</p>}
      
      <input
        type="text"
        name="competitors"
        placeholder="Competitors Name"
        value={formData.competitors}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2 text-sm"
      />

      <select
        name="existingDealer"
        value={formData.existingDealer}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2 text-sm"
      >
        <option value="">Existing Dealer?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {errors.existingDealer && <p className="text-red-500 text-sm">{errors.existingDealer}</p>}
      
      
      <select
        name="orderSize"
        value={formData.orderSize}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2 text-sm"
      >
        <option value="">Order Size</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>
      {errors.orderSize && <p className="text-red-500 text-sm">{errors.orderSize}</p>}

      <input
        type="number"
        name="expectedOrderTime"
        placeholder="Expected Order Time (Per Month)"
        value={formData.expectedOrderTime}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2 text-sm"
      />
      {errors.expectedOrderTime && <p className="text-red-500 text-sm">{errors.expectedOrderTime}</p>}

      <input
        type="text"
        name="perMonthSales"
        placeholder="Per Month Sales (Tonnes) - Brand Wise"
        value={formData.perMonthSales}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2 text-sm"
      />
      {errors.perMonthSales && <p className="text-red-500 text-sm">{errors.perMonthSales}</p>}

      <input
        type="number"
        name="capacityToBuy"
        placeholder="Capacity to Buy"
        value={formData.capacityToBuy}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2 text-sm"
      />
      {errors.capacityToBuy && <p className="text-red-500 text-sm">{errors.capacityToBuy}</p>}

      <select
        name="paymentTerms"
        value={formData.paymentTerms}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2 text-sm"
      >
        <option value="">Payment Terms</option>
        <option value="1.5% CD">1.5% CD</option>
        <option value="1% CD">1% CD</option>
        <option value="25 days credit">25 Days Credit</option>
        <option value="others">Others</option>
      </select>

      <button onClick={addOrder} className="w-full p-2 bg-blue-500 text-white rounded mb-2 text-sm">
        Add Order
      </button>

      {orders.map((order, index) => (
        <div key={index} className="flex flex-col gap-1 mb-2">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Brand"
              value={order.brand}
              onChange={(e) => updateOrder(index, "brand", e.target.value)}
              className="p-2 border rounded w-full text-sm"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={order.quantity}
              onChange={(e) => updateOrder(index, "quantity", e.target.value)}
              className="p-2 border rounded w-full text-sm"
            />
            <button onClick={() => removeOrder(index)} className="p-2 text-red-500">
              <FaTimes size={20} />
            </button>
          </div>

          
          {errors[`order_${index}_brand`] && (
            <p className="text-red-500 text-sm">{errors[`order_${index}_brand`]}</p>
          )}
          {errors[`order_${index}_quantity`] && (
            <p className="text-red-500 text-sm">{errors[`order_${index}_quantity`]}</p>
          )}
        </div>
      ))}

      {errors.orders && <p className="text-red-500 text-sm">{errors.orders}</p>}

      <textarea
        name="comments"
        placeholder="Comments"
        value={formData.comments}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2 text-sm"
      />
      {errors.comments && <p className="text-red-500 text-sm">{errors.comments}</p>}

      <div className="flex gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <FaStar
            key={num}
            onClick={() => setFormData({ ...formData, rating: num })}
            className={`cursor-pointer ${num <= formData.rating ? "text-yellow-500" : "text-gray-400"}`}
            size={24}
          />
        ))}
      </div>
      {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}

      <button onClick={handleSubmit} className="w-full p-2 bg-green-500 text-white rounded text-sm mt-4 mb-4">
        Submit Feedback
      </button>
      <button onClick={() => navigate('/Location-Tracker-Web/planned_routes')} className="w-full p-2 bg-red-400 text-white rounded text-sm ">
       Cancel
      </button>
    </div>
  );
}
