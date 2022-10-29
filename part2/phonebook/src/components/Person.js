import React from "react";

const Person = ({person, onDelete}) => {

    return(
        <p key={person.id}>{person.name} {person.number} <button onClick={() => onDelete(person.id)}>Delete</button></p> 
    );
}

export default Person