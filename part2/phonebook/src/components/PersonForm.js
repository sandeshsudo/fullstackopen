import React from "react";

const PersonForm = ({values,actions}) => {
    return(
        <form>
        <div> name: <input value={values[0]} onChange={actions[0]}/> </div>
        <div> number: <input value={values[1]} onChange={actions[1]}/> </div>
        <div>
          <button type="submit" onClick={actions[2]}>add</button>
        </div>
      </form>
    );
}

export default PersonForm
