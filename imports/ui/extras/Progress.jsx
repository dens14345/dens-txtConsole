import React, {Fragment} from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';


export const Progress = () => (
   <Fragment>
      <CircularProgress size={ 100 } thickness={ 5 }/>
      <LinearProgress mode='indeterminate'/>
   </Fragment>
);

