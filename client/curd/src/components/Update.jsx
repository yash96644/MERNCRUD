import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(`Failed to fetch data: ${result.error}`);
      } else {
        setError("");
        setName(result.name || "");
        setAge(result.age || "");
        setEmail(result.email || "");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !age || !email) {
      setError("All fields are required.");
      return;
    }

    const updatedUser = { name, age, email };

    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to update user.");
      }

      if (response.ok) {
        setError("");
        navigate("/all");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="container my-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h2 className="text-center mb-4">Update User</h2>
      <form onSubmit={handleUpdate} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
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
          <label htmlFor="age" className="form-label">
            Age
          </label>
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
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </form>
    </div>
  );
}

export default Update;
