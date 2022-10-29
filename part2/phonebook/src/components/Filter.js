import React from 'react'

const Filter = ({search_key, handleSearch}) => {

    return(
        <div>
            filter shown with
            <input value={search_key} onChange={handleSearch} /><br />
        </div>
    );

}

export default Filter