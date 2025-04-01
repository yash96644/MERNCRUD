import React, { useState } from "react";

function Create() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  console.log(name, age, email);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const addUser ={name , age , email};
    const response = await fetch("http://localhost:5000/" , {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
    });



    const result = await response.json();
   if(!response.ok){
    console.log("error");
   }
        if (response.ok) {
          console.log("success");
        }
  }
  return (
    <div className="container my-2">
      <h2>Enter the data</h2>

      <form onSubmit={HandleSubmit}>
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
            onChange={(e) => setAge(e.target.value)}
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
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
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
