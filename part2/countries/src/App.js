import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Country from './components/Country';

function App() {
  const ENDPOINT = 'https://restcountries.com/v3.1/all'
  const [countires, setCountries] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [searchKey, setSearchKey] = useState('')

  const fetchCountries = () => {
    axios.get(ENDPOINT).then(response => {
      console.log('promise fullfilled')
      setCountries(response.data)
    })
  }

  useEffect(fetchCountries, [])

  const setCountriesMethod = (country) => {
    setSearchResult([country])
  }

  const handleSearch = (e) => {
    searchKey.concat(setSearchKey(e.target.value))
    console.log('search key ', searchKey)
    if (searchKey.length <= 1) {
      setSearchResult([])
    } else {
      setSearchResult(countires.filter(key => key.name.common.toLowerCase().includes(searchKey.toLowerCase())))
    }
  }

  return (
    <>
      <input value={searchKey} onChange={handleSearch} />
      <Country searchResult={searchResult} setcountries={setCountriesMethod}/>
    </>
  );
}

export default App;
