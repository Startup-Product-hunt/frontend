import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/HomePage/Home'
import Error from './Pages/Error'
import Profile from './Pages/ProfilePage/Profile'
import ExploreBusiness from './Pages/ExplorteBusinessPages.jsx/ExploreBusiness'
import Event from './Pages/EventPages/Event'
import Header from './Components/Layout/Header'


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      {/* general */}
      <Route path='/' element={<Home/>}/>

      {/* User */}
       <Route path='/profile' element={<Profile/>}/>
       <Route path="/profile/:token" element={<Header showResetModal={true} />} />
        <Route path='/business' element={<ExploreBusiness/>}/>
       <Route path='/events' element={<Event/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
