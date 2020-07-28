/* eslint-disable no-console */

import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import chatRoom from '../chatroom/chatRoom';

class HomePage extends React.Component {
 
 

  componentDidMount() {
    
    window.onload = function() {
      document.getElementById("enterbutton").onmouseover = function()
      {
          this.style.backgroundColor = "#ff8328";
      };

      document.getElementById("enterbutton").onmouseout = function()
      {
          this.style.backgroundColor = "#1d6feb";
      };
  };
 
         

  }

 

  render() {
   
     return (
       <div className="homebox">
         <div className="namewrapper">
       <h1 className="brandtext">Lets get you in.</h1>
       </div>
       <div className="enterbox">
       <Link to="chat" ><button id="enterbutton" className="btn-lg">Enter</button></Link>
       </div>
       </div>
       
     );
  }
}


export default HomePage;

