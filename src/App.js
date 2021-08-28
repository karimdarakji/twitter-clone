import React, {Suspense, lazy} from 'react'
import {BrowserRouter as Router,Route,Switch, useHistory, Redirect} from 'react-router-dom';

import Profile from './profile';
import Userprofile from './userprofile';
import Search from './Search';

import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';

import { getSessionInfo } from './storage';


const Welcome = lazy(() => import('./Welcome'));
const Login = lazy(() => import('./Pages/Login/Login.js'));
const Home = lazy(() => import('./Pages/Home/Home.js'))



export default function App() {
  console.log(getSessionInfo('user'))
  const history = useHistory();

  const Auth = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                getSessionInfo('user') ? (
                  <>
                  <div className="d-flex">
                    <Sidebar />
                    <div className="w-50">
                      <Header />
                      <Component {...props} />
                    </div>
                  </div>
                        
                  </>
                ) : (
                        <Redirect to="/welcome" />
                    )}
        />
        
    );
};

  return (
  <Router history={history}>
    <Suspense fallback={''}>
      <Switch>
    
      <Auth path="/home" component={Home}/>
    
    {!getSessionInfo('user') &&
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/welcome" component={Welcome} />
      <Redirect to="/welcome" />
    </Switch>
    }
    <Redirect to="/home"/>
      

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
      </Switch>
      </Suspense>
      </Router>
  )
}
