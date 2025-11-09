import { useState } from "react";
import { useEffect } from "react";
import { create, deletePerson, getAll, update } from "./services/persons";
import "./index.css";

const SearchFilter = ({ allPersons, setAllPersons, search, setSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setAllPersons(!allPersons)}>
        {allPersons ? "see filtered results" : "see all persons"}
      </button>
    </div>
  );
};

const Persons = ({ personsToShow, handleDeletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person, index) => (
          <li key={index}>
            <span>
              {person.name} {person.number}
            </span>{" "}
            &nbsp;
            <button
              onClick={() => {
                handleDeletePerson(person.id);
              }}
            >
              delete person
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddPeopleForm = ({
  persons,
  setPersons,
  setAddPersonSuccess,
  newName,
  setNewName,
  phoneNumber,
  setPhoneNumber,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const personExist = persons.find((person) => person.name === newName);
        if (personExist)
          if (personExist.number !== phoneNumber) {
            confirm(
              `${newName} is already in the list. do u want to replace the phone number`
            )
              ? update({
                  ...personExist,
                  name: newName,
                  number: phoneNumber,
                })
                  .then((res) =>
                    setPersons(
                      persons.map((person) =>
                        person.id === personExist.id
                          ? { ...person, number: phoneNumber }
                          : person
                      )
                    )
                  )
                  .catch((err) =>
                    console.log(`this error appeared and is caught: ${err}`)
                  )
              : false;
          } else alert(`${newName} is already in the list.`);
        else {
          const newPerson = {
            name: newName,
            number: phoneNumber,
          };
          create(newPerson).then((res) => {
            console.log(res);
            setPersons([...persons, res.data]);
            setAddPersonSuccess(true);
            setTimeout(() => {
              setAddPersonSuccess(false);
            }, 3000);
          });
        }
      }}
    >
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        phone number:{" "}
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [allPersons, setAllPersons] = useState(true);
  const [search, setSearch] = useState("");
  const [addPersonSuccess, setAddPersonSuccess] = useState(false);

  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    getAll().then((res) => setPersons(res.data));
  }, []);

  const personsToShow = allPersons
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );

  const handleDeletePerson = (id) => {
    const answer = confirm("are u sure?");

    if (answer)
      deletePerson(id).then((res) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {addPersonSuccess && (
        <h2 className="success">{`person named "${newName}" added to phone book`}</h2>
      )}

      <h3>Filter results</h3>
      <SearchFilter
        allPersons={allPersons}
        setAllPersons={setAllPersons}
        search={search}
        setSearch={setSearch}
      />

      <AddPeopleForm
        persons={persons}
        setPersons={setPersons}
        addPersonSuccess={addPersonSuccess}
        setAddPersonSuccess={setAddPersonSuccess}
        newName={newName}
        setNewName={setNewName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />

      <Persons
        personsToShow={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
