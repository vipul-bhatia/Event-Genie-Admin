
import { BrowserRouter, Route, Switch ,Redirect} from  'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages
import Home from './pages/home/home'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import Navbar from './components/navbar';


function App() {
 const {authIsReady, user} = useAuthContext()


  return (
    <div className="App">
      {!authIsReady && <div>Loading...</div>}
      {authIsReady && (
      <BrowserRouter>
      <Navbar></Navbar>
        <Switch>
          <Route exact path='/'>
          {!user && <Redirect to='/login' />}
           {user && <Home />}
          </Route>
          <Route path='/login'>
            {user && <Redirect to='/' />}
            {!user && <Login />}
          </Route>
          <Route path='/signup'>
            {user && <Redirect to='/' />}
            {!user && <Signup />}
          </Route>
        </Switch>
      </BrowserRouter>)}
    </div>
  );
}

export default App
