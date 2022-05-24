import React, { useState } from "react";

function Tag({ addTag, index }) {
  const [input, setInput] = useState("");

  return (
    <input
      className="tag-info"
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && input) {
          addTag(input, index);
          setInput("");
        }
      }}
      placeholder="Add a tag"
    />
  );
}
export default Tag;
