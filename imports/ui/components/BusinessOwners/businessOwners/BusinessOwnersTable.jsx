import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';


import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
} from 'material-ui/Table';


class BusinessOwnersTable extends Component {

   constructor(props) {
      super(props);
      this.state = {
         openMenu: false
      }
   }

   singleBusinessOwner(pathname, _id){
      this.props.history.push(
         `${pathname}/${_id}`
      );
   }



   render() {
      return (
         <Fragment>
            <AppBar
               title='Business Owners'
               showMenuIconButton={ false }
            />
            <Card>

               <CardText>
                  <Table
                     fixedHeader={ true }
                     selectable={ false }
                     multiSelectable={ false }
                  >
                     <TableHeader
                        displaySelectAll={ false }
                        adjustForCheckbox={ false }
                        displayRowCheckbox={ false }
                        enableSelectAll={ false }
                     >

                        <TableRow>
                           <TableHeaderColumn>Name</TableHeaderColumn>
                           <TableHeaderColumn>Email</TableHeaderColumn>
                           <TableHeaderColumn>Status</TableHeaderColumn>
                           <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                     </TableHeader>

                     <TableBody
                        displayRowCheckbox={ false }
                        showRowHover={ true }
                     >
                        {
                           this.props.businessOwners.map((bOwner) => (
                              <TableRow key={ bOwner._id }>
                                 <TableRowColumn>{ `${bOwner.profile.firstname} ${bOwner.profile.lastname}` }</TableRowColumn>
                                 <TableRowColumn> { bOwner.emails[0].address }</TableRowColumn>
                                 <TableRowColumn> { bOwner.profile.status }</TableRowColumn>
                                 <TableRowColumn>
                                    <RaisedButton
                                       label='View'
                                       primary={true}
                                       onClick={this.singleBusinessOwner.bind(this,
                                          this.props.location.pathname,
                                          bOwner._id
                                       )}

                                    />
                                    <IconMenu
                                       iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                       anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                       targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                    >
                                       <MenuItem
                                          primaryText='View'
                                          onClick={ this.singleBusinessOwner.bind(this,
                                             this.props.location.pathname,
                                             bOwner._id
                                          )}
                                       />
                                       <MenuItem primaryText='Update' />
                                       
                                    </IconMenu>

                                 </TableRowColumn>
                              </TableRow>
                           ))
                        }

                        { /*content goes here*/ }

                     </TableBody>
                  </Table>


               </CardText>

            </Card>
         </Fragment>


      );
   }
}

export default withTracker((props) => {
   console.log(props);
   return {}
})(BusinessOwnersTable)



