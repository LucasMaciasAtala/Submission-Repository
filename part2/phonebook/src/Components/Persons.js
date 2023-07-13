import Person from "./Person";

const Persons = (props) =>  {
  return(

    props.persons.filter(
      (f) =>
      f.name.toLowerCase().includes(props.filter.toLowerCase()) || props.filter === ""
      )
      .map((person) => (
        <div key={person.id}>
        <Person person={person} />
        <button onClick={() => props.handleDelete(person)}>delete</button>
      </div>
    )
    ))}

    export default Persons;