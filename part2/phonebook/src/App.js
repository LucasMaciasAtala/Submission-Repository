import { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import Form from "./Components/FormNewPerson";
import PersonsDb from "./Services/PersonsDb";
import Notification from "./Components/Notification";

const okStyle = "ok";
const errorStyle = "error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("")
  const [style, setStyle] = useState("")

  useEffect(() => {
    PersonsDb.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const personWithSameName = persons.filter((person) => person.name === newName)
    if (personWithSameName.length > 0) {
      if (window.confirm(`${newName} is already added on the phonebook, replace the old number with a new one?`)) {
        newPerson.id = personWithSameName[0].id;
        PersonsDb.update(newPerson.id, newPerson)
        .then((response) => {
          const newState = persons.map(person => {
            if(person.id === newPerson.id) 
            {
              return {...person, number: newPerson.number}
            }
            else{
              return person;
            }
          })
          setPersons(newState);
          setMessage(`Modified ${newPerson.name} with number ${newPerson.number}`)
          setStyle(okStyle);
          setTimeout(() => {setMessage(null); setStyle(null)}, 3000);
        })
      }
    } else {  
      PersonsDb.add(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${newPerson.name}`)
          setStyle(okStyle)
          setTimeout(() => {setMessage(null); setStyle(null)}, 3000);
        })
        .catch(() => alert("Error, person has not been added"));
    }

  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonsDb.deleteById(person.id)
        .then(() => {
          setPersons(persons.filter((x) => x.id !== person.id));
          setMessage(`Deleted ${person.name}`)
          setStyle(errorStyle);
          setTimeout(() => {setMessage(null); setStyle(null)}, 3000);
        })
        .catch(() => {
          setMessage(`Information of ${person.name} has already been removed from server`)
          setStyle(errorStyle);
          setTimeout(() => {setMessage(null); setStyle(null)}, 3000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={style}></Notification>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></Form>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        handleDelete={deletePerson}
      ></Persons>
    </div>
  );
};

export default App;
