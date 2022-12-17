import React from "react"
import ReactDOM from "react-dom/client"

function ExampleComponent() {
  return (
    <div>
      <Header />
      <LikeArea />
      <PetArea />
      <TimeArea />
      <Footer />
    </div>
  )
}

function Header() {
  return <h1 className="special">My App</h1>
}

function TimeArea() {
  const [theTime, setTime] = React.useState(new Date().toLocaleString())

  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date().toLocaleString()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return <p>The current time is {theTime}.</p>
}

function PetArea() {
  const [pets, setPets] = React.useState([])

  // run only once when the component is first rendered
  React.useEffect(() => {
    if (localStorage.getItem("basicReactApp/pets")) {
      setPets(JSON.parse(localStorage.getItem("basicReactApp/pets")))
    }
  }, [])

  // run every time the component is updated
  React.useEffect(() => {
    localStorage.setItem("basicReactApp/pets", JSON.stringify(pets))
  }, [pets])

  return (
    <>
      <AddPetForm setPets={setPets} />
      <ul>
        {pets.map(pet => (
          <Pet setPets={setPets} id={pet.id} name={pet.name} species={pet.species} age={pet.age} key={pet.id} />
        ))}
      </ul>
    </>
  )
}

function Pet(props) {
  function handleDelete() {
    props.setPets(prev => prev.filter(pet => pet.id != props.id))
  }

  return (
    <li>
      {props.name} is a {props.species} and is {props.age} years old.
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

function AddPetForm(props) {
  const [name, setName] = React.useState()
  const [species, setSpecies] = React.useState()
  const [age, setAge] = React.useState()

  function handleSubmit(e) {
    e.preventDefault()
    props.setPets(prev => prev.concat({ name, species, age, id: Date.now() }))
    setName("")
    setSpecies("")
    setAge("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Pet</legend>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input value={species} onChange={e => setSpecies(e.target.value)} placeholder="species" />
        <input value={age} onChange={e => setAge(e.target.value)} placeholder="age in years" />
        <button>Add Pet</button>
      </fieldset>
    </form>
  )
}

function LikeArea() {
  const [numberLikes, setNumberLikes] = React.useState(0)

  function increaseHandler() {
    setNumberLikes(prev => prev + 1)
  }

  function decreaseHandler() {
    setNumberLikes(prev => Math.max(0, prev - 1))
  }
  return (
    <>
      <button onClick={increaseHandler}>Increase likes</button>
      <button onClick={decreaseHandler}>Decrease likes</button>
      <h2>This page has been liked {numberLikes} times</h2>
    </>
  )
}

function Footer() {
  return <footer>Copyright</footer>
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<ExampleComponent />)

if (module.hot) {
  module.hot.accept()
}
