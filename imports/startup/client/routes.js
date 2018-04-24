import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../../ui/components/Auth/Login';
import Register from '../../ui/components/Auth/Register';
import Index from '../../ui/components/Index/Index'



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
         <Route exact path='/' component={ Index }/>
         <Route path='/login' component={ Login }/>
         <Route path='/register' component={ Register }/>
      </div>
   </Router>
)
