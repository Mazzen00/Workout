import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
const WorkoutForm = () => {
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  const [title, setTitle] = useState('')
  
  const [load, setload] = useState('')

  const [reps, setReps] = useState('')
  
  const [error, setError] = useState(null)

  const [emptyFields , setEmptyFields] = useState([])

  // metansa4 dol fy 2l 2wal wa fy 2l 2a5er vaiables 2l fekra 2n 3amel array 34an 23mal kza variable = l 7aga wa7da wa 2l useState deh function asln
  // useState mn 2esmaha bt2ollo yesta5dam 7aga ma3 2l variable zy ma 3amalt  ta7t ma3 2l if
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user) {
      setError('You must be logged in ')
    }

    const workout = {title , load , reps}
    const response = await fetch('/api/workouts' , {
      method : 'POST',
      body : JSON.stringify(workout), // workout dah 2l variable 2l foo2 
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    const json = await response.json() // response deeh 2l variable 2l fo2 fa 2nta bt2ollo await fetch 2l url bta3 2l server.js 

    if(!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)

    }
    if(response.ok){
      setError(null)

      // deeh ba2a 2l useState 2l 3amelnaha foo2
      setTitle('')
      setload('')
      setReps('')
      setEmptyFields([])
      console.log('New Workout Added')
      dispatch({type : 'CREATE_WORKOUT' , payload : json})
    }
  }
  return (  
    <form action="" className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      
      <label>Excersize Title</label> {/**(e) is event */} 
      <input type="text" name="" id=""  onChange={(e) => setTitle(e.target.value) }
      value = {title} className= {emptyFields.includes('title') ? 'error' : ''}/>
      
       <label>load (in kg:)</label> {/**(e) is event */} 
      <input type="number" name="" id=""  onChange={(e) => setload(e.target.value) }
      value = {load} className= {emptyFields.includes('load') ? 'error' : ''}/> 


      <label>Reps</label> {/**(e) is event */} 
      <input type="number" name="" id=""  onChange={(e) => setReps(e.target.value) }
      value = {reps} className= {emptyFields.includes('reps') ? 'error' : ''}/>

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm
