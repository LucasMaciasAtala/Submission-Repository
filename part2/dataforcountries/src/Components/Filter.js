const Filter = (props) => {
    return(
      <p>
      find countries:
      <input
      type="text"
      value={props.filter}
      onChange={(event) => props.setFilter(event.target.value)}
      />
      </p>
    )
  }
  
  export default Filter;