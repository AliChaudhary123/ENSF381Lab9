import { useState } from "react";

export default function HousePricePredictor() {
  const [formData, setFormData] = useState({
    city: "",
    province: "",
    latitude: "",
    longitude: "",
    lease_term: "",
    type: "",
    beds: "",
    baths: "",
    sq_feet: "",
    furnishing: "",
    smoking: "",
    pets: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  try {
    const response = await fetch("/predict_house_price", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log(result); 
    setFormSubmitted(true);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

  return (
    <>
      <style>
        {`
          .container {
            max-width: 600px;
            padding: 24px;
            margin: 40px auto;
            border: 1px solid lightgray;
            border-radius: 8px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          }
          
          form {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          label {
            width:100%;
            padding: 8px;
          }

          input, select {
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .submit-button {
          background-color: #007BFF;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
            .submit-button:hover {
            background-color:rgb(6, 70, 135);
          }

          .results {
          margin-top: 16px;
          border: 1px solid #3C763D;
          background-color:#DFF0D8;
          padding:12px;
          border-radius:4px;
          font-weight:bold;

          }
           
        `}
      </style>
      <div className="container">
        <h1>House Price Predictor</h1>
        <form onSubmit={handleSubmit}>
          <label>City:</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          ></input>
          <label>Province:</label>
          <input
            name="province"
            value={formData.province}
            onChange={handleInputChange}
          ></input>
          <label>Latitude:</label>
          <input
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
          ></input>
          <label>Longitude:</label>
          <input
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
          ></input>
          <label>Lease Term:</label>
          <input
            name="lease_term"
            value={formData.lease_term}
            onChange={handleInputChange}
          ></input>
          <label>Type:</label>
          <input
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          ></input>
          <label>Beds:</label>
          <input
            name="beds"
            value={formData.beds}
            onChange={handleInputChange}
          ></input>
          <label>Baths:</label>
          <input
            name="baths"
            value={formData.baths}
            onChange={handleInputChange}
          ></input>
          <label>Square Feet:</label>
          <input
            name="sq_feet"
            value={formData.sq_feet}
            onChange={handleInputChange}
          ></input>
          <label>Furnishing:</label>
          <select
            name="furnishing"
            value={formData.furnishing}
            onChange={handleInputChange}
          >
            <option>Unfurnished</option>
            <option>Partially Furnished</option>
            <option>Fully Furnished</option>
          </select>
          <label>Smoking:</label>
          <input
            name="smoking"
            value={formData.smoking}
            onChange={handleInputChange}
          ></input>
          <label>I have a pet:</label>
          <input
            name="pets"
            type="checkbox"
            value={formData.pets}
            onChange={handleInputChange}
          ></input>
          <input className="submit-button" type="submit"></input>
        </form>
        {{formSubmitted} && <div className="results">{}</div>}
      </div>
    </>
  );
}
