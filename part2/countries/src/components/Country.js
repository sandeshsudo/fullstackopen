import React from 'react'

import Content from './Content'

const Country = ({ searchResult, setcountries }) => {
    const countries = searchResult
  
    if (countries.length === 1) {
        return (
            <div>
                <Content country={countries[0]} />
            </div>
        )
    } else if (countries.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    } else {
        return (
            countries.map((mappedName, i) => <p key={i}>{mappedName.name.common} <button onClick={() => setcountries(mappedName)}>Show</button></p>)
        )
    }

}

export default Country