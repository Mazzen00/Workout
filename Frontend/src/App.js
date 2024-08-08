import {BrowserRouter , Routes , Route , Navigate} from 'react-router-dom'
import {useAuthContext} from './hooks/useAuthContext'

//BrowserRouter is to wraps all Route in the system 
//Routes which wraps all our Individual Routes 
// Route is to create a single Route 


// Pages & Components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/navbar'
import { WorkoutsContextProvider } from './context/WorkoutContext';

function App() {
  const {user} =  useAuthContext()

  return (
      <WorkoutsContextProvider>
         <div className="App">
     <BrowserRouter>
     <Navbar />
     <div className="pages">
      <Routes>
        <Route path = "/"
        element = {user ? <Home /> : <Navigate to = "/login" />}
        />

        <Route path = "/login"
        element = {!user ? <Login /> : <Navigate to = "/" />}
        />

        <Route path = "/signup"
        element = {!user ? <Signup /> : <Navigate to = "/" />}
        />
      </Routes>
     </div>
 
     </BrowserRouter>
    </div>
   
      </WorkoutsContextProvider>
  )
}

export default App;
