const Person = (props) => {
  return (
    <p className="person">
      {props.person.name} {props.person.number}
    </p>
  );
};

export default Person;
