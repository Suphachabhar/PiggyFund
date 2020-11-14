import React from 'react';
import { Route } from 'react-router-dom' 
import Tracker from '../pages/Tracker/Tracker'
import Budget from '../pages/Budget/Budget'
import Export from '../pages/Export/Export'
import Account from '../pages/Account/Account'
import AddItem from '../pages/AddItems/AddItem'

import 'antd/dist/antd.css'; 

function index() {
  return (
    <div>
      <Route path="/tracker" exact component={Tracker} />
      <Route path="/budget" exact component={Budget} />
      <Route path="/export" exact component={Export} />
      <Route path="/account" exact component={Account} />
      <Route path="/additems" exact component={AddItem} />
    </div>
  );
}

export default index;
