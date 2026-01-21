import { useEffect } from 'react'
import Home from './pages/Home'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AllBooks from './pages/AllBooks'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/Profile/Favourites'
import UserOrderHistro from './components/Profile/UserOrderHistro'
import Settings from './components/Profile/Settings'
import AllOrders from './pages/AllOrders'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'

function App() {
  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role)

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")

    ) {
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))

    }
  }, [dispatch])


  return (
    <div>


      <Navbar />

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/all-books' element={<AllBooks />} />
        <Route path='/cart' element={< Cart />} />
        <Route path='/profile' element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}

          {/* User order history */}
          <Route
            path='orderHistory'
            element={role === "user" ? <UserOrderHistro /> : <AllOrders />}
          />

          {/* Add book - available to all logged-in users */}
          <Route path='add-book' element={<AddBook />} />

          {/* Shared settings route */}
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
        <Route path='view-book-details/:id' element={<ViewBookDetails />} />
        <Route path='/updateBook/:id' element={<UpdateBook />} />

      </Routes>





    </div>
  )


}

export default App
