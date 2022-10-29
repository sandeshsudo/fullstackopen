import React from "react";

const Total = ({parts}) => {
    
    const sum = parts.reduce((pv,cv) => pv + cv.exercises, 0)
    return(<p><b>total of {sum} exercises</b></p>)
}

export default Total