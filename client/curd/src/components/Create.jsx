import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !email) {
      setError("All fields are required.");
      return;
    }

    const addUser = { name, age, email };

    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        // 💡 Ensure backend sends `{ error: "message" }`
        setError(result.error || "Failed to add user.");
      } 
      
      if (response.ok) {
        console.log("User added successfully:", result);
        setName("");
        setAge(0);
        setEmail("");
        setError(""); 
        // Clear error if successful
      navigate("/all");
      // Redirect to the Read component
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="container my-2">
      {error &&
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      }
      <h2>Enter the data</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            min="1"
            value={age}
            onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : "")}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
