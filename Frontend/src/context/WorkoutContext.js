import { createContext, useReducer } from "react";
export const WorkoutsContext = createContext();
// badal ma tktb export default WorkoutContext
export const workoutsReducer = (state , action)  => {
  switch (action.type) { // 3amelna switch 34an 2l action hyt8ayyar kol marra zy 2nnak te3mal create , update , etc...
    //tab3an 2l case ma3roofa 2l ba3deha dah variable 

    case 'SET_WORKOUTS':
      return {
        workouts : action.payload
      }
      case 'CREATE_WORKOUT':
        return {
          // ...state.workouts bt2ollo 23mal 2l state 2l foo2 2l 2wwal ba3den rest of the state workouts 7ottaha m3ah fy array 

          workouts : [action.payload, ...state.workouts]
        }
        case 'DELETE_WORKOUT':
          return {
            workouts : state.workouts.filter((w) => w._id !== action.payload._id)
          }
    default:
      return state
  }
}
export const WorkoutsContextProvider = ({ children }) => {
  const [state , dispatch] = useReducer(workoutsReducer, {
    workouts : null //dispatch we gonna use it to update
  })// instead of just providing whole object we gonna spread the state ...state 
  return (
    <WorkoutsContext.Provider value={ {...state , dispatch}}>
          { children }
    </WorkoutsContext.Provider>
  )
}
