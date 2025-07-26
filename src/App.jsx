import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/HomePage/Home'
import Error from './Pages/Error'
import Profile from './Pages/ProfilePage/Profile'
import ExploreBusiness from './Pages/ExplorteBusinessPages.jsx/ExploreBusiness'
import Event from './Pages/EventPages/Event'
import Header from './Components/Layout/Header'
import ForYouAllProducts from './Pages/AllProducts/ForYouAllProducts'
import AdminPage from './Pages/AdminDashboard/AdminPage'
import AllUser from './Pages/AdminDashboard/AllUser'


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      {/* general */}
      <Route path='/' element={<Home/>}/>

      {/* User */}
       <Route path='/profile' element={<Profile/>}/>
       <Route path="/profile/:token" element={<Header showResetModal={true} />} />
       {/* admin */}
        <Route path='/business' element={<ExploreBusiness/>}/>
         <Route path='/admin/dashboard' element={<AdminPage/>}/>
          <Route path='/admin/users' element={<AllUser/>}/>

        {/* general */}
        <Route path='/for-you/all' element={<ForYouAllProducts/>}/>
       <Route path='/events' element={<Event/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
