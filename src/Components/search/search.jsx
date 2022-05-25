import React, { useState } from "react";
import "./search.css";

function Search({ setFullName, setTag }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by Name"
        onChange={(event) => {
          setFullName(event.target.value);
          
        }}
      />
      <br />{" "}
      <div className="namehr">
        <hr />
      </div>
      <input
        type="text"
        placeholder="Search by Tag"
        onChange={(event) => {
          setTag(event.target.value);
        }}
      />
    </div>
  );
}

export default Search;
