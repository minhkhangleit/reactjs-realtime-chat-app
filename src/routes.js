import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app.js';
import Home from './components/home/homePage';
import chatRoom from './components/chatroom/chatRoom';


export default (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="chat" component={chatRoom} />
     </Route>    
);