import React from "react";
import Header from './Header'
import Part from "./Part";
import Total from "./Total";

const Course = ({courses}) => {
    return(
        <>
          {courses.map(course => 
            <div key={course.id}>
                <Header name={course.name} />
                <Part parts={course.parts} />  
                <Total parts={course.parts} />   
            </div>
          )}  
        </>
    );
}

export default Course