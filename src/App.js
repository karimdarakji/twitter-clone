import {Router,Route,Switch,} from 'react-router-dom';
import Protected from './Protected';
import Profile from './profile';
import Userprofile from './userprofile';
import Search from './Search';
import React, {Suspense, lazy} from 'react'
import { createBrowserHistory } from 'history';


const Welcome = lazy(() => import('./Welcome'));
const Login = lazy(() => import('./Pages/Login/Login.js'));

const history = createBrowserHistory();

export default function App() {
  return (
  <Router history={history}>
    <Suspense fallback={''}>
      <Switch>
      
      <Route path="/login" component={Login}/>

      {/* <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/userprofile/:id">
        <Protected Cmp={Userprofile}/>
      </Route>
      <Route path="/Search">
        <Protected Cmp={Search}/>
      </Route> */}
      {/* <Route path="/">
        <Protected Cmp={Home}/>
      </Route> */}
      <Route path="/" component={Welcome} />
      </Switch>
      </Suspense>
      </Router>
  )
}
