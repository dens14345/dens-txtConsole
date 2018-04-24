import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from '../../ui/components/Navbar/Navbar';
import Sidebar from '../../ui/components/Sidebar/Sidebar';
import Login from '../../ui/components/Auth/Login';
import Register from '../../ui/components/Auth/Register';

import MoviesContainer from '../../ui/components/Movies/MoviesContainer';


let index = () => {
   return (
      <div className='container-fluid'>
         <h1>index page from routes js</h1>
      </div>
   )
}

let contacts = () => {
   return (
      <div>
         <h1>contacts page</h1>
      </div>
   )
}

export default routes = (
   <Router>
      <div>
         <Navbar/>
         <Sidebar/>
         <Route path='/login' component={ Login }/>
         <Route path='/register' component={ Register }/>
         <Route path='/contacts' component={ contacts }/>
         <Route path='/movies' component={ MoviesContainer }/>
      </div>
   </Router>
)
