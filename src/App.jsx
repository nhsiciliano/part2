import { useState, useEffect } from 'react'
import Course from './components/Course'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(firstPersons => {
        setPersons(firstPersons)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault();
    const nameRepeat = persons.find(persons => persons.name === newName);
    if (nameRepeat && window.confirm(`${nameRepeat.name} is already added to phonebook, replace the old number with a new one?`)) {
      const updatePerson = { ...nameRepeat, number: newNumber };

      personService
        .update(nameRepeat.id, updatePerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== nameRepeat.id ? person : returnedPerson
          ))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Updated ${returnedPerson.name}'s number`);
          setNotificationType('success');
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(`The person '${nameRepeat.name}' was already deleted from server`);
          setNotificationType('error');
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== existingPerson.id));
        });
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${returnedPerson.name}`);
          setNotificationType('success');
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          setNotificationMessage(`Something went wrong. Try again in a few minutes`);
          setNotificationType('error');
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure to delete ${name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationMessage(`Deleted ${name}'s number`);
          setNotificationType('success');
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          setNotificationMessage(`Information of ${name} has already been removed from server`);
          setNotificationType('error');
          setPersons(persons.filter(person => person.id !== id));
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  }

  const personToFilter = persons.filter(person =>
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  )

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  }

  const handleSearch = (e) => {
    setSearchPerson(e.target.value);
  }

  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <div>
        {courses.map((item) => (
          <Course key={item.id} course={item} />
        ))}
      </div>
      <div>
        <h2>Phonebook</h2>
        <Notification message={notificationMessage} type={notificationType}/>
        <Filter
          searchPerson={searchPerson}
          handleSearch={handleSearch}
        />
        <h2>Add a new</h2>
        <PersonForm
          onSubmit={addPerson}
          valueName={newName}
          valueNumber={newNumber}
          onChangeName={handleChangeName}
          onChangeNumber={handleChangeNumber}
        />
        <h2>Numbers</h2>
        <ul>{personToFilter.map(person =>
          <Persons key={person.id} person={person} handleDelete={() => handleDelete(person.id, person.name)} />
        )}</ul>
      </div>
    </div>
  )
}

export default App
