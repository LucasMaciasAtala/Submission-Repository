const Country = (props) => {
  if (props.country) {
    console.log("Country", props);
    const languages = Object.entries(props.country.languages);
    return (
      <>
        <h1>{props.country.name.common}</h1>
        <p>capital: {props.country.capital}</p>
        <p>area: {props.country.area}</p>
        <h4>languages:</h4>
        <ul>
            {
                languages.map((x) => {
                    return (<li>{x[1]}</li>)
                  })          
            }          
        </ul>
        <img alt="flag of the country" src={props.country.flags.png}></img>
      </>
    );
  } else return <></>;
};

export default Country;
