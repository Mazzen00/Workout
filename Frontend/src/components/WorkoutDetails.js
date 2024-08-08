import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
// date fns 

import formatDistanceTONow from 'date-fns/formatDistanceToNow'

const workoutDetails = ({workout}) =>{
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {dispatch} = useWorkoutsContext()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {user} = useAuthContext()

const handleClick = async () => {

  if(!user) {
    return 
  
  }
  const response = await fetch('api/workouts/' + workout._id ,{
    method : 'DELETE' ,
    headers : {
      'Authorization' : `Bearer ${user.token}`
    }
})
const json = await response.json()

  if (response.ok){
  // eslint-disable-next-line no-undef
  dispatch({type : 'DELETE_WORKOUT' , payload : json})
  }
}
  return (

    <div className="workout-details">

    <h4>{workout.title}</h4>
    {/*Load and Reps are the objects I created already in my db collection */ }
    {/* (kg) this means in kg he then will write the load and beside it kg */ }

    <p><strong>Load (kg): </strong>{workout.load}</p>

    <p><strong>Reps: </strong>{workout.reps}</p>

    {/**new Date deeh 34an ye3mallak date sa7 wa addsuffix 34an yktb fy 2l 2a5er "ago" genb msln 2 days  */}
    <p> {formatDistanceTONow(new Date(workout.createdAt) , {addSuffix : true})} </p>
    {/*2l classname dah bta3 2l link l icon mn google*/ }
    <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    
    </div>
  )

}

export default workoutDetails
