import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

function Read() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function getData() {
    const response = await fetch("http://localhost:5000");
    const result = await response.json();
    if (!response.ok) {
      setError("Failed to fetch data:", result.error);
    }
    if (response.ok) {
      setData(result);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      setError("Failed to delete data:", result.error);
    }
    if (response.ok) {
      setError("Data deleted successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h2 className="text-center mb-4">All Users</h2>
      <div className="row g-4">
        {data?.map((ele) => (
          <div key={ele._id} className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="text-muted">{ele.age} years old</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(ele._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                  <Link to={`/${ele._id}`} className="btn btn-primary btn-sm">
                    <FaEdit /> Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Read;
