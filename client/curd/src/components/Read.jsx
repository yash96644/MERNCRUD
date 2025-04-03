import React, { useEffect, useState } from "react";

function Read() {

const [data, setData] = useState([]);
const [error, setError] = useState("");


async function getData() {
  const response = await fetch("http://localhost:5000");
  const result = await response.json();
  if(!response.ok) {
    setError("Failed to fetch data:", result.error);
  }
  if(response.ok) {
    setData(result);
  }
}

useEffect(() => {
  getData();
}
, []);
console.log(data);


  return (
    <div className="container my-2">
         {error &&
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      }
      <h2 className="text-center">All Data</h2>
      <div className="row">
        {data?.map((ele) =>(
                  <div key={ele._id} className="col-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{ele.name}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
                      <p className="text-muted">{ele.age}</p>
                      <a href="#" className="card-link">
                        delete
                      </a>
                      <a href="#" className="card-link">
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
          
        )
        )}

      </div>
    </div>
  );
}

export default Read;
