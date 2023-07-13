import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import CountriesAPI from "./Services/CountriesAPI";
import Country from "./Components/Country";
import Notification from "./Components/Notification";

const App = () => {
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    console.log("efect running")
    setMessage("")
    if(filter)
    {
      CountriesAPI.getAll().then(response => {
        setSelectedCountry(response[0])
        // const reg = new RegExp(filter, "i")
        // const filteredResponse = response.filter((x) => {
        //   console.log("x", x.name)
        //     return x.name.common.match(reg)
        // })
        // console.log("filteredResponse", filteredResponse)
        // if(filteredResponse.length > 10) setMessage("Too many matches, set another filter")
        // else {
        //   setMessage("")
        //   console.log("response", response)
        //   setSelectedCountry(filteredResponse)
        // }
      })
    }
  }, [filter])
  return(
    <>
  <Filter filter={filter} setFilter={setFilter}></Filter>
  <Notification message={message} ></Notification>
  <Country country={selectedCountry}></Country>
  </>
)
}

export default App;
