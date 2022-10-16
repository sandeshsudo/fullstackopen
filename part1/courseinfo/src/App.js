//import logo from './logo.svg';
//import './App.css';
import { useState } from "react";

/*
  Takes care of rendering the name of the Course
*/
function Header(props){
  return(
    <>
    <h1>{props.course}</h1>
    </>
  );
}

/*
  Content renders the parts and their number of exercises
*/
function Content(props){

    let parts  = []
    Array.from(props.parts).forEach(element =>{
      parts.push(<Part key={element.id} part={element.part} exercise={element.exercise}/>)
    });
    return (
        <>
        {parts}
        </>
    );
}
/*
  sub component of Content
*/
function Part(props){
  return(
    <p>
      {props.part} {props.exercise}
    </p>
  );
}


/*
  Total renders the total number of exercises.
*/
function Total(props){
  let total = 0;
  Array.from(props.exercises).forEach(element => {
    total += element.exercise
  })
  return(
    <p>
      Number of exercises {total}
    </p>
  );
}


//TEST useSTATE()
function MyButton(props){
  const [counter, setCounter] = useState(0)

  function handleClick(){
    setCounter(counter+1);
  }

  return(
    <button onClick={handleClick}>{counter}</button>
  )

}

function App() {

  const course = {
    name: 'Half Stack application development',
    parts:[
      {
        id:1,
        part:'Fundamentals of React',
        exercise:10
      },
      {
        id:2,
        part:'Using props to pass data',
        exercise:7
      },
      {
        id:3,
        part:'State of a component',
        exercise:14
      }
    ]
  }

  return (    
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />    
      <Total exercises={course.parts} />
      <MyButton/>
    </div>
  );
}

export default App;
