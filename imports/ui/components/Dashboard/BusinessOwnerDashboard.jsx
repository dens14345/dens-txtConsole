import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { SideNav, SideNavItem, Button } from 'react-materialize';


class BusinessOwnerDashboard extends Component {

   constructor(props) {
      super(props);
   }


   render() {
      return (
         <div>
            <h4>BusinessOwnerDashboard</h4>
         </div>
      );
   }
}

export default withTracker(() => {
   return {

   }
})(BusinessOwnerDashboard)



/*
* <SideNav
               trigger={<Button>SIDE NAV DEMO</Button>}
               options={{ closeOnClick: true }}
            >
               <SideNavItem userView
                            user={{
                               background: 'img/office.jpg',
                               image: 'img/yuna.jpg',
                               name: 'John Doe',
                               email: 'jdandturk@gmail.com'
                            }}
               />
               <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
               <SideNavItem href='#!second'>Second Link</SideNavItem>
               <SideNavItem divider />
               <SideNavItem subheader>Subheader</SideNavItem>
               <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
               <SideNavItem waves href='#!third'>tests</SideNavItem>
            </SideNav>
* */

