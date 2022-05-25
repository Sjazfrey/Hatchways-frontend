import React, { useState, useEffect } from "react";
import Search from "../search/search";
import "./main.css";
import Grades from "../grades/grades";
import Tag from "../tag/tag";

function Main() {
  const [studentInfo, setStudentInfo] = useState([]);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [fullName, setFullName] = useState("");
  const [grades, setGrades] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [tagSearch, setTagSearch] = useState("");

  async function fetchURL(url) {
    const response = await fetch(url);
    const info = await response.json();
    const students = info.students;
    students.forEach((student) => {
      student.tags = [];
      student.fullName = student.firstName + " " + student.lastName;
      let count = 0;
      student.grades.map((grade) => {
        count = +grade + count;
      });
      student.average = count / student.grades.length;
    });

    setStudentInfo(students);
    setFiltered(students);

  }
  useEffect(() => {
    fetchURL("https://api.hatchways.io/assessment/students");
  }, []);

  useEffect(() => {
      
    let tagSearch = []
    if (tag){
      const filteredStudent = studentInfo.filter(
        (student) =>
          student.firstName.toLowerCase().includes(fullName.toLowerCase()) ||
          student.lastName.toLowerCase().includes(fullName.toLowerCase()) 
         
      );
       filteredStudent.forEach(student => {
        let studentAdded = false;
        student.tags.forEach(studentTag => {
          
          if(studentTag.toLowerCase().includes(tag)&& studentAdded===false){
           tagSearch.push(student)
            studentAdded = true;
          }
          
        })
      })
      setFiltered([...tagSearch])
    }
    else {   
      const filteredStudent = studentInfo.filter(
      (student) =>
        student.firstName.toLowerCase().includes(fullName.toLowerCase()) ||
        student.lastName.toLowerCase().includes(fullName.toLowerCase()) 
        
    );
      setFiltered([...filteredStudent]);
    }
    

  }, [fullName, tag]);

  function addTag(tag, index) {
    let tags = studentInfo[index].tags;
    tags = [...tags, tag];
    studentInfo[index].tags = tags;
    setStudentInfo([...studentInfo]);
    setFiltered([...studentInfo]);
  }

  return (
    <div className="container">
      {/* communicate with main.jsx */}
      <div>
        <Search setFullName={setFullName} setTag={setTag} />
      </div>
      <hr />

      <div>
        <div>
          {filtered.map((student, index) => {
            return (
              <div className="studinfo" key={student.id}>
                <img src={student.pic} alt="student profile picture" />
                <h3 className="fname">{student.fullName}</h3>
                <div className="title">
                  <div className="email">Email: {student.email}</div>
                  <div className="company">Company: {student.company}</div>
                  <div className="skill">Skills: {student.skill}</div>
                  <div className="average">Average: {student.average}</div>
                  {student.tags.map((tag) => {
                    return (
                      <span className="taginfo" key={student.id + tag}>
                        {tag}
                      </span>
                    );
                  })}
                  <br />
                  <Tag addTag={addTag} index={index} />

                  <div className="taghr">
                    <hr />
                  </div>
                  <div className="grades">
                    {" "}
                    <Grades studentsGrades={student.grades} />
                  </div>
                </div>
                <div className="hrname">
                  {" "}
                  <hr />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Main;
