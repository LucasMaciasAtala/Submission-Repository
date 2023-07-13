const Filter = (props) => {
  return(
    <p>
    filter shown with
    <input
    type="text"
    value={props.filter}
    onChange={(event) => props.setFilter(event.target.value)}
    />
    </p>
  )
}

export default Filter;