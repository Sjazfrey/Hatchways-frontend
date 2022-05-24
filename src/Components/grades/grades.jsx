import React, { useState, useId } from "react";
import { Collapsible } from "react-hook-collapse";
import "./grades.css";

function Grades({ studentsGrades }) {
  const [grades, setGrades] = useState("");
  const [expand, setExpand] = useState(false);
  const id = useId()

  return (
    <div>
      <button className="buttonexpand" onClick={() => setExpand(!expand)}>
        { expand ? "-" : "+"}
      </button>

      <Collapsible
        expanded={expand}
        style={{ overflow: "hidden", transition: "0.3s" }}
      >
        {studentsGrades
          ? studentsGrades.map((grade, index) => {
              return <div key = {id + index}>Test: &nbsp; &nbsp; &nbsp; &nbsp;{grade} %</div>;
            })
          : ""}
      </Collapsible>

    </div>
  );
}
export default Grades;
